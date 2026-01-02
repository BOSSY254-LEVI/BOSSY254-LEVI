import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ImpactDashboard } from '@/components/ImpactDashboard';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Palette, Server, Cloud, TrendingUp,
  Zap, Shield, Rocket, Sparkles, Globe,
  Clock, Award, Target, ChevronRight, Star, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: Code,
    title: 'Frontend Mastery',
    description: 'React, Next.js, TypeScript with 98% proficiency',
    link: '/skills',
    gradient: 'from-blue-500 to-cyan-500',
    stats: '40+ projects'
  },
  {
    icon: Server,
    title: 'Backend Excellence',
    description: 'Node.js, Python, PostgreSQL, microservices architecture',
    link: '/skills',
    gradient: 'from-purple-500 to-pink-500',
    stats: '99.9% uptime'
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'AWS, Docker, Kubernetes, CI/CD pipelines expert',
    link: '/skills',
    gradient: 'from-cyan-500 to-teal-500',
    stats: '50% cost savings'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Figma, user research, design systems, accessibility',
    link: '/skills',
    gradient: 'from-orange-500 to-red-500',
    stats: '4.8/5 satisfaction'
  },
];

const featuredProjects = [
  {
    title: 'HealthWise Buddy',
    category: 'AI Health Platform',
    image: '/healthwise buddy.png',
    metrics: '40% faster diagnosis • 10K+ users',
    technologies: ['React', 'TensorFlow', 'Node.js', 'MongoDB'],
    impact: 'Reduced diagnosis time by 2.5x',
    link: '/projects'
  },
  {
    title: 'Community Connect',
    category: 'Social Platform',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    metrics: '25K+ members • 99.9% uptime',
    technologies: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
    impact: 'Increased engagement by 300%',
    link: '/projects'
  },
  {
    title: 'TaskFlow Pro',
    category: 'Task Management',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    metrics: '50% efficiency gain • 5K+ users',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Docker'],
    impact: 'Boosted team productivity by 60%',
    link: '/projects'
  },
];

const testimonials = [
  {
    name: 'Collins Otieno',
    role: 'CTO at TechCorp',
    content: 'Exceptional work on our enterprise platform. Delivered ahead of schedule with 30% under budget.',
    rating: 5,
    project: 'E-commerce Migration'
  },
  {
    name: 'zack Muriuki',
    role: 'Product Lead at HealthTech',
    content: 'Transformed our patient portal. User satisfaction increased from 65% to 94% in 3 months.',
    rating: 5,
    project: 'Healthcare Portal'
  },
  {
    name: 'Dan Rodriguez',
    role: 'CEO at StartupX',
    content: 'Built our MVP in record time. Secured $2M funding based on the quality of the product.',
    rating: 5,
    project: 'FinTech Platform'
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <StarCursor />
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Quick Highlights - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary animate-pulse-glow">
              <Sparkles className="w-3 h-3 mr-2" />
              Core Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Full-Stack Mastery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technical capabilities across the entire development stack
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="cyber-card p-8 rounded-2xl group block h-full relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm">
                        <item.icon className="w-8 h-8 text-primary" />
                      </div>
                      <Badge className="text-xs font-mono px-2 py-1 bg-primary/20">
                        {item.stats}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center text-primary text-sm font-medium mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore expertise
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview - Enhanced */}
      <section className="py-24 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, hsl(var(--secondary) / 0.2) 0%, transparent 50%)`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Rocket className="w-3 h-3 mr-2" />
              Featured Projects
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Impact-Driven Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world applications delivering measurable business value and exceptional user experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <Link to={project.link} className="block">
                  <div className="cyber-card rounded-2xl overflow-hidden h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="backdrop-blur-md bg-white/10 text-white border-white/20">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary/30 text-primary/30" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.metrics}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Impact */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border/50">
                        <TrendingUpIcon className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">{project.impact}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
              <Link to="/projects">
                <span className="flex items-center gap-3">
                  View Complete Portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Award className="w-3 h-3 mr-2" />
              Client Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="cyber-glass rounded-3xl p-8 md:p-12">
              <div className="relative h-64">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === activeTestimonial
                        ? 'opacity-100 translate-x-0'
                        : index < activeTestimonial
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        
                        <blockquote className="text-xl italic mb-6">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div>
                          <div className="font-bold text-lg">{testimonial.name}</div>
                          <div className="text-muted-foreground">{testimonial.role}</div>
                          <div className="text-sm text-primary mt-1">{testimonial.project}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Testimonial Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial
                        ? 'bg-primary w-8'
                        : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <ImpactDashboard />

      {/* Value Proposition - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Target className="w-3 h-3 mr-2" />
              Strategic Value
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Beyond Code Delivery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions that drive business growth and technological innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: 'Business Growth Engine',
                description: 'Transform ideas into revenue-generating products with measurable ROI',
                features: ['Market Analysis', 'MVP Development', 'Growth Strategy', 'Performance Analytics'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Enterprise-Grade Security',
                description: 'Bank-level security protocols and compliance-ready architectures',
                features: ['Zero-Trust Architecture', 'GDPR/CCPA Compliance', 'Pentest Reports', 'Disaster Recovery'],
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Zap,
                title: 'Scalable Infrastructure',
                description: 'Future-proof solutions that grow with your business needs',
                features: ['Cloud Architecture', 'Microservices', 'Load Balancing', 'Auto-scaling'],
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((value, index) => (
              <div key={value.title} className="cyber-card p-8 rounded-2xl relative group">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${value.gradient}`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl">{value.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {value.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {value.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Learn more</span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="cyber-glass rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Build Something Extraordinary?
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's collaborate to create impactful digital solutions that drive your business forward.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="cyber-button px-8 py-6 text-lg rounded-xl" asChild>
                    <Link to="/contact">
                      <span className="flex items-center gap-3">
                        Start a Project
                        <Rocket className="w-5 h-5" />
                      </span>
                    </Link>
                  </Button>
                  
                  <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                    <Link to="/experience">
                      <span className="flex items-center gap-3">
                        View Experience
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-6">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Response within 24 hours
                    </span>
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      NDA Protection Available
                    </span>
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Global Remote Collaboration
                    </span>
                  </div>
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