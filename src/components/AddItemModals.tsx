
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from "@/hooks/use-toast";
import { MusicItem, MovieItem } from '@/types/media';

interface AddMusicItemProps {
  onAddItem: (item: MusicItem) => void;
  formats: string[];
}

export const AddMusicItemDialog: React.FC<AddMusicItemProps> = ({ onAddItem, formats }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [skupina, setSkupina] = React.useState("");
  const [itemType, setItemType] = React.useState<"album" | "track">("album");
  const [albumName, setAlbumName] = React.useState("");
  const [trackName, setTrackName] = React.useState("");
  const [rok, setRok] = React.useState<number>(new Date().getFullYear());
  const [format, setFormat] = React.useState(formats[0] || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skupina) {
      toast({
        title: "Chyba",
        description: "Jméno interpreta je povinné",
        variant: "destructive"
      });
      return;
    }

    if (itemType === "album" && !albumName) {
      toast({
        title: "Chyba",
        description: "Název alba je povinný",
        variant: "destructive"
      });
      return;
    }

    if (itemType === "track" && !trackName) {
      toast({
        title: "Chyba",
        description: "Název skladby je povinný",
        variant: "destructive"
      });
      return;
    }

    const newItem: MusicItem = {
      SKUPINA: skupina,
      ALBUM: itemType === "album" ? albumName : null,
      TRACK: itemType === "track" ? trackName : null,
      ROK: rok,
      FORMÁT: format
    };

    onAddItem(newItem);
    toast({
      title: "Úspěch",
      description: "Položka byla přidána"
    });
    
    // Reset formuláře
    setSkupina("");
    setAlbumName("");
    setTrackName("");
    setRok(new Date().getFullYear());
    setFormat(formats[0] || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Přidat hudební položku</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Přidat hudební položku</DialogTitle>
            <DialogDescription>
              Přidejte novou hudební položku do vaší sbírky.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skupina" className="text-right">
                Interpret
              </Label>
              <Input
                id="skupina"
                value={skupina}
                onChange={(e) => setSkupina(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Typ</Label>
              <div className="col-span-3">
                <RadioGroup value={itemType} onValueChange={(v) => setItemType(v as "album" | "track")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="album" id="album" />
                    <Label htmlFor="album">Album</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="track" id="track" />
                    <Label htmlFor="track">Track</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {itemType === "album" ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="album-name" className="text-right">
                  Album
                </Label>
                <Input
                  id="album-name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  className="col-span-3"
                  required={itemType === "album"}
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="track-name" className="text-right">
                  Track
                </Label>
                <Input
                  id="track-name"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  className="col-span-3"
                  required={itemType === "track"}
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rok" className="text-right">
                Rok
              </Label>
              <Input
                id="rok"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={rok}
                onChange={(e) => setRok(Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Formát
              </Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format" className="col-span-3">
                  <SelectValue placeholder="Vyberte formát" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>{fmt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Přidat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface AddMovieItemProps {
  onAddItem: (item: MovieItem) => void;
  formats: string[];
}

export const AddMovieItemDialog: React.FC<AddMovieItemProps> = ({ onAddItem, formats }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [nazev, setNazev] = React.useState("");
  const [rezie, setRezie] = React.useState("");
  const [format, setFormat] = React.useState(formats[0] || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev) {
      toast({
        title: "Chyba",
        description: "Název filmu je povinný",
        variant: "destructive"
      });
      return;
    }

    if (!rezie) {
      toast({
        title: "Chyba",
        description: "Jméno režiséra je povinné",
        variant: "destructive"
      });
      return;
    }

    const newItem: MovieItem = {
      JMÉNO: nazev,
      REŽIE: rezie,
      FORMÁT: format
    };

    onAddItem(newItem);
    toast({
      title: "Úspěch",
      description: "Film byl přidán"
    });
    
    // Reset formuláře
    setNazev("");
    setRezie("");
    setFormat(formats[0] || "");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Přidat film</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Přidat film</DialogTitle>
            <DialogDescription>
              Přidejte nový film do vaší sbírky.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nazev" className="text-right">
                Název
              </Label>
              <Input
                id="nazev"
                value={nazev}
                onChange={(e) => setNazev(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rezie" className="text-right">
                Režie
              </Label>
              <Input
                id="rezie"
                value={rezie}
                onChange={(e) => setRezie(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="movie-format" className="text-right">
                Formát
              </Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="movie-format" className="col-span-3">
                  <SelectValue placeholder="Vyberte formát" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>{fmt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Přidat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
