import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, TrendingUp, Users, Zap, Database, Server, Shield, Clock, Code, Layers, ChevronRight, Eye, Cpu, Award, Sparkles, Target, Lock, Rocket } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Health Wise Buddy',
    subtitle: 'AI Health Platform',
    role: 'Lead Full-Stack Developer & AI Integration Specialist',
    description: 'A comprehensive health and wellness platform leveraging AI to provide personalized health recommendations, symptom tracking, and virtual consultations. Built to scale for healthcare providers across Africa.',
    image: 'public/healthwise buddy.png',
    liveUrl: '#',
    tech: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'AWS Lambda', 'Redis', 'WebRTC', 'Docker'],
    metrics: [
      { icon: TrendingUp, value: '40%', label: 'Faster Diagnosis', color: 'from-green-500 to-emerald-500' },
      { icon: Users, value: '10K+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
      { icon: Zap, value: '95+', label: 'Lighthouse Score', color: 'from-yellow-500 to-amber-500' },
    ],
    highlights: [
      'Implemented ML-powered symptom checker with 92% accuracy',
      'Built real-time telemedicine video calling with WebRTC',
      'Designed microservices architecture handling 50K+ daily requests',
      'Integrated with 3 major health insurance APIs',
      'Implemented HIPAA-compliant data encryption',
    ],
    architecture: 'Microservices with event-driven architecture, Redis caching, and auto-scaling on AWS',
    category: 'Healthcare',
    year: '2024',
    duration: '8 months',
    impact: 'Improved healthcare access for rural communities',
    complexity: 'High',
    teamSize: '8 members'
  },
  {
    title: 'Community Hub',
    subtitle: 'Enterprise Social Platform',
    role: 'Enterprise Backend Architect',
    description: 'Enterprise-grade social platform connecting communities with real-time event management, discussion forums, and resource sharing. Built with high availability and zero-downtime deployments.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    liveUrl: 'https://communityhub-eta.vercel.app/',
    githubUrl: 'https://github.com/BOSSY254-LEVI',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Redis', 'Docker', 'Kubernetes'],
    metrics: [
      { icon: Users, value: '25K+', label: 'Members', color: 'from-purple-500 to-pink-500' },
      { icon: Server, value: '99.9%', label: 'Uptime', color: 'from-green-500 to-emerald-500' },
      { icon: Zap, value: '<100ms', label: 'Response Time', color: 'from-blue-500 to-cyan-500' },
    ],
    highlights: [
      'Implemented real-time messaging with WebSocket clustering',
      'Built notification system processing 100K+ messages/day',
      'Designed database schema with advanced indexing strategies',
      'Zero-downtime deployments with blue-green strategy',
      'Implemented content moderation with AI filtering',
    ],
    architecture: 'Next.js with PostgreSQL, Redis pub/sub for real-time features, Kubernetes orchestration',
    category: 'Social',
    year: '2024',
    duration: '6 months',
    impact: 'Enhanced community engagement and collaboration',
    complexity: 'Medium',
    teamSize: '6 members'
  },
  {
    title: 'ShopSphere',
    subtitle: 'Enterprise E-Commerce',
    role: 'Full-Stack Developer & Systems Architect',
    description: 'Full-stack e-commerce solution with advanced inventory management, AI-powered recommendations, and multi-payment gateway integration for high-volume retail.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    tech: ['Vue.js', 'Django', 'PostgreSQL', 'Stripe', 'Docker', 'Elasticsearch', 'Celery'],
    metrics: [
      { icon: TrendingUp, value: '3x', label: 'Sales Growth', color: 'from-green-500 to-emerald-500' },
      { icon: Zap, value: '50%', label: 'Faster Load', color: 'from-yellow-500 to-amber-500' },
      { icon: Database, value: '1M+', label: 'Products', color: 'from-orange-500 to-red-500' },
    ],
    highlights: [
      'Built recommendation engine increasing conversions by 35%',
      'Implemented Elasticsearch for sub-50ms product searches',
      'Integrated Stripe, PayPal, and M-Pesa payment gateways',
      'Designed inventory system tracking 1M+ SKUs',
      'Implemented dynamic pricing engine based on demand',
    ],
    architecture: 'Django REST API with Vue.js SPA, Elasticsearch, Celery task queue, PostgreSQL with read replicas',
    category: 'E-Commerce',
    year: '2023',
    duration: '10 months',
    impact: 'Scaled to handle 10,000+ daily transactions',
    complexity: 'High',
    teamSize: '12 members'
  },
  {
    title: 'Easy Track Organization',
    subtitle: 'Task Management Platform',
    role: 'Full-Stack Developer & Product Designer',
    description: 'Comprehensive organization and task tracking platform designed to streamline project management, enhance team collaboration, and boost productivity through intuitive dashboards.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
    liveUrl: 'https://easy-track-organization.vercel.app/',
    githubUrl: 'https://github.com/bossy254-levi/easy-track-organization',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel', 'Pusher', 'TailwindCSS'],
    metrics: [
      { icon: TrendingUp, value: '50%', label: 'Efficiency Gain', color: 'from-green-500 to-emerald-500' },
      { icon: Users, value: '5K+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
      { icon: Shield, value: 'SOC2', label: 'Compliant', color: 'from-purple-500 to-pink-500' },
    ],
    highlights: [
      'Built drag-and-drop Kanban with optimistic updates',
      'Implemented real-time collaboration with Pusher',
      'Designed role-based access control (RBAC) system',
      'Created automated workflow triggers and notifications',
      'Built time tracking and reporting dashboard',
    ],
    architecture: 'Next.js App Router with Prisma ORM, real-time sync via Pusher, edge functions on Vercel',
    category: 'Productivity',
    year: '2024',
    duration: '5 months',
    impact: 'Reduced project completion time by 30%',
    complexity: 'Medium',
    teamSize: '4 members'
  },
  {
    title: 'FinanceFlow',
    subtitle: 'Personal Finance Manager',
    role: 'Lead Developer & UX Designer',
    description: 'Smart personal finance application with AI-powered expense categorization, budget tracking, investment portfolio monitoring, and financial goal setting.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/BOSSY254-LEVI',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Plaid API', 'Chart.js', 'Firebase'],
    metrics: [
      { icon: Users, value: '8K+', label: 'Downloads', color: 'from-purple-500 to-pink-500' },
      { icon: TrendingUp, value: '25%', label: 'Savings Increase', color: 'from-green-500 to-emerald-500' },
      { icon: Zap, value: '4.8★', label: 'App Rating', color: 'from-yellow-500 to-amber-500' },
    ],
    highlights: [
      'Built AI expense categorization with 95% accuracy',
      'Integrated Plaid for secure bank connections',
      'Implemented investment tracking with real-time data',
      'Created personalized savings recommendations',
      'Built cross-platform mobile app with React Native',
    ],
    architecture: 'React Native with Node.js backend, MongoDB for data, Firebase for auth and notifications',
    category: 'FinTech',
    year: '2023',
    duration: '7 months',
    impact: 'Helped users save over $2M collectively',
    complexity: 'Medium',
    teamSize: '5 members'
  },
  {
    title: 'EduLearn Pro',
    subtitle: 'E-Learning Platform',
    role: 'Full-Stack Developer',
    description: 'Comprehensive online learning platform with video courses, interactive quizzes, progress tracking, and certification system for professional development.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    liveUrl: '#',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS S3', 'Stripe', 'WebRTC'],
    metrics: [
      { icon: Users, value: '15K+', label: 'Students', color: 'from-blue-500 to-cyan-500' },
      { icon: Database, value: '500+', label: 'Courses', color: 'from-orange-500 to-red-500' },
      { icon: TrendingUp, value: '85%', label: 'Completion Rate', color: 'from-green-500 to-emerald-500' },
    ],
    highlights: [
      'Built video streaming with adaptive bitrate',
      'Implemented interactive quizzes with instant feedback',
      'Created certification system with blockchain verification',
      'Built instructor dashboard with analytics',
      'Integrated payment system with subscription tiers',
    ],
    architecture: 'Next.js with PostgreSQL, AWS S3 for media, Stripe for payments, WebRTC for live sessions',
    category: 'EdTech',
    year: '2023',
    duration: '9 months',
    impact: 'Increased course completion rates by 40%',
    complexity: 'High',
    teamSize: '10 members'
  },
  {
    title: 'RealtyHub',
    subtitle: 'Real Estate Platform',
    role: 'Backend Developer & DevOps',
    description: 'Modern real estate listing platform with virtual tours, AI property valuation, mortgage calculator, and agent management system.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Mapbox', 'Three.js'],
    metrics: [
      { icon: Database, value: '50K+', label: 'Listings', color: 'from-orange-500 to-red-500' },
      { icon: Users, value: '20K+', label: 'Monthly Users', color: 'from-blue-500 to-cyan-500' },
      { icon: TrendingUp, value: '40%', label: 'Lead Conversion', color: 'from-green-500 to-emerald-500' },
    ],
    highlights: [
      'Built 3D virtual tour viewer with Three.js',
      'Implemented AI property valuation model',
      'Created advanced search with geospatial queries',
      'Built agent matching algorithm',
      'Integrated mortgage pre-approval workflow',
    ],
    architecture: 'React SPA with FastAPI backend, PostgreSQL with PostGIS, Redis caching, Mapbox integration',
    category: 'PropTech',
    year: '2023',
    duration: '8 months',
    impact: 'Streamlined property search by 60%',
    complexity: 'High',
    teamSize: '8 members'
  },
  {
    title: 'LogiTrack',
    subtitle: 'Logistics Management',
    role: 'Full-Stack Developer',
    description: 'End-to-end logistics management system with real-time fleet tracking, route optimization, delivery scheduling, and customer notifications.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/BOSSY254-LEVI',
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API', 'Twilio'],
    metrics: [
      { icon: Zap, value: '30%', label: 'Faster Delivery', color: 'from-yellow-500 to-amber-500' },
      { icon: TrendingUp, value: '20%', label: 'Cost Reduction', color: 'from-green-500 to-emerald-500' },
      { icon: Users, value: '100+', label: 'Fleet Vehicles', color: 'from-blue-500 to-cyan-500' },
    ],
    highlights: [
      'Built real-time GPS tracking with Socket.io',
      'Implemented route optimization algorithm',
      'Created driver mobile app with offline support',
      'Built customer notification system via SMS/Email',
      'Integrated fuel consumption analytics',
    ],
    architecture: 'Vue.js frontend, Node.js with MongoDB, Socket.io for real-time, Google Maps for routing',
    category: 'Logistics',
    year: '2022',
    duration: '6 months',
    impact: 'Reduced fuel costs by 15%',
    complexity: 'Medium',
    teamSize: '6 members'
  },
  {
    title: 'FoodieExpress',
    subtitle: 'Food Delivery App',
    role: 'Mobile Developer & API Architect',
    description: 'Food delivery application connecting restaurants with customers, featuring real-time order tracking, driver management, and restaurant analytics.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Firebase', 'Mapbox'],
    metrics: [
      { icon: Users, value: '30K+', label: 'App Users', color: 'from-purple-500 to-pink-500' },
      { icon: Database, value: '200+', label: 'Restaurants', color: 'from-orange-500 to-red-500' },
      { icon: Zap, value: '<30min', label: 'Avg Delivery', color: 'from-yellow-500 to-amber-500' },
    ],
    highlights: [
      'Built real-time order tracking with live map',
      'Implemented driver assignment algorithm',
      'Created restaurant management dashboard',
      'Built loyalty points and rewards system',
      'Integrated multiple payment methods including M-Pesa',
    ],
    architecture: 'React Native apps, Node.js microservices, PostgreSQL, Redis for caching, Firebase for notifications',
    category: 'FoodTech',
    year: '2022',
    duration: '7 months',
    impact: 'Increased restaurant revenue by 35%',
    complexity: 'High',
    teamSize: '9 members'
  },
  {
    title: 'HRMatrix',
    subtitle: 'HR Management System',
    role: 'Technical Lead',
    description: 'Enterprise HR management solution with employee onboarding, payroll processing, leave management, performance reviews, and recruitment tracking.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Elasticsearch', 'Docker', 'Jenkins'],
    metrics: [
      { icon: Users, value: '5K+', label: 'Employees Managed', color: 'from-blue-500 to-cyan-500' },
      { icon: TrendingUp, value: '60%', label: 'Process Automation', color: 'from-green-500 to-emerald-500' },
      { icon: Shield, value: 'GDPR', label: 'Compliant', color: 'from-purple-500 to-pink-500' },
    ],
    highlights: [
      'Built automated payroll calculation engine',
      'Implemented performance review workflows',
      'Created recruitment ATS with resume parsing',
      'Built employee self-service portal',
      'Integrated with major accounting software',
    ],
    architecture: 'Angular frontend, Spring Boot microservices, PostgreSQL, Elasticsearch for search, Docker deployment',
    category: 'Enterprise',
    year: '2022',
    duration: '12 months',
    impact: 'Reduced HR processing time by 70%',
    complexity: 'High',
    teamSize: '15 members'
  },
];

