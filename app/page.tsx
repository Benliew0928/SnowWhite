import { StatCard } from "@/components/StatCard";
import { ActivityList } from "@/components/ActivityList";
import { Users, MousePointerClick, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,345"
          icon={Users}
          trend="+12%"
          trendUp={true}
          description="from last month"
        />
        <StatCard
          title="Active Sessions"
          value="1,234"
          icon={MousePointerClick}
          trend="+4%"
          trendUp={true}
          description="from last hour"
        />
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend="+20.1%"
          trendUp={true}
          description="from last month"
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={TrendingUp}
          trend="-1.2%"
          trendUp={false}
          description="from last week"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Chart Placeholder (Revenue over time)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Chart Placeholder (Sales distribution)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityList />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
