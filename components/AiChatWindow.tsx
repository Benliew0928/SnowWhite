"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

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
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "I'm just a demo UI, but I look pretty cool, right?",
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

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
                    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
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
                                                : "bg-gray-100 text-gray-800 rounded-tl-none"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-primary"
                            />
                            <Button type="submit" size="icon" disabled={!inputValue.trim()} className="shrink-0">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
