"use client";

import { StatCard } from "@/components/StatCard";
import { ActivityList } from "@/components/ActivityList";
import { Zap, Home, Thermometer, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEnergyData } from "@/hooks/useEnergyData";
import { EnergyLineChart } from "@/components/charts/EnergyLineChart";
import { HouseholdBarChart } from "@/components/charts/HouseholdBarChart";

export default function Dashboard() {
  const { stats, loading } = useEnergyData();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Energy Analytics</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Data Source: GG.csv</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Consumption"
          value={`${stats.totalConsumption.toLocaleString()} kWh`}
          icon={Zap}
          description="Total energy used"
        />
        <StatCard
          title="Avg Daily Usage"
          value={`${stats.avgDailyConsumption} kWh`}
          icon={Thermometer}
          description="Per day average"
        />
        <StatCard
          title="Total Households"
          value={stats.totalHouseholds.toString()}
          icon={Home}
          description="Monitored homes"
        />
        <StatCard
          title="AC Adoption"
          value={`${stats.acAdoptionRate}%`}
          icon={Users}
          description="Households with AC"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Consumption Trend</CardTitle>
            <CardDescription>Daily energy usage over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <EnergyLineChart data={stats.dailyTrend} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Usage by Household Size</CardTitle>
            <CardDescription>Average consumption per person count</CardDescription>
          </CardHeader>
          <CardContent>
            <HouseholdBarChart data={stats.householdSizeTrend} />
          </CardContent>
        </Card>
      </div>

      {/* Activity Row - Kept as placeholder/demo since CSV doesn't have activity logs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityList />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>AI-generated analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 font-medium">Peak Usage Alert</p>
              <p className="text-xs text-blue-600 mt-1">Energy consumption peaks on weekends. Consider optimizing schedule.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-green-800 font-medium">Efficiency Tip</p>
              <p className="text-xs text-green-600 mt-1">Households with 3 members show optimal energy efficiency per capita.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
