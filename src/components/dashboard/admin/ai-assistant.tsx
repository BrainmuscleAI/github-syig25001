import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  X,
  Send,
  Loader2,
  Minimize2,
  Maximize2,
  CheckCircle2,
  Shield,
  Users,
  Trophy,
  BarChart2,
  AlertTriangle,
  Settings,
  Calendar,
  MessageSquare,
  Flag,
  Ban,
  UserCheck,
  FileText,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: {
    type: string;
    status: 'pending' | 'completed' | 'failed';
  };
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "¿En qué puedo ayudarte?\n\n• Gestión de usuarios\n• Moderación de contenido\n• Análisis de métricas\n• Gestión de torneos\n• Reportes y estadísticas",
  timestamp: new Date().toLocaleTimeString(),
};

const availableActions = [
  {
    category: "Moderación",
    actions: [
      { type: 'moderate_content', label: 'Moderar Contenido', icon: Shield },
      { type: 'review_reports', label: 'Revisar Reportes', icon: Flag },
      { type: 'ban_user', label: 'Sancionar Usuario', icon: Ban },
    ]
  },
  {
    category: "Análisis",
    actions: [
      { type: 'analyze_metrics', label: 'Analizar Métricas', icon: BarChart2 },
      { type: 'generate_report', label: 'Generar Reporte', icon: FileText },
      { type: 'user_activity', label: 'Actividad Usuarios', icon: Users },
    ]
  },
  {
    category: "Torneos",
    actions: [
      { type: 'approve_tournament', label: 'Aprobar Torneo', icon: Trophy },
      { type: 'schedule_event', label: 'Programar Evento', icon: Calendar },
      { type: 'verify_results', label: 'Verificar Resultados', icon: CheckCircle2 },
    ]
  },
  {
    category: "Usuarios",
    actions: [
      { type: 'verify_user', label: 'Verificar Usuario', icon: UserCheck },
      { type: 'review_appeals', label: 'Revisar Apelaciones', icon: MessageSquare },
      { type: 'system_alerts', label: 'Alertas Sistema', icon: AlertTriangle },
    ]
  },
];

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Moderación");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "Entiendo tu consulta. ¿Te gustaría que realice alguna acción específica?",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleAction = async (action: { type: string; label: string }) => {
    if (isProcessing) return;

    const actionMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Ejecutando acción: ${action.label}...`,
      timestamp: new Date().toLocaleTimeString(),
      action: {
        type: action.type,
        status: 'pending',
      },
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const responses: Record<string, string> = {
      moderate_content: "Se han revisado 15 elementos reportados. 3 requieren atención inmediata.",
      review_reports: "Hay 5 nuevos reportes pendientes de revisión.",
      ban_user: "Se ha aplicado la sanción temporal al usuario especificado.",
      analyze_metrics: "Análisis completado. Se detectó un aumento del 25% en la actividad.",
      generate_report: "Reporte generado y enviado a tu correo.",
      user_activity: "Actividad de usuarios analizada. Picos detectados en horario nocturno.",
      approve_tournament: "Torneo verificado y aprobado para publicación.",
      schedule_event: "Evento programado y notificaciones enviadas.",
      verify_results: "Resultados verificados y ranking actualizado.",
      verify_user: "Usuario verificado exitosamente.",
      review_appeals: "2 apelaciones revisadas y procesadas.",
      system_alerts: "Sistema funcionando correctamente. No hay alertas críticas.",
    };

    setMessages(prev => 
      prev.map(msg => 
        msg.id === actionMessage.id 
          ? {
              ...msg,
              content: responses[action.type] || `Acción completada: ${action.label}`,
              action: { ...msg.action!, status: 'completed' },
            }
          : msg
      )
    );
    setIsProcessing(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm z-50">
      <Card className="border-none rounded-none shadow-lg">
        <div className="container mx-auto">
          <div className={`flex flex-col transition-all duration-300 ${
            isExpanded ? 'h-[500px]' : 'h-[140px]'
          }`}>
            <div className="flex items-center justify-end p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMessages([INITIAL_MESSAGE])}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-4 flex-1">
              <ScrollArea className={`flex-1 px-4 ${isExpanded ? 'block' : 'hidden'}`} ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] space-y-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.action && (
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              message.action.status === 'completed' ? 'success' :
                              message.action.status === 'failed' ? 'destructive' :
                              'secondary'
                            }>
                              {message.action.status === 'completed' && (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              )}
                              {message.action.type}
                            </Badge>
                          </div>
                        )}
                        <div className="text-xs opacity-70">{message.timestamp}</div>
                      </div>
                    </motion.div>
                  ))}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <div className="w-[300px] border-l">
                <div className="p-4 border-b">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availableActions.map((category) => (
                      <Button
                        key={category.category}
                        variant={selectedCategory === category.category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.category)}
                      >
                        {category.category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <ScrollArea className="p-4 h-[calc(100%-130px)]">
                  <div className="grid grid-cols-1 gap-2">
                    {availableActions
                      .find(cat => cat.category === selectedCategory)
                      ?.actions.map((action) => (
                        <Button
                          key={action.type}
                          variant="outline"
                          className="justify-start"
                          onClick={() => handleAction(action)}
                          disabled={isProcessing}
                        >
                          <action.icon className="h-4 w-4 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <div className="p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isProcessing}
                />
                <Button type="submit" size="icon" disabled={isProcessing}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}