import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date: string;
  inquiries: number;
  traffic: number;
}

const data: DataPoint[] = [
  { date: 'Mon', inquiries: 12, traffic: 400 },
  { date: 'Tue', inquiries: 19, traffic: 300 },
  { date: 'Wed', inquiries: 3, traffic: 600 },
  { date: 'Thu', inquiries: 5, traffic: 200 },
  { date: 'Fri', inquiries: 2, traffic: 500 },
  { date: 'Sat', inquiries: 3, traffic: 250 },
  { date: 'Sun', inquiries: 10, traffic: 350 },
];

export const DashboardChart: React.FC = () => {
  return (
    <div className="bg-[#0e0f14] p-6 rounded-xl border border-gray-800">
      <h3 className="text-gray-200 font-semibold mb-4">Traffic & Inquiry Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#d1d5db' }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="inquiries"
              stackId="2"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
