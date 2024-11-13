import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Brain } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { CampaignList } from './campaign-list';
import { AdSpotList } from './ad-spot-list';
import { AnalyticsCharts } from './analytics-charts';
import { AIContentGenerator } from './ai-content-generator';
import { AIImageEditor } from './ai-image-editor';
import { AIAnalytics } from './ai-analytics';
import type { Campaign, AdSpot } from './types';

// ... (previous imports and initial data remain the same)

export function SponsorDashboard() {
  // ... (previous state and handlers remain the same)

  const [showAITools, setShowAITools] = useState(false);

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
          <Button onClick={() => setShowNewCampaign(true)}>
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
          <AdSpotList adSpots={adSpots} onPlaceBid={handlePlaceBid} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsCharts
            impressionsData={impressionsData}
            clicksData={clicksData}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        </TabsContent>

        <TabsContent value="ai-tools">
          <div className="grid gap-6 md:grid-cols-2">
            <AIContentGenerator
              onGenerate={(content) => {
                // Handle generated content
                toast({
                  title: 'Contenido Generado',
                  description: 'El contenido ha sido generado exitosamente.',
                });
              }}
            />
            <AIImageEditor
              onSave={(imageUrl) => {
                // Handle saved image
                toast({
                  title: 'Imagen Guardada',
                  description: 'La imagen ha sido procesada y guardada.',
                });
              }}
            />
            <div className="md:col-span-2">
              <AIAnalytics campaignId="current" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ... (existing dialogs remain the same) ... */}
    </div>
  );
}