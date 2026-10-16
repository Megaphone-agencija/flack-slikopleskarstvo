import { useEffect, useState } from "react";
import { ArrowRight, Images, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import allPhotos from "./reference-data.json";

const photos = allPhotos.filter((_, index) => ![41, 42, 49].includes(index));

const pairs = [
  { title: "Hodnik", before: allPhotos[13], after: allPhotos[30] },
  { title: "Dnevni prostor", before: allPhotos[15], after: allPhotos[31] },
  { title: "Soba z vitrino", before: allPhotos[17], after: allPhotos[32] },
  { title: "Prostor ob oknu", before: allPhotos[20], after: allPhotos[33] },
  { title: "Kopalnica", before: allPhotos[22], after: allPhotos[34] },
  { title: "Kopalnica – drugi kot", before: allPhotos[24], after: allPhotos[37] },
];
const paired = new Set(pairs.flatMap(p=>[p.before.src,p.after.src]));
const extras = photos.filter(p=>!paired.has(p.src));
const featured = [allPhotos[8], allPhotos[1], allPhotos[5]];

export default function ReferencesSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [position, setPosition] = useState(50);
  const comparison = selected === null ? null : pairs[selected];
  function choosePair(index: number) { setSelected(index); setPhotoIndex(null); setPosition(50); }
  useEffect(()=>{
    if(!open) return;
    const onKey=(event:KeyboardEvent)=>{
      if(event.key!=="ArrowLeft" && event.key!=="ArrowRight") return;
      // Keep the range control's native arrow-key interaction.
      if(event.target instanceof HTMLInputElement) return;
      const delta=event.key==="ArrowRight"?1:-1;
      if(selected!==null) {event.preventDefault();setSelected((selected+delta+pairs.length)%pairs.length);setPosition(50);}
      else if(photoIndex!==null) {event.preventDefault();setPhotoIndex((photoIndex+delta+photos.length)%photos.length);}
    };
    window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[open,selected,photoIndex]);
  return <section id="reference" className="py-24 bg-background scroll-mt-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-widest"><Images className="h-4 w-4"/>Reference</span><h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">IZBRANA DELA</h2><div className="h-0.5 w-20 bg-accent mt-4"/><p className="text-muted-foreground mt-5 leading-relaxed">Primeri izvedenih slikopleskarskih in zaključnih del. V galeriji primerjajte stanje prej in potem ter si oglejte več detajlov iz naših projektov.</p></div>
        <Button size="lg" onClick={()=>{setOpen(true);setSelected(null);setPhotoIndex(null);}} className="bg-accent text-accent-foreground font-bold self-start">Več<ArrowRight className="h-4 w-4 ml-2"/></Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{featured.map(image=><button key={image.src} onClick={()=>{setOpen(true);setSelected(null);setPhotoIndex(null);}} aria-label="Odpri galerijo referenc" className="group h-80 overflow-hidden rounded-2xl border border-border bg-muted shadow-lg"><img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"/></button>)}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[94vh] max-w-[96vw] overflow-y-auto border-border p-4 sm:p-6 xl:max-w-7xl">
          <DialogHeader className="pr-8"><DialogTitle className="text-2xl font-black">Reference</DialogTitle></DialogHeader>
          {comparison ? <div className="space-y-4">
            <Button variant="outline" onClick={()=>setSelected(null)}>← Vse reference</Button><h3 className="text-xl font-bold">{comparison.title}: prej in potem</h3>
            <div className="relative mx-auto aspect-[4/5] max-h-[65vh] max-w-2xl overflow-hidden rounded-xl bg-muted">
              <img src={comparison.after.src} alt={`Potem: ${comparison.title}`} className="absolute inset-0 w-full h-full object-contain"/>
              <div className="absolute inset-0 bg-muted" style={{clipPath:`inset(0 ${100-position}% 0 0)`}}><img src={comparison.before.src} alt={`Prej: ${comparison.title}`} className="w-full h-full object-contain"/></div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-background pointer-events-none" style={{left:`${position}%`}}><span className="absolute top-1/2 -translate-x-1/2 rounded-full bg-accent text-accent-foreground p-2"><ArrowLeftRight className="h-5 w-5"/></span></div>
              <span className="absolute left-3 top-3 bg-foreground/85 text-background rounded-full px-3 py-1 text-xs font-bold">Prej</span><span className="absolute right-3 top-3 bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-bold">Potem</span>
            </div>
            <label className="block max-w-2xl mx-auto text-sm font-medium">Primerjava prej in potem: {comparison.title}<input aria-label={`Primerjava prej in potem: ${comparison.title}`} type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))} className="block mt-3 w-full accent-accent"/></label>
          </div> : photoIndex!==null ? <div className="space-y-4"><Button variant="outline" onClick={()=>setPhotoIndex(null)}>← Vse reference</Button><img src={photos[photoIndex].src} alt={photos[photoIndex].alt} className="max-h-[72vh] w-full object-contain"/><div className="flex justify-between"><Button variant="outline" onClick={()=>setPhotoIndex((photoIndex-1+photos.length)%photos.length)}>← Prejšnja</Button><Button variant="outline" onClick={()=>setPhotoIndex((photoIndex+1)%photos.length)}>Naslednja →</Button></div></div> : <div className="space-y-8">
            <div><h3 className="text-lg font-bold">Prej in potem</h3><p className="mt-1 text-sm text-muted-foreground">Kliknite na primer in s drsnikom primerjajte stanje pred izvedbo in končni rezultat.</p></div>
            <div className="grid gap-5 md:grid-cols-2">{pairs.map((pair,index)=><button key={pair.title} onClick={()=>choosePair(index)} aria-label={`Odpri primerjavo prej in potem: ${pair.title}`} className="overflow-hidden rounded-xl border border-border bg-background text-left hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"><div className="flex justify-between gap-3 px-4 py-3"><h4 className="text-sm font-bold">{pair.title}</h4><span className="inline-flex gap-2 items-center text-xs font-bold text-accent">Primerjaj<ArrowLeftRight className="h-4 w-4"/></span></div><div className="grid grid-cols-2 gap-px bg-border">{[{label:"Prej",image:pair.before},{label:"Potem",image:pair.after}].map(({label,image})=><div key={label} className="relative bg-muted"><img src={image.src} alt={`${label}: ${pair.title}`} loading="lazy" className="aspect-[4/5] w-full object-cover"/><span className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-bold ${label==='Potem'?'bg-accent text-accent-foreground':'bg-foreground/85 text-background'}`}>{label}</span></div>)}</div></button>)}</div>
            <div><h3 className="text-lg font-bold">Dodatne reference</h3><div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">{extras.map(image=><button key={image.src} onClick={()=>setPhotoIndex(photos.findIndex(p=>p.src===image.src))} aria-label={`Odpri: ${image.alt}`} className="rounded-lg overflow-hidden border border-border hover:border-accent"><img src={image.src} alt={image.alt} loading="lazy" className="aspect-square w-full object-cover"/></button>)}</div></div>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  </section>;
}
