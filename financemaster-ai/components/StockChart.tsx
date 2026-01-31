import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockHistoryPoint } from '../types';

interface StockChartProps {
  data: StockHistoryPoint[];
  color?: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, color = "#10b981" }) => {
  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="time" 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false}
            tickLine={false}
            minTickGap={30}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
