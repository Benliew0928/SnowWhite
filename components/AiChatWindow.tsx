"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { generateContent } from "@/lib/gemini";
import { useEnergyData } from "@/hooks/useEnergyData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
}

interface AiChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        role: "ai",
        content: "Hello! I'm your AI assistant. How can I help you today?",
    },
];

export function AiChatWindow({ isOpen, onClose }: AiChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { stats } = useEnergyData();

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            let context = "You are an AI assistant for the SnowWhite Energy Analytics Dashboard. Your role is to analyze the energy data and help users understand their consumption patterns. \n\n";
            context += "CRITICAL INSTRUCTIONS:\n";
            context += "1. Answer questions ONLY related to the provided website data.\n";
            context += "2. You are ENCOURAGED to provide actionable improvement suggestions and energy-saving tips based on the data trends (e.g., if AC usage is high, suggest cooling tips; if consumption peaks on certain days, suggest load shifting).\n";
            context += "3. If the user asks about something unrelated to energy or the dashboard, politely decline.\n\n";

            if (stats) {
                context += `Current Dashboard Stats:\n`;
                context += `- Total Consumption: ${stats.totalConsumption} kWh\n`;
                context += `- Avg Daily Usage: ${stats.avgDailyConsumption} kWh\n`;
                context += `- Total Households: ${stats.totalHouseholds}\n`;
                context += `- AC Adoption Rate: ${stats.acAdoptionRate}%\n\n`;

                context += `Consumption Trend (Last 7 days shown for brevity, full data available to system):\n`;
                context += stats.dailyTrend.map(d => `${d.date}: ${d.consumption}kWh`).join(", ");
                context += `\n\n`;

                context += `Usage by Household Size:\n`;
                context += stats.householdSizeTrend.map(d => `${d.size} people: ${d.consumption}kWh avg`).join(", ");
                context += `\n\n`;
            } else {
                context += "The dashboard data is currently loading or unavailable.";
            }

            const text = await generateContent(userMessage.content, context);

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: text,
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (error: any) {
            console.error("Failed to generate content:", error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: error.message || "Sorry, I encountered an error. Please try again.",
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-24 right-6 z-50 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 bg-primary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-gray-900">AI Assistant</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    {message.role === "ai" && (
                                        <Avatar className="w-8 h-8 border border-gray-100">
                                            <AvatarImage src="/bot-avatar.png" />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-gray-100 text-gray-800 rounded-tl-none prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100"
                                            }`}
                                    >
                                        {message.role === "ai" ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {message.content}
                                            </ReactMarkdown>
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 flex-row">
                                    <Avatar className="w-8 h-8 border border-gray-100">
                                        <AvatarImage src="/bot-avatar.png" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-gray-100 text-gray-800 rounded-tl-none p-3 rounded-2xl text-sm">
                                        Typing...
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading} className="shrink-0">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
