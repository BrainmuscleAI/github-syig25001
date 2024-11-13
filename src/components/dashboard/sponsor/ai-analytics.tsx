import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Brain,
  TrendingUp,
  Users,
  Target,
  Clock,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#00A859', '#003366', '#FFB800', '#FF4444'];

const performanceData = [
  { date: '01/04', engagement: 1200, reach: 2400 },
  { date: '02/04', engagement: 1800, reach: 3200 },
  { date: '03/04', engagement: 1600, reach: 2800 },
  { date: '04/04', engagement: 2200, reach: 4000 },
  { date: '05/04', engagement: 2400, reach: 4400 },
  { date: '06/04', engagement: 2100, reach: 3800 },
  { date: '07/04', engagement: 2800, reach: 5000 },
];

const audienceData = [
  { name: 'Principiante', value: 30 },
  { name: 'Intermedio', value: 45 },
  { name: 'Avanzado', value: 20 },
  { name: 'Profesional', value: 5 },
];

interface AIAnalyticsProps {
  campaignId?: string;
}

export function AIAnalytics({ campaignId }: AIAnalyticsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Análisis AI</h2>
          </div>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Últimos 7 días
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-medium mb-4">Rendimiento de Campaña</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#00A859"
                    strokeWidth={2}
                    dot={{ fill: '#00A859', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reach"
                    stroke="#003366"
                    strokeWidth={2}
                    dot={{ fill: '#003366', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">Distribución de Audiencia</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recomendaciones AI</h3>
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Generar Más
            </Button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Optimización de Contenido</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Incluir más contenido técnico aumentaría el engagement un 35%
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  La audiencia responde mejor a videos de 60-90 segundos
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  Enfocarse en técnicas avanzadas para el segmento 30-40 años
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}