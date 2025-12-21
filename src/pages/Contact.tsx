import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { ContactSection } from '@/components/ContactSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Twitter, 
  Calendar, MessageSquare, Clock, Globe, Zap, Sparkles,
  ChevronRight, Shield, CheckCircle, Target, Rocket, 
  Award, Cpu, Users, ExternalLink, Send, BookOpen,
  MessageCircle, Video, Mailbox, Download, Copy,
  MessageSquareText, Bell, Globe as GlobeIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'livingstoneoduory@gmail.com',
    description: 'Best for detailed project inquiries and formal communication',
    action: 'mailto:livingstoneoduory@gmail.com',
    gradient: 'from-blue-500 to-cyan-500',
    responseTime: 'Within 4 hours',
    preferred: true
  },
  {
    icon: Calendar,
    title: 'Schedule Call',
    value: 'Book a Meeting',
    description: '30-minute consultation for project discussions',
    action: 'https://calendly.com',
    gradient: 'from-purple-500 to-pink-500',
    responseTime: 'Select available slot',
    preferred: true
  },
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    value: '+254 721 373 455',
    description: 'Quick questions or urgent matters',
    action: 'https://wa.me/254721373455',
    gradient: 'from-green-500 to-emerald-500',
    responseTime: 'Within 15 minutes',
    preferred: false
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Livingstone Otieno',
    description: 'Professional networking and connections',
    action: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373',
    gradient: 'from-blue-600 to-blue-800',
    responseTime: 'Within 24 hours',
    preferred: false
  },
  {
    icon: Github,
    title: 'GitHub',
    value: '@BOSSY254-LEVI',
    description: 'Code reviews, contributions, and technical discussions',
    action: 'https://github.com/BOSSY254-LEVI',
    gradient: 'from-gray-700 to-gray-900',
    responseTime: 'Within 12 hours',
    preferred: false
  },
  {
    icon: Twitter,
    title: 'Twitter',
    value: '@nairobian_bossy',
    description: 'Industry discussions and quick updates',
    action: 'https://twitter.com/nairobian_bossy',
    gradient: 'from-sky-500 to-blue-500',
    responseTime: 'Within 6 hours',
    preferred: false
  },
];

const availability = [
  { 
    day: 'Monday - Friday', 
    hours: '9:00 AM - 6:00 PM EAT',
    status: 'Available',
    color: 'bg-green-500'
  },
  { 
    day: 'Saturday', 
    hours: '10:00 AM - 2:00 PM EAT',
    status: 'Limited',
    color: 'bg-yellow-500'
  },
  { 
    day: 'Sunday', 
    hours: 'Emergency Only',
    status: 'Restricted',
    color: 'bg-red-500'
  },
];

