
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { MediaData, MusicItem, MovieItem } from '../types/media';
import { fetchMediaData, exportToJson } from '../services/mediaService';
import MusicTab from '../components/MusicTab';
import MoviesTab from '../components/MoviesTab';

const Index = () => {
  const { toast } = useToast();
  const [mediaData, setMediaData] = useState<MediaData>({ music: [], movies: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Načtení dat při prvním renderu
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMediaData();
        setMediaData(data);
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
        toast({
          title: "Chyba při načítání dat",
          description: "Nepodařilo se načíst data ze souboru media.json",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Funkce pro mazání hudební položky
  const handleDeleteMusicItem = (index: number) => {
    setMediaData(prevData => ({
      ...prevData,
      music: prevData.music.filter((_, i) => i !== index)
    }));
  };

  // Funkce pro mazání filmové položky
  const handleDeleteMovieItem = (index: number) => {
    setMediaData(prevData => ({
      ...prevData,
      movies: prevData.movies.filter((_, i) => i !== index)
    }));
  };

  // Funkce pro přidání hudební položky
  const handleAddMusicItem = (item: MusicItem) => {
    setMediaData(prevData => ({
      ...prevData,
      music: [...prevData.music, item]
    }));
  };

  // Funkce pro přidání filmové položky
  const handleAddMovieItem = (item: MovieItem) => {
    setMediaData(prevData => ({
      ...prevData,
      movies: [...prevData.movies, item]
    }));
  };

  // Funkce pro export dat
  const handleExport = () => {
    try {
      exportToJson(mediaData);
      toast({
        title: "Export úspěšný",
        description: "Data byla úspěšně exportována do souboru media.json",
      });
    } catch (error) {
      console.error("Chyba při exportu dat:", error);
      toast({
        title: "Chyba při exportu",
        description: "Nepodařilo se exportovat data do souboru",
        variant: "destructive",
      });
    }
  };

  // Zobrazení načítání
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Načítání...</h1>
          <p>Probíhá načítání dat z JSON souboru.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Správa mediální sbírky</h1>
          <p className="text-slate-600">Spravujte svou hudební a filmovou sbírku na jednom místě</p>
        </div>
        <Button onClick={handleExport} className="mt-4 md:mt-0">Exportovat do JSON</Button>
      </div>

      <Tabs defaultValue="music" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="music">
            Hudba ({mediaData.music.length})
          </TabsTrigger>
          <TabsTrigger value="movies">
            Filmy ({mediaData.movies.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="music">
          <MusicTab 
            musicItems={mediaData.music} 
            onDeleteItem={handleDeleteMusicItem} 
            onAddItem={handleAddMusicItem}
          />
        </TabsContent>
        
        <TabsContent value="movies">
          <MoviesTab 
            movieItems={mediaData.movies} 
            onDeleteItem={handleDeleteMovieItem} 
            onAddItem={handleAddMovieItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
