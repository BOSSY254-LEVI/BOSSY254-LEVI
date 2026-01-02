import { Mail, Phone, Linkedin, Github, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Web Development',
  'UI/UX Design',
  'Mobile Apps',
  'Cloud Solutions',
  'Consulting',
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/BOSSY254-LEVI', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/nairobian_bossy', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="text-2xl font-bold mb-4 block">
              Livingstone<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              Senior Full-Stack Developer & UI/UX Specialist. Creating digital experiences 
              that drive business growth and user satisfaction.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:livingstoneoduory@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                livingstoneoduory@gmail.com
              </a>
              <a href="tel:+254721373455" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +254 721373455
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get insights on web development, design trends, and tech innovations.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary/50 border-border text-sm"
              />
              <Button variant="glow" size="sm">
                Subscribe
              </Button>
            </form>
            
            {/* Social */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Connect</p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Livingstone Oduor Otieno. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            BUILT WITH <Heart className="w-4 h-4 text-red-500" /> FOR BOSSIE LEVI LTD
          </p>
        </div>
      </div>
    </footer>
  );
}
