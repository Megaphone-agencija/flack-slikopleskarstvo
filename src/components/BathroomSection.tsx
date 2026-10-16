import bathroomImage from "@/assets/kopalnica-predstavitvena.webp";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const works = ["Odstranitev stare opreme in oblog", "Vodovodne in elektroinštalacije", "Priprava podlage in hidroizolacija", "Polaganje keramike", "Montaža sanitarne opreme", "Zaključna dela in ureditev prostora"];
const steps = [
  { title: "Povejte nam svoje želje", text: "Sporočite nam, kaj bi radi spremenili." },
  { title: "Ogled in jasna ponudba", text: "Pregledamo prostor, uskladimo obseg del in pripravimo ponudbo." },
  { title: "Usklajena izvedba", text: "Poskrbimo za mojstre in zaporedje del po dogovorjenem načrtu." },
  { title: "Vaša nova kopalnica", text: "Skupaj pregledamo opravljeno delo in zaključimo prenovo." },
];

export default function BathroomSection() {
  function inquire() {
    window.dispatchEvent(new Event("flack:bathroom-inquiry"));
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section id="prenova-kopalnic" className="relative text-foreground py-20 lg:py-28 overflow-hidden scroll-mt-24" style={{ background: "var(--bathroom-gradient)" }}>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Prenova kopalnic</span>
          <span className="text-xs text-foreground/55 border border-foreground/20 rounded-full px-3 py-1">Ljubljana in okolica</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">OD STARE KOPALNICE<br />DO NOVE.<br /><span className="text-accent">NA KLJUČ.</span></h2>
            <p className="text-foreground/70 text-lg leading-relaxed max-w-lg mb-7">Vi si zamislite svojo novo kopalnico. Mi poskrbimo za celotno prenovo — od prvih posegov do zadnjih detajlov.</p>
            <div className="border-l-2 border-accent pl-4 mb-8">
              <p className="font-semibold">Vsi potrebni mojstri. En dogovor.</p>
              <p className="text-sm text-foreground/60 mt-1">Obseg, materiali in potek izvedbe usklajeni pred začetkom.</p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-3 mb-9">
              {works.map(work => <li key={work} className="flex items-start gap-2.5 text-sm text-foreground/85"><CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />{work}</li>)}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Button onClick={inquire} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-auto min-h-12 whitespace-normal py-3 text-left">Želim ponudbo za prenovo kopalnice<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Button>
              <a href="tel:+386040296555" className="inline-flex items-center gap-2 text-sm font-semibold py-2"><Phone className="h-4 w-4 text-accent" />040 296 555</a>
            </div>
          </motion.div>
          <motion.figure initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative rounded-2xl overflow-hidden border border-foreground/15 bg-background text-foreground shadow-2xl">
            <div className="aspect-[4/3] relative bg-muted overflow-hidden">
              <img src={bathroomImage} alt="Predstavitvena slika sodobne kopalnice s stekleno prho, leseno omarico in okroglim ogledalom, ustvarjena z umetno inteligenco" width={1448} height={1086} loading="lazy" className="w-full h-full object-cover" />
            </div>

          </motion.figure>
        </div>
        <div className="mt-16 pt-9 border-t border-foreground/15">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold mb-7">Kako do nove kopalnice</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-9">
            {steps.map((step, i) => <li key={step.title}><span className="text-accent text-sm font-bold">0{i+1}<span className="inline-block align-middle w-8 h-px bg-accent/40 ml-3" /></span><h3 className="font-bold mt-3 mb-2">{step.title}</h3><p className="text-sm leading-relaxed text-foreground/60">{step.text}</p></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
