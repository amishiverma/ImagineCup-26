import { motion } from 'framer-motion';
import {
  Package,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Filter
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ReturnTrendChart } from '@/components/dashboard/ReturnTrendChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { TopRootCauses } from '@/components/dashboard/TopRootCauses';
import { mockDashboardStats, mockCategories, mockRegions } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useAnalysis } from '@/context/AnalysisContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DashboardPage() {
  const { filters, setFilters, isDataLoaded } = useApp();
  const { analysis } = useAnalysis();

  const stats = analysis
    ? {
      totalReturns: analysis.total_returns ?? mockDashboardStats.totalReturns,
      returnRate: analysis.return_rate ?? mockDashboardStats.returnRate,
      returnRateTrend: analysis.return_rate_trend ?? mockDashboardStats.returnRateTrend,
      fixesApplied: analysis.fixes_applied ?? mockDashboardStats.fixesApplied,
      returnsAvoided: analysis.returns_avoided ?? mockDashboardStats.returnsAvoided,
    }
    : mockDashboardStats;

  if (!isDataLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-purple/10 flex items-center justify-center">
            <Package className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No Data Yet</h2>
          <p className="text-muted-foreground mb-6">
            Upload your return data to unlock AI-powered insights and root cause analysis.
          </p>
          <a
            href="/upload"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Upload Data
          </a>
        </motion.div>
      </div>
    );
  }

  const categoryOptions = analysis?.categories
    ? Object.keys(analysis.categories)
    : mockCategories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            Intelligence Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            AI-powered return insights • Last updated just now
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select
            value={filters.category}
            onValueChange={(v) => setFilters({ category: v })}
          >
            <SelectTrigger className="w-[140px] bg-secondary/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.region}
            onValueChange={(v) => setFilters({ region: v })}
          >
            <SelectTrigger className="w-[150px] bg-secondary/50">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {mockRegions.map(reg => (
                <SelectItem key={reg} value={reg}>{reg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Returns"
          value={stats.totalReturns}
          icon={Package}
          accentColor="cyan"
          delay={0}
        />
        <StatCard
          title="Return Rate"
          value={stats.returnRate}
          suffix="%"
          trend={stats.returnRateTrend}
          trendLabel="vs last month"
          icon={TrendingDown}
          accentColor="green"
          delay={100}
        />
        <StatCard
          title="Fixes Applied"
          value={stats.fixesApplied}
          icon={CheckCircle}
          accentColor="purple"
          delay={200}
        />
        <StatCard
          title="Returns Avoided"
          value={stats.returnsAvoided}
          icon={AlertTriangle}
          trendLabel="After AI recommendations"
          accentColor="warning"
          delay={300}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReturnTrendChart />
        <CategoryChart />
      </div>

      {/* Root Causes */}
      <TopRootCauses />
    </div>
  );
}
