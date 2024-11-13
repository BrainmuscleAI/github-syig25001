import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  Maximize2,
  Minimize2,
  Wand2,
  Brain,
  Target,
  TrendingUp,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "¡Hola! ¿En qué puedo ayudarte?\n\n• Información sobre torneos\n• Consejos técnicos\n• Reglas del juego\n• Reserva de canchas\n• Rankings y estadísticas",
  timestamp: new Date().toLocaleTimeString(),
};

const AI_TOOLS: AITool[] = [
  {
    id: 'generate-content',
    name: 'Generar Contenido',
    description: 'Crea publicaciones y anuncios optimizados',
    icon: Wand2,
    action: () => {},
  },
  {
    id: 'analyze-metrics',
    name: 'Analizar Métricas',
    description: 'Obtén insights de tu rendimiento',
    icon: TrendingUp,
    action: () => {},
  },
  {
    id: 'optimize-targeting',
    name: 'Optimizar Segmentación',
    description: 'Mejora tu alcance y conversión',
    icon: Target,
    action: () => {},
  },
  {
    id: 'image-editor',
    name: 'Editor de Imágenes',
    description: 'Mejora tus imágenes con AI',
    icon: ImageIcon,
    action: () => {},
  },
  {
    id: 'content-ideas',
    name: 'Ideas de Contenido',
    description: 'Sugerencias personalizadas',
    icon: Brain,
    action: () => {},
  },
];

const generateResponse = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const keywords = {
    torneo: "Los próximos torneos están programados para abril. ¿Te gustaría ver el calendario completo?",
    ranking: "Actualmente tenemos más de 1,000 jugadores en nuestro sistema de ranking. ¿Quieres consultar tu posición?",
    cancha: "Contamos con 12 canchas disponibles para reserva. ¿Te gustaría ver la disponibilidad?",
    regla: "Las reglas oficiales del padel están disponibles en nuestra sección de recursos. ¿Necesitas alguna aclaración específica?",
    precio: "Ofrecemos diferentes planes de membresía, incluyendo nuestra exclusiva Membresía Platino. ¿Te gustaría conocer más detalles?",
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(keywords)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return "Entiendo tu consulta. ¿Te gustaría que te proporcione más información sobre algún aspecto específico del padel?";
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <Card className={`mx-auto max-w-[90vw] flex flex-col shadow-xl transition-all duration-300 ${
            isExpanded ? 'h-[500px]' : 'h-[140px]'
          }`}>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold">Asistente AI</span>
              </div>
              <div className="flex items-center gap-2">
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
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className={`flex flex-1 ${isExpanded ? '' : 'hidden'}`}>
              {/* AI Tools Panel */}
              <div className="w-[300px] border-r p-4">
                <h3 className="font-semibold mb-4">Herramientas AI</h3>
                <div className="grid gap-3">
                  {AI_TOOLS.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool?.id === tool.id ? 'default' : 'outline'}
                      className="justify-start h-auto py-3"
                      onClick={() => setSelectedTool(tool)}
                    >
                      <div className="flex items-start gap-3">
                        <tool.icon className="h-5 w-5 mt-0.5" />
                        <div className="text-left">
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Panel */}
              <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
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
                          className={`rounded-lg px-4 py-2 max-w-[80%] space-y-1 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70">{message.timestamp}</div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
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

                <form onSubmit={handleSubmit} className="p-2 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            size="icon"
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-full shadow-lg"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}