import { DashboardCard } from '@/components/ui/dashboard-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Timer, Gavel, ArrowUp, ArrowDown, Users, TrendingUp } from 'lucide-react';
import type { AdSpot } from './types';

interface AdSpotListProps {
  adSpots: AdSpot[];
  onPlaceBid: (spot: AdSpot) => void;
}

export function AdSpotList({ adSpots, onPlaceBid }: AdSpotListProps) {
  return (
    <div className="grid gap-4">
      {adSpots.map((spot) => (
        <DashboardCard
          key={spot.id}
          title={spot.spot}
          modalContent={
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Detalles del Espacio</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Oferta Actual:</span>
                        <span className="font-medium">${spot.currentBid} MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tiempo Restante:</span>
                        <span className="font-medium">{spot.timeLeft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ofertas:</span>
                        <span className="font-medium">{spot.bids}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Incremento Mínimo:</span>
                        <span className="font-medium">${spot.minIncrement} MXN</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Estadísticas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">12.5K</p>
                      <p className="text-sm text-muted-foreground">Alcance Estimado</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <TrendingUp className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">4.8%</p>
                      <p className="text-sm text-muted-foreground">CTR Promedio</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => onPlaceBid(spot)}>
                  Ofertar Ahora
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={spot.trending === 'up' ? 'success' : 'destructive'}>
                  {spot.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {spot.currentBid} MXN
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {spot.timeLeft}
                </span>
                <span className="flex items-center gap-1">
                  <Gavel className="h-4 w-4" />
                  {spot.bids} ofertas
                </span>
              </div>
            </div>
            <Button onClick={(e) => {
              e.stopPropagation();
              onPlaceBid(spot);
            }}>
              Ofertar
            </Button>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
}