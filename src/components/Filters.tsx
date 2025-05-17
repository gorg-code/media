
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface MusicFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFormat: string;
  formats: string[];
  onFormatChange: (value: string) => void;
  selectedYear: string;
  years: number[];
  onYearChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
}

export const MusicFilters: React.FC<MusicFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedFormat,
  formats,
  onFormatChange,
  selectedYear,
  years,
  onYearChange,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border">
      <h2 className="text-lg font-semibold mb-3">Filtry</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="search">Vyhledávání</Label>
          <Input
            id="search"
            placeholder="Hledat..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="format">Formát</Label>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Všechny formáty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Všechny formáty</SelectItem>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="year">Rok</Label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Všechny roky" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Všechny roky</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Typ</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Vše" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Vše</SelectItem>
              <SelectItem value="album">Pouze alba</SelectItem>
              <SelectItem value="track">Pouze tracky</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

interface MovieFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFormat: string;
  formats: string[];
  onFormatChange: (value: string) => void;
}

export const MovieFilters: React.FC<MovieFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedFormat,
  formats,
  onFormatChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border">
      <h2 className="text-lg font-semibold mb-3">Filtry</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search">Vyhledávání</Label>
          <Input
            id="search"
            placeholder="Hledat..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="format">Formát</Label>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Všechny formáty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Všechny formáty</SelectItem>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
