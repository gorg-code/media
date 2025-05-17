
import React, { useState, useMemo } from 'react';
import { MovieItem } from '../types/media';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { MovieFilters } from './Filters';
import { StatsCounter, FormatStats } from './Statistics';
import { AddMovieItemDialog } from './AddItemModals';
import { Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getAllMovieFormats } from '../services/mediaService';

interface MoviesTabProps {
  movieItems: MovieItem[];
  onDeleteItem: (index: number) => void;
  onAddItem: (item: MovieItem) => void;
}

const MoviesTab: React.FC<MoviesTabProps> = ({ movieItems, onDeleteItem, onAddItem }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  
  // Připravíme seznamy pro filtrování
  const formats = useMemo(() => getAllMovieFormats(movieItems), [movieItems]);
  
  // Filtrovaná data
  const filteredItems = useMemo(() => {
    return movieItems.filter(item => {
      // Filtr podle vyhledávání
      const searchMatch = 
        searchTerm === '' || 
        item.JMÉNO.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.REŽIE.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtr podle formátu
      const formatMatch = selectedFormat === '' || item.FORMÁT === selectedFormat;
      
      return searchMatch && formatMatch;
    });
  }, [movieItems, searchTerm, selectedFormat]);

  const handleDelete = (index: number) => {
    onDeleteItem(index);
    toast({
      title: "Položka smazána",
      description: "Film byl úspěšně odstraněn"
    });
  };

  return (
    <div className="space-y-4">
      <MovieFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedFormat={selectedFormat}
        formats={formats}
        onFormatChange={setSelectedFormat}
      />

      <div className="flex justify-between mb-4">
        <StatsCounter 
          totalCount={movieItems.length} 
          filteredCount={filteredItems.length}
          title="Filmová sbírka" 
        />
        <AddMovieItemDialog onAddItem={onAddItem} formats={formats} />
      </div>

      <div className="rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]">Název</TableHead>
              <TableHead className="w-[250px]">Režie</TableHead>
              <TableHead>Formát</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.JMÉNO}</TableCell>
                <TableCell>{item.REŽIE}</TableCell>
                <TableCell>{item.FORMÁT}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Nenalezeny žádné položky odpovídající filtrům
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <FormatStats items={filteredItems} />
      </div>
    </div>
  );
};

export default MoviesTab;
