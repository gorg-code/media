
import React, { useState, useMemo } from 'react';
import { MusicItem } from '../types/media';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { MusicFilters } from './Filters';
import { StatsCounter, FormatStats, YearStats } from './Statistics';
import { AddMusicItemDialog } from './AddItemModals';
import { Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getAllMusicFormats, getAllMusicYears } from '../services/mediaService';

interface MusicTabProps {
  musicItems: MusicItem[];
  onDeleteItem: (index: number) => void;
  onAddItem: (item: MusicItem) => void;
}

const MusicTab: React.FC<MusicTabProps> = ({ musicItems, onDeleteItem, onAddItem }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Připravíme seznamy pro filtrování
  const formats = useMemo(() => getAllMusicFormats(musicItems), [musicItems]);
  const years = useMemo(() => getAllMusicYears(musicItems), [musicItems]);
  
  // Filtrovaná data
  const filteredItems = useMemo(() => {
    return musicItems.filter(item => {
      // Filtr podle vyhledávání
      const searchMatch = 
        searchTerm === '' || 
        item.SKUPINA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ALBUM && item.ALBUM.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.TRACK && item.TRACK.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtr podle formátu
      const formatMatch = selectedFormat === '' || item.FORMÁT === selectedFormat;
      
      // Filtr podle roku
      const yearMatch = selectedYear === '' || item.ROK.toString() === selectedYear;
      
      // Filtr podle typu (album/track)
      let typeMatch = true;
      if (selectedType === 'album') {
        typeMatch = item.ALBUM !== null && item.TRACK === null;
      } else if (selectedType === 'track') {
        typeMatch = item.TRACK !== null && item.ALBUM === null;
      }
      
      return searchMatch && formatMatch && yearMatch && typeMatch;
    });
  }, [musicItems, searchTerm, selectedFormat, selectedYear, selectedType]);

  const handleDelete = (index: number) => {
    onDeleteItem(index);
    toast({
      title: "Položka smazána",
      description: "Hudební položka byla úspěšně odstraněna"
    });
  };

  return (
    <div className="space-y-4">
      <MusicFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedFormat={selectedFormat}
        formats={formats}
        onFormatChange={setSelectedFormat}
        selectedYear={selectedYear}
        years={years}
        onYearChange={setSelectedYear}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <div className="flex justify-between mb-4">
        <StatsCounter 
          totalCount={musicItems.length} 
          filteredCount={filteredItems.length}
          title="Hudební sbírka" 
        />
        <AddMusicItemDialog onAddItem={onAddItem} formats={formats} />
      </div>

      <div className="rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Interpret</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Rok</TableHead>
              <TableHead>Formát</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.SKUPINA}</TableCell>
                <TableCell>{item.ALBUM || '-'}</TableCell>
                <TableCell>{item.TRACK || '-'}</TableCell>
                <TableCell>{item.ROK}</TableCell>
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
                <TableCell colSpan={6} className="text-center py-4">
                  Nenalezeny žádné položky odpovídající filtrům
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <FormatStats items={filteredItems} />
        <YearStats items={filteredItems} />
      </div>
    </div>
  );
};

export default MusicTab;
