import { ReactNode } from 'react';
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell,
  Legend,
  LineProps,
  XAxisProps,
  YAxisProps,
  CartesianGridProps,
  TooltipProps,
  BarProps,
  PieProps,
} from 'recharts';

interface ChartProps {
  children?: ReactNode;
  [key: string]: any;
}

export function LineChart({ children, ...props }: ChartProps) {
  return <RechartsLineChart {...props}>{children}</RechartsLineChart>;
}

export function Line({ 
  stroke = "hsl(var(--primary))", 
  strokeWidth = 2, 
  ...props 
}: Partial<LineProps>) {
  return <RechartsLine stroke={stroke} strokeWidth={strokeWidth} {...props} />;
}

export function XAxis({ 
  stroke = "currentColor",
  padding = { left: 0, right: 0 },
  ...props 
}: Partial<XAxisProps>) {
  return <RechartsXAxis stroke={stroke} padding={padding} {...props} />;
}

export function YAxis({ 
  stroke = "currentColor",
  padding = { top: 20, bottom: 20 },
  ...props 
}: Partial<YAxisProps>) {
  return <RechartsYAxis stroke={stroke} padding={padding} {...props} />;
}

export function Grid({ 
  strokeDasharray = "3 3",
  ...props 
}: Partial<CartesianGridProps>) {
  return <CartesianGrid strokeDasharray={strokeDasharray} {...props} />;
}

export function ChartTooltip(props: Partial<TooltipProps<any, any>>) {
  return <Tooltip {...props} />;
}

export function BarChart({ children, ...props }: ChartProps) {
  return <RechartsBarChart {...props}>{children}</RechartsBarChart>;
}

export function Bar({ 
  fill = "hsl(var(--primary))",
  radius = [4, 4, 0, 0],
  ...props 
}: Partial<BarProps>) {
  return <RechartsBar fill={fill} radius={radius} {...props} />;
}

export function PieChart({ children, ...props }: ChartProps) {
  return <RechartsPieChart {...props}>{children}</RechartsPieChart>;
}

export function Pie({ 
  fill = "hsl(var(--primary))",
  paddingAngle = 5,
  ...props 
}: Partial<PieProps>) {
  return <RechartsPie fill={fill} paddingAngle={paddingAngle} {...props} />;
}

export { Cell, Legend, ResponsiveContainer };