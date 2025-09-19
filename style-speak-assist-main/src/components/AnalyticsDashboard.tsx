import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  ShoppingCart,
  Eye,
  BarChart3
} from "lucide-react";

const mockAnalytics = {
  dailySales: {
    today: 12450,
    yesterday: 11200,
    change: 11.2
  },
  topProducts: [
    { name: "Nike Air Max 270", sales: 45, revenue: 6750 },
    { name: "Adidas Ultraboost", sales: 38, revenue: 6840 },
    { name: "Converse Chuck Taylor", sales: 52, revenue: 3380 },
    { name: "Vans Old Skool", sales: 31, revenue: 2325 },
    { name: "New Balance 990v5", sales: 28, revenue: 4900 }
  ],
  metrics: {
    totalRevenue: 45600,
    totalOrders: 234,
    uniqueVisitors: 1567,
    conversionRate: 14.9
  },
  salesTrend: [
    { day: "Mon", sales: 8500 },
    { day: "Tue", sales: 9200 },
    { day: "Wed", sales: 7800 },
    { day: "Thu", sales: 11500 },
    { day: "Fri", sales: 13200 },
    { day: "Sat", sales: 15600 },
    { day: "Sun", sales: 12450 }
  ]
};

export const AnalyticsDashboard = () => {
  const salesChange = mockAnalytics.dailySales.change;
  const isPositive = salesChange > 0;

  const dashboardRef = useRef<HTMLDivElement>(null);
  const handleGenerateReport = async () => {
    if (!dashboardRef.current) return;
    const element = dashboardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // Multi-page support
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = 0;
        }
      }
    }

    pdf.save(`sales-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={dashboardRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sales Analytics Dashboard</h1>
          <p className="text-muted-foreground">Staff-only access • Real-time insights</p>
        </div>
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
          <Eye className="w-4 h-4 mr-1" />
          Staff Only
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAnalytics.metrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAnalytics.dailySales.today.toLocaleString()}</div>
            <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{salesChange}% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Of {mockAnalytics.metrics.uniqueVisitors} visitors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Top Selling Products</span>
            </CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{product.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{product.sales} units</span>
                        <span className="font-semibold text-primary">${product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress 
                      value={(product.sales / mockAnalytics.topProducts[0].sales) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Weekly Sales Trend</span>
            </CardTitle>
            <CardDescription>Daily sales for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.salesTrend.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-background-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-smooth"
                        style={{ 
                          width: `${(day.sales / Math.max(...mockAnalytics.salesTrend.map(d => d.sales))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary min-w-[80px] text-right">
                    ${day.sales.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-background-secondary rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Weekly Performance</span>
                </div>
                <span className="text-sm font-semibold text-green-600">+15.3%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Compared to previous week
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex justify-center">
        <Button className="bg-gradient-primary text-primary-foreground" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};