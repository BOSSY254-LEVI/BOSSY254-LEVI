import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code2, MessageSquare, MapPin, Clock, Github, Linkedin, Twitter, Briefcase, Zap, Cpu, Database, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';

const roles = [
  'Senior Full-Stack Developer',
  'Cloud Architect',
  'UI/UX Specialist',
  'Technical Lead',
  'Open Source Contributor',
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [visitorCount] = useState(Math.floor(Math.random() * 500) + 1247);
  const [thunderActive, setThunderActive] = useState(false);

  // Thunder effect at random intervals
  useEffect(() => {
    const thunderInterval = setInterval(() => {
      setThunderActive(true);
      setTimeout(() => setThunderActive(false), 100);
    }, Math.random() * 8000 + 2000);

    return () => clearInterval(thunderInterval);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '50+', label: 'Projects Delivered', icon: <Database className="w-3 h-3" /> },
    { number: '5+', label: 'Years Experience', icon: <Clock className="w-3 h-3" /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Zap className="w-3 h-3" /> },
    { number: '8+', label: 'Developers Mentored', icon: <Cpu className="w-3 h-3" /> },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/BOSSY254-LEVI', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/nairobian_bossy', label: 'Twitter' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden cyber-section">
      {/* Thunder Flash Effect */}
      {thunderActive && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent z-0 pointer-events-none animate-pulse" />
      )}
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Floating Tech Elements */}
      <div className="floating-object floating-tech-1" />
      <div className="floating-object floating-tech-2" />
      <div className="floating-object floating-tech-3" />
      <div className="floating-object floating-tech-4" />
      
      {/* Thunder Bolts */}
      <div className="thunder-overlay">
        <div className="thunder-bolt" />
        <div className="thunder-bolt" />
        <div className="thunder-bolt" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6 stagger-children">
            {/* Status badges with cyber theme */}
            <div className="flex flex-wrap gap-3">
              <Badge className="cyber-glow-sm text-sm py-2 px-4 border-primary/50 bg-primary/10">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow mr-2" />
                <Zap className="w-3 h-3 mr-1" />
                Open to Remote Positions Worldwide
              </Badge>
              <Badge className="cyber-glass border-secondary/50 text-sm py-2 px-3">
                <Briefcase className="w-3 h-3 mr-1" />
                $120K+ Positions
              </Badge>
            </div>

            {/* Location & Time with cyber style */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/50">
                <MapPin className="w-4 h-4 text-primary" />
                Nairobi, Kenya (EAT)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/50">
                <Clock className="w-4 h-4 text-secondary" />
                {currentTime}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/50">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {visitorCount.toLocaleString()} visitors
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Crafting <span className="cyber-gradient">Digital Experiences</span>{' '}
                That <span className="text-primary">Drive Results</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                I architect and develop <span className="text-primary font-semibold">high-performance web applications</span> that solve complex 
                business challenges. With expertise across the full stack and a passion for 
                <span className="text-secondary font-semibold"> user-centered design</span>, I create solutions that are both technically robust 
                and beautifully intuitive.
              </p>

              <div className="h-8 flex items-center relative">
                <div className="text-primary font-medium text-lg bg-surface/50 px-4 py-2 rounded-lg border-l-4 border-primary">
                  <code className="font-mono">
                    {displayText}
                    <span className="animate-pulse">█</span>
                  </code>
                </div>
              </div>

              {/* Daily Stack with cyber style */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-muted-foreground font-mono">Daily Stack:</span>
                {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'].map((tech, i) => (
                  <Badge key={tech} className="cyber-glass text-xs border-primary/30 animate-pulse-glow" style={{animationDelay: `${i * 200}ms`}}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button className="cyber-button gap-2 text-lg px-8 py-6 rounded-xl" asChild>
                <a href="#projects">
                  <Code2 className="w-6 h-6" />
                  <span className="font-semibold">Explore Portfolio</span>
                </a>
              </Button>
              <Button className="cyber-glass border-primary/50 hover:border-primary gap-2 text-lg px-8 py-6 rounded-xl" asChild>
                <a href="#contact">
                  <MessageSquare className="w-6 h-6" />
                  <span className="font-semibold">Schedule Interview</span>
                </a>
              </Button>
            </div>

            {/* Social Links with cyber style */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground font-mono">Connect:</span>
              {socialLinks.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-12 h-12 rounded-xl cyber-glass flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                  aria-label={social.label}
                  style={{animationDelay: `${i * 100}ms`}}
                >
                  <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                  <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* Stats with cyber cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="cyber-card p-4 rounded-xl text-center hover:transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="cyber-gradient text-2xl md:text-3xl font-bold">{stat.number}</div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative perspective-1000">
              {/* Main glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/20 rounded-full blur-3xl scale-75" />
              
              {/* Profile container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 transform-style-3d">
                {/* Rotating cyber border */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                      animationDuration: '6s',
                      WebkitMask: 'radial-gradient(transparent 60%, black 61%)',
                      mask: 'radial-gradient(transparent 60%, black 61%)',
                    }}
                  />
                </div>
                
                {/* Image container with scanline effect */}
                <div className="absolute inset-4 rounded-full overflow-hidden cyber-glass relative group">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.1) 50%)',
                      backgroundSize: '100% 4px',
                    }}
                  />
                  
                  <img
                    src="/bossie official.png"
                    alt="Livingstone Oduor Otieno"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating cyber badges */}
                {[
                  { text: 'React Expert', position: '-top-4 -right-4', delay: '0s', icon: <Zap className="w-3 h-3" /> },
                  { text: 'Cloud Architect', position: '-bottom-4 -left-4', delay: '1.5s', icon: <Cloud className="w-3 h-3" /> },
                  { text: 'TypeScript', position: 'top-1/2 -right-8', delay: '3s', icon: <Code2 className="w-3 h-3" /> },
                  { text: 'Node.js', position: 'top-1/4 -left-6', delay: '4.5s', icon: <Cpu className="w-3 h-3" /> },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`absolute ${badge.position} cyber-glass rounded-xl px-4 py-2 flex items-center gap-2 floating-fast`}
                    style={{ animationDelay: badge.delay }}
                  >
                    {badge.icon}
                    <span className="text-sm font-medium font-mono">{badge.text}</span>
                  </div>
                ))}

                {/* GitHub contribution preview - enhanced */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 cyber-glass rounded-2xl px-6 py-4 w-80 neon-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground font-mono">GitHub Activity</span>
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-primary" />
                      <span className="text-xs text-primary font-mono">ACTIVE</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 52 }).map((_, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <div
                            key={j}
                            className="w-1.5 h-1.5 rounded-sm transition-all duration-300 hover:scale-125"
                            style={{
                              backgroundColor: Math.random() > 0.5 
                                ? `hsl(var(--primary) / ${Math.random() * 0.8 + 0.3})` 
                                : `hsl(var(--secondary) / ${Math.random() * 0.6 + 0.2})`
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">500+ contributions this year</p>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cyber Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono animate-pulse">SCROLL TO EXPLORE</span>
          <div className="relative">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center overflow-hidden">
              <div className="w-1.5 h-3 bg-gradient-to-b from-primary to-transparent rounded-full mt-2 animate-bounce" />
            </div>
            <div className="absolute -inset-2 border border-primary/20 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 via-transparent to-transparent -translate-y-32 translate-x-32 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 via-transparent to-transparent translate-y-32 -translate-x-32 rounded-full blur-3xl" />
    </section>
  );
}
