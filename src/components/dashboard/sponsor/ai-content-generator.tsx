import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Wand2,
  Target,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  Image as ImageIcon,
  Video,
  FileText,
  BarChart,
  Loader2,
  Check,
} from 'lucide-react';

interface AIContentGeneratorProps {
  onGenerate: (content: any) => void;
}

export function AIContentGenerator({ onGenerate }: AIContentGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [objective, setObjective] = useState('engagement');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const objectives = [
    { value: 'engagement', label: 'Engagement', icon: Users },
    { value: 'awareness', label: 'Brand Awareness', icon: Target },
    { value: 'conversion', label: 'Conversiones', icon: TrendingUp },
  ];

  const mockGenerateContent = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockSuggestions = [
      {
        type: 'image',
        title: 'Campaña Dinámica de Padel',
        description: '¡Eleva tu juego al siguiente nivel! 🎾 Descubre nuestra nueva colección de equipamiento profesional diseñada para campeones.',
        hashtags: ['#PadelPro', '#DeporteElite', '#Innovación'],
        metrics: {
          engagement: '85%',
          reach: '50k+',
          conversion: '3.2%'
        },
        timing: 'Mejor hora para publicar: 18:00 - Jueves',
        visualStyle: 'Fotografía de acción con iluminación dinámica',
      },
      {
        type: 'video',
        title: 'Tutorial Técnicas Avanzadas',
        description: 'Masterclass exclusiva: Aprende los secretos del padel profesional con nuestro equipo de expertos. ¡Regístrate ahora!',
        hashtags: ['#PadelMaster', '#Entrenamiento', '#MejoraTuJuego'],
        metrics: {
          engagement: '92%',
          reach: '75k+',
          conversion: '4.5%'
        },
        timing: 'Mejor hora para publicar: 10:00 - Sábado',
        visualStyle: 'Video tutorial con gráficos superpuestos',
      },
      {
        type: 'carousel',
        title: 'Guía de Equipamiento Pro',
        description: 'Desde principiante hasta profesional: Encuentra el equipo perfecto para cada nivel. Asesoramiento personalizado en nuestras tiendas.',
        hashtags: ['#EquipoPadel', '#CalidadPro', '#Tecnología'],
        metrics: {
          engagement: '78%',
          reach: '45k+',
          conversion: '5.1%'
        },
        timing: 'Mejor hora para publicar: 12:00 - Domingo',
        visualStyle: 'Carrusel de productos con diseño minimalista',
      }
    ];

    setSuggestions(mockSuggestions);
    setLoading(false);
  };

  const handleGenerate = () => {
    if (!prompt.trim() || !targetAudience.trim()) return;
    mockGenerateContent();
  };

  const handleSelect = (index: number) => {
    setSelectedSuggestion(index);
    onGenerate(suggestions[index]);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Generador de Contenido AI</h2>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>¿Qué quieres promocionar?</Label>
            <Textarea
              placeholder="Ej: Nueva colección de palas profesionales con tecnología de fibra de carbono..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-24"
            />
          </div>

          <div className="space-y-2">
            <Label>Público Objetivo</Label>
            <Input
              placeholder="Ej: Jugadores avanzados de padel, 25-45 años..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Objetivo Principal</Label>
            <div className="flex gap-2">
              {objectives.map((obj) => (
                <Button
                  key={obj.value}
                  variant={objective === obj.value ? 'default' : 'outline'}
                  onClick={() => setObjective(obj.value)}
                  className="flex-1"
                >
                  <obj.icon className="h-4 w-4 mr-2" />
                  {obj.label}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || !targetAudience.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generar Sugerencias
              </>
            )}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Sugerencias de Contenido</h3>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedSuggestion === index ? 'border-primary' : ''
                      }`}
                      onClick={() => handleSelect(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {suggestion.type === 'image' && <ImageIcon className="h-4 w-4" />}
                            {suggestion.type === 'video' && <Video className="h-4 w-4" />}
                            {suggestion.type === 'carousel' && <FileText className="h-4 w-4" />}
                            <h4 className="font-medium">{suggestion.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.hashtags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        {selectedSuggestion === index && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>Engagement</span>
                          </div>
                          <p className="font-medium">{suggestion.metrics.engagement}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BarChart className="h-4 w-4" />
                            <span>Alcance</span>
                          </div>
                          <p className="font-medium">{suggestion.metrics.reach}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Timing</span>
                          </div>
                          <p className="font-medium text-xs">{suggestion.timing}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  );
}