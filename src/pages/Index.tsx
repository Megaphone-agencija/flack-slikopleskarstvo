import GoogleReviewButton from "@/components/GoogleReviewButton";
import ReferencesSection from "@/components/ReferencesSection";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  Hammer,
  PaintBucket,
  Truck,
  TreePine,
  Wrench,
  Shield,
  MessageSquareQuote,
  Phone,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  Mail,
  MapPin,
  Send,
  Loader2,
  HelpCircle,
  Images,
} from "lucide-react";
import BathroomSection from "@/components/BathroomSection";
import heroBg from "@/assets/hero-bg.webp";
import servicesBg from "@/assets/services-bg.jpg";
import ctaBg from "@/assets/flack-hero-slikopleskar-barvanje-stanovanja-ljubljana.jpeg";
import whyUsBg from "@/assets/why-us-bg.webp";
import serviceSlikopleskarstvo from "@/assets/flack-slikopleskarstvo-barvanje-stene-ljubljana.jpg";
import serviceZakljucnaDela from "@/assets/flack-manjsa-zakljucna-dela-prestavitev-vticnic-ljubljana.jpg";

/* ─── Web3Forms ─── */
const WEB3FORMS_ACCESS_KEY = "0ff44a6b-0868-4db8-933b-044573c76ee2";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ─── Decorative SVG Components ─── */
const GridPattern = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid)" />
  </svg>
);

const DiagonalLines = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(8)].map((_, i) => (
      <line key={i} x1={i * 30} y1="0" x2={i * 30 - 60} y2="200" stroke="currentColor" strokeWidth="1" opacity="0.08" />
    ))}
  </svg>
);

const CornerAccent = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg className={`absolute pointer-events-none ${className}`} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M0 0L120 0L120 4L4 4L4 120L0 120Z" fill="currentColor" opacity="0.2" />
    <path d="M0 0L80 0L80 2L2 2L2 80L0 80Z" fill="currentColor" opacity="0.1" />
  </svg>
);

const DotCluster = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(5)].map((_, row) =>
      [...Array(5)].map((_, col) => (
        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" fill="currentColor" opacity="0.2" />
      ))
    )}
  </svg>
);

const FloatingShape = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 3, -3, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <div className="w-16 h-16 border border-accent/20 rounded-lg rotate-45" />
  </motion.div>
);

const AnimatedLine = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    style={{ originX: 0 }}
  >
    <div className="h-[2px] bg-gradient-to-r from-accent via-accent/50 to-transparent w-full" />
  </motion.div>
);

const SectionDivider = () => (
  <div className="relative h-24 overflow-hidden">
    <svg className="absolute w-full h-full" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 96L60 80C120 64 240 32 360 21.3C480 11 600 21 720 32C840 43 960 53 1080 48C1200 43 1320 21 1380 10.7L1440 0V96H0Z" fill="hsl(var(--muted))" />
    </svg>
  </div>
);

/* ─── Data ─── */
const services = [
  {
    img: serviceSlikopleskarstvo,
    title: "Slikopleskarstvo",
    alt: "Slikopleskar FLACK pri barvanju stene z valjčkom, v beli majici z logotipom FLACK",
    details: [
      "Struganje sten",
      "Odstranjevanje tapet",
      "Bandažiranje",
      "Kitanje",
      "Armiranje sten (mrežica + lepilo)",
      "Brušenje",
      "Barvanje/pleskanje",
      "Pleskanje oken",
    ],
  },
  {
    img: serviceZakljucnaDela,
    title: "Manjša zaključna dela",
    alt: "Mojster FLACK pri prestavitvi vtičnice z izvijačem, v beli majici z logotipom FLACK",
    details: ["Prestavitev vtičnic", "Prestavitev odtokov"],
  },
];

const advantages = [
  { icon: CheckCircle, title: "Prilagodljivost", desc: "Prilagodimo se vašim željam, časovnici in proračunu." },
  { icon: Shield, title: "Cena na ključ", desc: "Vsi potrebni mojstri. Pridejo, zrihtajo, pospravijo za sabo in gredo. Brez skritih stroškov." },
  { icon: MessageSquareQuote, title: "Profesionalen pristop", desc: "Predana ekipa, kakovostni materiali in natančna izvedba za vrhunske rezultate." },
];

