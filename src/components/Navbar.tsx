import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Domov", id: "domov" },
  { label: "Slikopleskarstvo", id: "storitve" },
  { label: "Kopalnice", id: "prenova-kopalnic" },
  { label: "Reference", id: "reference" },
  { label: "Zakaj nas", id: "zakaj-nas" },
  { label: "Mnenja", id: "mnenja" },
  { label: "Vprašanja", id: "faq" },
  { label: "Kontakt", id: "kontakt" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("domov");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: označi trenutno vidno sekcijo
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToId = useCallback((id: string) => {
    if (id === "domov") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNav = useCallback(
    (id: string) => {
      setOpen(false);
      setActive(id);
      if (location.pathname !== "/") {
        navigate("/");
        // počakaj, da se domača stran izriše, nato skrolaj
        setTimeout(() => scrollToId(id), 150);
      } else {
        scrollToId(id);
      }
    },
    [location.pathname, navigate, scrollToId]
  );

  const onDark = !scrolled; // svetla pisava na temnem heroju, temna po scrollu

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between h-18 px-4 lg:px-8 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNav("domov")}
          className={`flex shrink-0 items-center gap-2 xl:gap-3 transition-colors ${onDark ? "text-primary-foreground" : "text-foreground"}`}
        >
          <img src={logo} alt="FLACK logotip" className="h-12 w-12 lg:h-10 lg:w-10 xl:h-14 xl:w-14 rounded-full object-cover shadow-sm" />
          <span className="flex flex-col leading-none text-left">
            <span className="text-2xl xl:text-3xl font-black tracking-tight">FLACK</span>
            <span className={`text-[11px] font-medium tracking-wide mt-1 ${onDark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              Barva vašega doma
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0 xl:gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative px-1.5 xl:px-2 2xl:px-3 py-2 text-xs xl:text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
                    onDark
                      ? isActive
                        ? "text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground"
                      : isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop kontakt + CTA */}
        <div className="hidden lg:flex shrink-0 items-center gap-3">
          <a
            href="tel:+386040296555"
            className={`text-xs xl:text-sm whitespace-nowrap font-semibold transition-colors flex items-center gap-1.5 ${
              onDark ? "text-primary-foreground/70 hover:text-primary-foreground" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            040 296 555
          </a>
          <Button
            onClick={() => handleNav("kontakt")}
            size="sm"
            className="hidden 2xl:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20 group"
          >
            Stopite v kontakt
            <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Meni"
              className={`relative ${onDark ? "text-primary-foreground hover:bg-primary-foreground/10" : "text-foreground hover:bg-muted"}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-background p-0 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-border">
              <img src={logo} alt="FLACK logotip" className="h-12 w-12 rounded-full object-cover" />
              <div className="flex flex-col leading-none">
                <SheetTitle className="text-xl font-black tracking-tight">FLACK d.o.o.</SheetTitle>
                <span className="text-[11px] text-muted-foreground font-medium mt-1">Barva vašega doma</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive ? "bg-accent/10 text-accent" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    <ArrowRight className={`h-4 w-4 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                  </button>
                );
              })}
            </nav>

            {/* Kontakt + CTA */}
            <div className="border-t border-border p-4 space-y-3">
              <a href="tel:+386040296555" className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] text-muted-foreground font-medium">Pokličite</p>
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">040 296 555</p>
                </div>
              </a>
              <a href="mailto:info@flack.si" className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] text-muted-foreground font-medium">Pišite</p>
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">info@flack.si</p>
                </div>
              </a>
              <Button
                onClick={() => handleNav("kontakt")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 shadow-lg shadow-accent/20"
              >
                Pridobite ponudbo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-center text-[11px] text-muted-foreground pt-1">Ljubljana in okolica · Cena na ključ</p>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