const categories = ['All', 'Healthcare', 'Social', 'E-Commerce', 'Productivity', 'FinTech', 'EdTech', 'PropTech', 'Logistics', 'FoodTech', 'Enterprise'];

const filters = [
  { icon: <Rocket className="w-4 h-4" />, label: 'Complexity', options: ['All', 'High', 'Medium'] },
  { icon: <Clock className="w-4 h-4" />, label: 'Duration', options: ['All', '<6 months', '6-9 months', '>9 months'] },
  { icon: <Users className="w-4 h-4" />, label: 'Team Size', options: ['All', 'Small (<5)', 'Medium (5-10)', 'Large (>10)'] },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="cyber-card rounded-2xl overflow-hidden h-full group transition-all duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          
          {/* Category & Info Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="backdrop-blur-xl bg-primary/20 text-primary border-primary/30">
              {project.category}
            </Badge>
            <Badge className="backdrop-blur-xl bg-secondary/20 text-secondary border-secondary/30">
              {project.year}
            </Badge>
            <Badge className="backdrop-blur-xl bg-accent/20 text-accent border-accent/30">
              {project.duration}
            </Badge>
          </div>
          
          {/* Tech Stack Preview */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-wrap gap-1 justify-end">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge key={tech} className="text-xs backdrop-blur-xl bg-white/10 text-white">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <Badge className="text-xs backdrop-blur-xl bg-white/10 text-white">
                  +{project.tech.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Hover Overlay with CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {project.liveUrl && (
                <Button className="cyber-glow-sm px-4 py-2 rounded-lg bg-primary text-white" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button className="cyber-glass border-white/30 text-white px-4 py-2 rounded-lg" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title & Role */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <Badge className="text-xs bg-primary/10 text-primary">
                {project.role.split('&')[0].trim()}
              </Badge>
            </div>
            <p className="text-sm text-primary font-medium mb-1">{project.subtitle}</p>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className={`text-lg font-bold bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary/80"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary/80">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-3 rounded-lg cyber-glass border-border/50 hover:border-primary/50 transition-all duration-300 flex items-center justify-between group/button"
          >
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              {showDetails ? 'Hide Technical Details' : 'View Technical Details'}
            </span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
          </button>

          {/* Expandable Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t border-border/50">
                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-primary" />
                      System Architecture
                    </h4>
                    <p className="text-sm text-muted-foreground bg-surface/50 p-3 rounded-lg">
                      {project.architecture}
                    </p>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Team:</span>
                        <span className="font-medium">{project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Complexity:</span>
                        <Badge className={`text-xs ${project.complexity === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                          {project.complexity}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Business Impact</div>
                        <div className="font-medium">{project.impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilters, setActiveFilters] = useState({
    Complexity: 'All',
    Duration: 'All',
    'Team Size': 'All'
  });

  const filteredProjects = projects.filter(project => {
    if (activeCategory !== 'All' && project.category !== activeCategory) return false;
    
    if (activeFilters.Complexity !== 'All' && project.complexity !== activeFilters.Complexity) return false;
    
    if (activeFilters.Duration !== 'All') {
      const duration = project.duration;
      const months = parseInt(duration);
      if (activeFilters.Duration === '<6 months' && months >= 6) return false;
      if (activeFilters.Duration === '6-9 months' && (months < 6 || months > 9)) return false;
      if (activeFilters.Duration === '>9 months' && months <= 9) return false;
    }
    
    if (activeFilters['Team Size'] !== 'All') {
      const teamSize = project.teamSize;
      const sizeNum = parseInt(teamSize);
      if (activeFilters['Team Size'] === 'Small (<5)' && sizeNum >= 5) return false;
      if (activeFilters['Team Size'] === 'Medium (5-10)' && (sizeNum < 5 || sizeNum > 10)) return false;
      if (activeFilters['Team Size'] === 'Large (>10)' && sizeNum <= 10) return false;
    }
    
    return true;
  });

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
              Project Portfolio
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Featured <span className="cyber-gradient">Projects</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade solutions delivering measurable business impact across industries. 
              Each project showcases <span className="text-primary font-semibold">technical excellence</span>, 
              <span className="text-secondary font-semibold"> innovative architecture</span>, and 
              <span className="text-accent font-semibold"> user-centered design</span>.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {[
                { label: 'Projects', value: projects.length, icon: <Layers className="w-4 h-4" /> },
                { label: 'Technologies', value: '25+', icon: <Cpu className="w-4 h-4" /> },
                { label: 'Total Value', value: '$2M+', icon: <TrendingUp className="w-4 h-4" /> },
                { label: 'Success Rate', value: '100%', icon: <Target className="w-4 h-4" /> },
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

      {/* Filters Section - Enhanced */}
      <section className="py-8 sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Filter by Industry</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === category
                        ? 'cyber-glow-sm bg-primary text-white'
                        : 'cyber-glass hover:bg-primary/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Advanced Filters</h3>
              <div className="flex flex-wrap gap-4">
                {filters.map((filter) => (
                  <div key={filter.label} className="relative group">
                    <select
                      value={activeFilters[filter.label as keyof typeof activeFilters]}
                      onChange={(e) => setActiveFilters(prev => ({
                        ...prev,
                        [filter.label]: e.target.value
                      }))}
                      className="cyber-glass px-3 py-1.5 rounded-lg text-sm appearance-none cursor-pointer"
                    >
                      <option value="All">All {filter.label}</option>
                      {filter.options.slice(1).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {filter.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Database className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">No Projects Found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters to see more projects.</p>
              <Button 
                onClick={() => {
                  setActiveCategory('All');
                  setActiveFilters({ Complexity: 'All', Duration: 'All', 'Team Size': 'All' });
                }}
                className="cyber-button"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">
                    {filteredProjects.length} {activeCategory === 'All' ? 'Projects' : `${activeCategory} Projects`}
                  </h2>
                  <p className="text-sm text-muted-foreground">Sorted by relevance</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* GitHub CTA - Enhanced */}
          <div className="mt-24">
            <div className="cyber-glass rounded-3xl p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <Github className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Want to Dive Deeper into the <span className="cyber-gradient">Code?</span>
                </h2>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Explore my GitHub repository for detailed code samples, implementation patterns, 
                  and open-source contributions that demonstrate my technical approach and expertise.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
                    <a href="https://github.com/BOSSY254-LEVI" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center gap-3">
                        <Github className="w-6 h-6" />
                        Explore GitHub Profile
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                  </Button>
                  
                  <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                    <a href="#contact">
                      <span className="flex items-center gap-3">
                        Discuss a Project
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </a>
                  </Button>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground">
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <span className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-green-400" />
                      Clean, Maintainable Code
                    </span>
                    <span className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-400" />
                      Production-Ready Solutions
                    </span>
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      Enterprise Security Standards
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