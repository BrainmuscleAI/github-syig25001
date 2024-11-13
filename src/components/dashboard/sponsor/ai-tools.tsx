import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIContentGenerator } from './ai-content-generator';
import { AIImageEditor } from './ai-image-editor';
import { AIAnalytics } from './ai-analytics';
import { useToast } from '@/hooks/use-toast';

export function AITools() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AIContentGenerator
          onGenerate={(content) => {
            toast({
              title: 'Contenido Generado',
              description: 'El contenido ha sido generado exitosamente.',
            });
          }}
        />
        <AIImageEditor
          onSave={(imageUrl) => {
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
    </div>
  );
}