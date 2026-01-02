import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';

import { CertificationsSection } from '@/components/CertificationsSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  MapPin, Mail, Phone, Linkedin, Github, Twitter, 
  Award, Target, Heart, Lightbulb, Users, BookOpen,
  ArrowRight, Download, Calendar, Globe, Code, Cpu,
  Sparkles, Zap, TrendingUp, Shield, Compass, Rocket,
  Database, Palette  
} from 'lucide-react';

import { motion } from 'framer-motion';
import { useState } from 'react';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Every line of code I write is focused on delivering measurable business outcomes.',
    gradient: 'from-red-500 to-orange-500',
    metrics: '98% Client Satisfaction'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Stay ahead of technology trends to bring cutting-edge solutions to every project.',
    gradient: 'from-yellow-500 to-amber-500',
    metrics: '40+ Modern Projects'
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'Believe the best products come from diverse teams working together effectively.',
    gradient: 'from-blue-500 to-cyan-500',
    metrics: '8+ Developers Mentored'
  },
  {
    icon: Heart,
    title: 'User-Centered',
    description: 'Design and build with the end user in mind, creating intuitive experiences.',
    gradient: 'from-pink-500 to-rose-500',
    metrics: '94% User Satisfaction'
  },
];

const timeline = [
  {
    year: '2025',
    title: 'Bachelor of IT - Tom Mboya University',
    description: 'Specializing in Cloud Computing and AI. Dean\'s List for Academic Excellence.',
    icon: <BookOpen className="w-5 h-5" />,
    tags: ['Cloud Computing', 'AI', 'Research']
  },
  {
    year: '2024',
    title: 'Database Design & SQL - Power Learn Project',
    description: 'Mastered PHP, PostgreSQL, and participated in multiple hackathons.',
    icon: <Database className="w-5 h-5" />,
    tags: ['PostgreSQL', 'PHP', 'Hackathons']
  },
  {
    year: '2023',
    title: 'Google UX Design Professional',
    description: 'Comprehensive UX certification covering research, prototyping, and accessibility.',
    icon: <Palette className="w-5 h-5" />,
    tags: ['UX Research', 'Accessibility', 'Prototyping']
  },
  {
    year: '2022',
    title: 'Senior Full-Stack Developer',
    description: 'Promoted to senior role, leading enterprise SaaS development.',
    icon: <Code className="w-5 h-5" />,
    tags: ['Leadership', 'SaaS', 'Enterprise']
  },
  {
    year: '2020',
    title: 'Started Professional Career',
    description: 'Began as Frontend Developer, advancing through Full-Stack roles.',
    icon: <Rocket className="w-5 h-5" />,
    tags: ['Frontend', 'Full-Stack', 'Growth']
  },
  {
    year: '2020',
    title: 'High School - Sawagongo',
    description: 'Top student in Mathematics and English. Developed leadership skills.',
    icon: <Award className="w-5 h-5" />,
    tags: ['Mathematics', 'Leadership', 'Excellence']
  },
];

