"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionResult {
    prediction: number;
    status: string;
    threshold: number;
}

export default function PredictPage() {
    const [formData, setFormData] = useState({
        dayOfWeek: "Monday",
        temp: "26.5",
        familySize: "4",
        hasAC: "Yes",
        peakUsage: "5.5",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const payload = {
            Day: formData.dayOfWeek,
            Avg_Temperature_C: parseFloat(formData.temp),
            Household_Size: parseInt(formData.familySize),
            Has_AC: formData.hasAC,
            Peak_Hours_Usage_kWh: parseFloat(formData.peakUsage)
        };

        try {
            const response = await fetch("/api/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Failed to get prediction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClassName = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Energy Forecast AI</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Prediction Parameters</CardTitle>
                        <CardDescription>
                            Enter the details below to forecast energy consumption.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Day of Week
                                </label>
                                <select
                                    className={inputClassName}
                                    value={formData.dayOfWeek}
                                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                                >
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Temp (°C)
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.temp}
                                        onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Family Size
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.familySize}
                                        onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Has AC?
                                    </label>
                                    <select
                                        className={inputClassName}
                                        value={formData.hasAC}
                                        onChange={(e) => setFormData({ ...formData, hasAC: e.target.value })}
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Peak Usage
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={formData.peakUsage}
                                        onChange={(e) => setFormData({ ...formData, peakUsage: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Zap className="mr-2 h-5 w-5" />
                                )}
                                {loading ? "Predicting..." : "Predict Consumption"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className={cn("border-dashed", result ? "border-solid border-primary/50 bg-primary/5" : "")}>
                    <CardHeader>
                        <CardTitle>Forecast Results</CardTitle>
                        <CardDescription>Prediction analysis will appear here</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
                        {loading ? (
                            <div className="text-center space-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                <p className="text-muted-foreground">Analyzing consumption patterns...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center text-destructive space-y-2">
                                <p className="font-medium">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        ) : result ? (
                            <div className="w-full space-y-8">
                                <div className="text-center space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Predicted Consumption</p>
                                    <div className="text-6xl font-bold text-primary tracking-tight">
                                        {result.prediction.toFixed(2)} <span className="text-2xl font-medium text-muted-foreground">kWh</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background/80 p-4 rounded-xl border text-center space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Status</p>
                                        <p className={cn("font-bold text-lg",
                                            result.status === "Safe" ? "text-green-600" : "text-yellow-600"
                                        )}>
                                            {result.status}
                                        </p>
                                    </div>
                                    <div className="bg-background/80 p-4 rounded-xl border text-center space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Safe Threshold</p>
                                        <p className="font-bold text-lg text-gray-700">
                                            {result.threshold} kWh
                                        </p>
                                    </div>
                                </div>

                                {result.prediction > result.threshold && (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                                        <p className="font-medium flex items-center gap-2">
                                            <Zap className="h-4 w-4" />
                                            High Usage Alert
                                        </p>
                                        <p className="mt-1 opacity-90">
                                            Your predicted usage is above the safe threshold. Consider reducing AC usage or shifting peak hours.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <Zap className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>Enter parameters and click predict to generate a forecast</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