const stats = [
  { value: 350, suffix: "+", label: "opleskanih prostorov" },
  { value: 50, suffix: "+", label: "izvedenih projektov" },
  { value: 15, suffix: "+", label: "let izkušenj" },
];



/* ─── CountUp ─── */
const CountUp = ({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

/* ─── Marquee ticker for social proof ─── */
const MarqueeTicker = () => {
  const items = ["Cena na ključ", "Vsi mojstri, en račun", "Slikopleskarstvo", "Prenova kopalnic na ključ", "Manjša zaključna dela", "350+ opleskanih prostorov", "50+ projektov", "15+ let izkušenj"];
  return (
    <div className="relative overflow-hidden bg-accent py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-bold text-accent-foreground uppercase tracking-widest flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-accent-foreground/50 rounded-full" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── FAQ ─── */
const faqs = [
  { q: "Ali prenovite celotno kopalnico na ključ?", a: "Da. Prevzamemo celotno prenovo kopalnice: od odstranitve stare opreme in priprave prostora do inštalacij, keramike in montaže sanitarne opreme. Obseg del in izbiro materialov uskladimo ob ogledu." },
  { q: "Koliko stane prenova kopalnice in koliko časa traja?", a: "Cena in čas izvedbe sta odvisna od velikosti kopalnice, stanja inštalacij, izbranih materialov in obsega posegov. Po ogledu pripravimo ponudbo ter se dogovorimo za termin in potek del." },
  {
    q: "Na katerem območju delate?",
    a: "Delujemo na območju Ljubljane, okolice, Gorenjske in Notranjske, vključno s Cerknico in Logatcem. Če niste prepričani, ali smo na voljo za vašo lokacijo, nas pokličite ali pošljite povpraševanje in vam takoj sporočimo.",
  },
  {
    q: "Ali pridete na ogled in je ponudba brezplačna?",
    a: "Da. Na ogled pridemo brezplačno in nezavezujoče. Na podlagi ogleda in vaših želja pripravimo jasno ponudbo na ključ, brez skritih stroškov.",
  },
  {
    q: "Kako oblikujete ceno?",
    a: "Delamo po principu \"cena na ključ\" — v ponudbi je zajeto vse potrebno delo, materiali in mojstri. En račun, dogovorjena cena vnaprej, brez naknadnih presenečenj.",
  },
  {
    q: "Kako hitro lahko začnete in koliko vnaprej se je treba naročiti?",
    a: "Termin se dogovorimo glede na obseg del in zasedenost. Priporočamo, da nas kontaktirate čim prej — po potrjeni ponudbi se dogovorimo za konkreten datum in rok izvedbe.",
  },
  {
    q: "Ali priskrbite material ter zaščitite pohištvo in tla?",
    a: "Da. Po dogovoru priskrbimo vse potrebne kakovostne materiale, pred delom ustrezno zaščitimo pohištvo in tla, po končanih delih pa za sabo pospravimo in uredimo prostor.",
  },
  {
    q: "Koliko časa traja pleskanje stanovanja?",
    a: "Odvisno od velikosti in stanja površin, a povprečno stanovanje običajno zaključimo v nekaj dneh. Natančen rok vam podamo ob ogledu in ga zapišemo v ponudbo.",
  },
];

const FaqSection = () => (
  <section id="faq" className="py-24 bg-muted relative overflow-hidden scroll-mt-20">
    <DotCluster className="top-12 right-16 text-foreground hidden md:block" />
    <DiagonalLines className="bottom-0 left-0 text-foreground rotate-180" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl">
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-widest">
          <HelpCircle className="h-4 w-4" /> Pogosta vprašanja
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">POGOSTA VPRAŠANJA</motion.h2>
        <AnimatedLine className="max-w-[80px] mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-background rounded-xl border border-border px-5 shadow-sm data-[state=open]:border-accent/40 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left text-base font-bold text-foreground hover:no-underline [&[data-state=open]>svg]:text-accent">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.p
        className="text-center text-sm text-muted-foreground mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Imate še kakšno vprašanje?{" "}
        <a href="#kontakt" className="text-accent font-semibold hover:underline">Pišite nam</a>{" "}
        ali pokličite{" "}
        <a href="tel:+386040296555" className="text-accent font-semibold hover:underline">040 296 555</a>.
      </motion.p>
    </div>
  </section>
);

/* ─── Conversion / Kontaktna forma (Web3Forms) ─── */
const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors";

const formTrust = [
  { icon: Clock, text: "Odgovor v 24 urah" },
  { icon: Shield, text: "Cena na ključ, brez skritih stroškov" },
  { icon: MapPin, text: "Ljubljana in okolica" },
  { icon: CheckCircle, text: "Več kot 15 let izkušenj" },
];

const ContactSection = () => {
  const [service, setService] = useState("");
  const isBathroom = service === "Prenova kopalnic";
  useEffect(() => {
    const chooseBathroom = () => setService("Prenova kopalnic");
    window.addEventListener("flack:bathroom-inquiry", chooseBathroom);
    return () => window.removeEventListener("flack:bathroom-inquiry", chooseBathroom);
  }, []);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (import.meta.env.DEV) {
      setErrorMsg("To je predogled. Obrazec je veljaven; povpraševanje ni bilo poslano.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("from_name", "FLACK — spletna stran");
    formData.append("subject", "Novo povpraševanje s spletne strani FLACK");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Pošiljanje ni uspelo. Poskusite znova ali nas pokličite.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Napaka pri povezavi. Poskusite znova ali nas pokličite na 040 296 555.");
    }
  };

  return (
    <section id="kontakt" className="relative py-24 bg-background overflow-hidden scroll-mt-20">
      <GridPattern className="top-0 right-0 text-foreground opacity-40" />
      <DotCluster className="bottom-10 left-10 text-muted-foreground hidden md:block" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — pitch + trust builders + kontaktni podatki */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Ljubljana in okolica</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              PRIDOBITE PONUDBO<br />
              <span className="text-accent">NA KLJUČ</span>
            </motion.h2>
            <AnimatedLine className="max-w-[80px] mb-6" />
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Izpolnite obrazec in v <span className="text-foreground font-semibold">24 urah</span> se vam oglasimo z
              nezavezujočo ponudbo. Delamo izključno na območju <span className="text-foreground font-semibold">Ljubljane, okolice, Gorenjske in Notranjske</span> — vsi mojstri, en račun, dogovorjen rok.
            </motion.p>

            {/* Trust builders */}
            <motion.ul variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {formTrust.map((t) => (
                <li key={t.text} className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <t.icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{t.text}</span>
                </li>
              ))}
            </motion.ul>

            {/* Direktni kontakt */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+386040296555" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Pokličite</p>
                  <p className="text-sm font-bold text-foreground">040 296 555</p>
                </div>
              </a>
              <a href="mailto:info@flack.si" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Pišite</p>
                  <p className="text-sm font-bold text-foreground break-all">info@flack.si</p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — obrazec */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-muted rounded-2xl border border-border shadow-xl shadow-accent/5 p-6 sm:p-8"
          >
            <CornerAccent className="top-0 right-0 text-accent hidden sm:block" flip />
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 min-h-[420px]">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Povpraševanje poslano!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Hvala. Oglasimo se vam v najkrajšem možnem času, najkasneje v 24 urah. Za nujne primere nas pokličite na <a href="tel:+386040296555" className="text-accent font-semibold">040 296 555</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-1">Pošljite povpraševanje</h3>
                <p className="text-sm text-muted-foreground mb-4">Odgovorimo v 24 urah — brez obveznosti.</p>

                {/* Honeypot proti spamu */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-foreground mb-1.5">Ime in priimek *</label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Janez Novak" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-foreground mb-1.5">Telefon *</label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="040 123 456" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5">E-pošta *</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="janez@primer.si" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-foreground mb-1.5">Storitev *</label>
                  <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)} className={inputClass}>
                    <option value="" disabled>Izberite storitev …</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Prenova kopalnic">Prenova kopalnic na ključ</option>
                    <option value="Drugo / splošno povpraševanje">Drugo / splošno povpraševanje</option>
                  </select>
                </div>

                {isBathroom ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bathroomSize" className="block text-xs font-semibold mb-1.5">Približna velikost kopalnice</label>
                      <input id="bathroomSize" name="bathroomSize" type="number" min="1" step="0.5" placeholder="Površina v m²" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="bathroomScope" className="block text-xs font-semibold mb-1.5">Obseg prenove</label>
                      <select id="bathroomScope" name="bathroomScope" defaultValue="Celotna prenova na ključ" className={inputClass}>
                        <option>Celotna prenova na ključ</option><option>Potrebujem nasvet glede obsega</option>
                      </select>
                    </div>
                  </div>
                ) : service === "Slikopleskarstvo" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="paintScope" className="block text-xs font-semibold mb-1.5">Kaj želite prebarvati?</label>
                      <select id="paintScope" name="paintScope" defaultValue="" className={inputClass}>
                        <option value="" disabled>Izberite možnost …</option><option>1–3 prostori</option><option>Celo stanovanje</option><option>Celo hišo</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="paintSize" className="block text-xs font-semibold mb-1.5">Približna površina za pleskanje</label>
                      <select id="paintSize" name="paintSize" defaultValue="" className={inputClass}>
                        <option value="" disabled>Izberite velikost …</option><option>0–100 m²</option><option>100–200 m²</option><option>200–300 m²</option><option>300 m²+</option>
                      </select>
                    </div>
                  </div>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectLocation" className="block text-xs font-semibold mb-1.5">Kraj izvedbe</label>
                    <input id="projectLocation" name="projectLocation" autoComplete="address-level2" placeholder="Npr. Ljubljana" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="renovationTiming" className="block text-xs font-semibold text-foreground mb-1.5">Kdaj potrebujete prenovo?</label>
                    <select id="renovationTiming" name="renovationTiming" defaultValue="" className={inputClass}>
                      <option value="" disabled>Izberite časovni okvir …</option>
                      <option value="Takoj (v naslednjem tednu ali dveh)">Takoj (v naslednjem tednu ali dveh)</option>
                      <option value="V enem mesecu">V enem mesecu</option>
                      <option value="Več kot 3 mesecih">Več kot 3 mesecih</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-foreground mb-1.5">Dodatne informacije (neobvezno)</label>
                  <textarea id="message" name="message" rows={4} placeholder="Dodajte še kakšne pomembne podrobnosti glede vašega projekta, da bomo lažje razumeli vaše potrebe." className={`${inputClass} resize-none`} />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive font-medium">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="w-full text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25 h-12 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Pošiljam …</>
                  ) : (
                    <>Pošlji povpraševanje <Send className="h-4 w-4 ml-2" /></>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  S pošiljanjem soglašate, da vas kontaktiramo glede vašega povpraševanja. Delamo na območju Ljubljane, okolice, Gorenjske in Notranjske.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};



/* ─── Main Component ─── */
const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Ob prihodu z anchor-jem (npr. /#kontakt ali preusmeritev s stare podstrani) skrolaj na sekcijo
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section id="domov" ref={heroRef} className="relative min-h-[90vh] flex items-center">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroBg} alt="Gradbeni delavec pri delu" className="w-full h-full object-cover scale-110" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,60%,8%)]/80 via-[hsl(215,60%,12%)]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,60%,8%)]/40 via-transparent to-[hsl(215,60%,8%)]/20" />
          {/* Halo effect */}
          <div className="pointer-events-none absolute -top-1/4 -left-1/4 w-[80%] h-[120%] rounded-full bg-accent/30 blur-[140px] opacity-70" />
          <div className="pointer-events-none absolute top-1/3 left-1/4 w-[50%] h-[70%] rounded-full bg-accent/40 blur-[120px] opacity-60 animate-pulse" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-[40%] h-[50%] rounded-full bg-primary/40 blur-[100px] opacity-50" />
        </motion.div>

        {/* Decorative elements in hero */}
        <GridPattern className="top-0 right-0 text-primary-foreground opacity-30" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {/* Location badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-5 self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/90">Ljubljana in okolica</span>
            </motion.div>

            {/* Animated accent line before heading */}
            <motion.div
              className="w-16 h-1 bg-accent mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
            />

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-wide">
              <span className="text-primary-foreground">PREPUSTITE</span>
              <br />
              <span className="text-primary-foreground">STENE IN</span>
              <br />
              <span className="text-primary-foreground">KOPALNICO</span>
              <br />
              <motion.span
                className="text-accent inline-block"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                MOJSTROM
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-primary-foreground/85 mb-4 leading-relaxed max-w-xl font-semibold">
              FLACK d.o.o. — slikopleskarstvo in kopalnice na ključ z več kot 15 leti izkušenj.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-primary-foreground/75 mb-8 leading-relaxed max-w-xl">
              Od sveže prepleskanih sten do v celoti prenovljene kopalnice.<br />
              Natančna izvedba, urejeno delovišče in dogovorjen rok.<br />
              <span className="font-semibold text-primary-foreground">Brez presenečenj.</span>
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25 h-12 px-8 group">
                <a href="#kontakt">
                  Stopite v kontakt
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </a>
              </Button>
              <Button asChild size="lg" className="text-base font-bold h-12 px-8 bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/25 backdrop-blur-sm">
                <a href="#storitve">Naše storitve</a>
              </Button>
            </motion.div>

            {/* Cena na ključ trust row */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Cena na ključ
              </span>
              <span className="hidden sm:inline text-primary-foreground/30">•</span>
              <span>Vsi mojstri, en račun</span>
              <span className="hidden sm:inline text-primary-foreground/30">•</span>
              <span>Brez skritih stroškov</span>
            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* Marquee ticker */}
      <MarqueeTicker />

      {/* Stats / Trust builder */}
      <section className="bg-background py-20 relative">
        <DotCluster className="top-6 left-8 text-muted-foreground" />
        <DotCluster className="bottom-6 right-8 text-muted-foreground" />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={i}
                variants={scaleIn}
              >
                {/* Subtle circle behind number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-accent/5 -mt-4" />
                </div>
                <span className="relative block text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} decimals={0} />
                </span>
                <span className="relative text-xs md:text-sm text-muted-foreground mt-2 block font-bold uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <SectionDivider />

      {/* Storitve */}
      <section id="storitve" className="py-24 bg-muted relative scroll-mt-20">
        <DiagonalLines className="top-0 right-0 text-foreground" />
        <DiagonalLines className="bottom-0 left-0 text-foreground rotate-180" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={fadeUp} className="text-accent font-semibold text-sm uppercase tracking-widest">Slikopleskarstvo in zaključna dela</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">SLIKOPLESKARSTVO</motion.h2>
            <AnimatedLine className="max-w-[80px] mx-auto mt-4" />
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto mt-4">
              Slikopleskarstvo in zaključna dela za stanovanjske in poslovne objekte — <span className="text-foreground font-semibold">na območju Ljubljane, okolice, Gorenjske in Notranjske.</span>
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={scaleIn}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-[340px] shadow-lg"
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,60%,8%)]/80 via-[hsl(215,60%,8%)]/20 to-transparent transition-opacity duration-300 md:group-hover:opacity-0" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 md:group-hover:opacity-0 md:block hidden">
                  <div className="w-8 h-[2px] bg-accent mb-3" />
                  <h3 className="text-2xl font-bold text-primary-foreground tracking-wide">{s.title}</h3>
                </div>
                <div className="absolute inset-0 bg-[hsl(215,60%,8%)]/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <Star className="h-6 w-6 text-white/80 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{s.title}</h3>
                  <div className="flex flex-wrap justify-center gap-2.5 max-w-sm">
                    {s.details.map((detail) => (
                      <span
                        key={detail}
                        className="border border-white/80 bg-white px-3 py-1.5 text-[14px] font-bold leading-none text-slate-900 shadow-md"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <a href="#kontakt">
                Pridobite ponudbo
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <BathroomSection />

      {/* Reference */}
      <ReferencesSection />

      {/* Zakaj izbrati nas */}
      <section id="zakaj-nas" className="py-24 bg-background overflow-hidden relative scroll-mt-20">
        <GridPattern className="top-0 left-0 text-foreground opacity-50" />
        <CornerAccent className="top-12 left-12 text-accent hidden lg:block" />
        <CornerAccent className="bottom-12 right-12 text-accent hidden lg:block" flip />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={fadeUp} className="text-accent font-semibold text-sm uppercase tracking-widest">Naše prednosti</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">ZAKAJ IZBRATI NAS?</motion.h2>
            <AnimatedLine className="max-w-[80px] mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Image - large */}
            <motion.div
              className="md:col-span-7 relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[520px]"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img src={whyUsBg} alt="Slikopleskar pri delu z opremo FLACK" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,60%,8%)]/60 via-transparent to-transparent" />
              {/* Floating stat badges */}
              <motion.div
                className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <span className="text-2xl font-black text-primary-foreground">350+</span>
                  <p className="text-xs text-primary-foreground/60 font-medium">opleskanih prostorov</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute top-6 right-6 bg-accent/90 backdrop-blur-sm rounded-xl px-4 py-2.5"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <p className="text-2xl font-black text-accent-foreground text-center">15+</p>
                <p className="text-xs text-accent-foreground/80 font-bold text-center">let izkušenj</p>

              </motion.div>
            </motion.div>

            {/* Advantages cards */}
            <motion.div
              className="md:col-span-5 flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {advantages.map((a, i) => (
                <motion.div
                  key={i}
                  variants={slideInRight}
                  className="group relative bg-muted rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex-1"
                >
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <a.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-black text-foreground mb-2 text-lg tracking-wide">{a.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                  {/* Decorative accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reference / mnenja strank */}
      <section id="mnenja" className="py-24 bg-muted relative overflow-hidden scroll-mt-20">
        <DotCluster className="top-12 right-16 text-foreground" />
        <DotCluster className="bottom-12 left-16 text-foreground" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={fadeUp} className="text-accent font-semibold text-sm uppercase tracking-widest">Mnenja strank</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">KAJ PRAVIJO NAŠE STRANKE</motion.h2>
            <AnimatedLine className="max-w-[80px] mx-auto mt-4" />
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
              Od slikopleskarskih del do celovitih prenov kopalnic — za nami je več kot 15 let izkušenj.
              Vaše mnenje pomaga drugim pri izbiri mojstra in nam pri nadaljnjem delu.
            </motion.p>
          </motion.div>
          <p className="text-center mb-8"><a href="https://omisli.si/flack-doo/" target="_blank" rel="noopener noreferrer" className="text-accent font-bold underline underline-offset-4">5,0 / 5 · Omisli.si</a></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
            {[
              {name: "Roberto T.", date: "22. marec 2025", iso: "2025-03-22", quote: "Fantje se držijo dogovorjenega roka So zelo natančni in obvladajo svoj posel. Vse pohvale", url: "https://omisli.si/flack-doo/ocena/o4DrhA/"},
              {name: "Sabina S.", date: "20. marec 2025", iso: "2025-03-20", quote: "Gospod je zelo prijazen. Drzali so se rokov in dogovora. Pohvalim svetovanje in iskanje resitev.", url: "https://omisli.si/flack-doo/ocena/7r-MCg/"},
            ].map(review => <figure key={review.url} className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 flex flex-col relative overflow-hidden">
              <div aria-label="Ocena 5 od 5 na Omisli.si" className="flex gap-1 mb-5">{Array.from({length:5},(_,i)=><Star key={i} aria-hidden="true" className="h-4 w-4 fill-accent text-accent" />)}</div>
              <blockquote className="text-foreground leading-relaxed mb-6 flex-1 italic">»{review.quote}«</blockquote>
              <figcaption className="border-t border-border pt-4"><p className="font-bold">{review.name}</p><time dateTime={review.iso} className="text-xs text-muted-foreground">{review.date}</time><a href={review.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-accent underline underline-offset-4 mt-2">Preberi izvirno oceno na Omisli.si</a></figcaption>
            </figure>)}
          </div>
          <div className="text-center">
            <p className="text-foreground mb-5">Ste bili z našim delom zadovoljni? Pustite oceno na Googlu.</p>
            <GoogleReviewButton />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaBg} alt="Slikopleskar FLACK z valjčkom barva steno v praznem stanovanju, v majici z logotipom FLACK" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,60%,8%)]/70 via-[hsl(215,60%,10%)]/50 to-[hsl(215,60%,12%)]/40" />
        </div>
        {/* Floating shapes */}
        <FloatingShape delay={1} className="top-12 left-[10%] hidden lg:block" />
        <FloatingShape delay={4} className="bottom-12 right-[10%] hidden lg:block" />
        <motion.div
          className="container mx-auto px-4 lg:px-8 relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Cena na ključ · brez skritih stroškov</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            IMATE PROJEKT V MISLIH?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-primary-foreground/75 mb-10 max-w-lg mx-auto">
            Pošljite povpraševanje — pripravimo ponudbo na ključ. Vsi potrebni mojstri, en račun, dogovorjen rok. Pridemo, zrihtamo, pospravimo za sabo in gremo.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25 h-12 px-8 group">
              <a href="#kontakt">
                Kontaktirajte nas
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </a>
            </Button>
            <Button asChild size="lg" className="text-base font-bold h-12 px-8 bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/25 backdrop-blur-sm">
              <a href="tel:+386040296555">
                <Phone className="h-4 w-4 mr-2" />
                040 296 555
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Conversion / Kontaktna forma */}
      <ContactSection />
    </main>
  );
};

export default Index;
