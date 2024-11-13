import { motion } from 'framer-motion';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Eye, Target, Trash2, BarChart } from 'lucide-react';
import type { Campaign } from './types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignListProps {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
}

export function CampaignList({ campaigns, onDelete }: CampaignListProps) {
  const mockData = [
    { date: '01/04', value: 1200 },
    { date: '02/04', value: 1800 },
    { date: '03/04', value: 1600 },
    { date: '04/04', value: 2200 },
    { date: '05/04', value: 2400 },
  ];

  return (
    <div className="grid gap-4">
      {campaigns.map((campaign) => (
        <DashboardCard
          key={campaign.id}
          title={campaign.title}
          modalContent={
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Detalles de Campaña</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="font-medium">{campaign.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Presupuesto:</span>
                        <span className="font-medium">${campaign.budget} MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impresiones:</span>
                        <span className="font-medium">{campaign.impressions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clics:</span>
                        <span className="font-medium">{campaign.clicks}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Rendimiento</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={campaign.status === 'active' ? 'success' : 'secondary'}>
                  {campaign.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {campaign.startDate} - {campaign.endDate}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {campaign.budget} MXN
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{campaign.impressions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{campaign.clicks}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(campaign.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
}