const stats = [
  { label: 'Projects Delivered', value: '50+', icon: <Code className="w-4 h-4" /> },
  { label: 'Years Experience', value: '5+', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Client Satisfaction', value: '98%', icon: <Heart className="w-4 h-4" /> },
  { label: 'Team Members Mentored', value: '8+', icon: <Users className="w-4 h-4" /> },
  { label: 'Countries Served', value: '12+', icon: <Globe className="w-4 h-4" /> },
  { label: 'Technologies', value: '25+', icon: <Cpu className="w-4 h-4" /> },
];

export default function About() {
  const [activeYear, setActiveYear] = useState('2025');

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <StarCursor />
      <Navigation />
      
      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Professional Profile
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Livingstone <span className="cyber-gradient">Oduor Otieno</span>
                </h1>
                <div className="inline-block mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Senior Full-Stack Developer & Cloud Architect
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  With 5+ years of experience architecting and building scalable web applications 
                  for global clients. Specializing in modern JavaScript ecosystems, cloud infrastructure, 
                  and delivering exceptional user experiences that drive business growth.
                </p>
              </div>

              {/* Contact Info - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="cyber-glass p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">Nairobi, Kenya</div>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-glass p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/20">
                      <Mail className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">livingstoneoduory@gmail.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-glass p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">+254 721 373 455</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links - Enhanced */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">Connect:</div>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373', label: 'LinkedIn', color: 'bg-blue-500/20 hover:bg-blue-500/30' },
                    { icon: Github, href: 'https://github.com/BOSSY254-LEVI', label: 'GitHub', color: 'bg-gray-800/20 hover:bg-gray-800/30' },
                    { icon: Twitter, href: 'https://twitter.com/nairobian_bossy', label: 'Twitter', color: 'bg-sky-500/20 hover:bg-sky-500/30' },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} w-12 h-12 rounded-xl cyber-glass flex items-center justify-center transition-all duration-300 hover:scale-110 group relative`}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-6 h-6 group-hover:text-white transition-colors" />
                      <div className="absolute -inset-1 rounded-xl bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
                  <a href="/LIVINGSTONE ODUOR CV.pdf" download>
                    <Download className="w-5 h-5 mr-3" />
                    Download Resume
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                  <Link to="/contact">
                    Start Collaboration
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Profile - Enhanced */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                      animationDuration: '8s',
                      WebkitMask: 'radial-gradient(transparent 65%, black 66%)',
                      mask: 'radial-gradient(transparent 65%, black 66%)',
                    }}
                  />
                </div>
                
                {/* Profile Image */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden cyber-glass group">
                  <img
                    src="/bossie official.png"
                    alt="Livingstone Oduor Otieno"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 cyber-glass p-4 rounded-xl animate-float">
                  <div className="text-center">
                    <div className="text-2xl font-bold cyber-gradient">5+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 cyber-glass p-4 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold cyber-gradient">50+</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={stat.label} className="cyber-card p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {stat.icon}
                      <div className="text-xl font-bold cyber-gradient">{stat.value}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
                <Compass className="w-3 h-3 mr-2" />
                My Journey
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 cyber-gradient">
                From Nairobi to Global Impact
              </h2>
            </div>

            <div className="cyber-glass rounded-3xl p-8 md:p-12">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  My journey into technology began at <span className="text-primary font-semibold">Sawagongo High School</span>, where my passion for 
                  Mathematics and problem-solving laid the foundation for my career in software development. 
                  Being recognized as the top student in Math and English, I developed the analytical skills 
                  that would later prove invaluable in architecting complex systems.
                </p>
                
                <p>
                  Since starting my professional career in 2019, I've had the privilege of working with 
                  startups and enterprises across Africa and globally. From building <span className="text-secondary font-semibold">AI-powered health 
                  platforms serving 10,000+ users</span> to architecting enterprise SaaS solutions, each project 
                  has deepened my expertise and expanded my perspective.
                </p>
                
                <p>
                  Currently pursuing my <span className="text-accent font-semibold">Bachelor of Information Technology at Tom Mboya University</span> with a 
                  focus on Cloud Computing and AI, I continue to blend academic rigor with practical 
                  industry experience. My mission is to leverage technology to solve real African and 
                  global challenges, creating solutions that are both technically excellent and 
                  meaningfully impactful.
                </p>
                
                <p>
                  As a <span className="gradient-text font-semibold">Senior Full-Stack Developer</span>, I've led teams, mentored 8+ junior developers, and 
                  established coding standards that have improved team productivity by 60%. I believe 
                  in building not just great software, but great teams that can sustain and scale that software.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-border/50">
                {stats.slice(2).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold cyber-gradient mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Enhanced */}
      <section className="py-24 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, hsl(var(--secondary) / 0.1) 0%, transparent 50%)`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Target className="w-3 h-3 mr-2" />
              Core Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              What Drives My Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision and line of code I write
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`cyber-card p-8 rounded-2xl h-full relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${value.gradient} w-fit mb-6`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {value.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="pt-4 border-t border-border/50 mt-4">
                      <div className="text-sm font-medium text-primary">{value.metrics}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Calendar className="w-3 h-3 mr-2" />
              Career Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Professional Timeline
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A journey of continuous learning, growth, and impactful contributions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Year Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {timeline.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  className={`px-4 py-2 rounded-lg transition-all font-mono ${
                    activeYear === item.year
                      ? 'bg-primary text-white cyber-glow-sm'
                      : 'cyber-glass hover:bg-primary/10'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline Node */}
                  <div className="w-1/2 flex justify-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center relative ${
                      activeYear === item.year 
                        ? 'cyber-glow bg-primary text-white' 
                        : 'cyber-glass bg-background'
                    }`}>
                      {item.icon}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                        {item.year}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className={`cyber-card p-6 rounded-2xl ${activeYear === item.year ? 'border-primary/50' : ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${activeYear === item.year ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsSection />

      {/* CTA Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="cyber-glass rounded-3xl p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Something <span className="cyber-gradient">Extraordinary?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always excited to discuss innovative projects, creative ideas, or opportunities 
                to contribute to your vision with technical excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
                  <Link to="/contact">
                    <span className="flex items-center gap-3">
                      Start a Conversation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </Button>
                
                <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                  <Link to="/projects">
                    <span className="flex items-center gap-3">
                      View Portfolio
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    Fully Secured Communication
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Quick Response (24h)
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Free Initial Consultation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