const services = [
  {
    icon: Cpu,
    title: 'Technical Consultation',
    description: 'Architecture reviews, code audits, and technical guidance',
    duration: '1-2 hours',
    format: 'Video Call + Report'
  },
  {
    icon: Rocket,
    title: 'Project Kickoff',
    description: 'Initial project planning, requirements gathering, and scoping',
    duration: '2-3 hours',
    format: 'Workshop Session'
  },
  {
    icon: Users,
    title: 'Team Training',
    description: 'Technical workshops, best practices, and skill development',
    duration: 'Custom',
    format: 'Interactive Sessions'
  },
  {
    icon: BookOpen,
    title: 'Code Review',
    description: 'In-depth code analysis, optimization suggestions, and security audit',
    duration: '4-8 hours',
    format: 'Detailed Report'
  },
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeService, setActiveService] = useState('Technical Consultation');

  useEffect(() => {
    if (copiedEmail) {
      const timer = setTimeout(() => setCopiedEmail(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedEmail]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <StarCursor />
      <Navigation />
      
      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
              <Sparkles className="w-3 h-3 mr-2" />
              Let's Connect
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Build Something <span className="cyber-gradient">Extraordinary</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you have a <span className="text-primary font-semibold">project in mind</span>, 
              want to discuss <span className="text-secondary font-semibold">technical opportunities</span>, 
              or just want to <span className="text-accent font-semibold">connect professionally</span> — 
              I'd love to hear from you and explore how we can collaborate.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {[
                { label: 'Response Time', value: '<4h', icon: <Clock className="w-4 h-4" /> },
                { label: 'Success Rate', value: '100%', icon: <Target className="w-4 h-4" /> },
                { label: 'Projects Completed', value: '50+', icon: <Award className="w-4 h-4" /> },
                { label: 'Global Clients', value: '12+', icon: <GlobeIcon className="w-4 h-4" /> },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cyber-card p-4 rounded-xl text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-2xl font-bold cyber-gradient">{stat.value}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods - Enhanced */}
      <section className="py-16 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, hsl(var(--secondary) / 0.1) 0%, transparent 50%)`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Zap className="w-3 h-3 mr-2" />
              Connect With Me
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-gradient">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the communication method that works best for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : undefined}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`cyber-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 ${
                  method.preferred ? 'border-primary/50' : ''
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${method.gradient}`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    {method.preferred && (
                      <Badge className="bg-primary/20 text-primary text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  
                  {/* Title & Value */}
                  <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                  <p className="text-lg text-primary font-medium mb-3">{method.value}</p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  
                  {/* Response Time */}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Response time</span>
                    <span className="text-xs font-medium">{method.responseTime}</span>
                  </div>
                  
                  {/* Hover CTA */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span>Connect now</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <ContactSection />

      {/* Services & Availability - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Services */}
            <div className="cyber-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <MessageSquareText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Consultation Services</h3>
                  <p className="text-sm text-muted-foreground">Structured engagement options</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.title}
                    onClick={() => setActiveService(service.title)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeService === service.title
                        ? 'cyber-glass border-primary/50'
                        : 'cyber-glass hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{service.title}</h4>
                          <Badge className="text-xs">{service.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="text-xs text-primary">{service.format}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">All services include detailed follow-up report</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-8">
              <div className="cyber-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Availability</h3>
                    <p className="text-sm text-muted-foreground">East Africa Time (EAT) • UTC+3</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {availability.map((slot) => (
                    <div key={slot.day} className="flex items-center justify-between p-4 rounded-xl cyber-glass">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${slot.color} animate-pulse`} />
                          <span className="font-medium">{slot.day}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{slot.hours}</div>
                        <Badge className={`mt-1 text-xs ${
                          slot.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                          slot.status === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {slot.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Currently accepting new projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Next available slot: <span className="text-primary font-medium">Within 3 business days</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="cyber-card p-8 rounded-2xl">
                <h3 className="font-bold text-xl mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="cyber-button w-full justify-start py-4" asChild>
                    <a href="mailto:livingstoneoduory@gmail.com">
                      <Send className="w-4 h-4 mr-3" />
                      Send Detailed Inquiry
                    </a>
                  </Button>
                  
                  <Button className="cyber-glass border-primary/50 hover:border-primary w-full justify-start py-4" asChild>
                    <a href="https://www.linkedin.com/in/livingstone-otieno-bb0baa373" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-3" />
                      Connect on LinkedIn
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                  </Button>
                  
                  <Button className="cyber-glass border-secondary/50 hover:border-secondary w-full justify-start py-4" asChild>
                    <a href="tel:+254721373455">
                      <Phone className="w-4 h-4 mr-3" />
                      Schedule Phone Call
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Copy & Social - Enhanced */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Email Copy */}
            <div className="cyber-card p-8 rounded-2xl text-center mb-8">
              <Mailbox className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Copy Email Address</h3>
              <p className="text-muted-foreground mb-6">
                Click to copy or save for your records
              </p>
              
              <div className="relative max-w-md mx-auto">
                <div className="cyber-glass p-4 rounded-xl text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Primary Email</div>
                      <div className="font-mono text-primary">livingstoneoduory@gmail.com</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('livingstoneoduory@gmail.com')}
                      className="text-primary hover:text-primary"
                    >
                      {copiedEmail ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Location */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="cyber-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-bold">Global Presence</h3>
                    <p className="text-sm text-muted-foreground">Remote-first, globally connected</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Nairobi, Kenya</div>
                      <div className="text-sm text-muted-foreground">Headquarters</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GlobeIcon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">UTC+3 (EAT)</div>
                      <div className="text-sm text-muted-foreground">East Africa Time Zone</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Remote Collaboration</div>
                      <div className="text-sm text-muted-foreground">5+ years experience</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-bold">Social Presence</h3>
                    <p className="text-sm text-muted-foreground">Follow for updates</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373' },
                    { icon: Github, label: 'GitHub', href: 'https://github.com/BOSSY254-LEVI' },
                    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/nairobian_bossy' },
                    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/254721373455' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] cyber-glass p-4 rounded-xl text-center hover:bg-primary/10 transition-colors group"
                    >
                      <social.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-sm font-medium">{social.label}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="cyber-glass rounded-3xl p-12 max-w-4xl mx-auto text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="cyber-gradient">Standards</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every interaction is handled with confidentiality, professionalism, and respect for your time.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: 'Confidentiality',
                    description: 'NDA available upon request'
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: 'Timely Responses',
                    description: 'Guaranteed within 4 hours'
                  },
                  {
                    icon: <CheckCircle className="w-6 h-6" />,
                    title: 'Professionalism',
                    description: 'Clear communication and follow-up'
                  }
                ].map((value, index) => (
                  <div key={value.title} className="cyber-card p-6 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
                  <a href="/Assets/Livingstone_cv.pdf" download>
                    <Download className="w-5 h-5 mr-3" />
                    Download Resume
                  </a>
                </Button>
                
                <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                  <a href="mailto:livingstoneoduory@gmail.com?subject=Project%20Inquiry&body=Hello%20Livingstone%2C%0A%0AI%20would%20like%20to%20discuss%3A">
                    <Send className="w-5 h-5 mr-3" />
                    Start Conversation
                  </a>
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-400" />
                    Automated booking confirmation
                  </span>
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-green-400" />
                    Flexible video call options
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    Follow-up summary provided
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
