import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Brain } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { CampaignList } from './sponsor/campaign-list';
import { AdSpotList } from './sponsor/ad-spot-list';
import { AnalyticsCharts } from './sponsor/analytics-charts';
import { AITools } from './sponsor/ai-tools';
import type { Campaign, AdSpot } from './sponsor/types';
import { useToast } from '@/hooks/use-toast';

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Torneo de Verano',
    type: 'banner',
    status: 'active',
    startDate: '2024-04-15',
    endDate: '2024-05-15',
    budget: 5000,
    impressions: 12500,
    clicks: 450,
  },
  {
    id: '2',
    title: 'Promoción Equipamiento',
    type: 'video',
    status: 'scheduled',
    startDate: '2024-05-01',
    endDate: '2024-05-30',
    budget: 8000,
    impressions: 0,
    clicks: 0,
  },
];

const initialAdSpots: AdSpot[] = [
  {
    id: '1',
    spot: 'Tournament Live Stream',
    currentBid: 2500,
    bidder: 'Sports Co.',
    timeLeft: '2h 15m',
    bids: 8,
    trending: 'up',
    minIncrement: 100,
  },
  {
    id: '2',
    spot: 'Homepage Banner',
    currentBid: 1800,
    bidder: 'Equipment Pro',
    timeLeft: '45m',
    bids: 12,
    trending: 'down',
    minIncrement: 50,
  },
];

export function SponsorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAITools, setShowAITools] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [adSpots] = useState<AdSpot[]>(initialAdSpots);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({
      title: 'Campaña Eliminada',
      description: 'La campaña ha sido eliminada exitosamente.',
    });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Panel de Patrocinador</h1>
          <p className="text-muted-foreground">{user?.companyName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAITools(!showAITools)}>
            <Brain className="h-4 w-4 mr-2" />
            AI Tools
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      <Tabs defaultValue={showAITools ? 'ai-tools' : 'campaigns'}>
        <TabsList>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="spots">Espacios Publicitarios</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="ai-tools">Herramientas AI</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <CampaignList campaigns={campaigns} onDelete={handleDeleteCampaign} />
        </TabsContent>

        <TabsContent value="spots">
          <AdSpotList adSpots={adSpots} onPlaceBid={() => {}} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsCharts
            impressionsData={[]}
            clicksData={[]}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        </TabsContent>

        <TabsContent value="ai-tools">
          <AITools />
        </TabsContent>
      </Tabs>
    </div>
  );
}