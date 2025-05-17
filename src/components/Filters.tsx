
import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Interface pro MusicFilters
interface MusicFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFormat: string;
  formats: string[];
  onFormatChange: (value: string) => void;
  selectedYear: string;
  years: string[];
  onYearChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
}

// Interface pro MovieFilters
interface MovieFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFormat: string;
  formats: string[];
  onFormatChange: (value: string) => void;
}

// Komponenta pro filtry hudby
export const MusicFilters: React.FC<MusicFiltersProps> = ({
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
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Filtry</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Hledat..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger>
              <SelectValue placeholder="Formát" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny formáty</SelectItem>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Rok vydání" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny roky</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <RadioGroup
            value={selectedType}
            onValueChange={onTypeChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Vše</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="album" id="album" />
              <Label htmlFor="album">Alba</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="track" id="track" />
              <Label htmlFor="track">Skladby</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

// Komponenta pro filtry filmů
export const MovieFilters: React.FC<MovieFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedFormat,
  formats,
  onFormatChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Filtry</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Hledat..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger>
              <SelectValue placeholder="Formát" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny formáty</SelectItem>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
