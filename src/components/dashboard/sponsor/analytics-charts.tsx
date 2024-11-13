import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#00A859', '#0066CC', '#FFB800', '#FF4444'];

interface AnalyticsChartsProps {
  impressionsData: Array<{ date: string; value: number }>;
  clicksData: Array<{ category: string; value: number }>;
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export function AnalyticsCharts({
  impressionsData,
  clicksData,
  selectedTimeframe,
  onTimeframeChange,
}: AnalyticsChartsProps) {
  const demoImpressions = [
    { date: '01/04', value: 1200 },
    { date: '02/04', value: 1800 },
    { date: '03/04', value: 1600 },
    { date: '04/04', value: 2200 },
    { date: '05/04', value: 2400 },
    { date: '06/04', value: 2100 },
    { date: '07/04', value: 2800 },
  ];

  const demoClicks = [
    { category: 'Feed Ads', value: 450 },
    { category: 'Live Stream', value: 300 },
    { category: 'Banner Ads', value: 200 },
    { category: 'Tournament Ads', value: 350 },
  ];

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Impresiones</h3>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTimeframeChange(timeframe)}
              >
                {timeframe === 'week' ? 'Semana' : timeframe === 'month' ? 'Mes' : 'Año'}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impressionsData.length ? impressionsData : demoImpressions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Distribución de Clics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clicksData.length ? clicksData : demoClicks}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(clicksData.length ? clicksData : demoClicks).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Rendimiento por Tipo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksData.length ? clicksData : demoClicks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}