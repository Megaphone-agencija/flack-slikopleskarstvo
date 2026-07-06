import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="FLACK logotip" className="h-20 w-20 rounded-full object-cover bg-primary-foreground/10" />
              <h3 className="text-2xl font-black tracking-wide">FLACK</h3>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Slikopleskarstvo, fasade, kitanje sten in zaključna dela v gradbeništvu. Kakovostna izvedba in urejena površina od prvega do zadnjega zamaha s čopičem.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-1 bg-accent rounded-full" />
              <span className="text-xs text-primary-foreground/40 font-semibold uppercase tracking-widest">Ljubljana</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-primary-foreground/80">Navigacija</h4>
            <ul className="space-y-3">
              {[
                { label: "Domov", href: "#domov" },
                { label: "Storitve", href: "#storitve" },
                { label: "Zakaj nas", href: "#zakaj-nas" },
                { label: "Mnenja", href: "#mnenja" },
                { label: "Vprašanja", href: "#faq" },
                { label: "Kontakt", href: "#kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-primary-foreground/80">Storitve</h4>
            <ul className="space-y-3">
              {["Slikopleskarstvo", "Fasade", "Manjša zaključna dela"].map((s) => (
                <li key={s}>
                  <span className="text-sm text-primary-foreground/55">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-primary-foreground/80">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+386040296555" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/40 font-medium">Telefon</p>
                    <p className="text-sm text-primary-foreground/70 group-hover:text-primary-foreground transition-colors">040 296 555</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:sliko.flackdoo@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/40 font-medium">E-pošta</p>
                    <p className="text-sm text-primary-foreground/70 group-hover:text-primary-foreground transition-colors">sliko.flackdoo@gmail.com</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/40 font-medium">Naslov</p>
                    <p className="text-sm text-primary-foreground/70">Voduškova ulica 21, 1000 Ljubljana</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} FLACK d.o.o. Vse pravice pridržane.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Davčna št.: 21943788 · Matična št.: 9845640000
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
