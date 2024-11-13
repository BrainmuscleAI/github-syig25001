import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Wand2,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Download,
  RotateCw,
  Maximize2,
  SunMedium,
  Contrast,
  Droplet,
} from 'lucide-react';

interface AIImageEditorProps {
  imageUrl?: string;
  onSave: (editedImage: string) => void;
}

export function AIImageEditor({ imageUrl, onSave }: AIImageEditorProps) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [adjustments, setAdjustments] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50,
  });

  const mockProcessImage = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onSave(imageUrl || '');
  };

  const handleAdjustment = (type: keyof typeof adjustments, value: number) => {
    setAdjustments(prev => ({ ...prev, [type]: value }));
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Editor de Imágenes AI</h2>
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{
                filter: `
                  brightness(${adjustments.brightness}%)
                  contrast(${adjustments.contrast}%)
                  saturate(${adjustments.saturation}%)
                `
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Mejoras AI</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ej: Mejorar iluminación y añadir efecto deportivo dinámico..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={mockProcessImage} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <SunMedium className="h-4 w-4" />
                Brillo
              </Label>
              <Slider
                value={[adjustments.brightness]}
                min={0}
                max={200}
                step={1}
                onValueChange={([value]) => handleAdjustment('brightness', value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                Contraste
              </Label>
              <Slider
                value={[adjustments.contrast]}
                min={0}
                max={200}
                step={1}
                onValueChange={([value]) => handleAdjustment('contrast', value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                Saturación
              </Label>
              <Slider
                value={[adjustments.saturation]}
                min={0}
                max={200}
                step={1}
                onValueChange={([value]) => handleAdjustment('saturation', value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <RotateCw className="h-4 w-4 mr-2" />
              Deshacer
            </Button>
            <Button variant="outline" className="w-full">
              <Maximize2 className="h-4 w-4 mr-2" />
              Ajustar
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {['Natural', 'Vibrante', 'Deportivo', 'Profesional'].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}