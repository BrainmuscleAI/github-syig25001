import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  TrendingUp,
  Target,
  Trophy,
  Activity,
  Zap,
  ChevronRight,
  Loader2,
  Video,
  Calendar,
  Users,
} from 'lucide-react';

interface AICoachProps {
  playerStats: any;
}

export function AICoach({ playerStats }: AICoachProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([
    {
      type: 'improvement',
      title: 'Área de Mejora Detectada',
      description: 'Tu porcentaje de victorias ha disminuido un 15% en partidos largos. Recomendamos enfocarte en ejercicios de resistencia.',
      action: 'Ver Plan de Entrenamiento',
      icon: Activity,
      color: 'text-yellow-500',
    },
    {
      type: 'strength',
      title: 'Punto Fuerte',
      description: 'Tu saque es tu mejor arma, con un 78% de efectividad. Mantén este nivel y considera variantes tácticas.',
      action: 'Analizar Estadísticas',
      icon: Zap,
      color: 'text-green-500',
    },
    {
      type: 'opportunity',
      title: 'Oportunidad de Torneo',
      description: 'Basado en tu nivel actual, tienes altas probabilidades de éxito en el Torneo Regional de Mayo.',
      action: 'Ver Detalles',
      icon: Trophy,
      color: 'text-blue-500',
    },
  ]);

  const [recommendations, setRecommendations] = useState([
    {
      title: 'Técnica de Volea',
      type: 'video',
      duration: '15 min',
      difficulty: 'Intermedio',
      coach: 'Carlos Ramírez',
      relevance: '95% match',
    },
    {
      title: 'Estrategia de Dobles',
      type: 'session',
      duration: '45 min',
      difficulty: 'Avanzado',
      coach: 'Ana González',
      relevance: '88% match',
    },
    {
      title: 'Preparación Física',
      type: 'program',
      duration: '4 semanas',
      difficulty: 'Personalizado',
      coach: 'Miguel Torres',
      relevance: '92% match',
    },
  ]);

  const generateNewInsights = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    // Update insights with new AI-generated content
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Coach Personal</h2>
          </div>
          <Button variant="outline" onClick={generateNewInsights} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Target className="h-4 w-4" />
            )}
            Actualizar Análisis
          </Button>
        </div>

        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-muted ${insight.color}`}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0">
                      {insight.action}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Recomendaciones Personalizadas</h3>
          <Badge variant="secondary">AI-Powered</Badge>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {rec.type === 'video' && <Video className="h-4 w-4" />}
                        {rec.type === 'session' && <Users className="h-4 w-4" />}
                        {rec.type === 'program' && <Calendar className="h-4 w-4" />}
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge variant="outline" className="ml-2">
                          {rec.relevance}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{rec.duration}</span>
                        <span>{rec.difficulty}</span>
                        <span>Coach: {rec.coach}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Predicciones y Objetivos</h3>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Próximo Ranking Estimado</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-500">#28</span>
                <span className="text-sm text-green-500">+5</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Probabilidad de Victoria</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">68%</span>
                <span className="text-sm text-green-500">+12%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Siguiente Objetivo</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">Top 25</span>
                <span className="text-sm text-muted-foreground">en 2 meses</span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}