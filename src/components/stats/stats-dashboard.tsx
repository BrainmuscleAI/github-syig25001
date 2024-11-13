import { motion } from 'framer-motion';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatchHistory } from './match-history';
import { PerformanceMetrics } from './performance-metrics';
import { HeadToHead } from './head-to-head';
import { ProgressTracking } from './progress-tracking';
import { Trophy, TrendingUp, Users, Activity } from 'lucide-react';

interface StatsDashboardProps {
  onStatClick: (category: string) => void;
  onMatchClick: (match: any) => void;
}

const stats = [
  { label: 'Ranking', value: '#42', icon: Trophy, category: 'ranking' },
  { label: 'Puntos', value: '1250', icon: TrendingUp, category: 'points' },
  { label: 'Partidos', value: '28', icon: Activity, category: 'matches' },
  { label: 'Victorias', value: '18', icon: Users, category: 'victories' },
];

export function StatsDashboard({ onStatClick, onMatchClick }: StatsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.label}
            title={stat.label}
            icon={<stat.icon className="h-8 w-8 text-primary" />}
            modalContent={
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <stat.icon className="h-12 w-12 text-primary" />
                  <div>
                    <h2 className="text-3xl font-bold">{stat.value}</h2>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <PerformanceMetrics />
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="headtohead">Head to Head</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <MatchHistory onMatchClick={onMatchClick} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="headtohead">
          <HeadToHead />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
}