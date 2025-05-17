
import React from 'react';
import { MusicItem, MovieItem } from '../types/media';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface StatsProps {
  totalCount: number;
  filteredCount: number;
  title: string;
}

export const StatsCounter: React.FC<StatsProps> = ({ totalCount, filteredCount, title }) => {
  return (
    <Card className="p-4 mb-4 text-center">
      <h3 className="font-medium mb-2">{title}</h3>
      <p>
        Zobrazeno {filteredCount} z {totalCount} položek
      </p>
    </Card>
  );
};

interface FormatStatsProps {
  items: (MusicItem | MovieItem)[];
  formatKey?: string;
}

export const FormatStats: React.FC<FormatStatsProps> = ({ items, formatKey = "FORMÁT" }) => {
  // Výpočet četnosti formátů
  const formatCounts: Record<string, number> = {};
  items.forEach(item => {
    const format = item[formatKey as keyof typeof item] as string;
    formatCounts[format] = (formatCounts[format] || 0) + 1;
  });

  const data = Object.entries(formatCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Card className="p-4 mb-4">
      <h3 className="font-medium mb-2 text-center">Statistika podle formátu</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} položek`, 'Počet']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface YearStatsProps {
  items: MusicItem[];
}

export const YearStats: React.FC<YearStatsProps> = ({ items }) => {
  // Výpočet četnosti podle roků
  const yearCounts: Record<number, number> = {};
  items.forEach(item => {
    yearCounts[item.ROK] = (yearCounts[item.ROK] || 0) + 1;
  });

  const data = Object.entries(yearCounts)
    .map(([year, count]) => ({
      year,
      count,
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // Pokud je příliš mnoho let, seskupíme je po dekádách
  let chartData = data;
  if (data.length > 15) {
    const decadeCounts: Record<string, number> = {};
    data.forEach(item => {
      const decade = `${Math.floor(Number(item.year) / 10) * 10}s`;
      decadeCounts[decade] = (decadeCounts[decade] || 0) + item.count;
    });
    
    chartData = Object.entries(decadeCounts)
      .map(([decade, count]) => ({
        year: decade,
        count,
      }))
      .sort((a, b) => {
        const aNum = Number(a.year.replace('s', ''));
        const bNum = Number(b.year.replace('s', ''));
        return aNum - bNum;
      });
  }

  return (
    <Card className="p-4 mb-4">
      <h3 className="font-medium mb-2 text-center">Statistika podle roku</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} položek`, 'Počet']} />
            <Legend />
            <Bar dataKey="count" name="Počet" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
