import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, TrendingUp, Users, Zap, Database, Server, Shield } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState } from 'react';

const projects = [
  {
    title: 'Health Wise Buddy',
    subtitle: 'AI Health Platform',
    role: 'Lead Full-Stack Developer & AI Integration Specialist',
    description: 'A comprehensive health and wellness platform leveraging AI to provide personalized health recommendations, symptom tracking, and virtual consultations. Built to scale for healthcare providers across Africa.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop',
    liveUrl: 'https://health-wise-buddy-39.lovable.app/',
    tech: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'AWS Lambda', 'Redis'],
    metrics: [
      { icon: TrendingUp, value: '40%', label: 'Faster Diagnosis' },
      { icon: Users, value: '10K+', label: 'Active Users' },
      { icon: Zap, value: '95+', label: 'Lighthouse Score' },
    ],
    highlights: [
      'Implemented ML-powered symptom checker with 92% accuracy',
      'Built real-time telemedicine video calling with WebRTC',
      'Designed microservices architecture handling 50K+ daily requests',
      'Integrated with 3 major health insurance APIs',
    ],
    architecture: 'Microservices with event-driven architecture, Redis caching, and auto-scaling on AWS',
  },
  {
    title: 'Community Hub',
    subtitle: 'Enterprise Social Platform',
    role: 'Enterprise Backend Architect',
    description: 'Enterprise-grade social platform connecting communities with real-time event management, discussion forums, and resource sharing. Built with high availability and zero-downtime deployments.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    liveUrl: 'https://communityhub-eta.vercel.app/',
    githubUrl: 'https://github.com/BOSSY254-LEVI',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Redis', 'Docker'],
    metrics: [
      { icon: Users, value: '25K+', label: 'Members' },
      { icon: Server, value: '99.9%', label: 'Uptime' },
      { icon: Zap, value: '<100ms', label: 'Response Time' },
    ],
    highlights: [
      'Implemented real-time messaging with WebSocket clustering',
      'Built notification system processing 100K+ messages/day',
      'Designed database schema with advanced indexing strategies',
      'Zero-downtime deployments with blue-green strategy',
    ],
    architecture: 'Next.js with PostgreSQL, Redis pub/sub for real-time features, Kubernetes orchestration',
  },
  {
    title: 'ShopSphere',
    subtitle: 'Enterprise E-Commerce',
    role: 'Full-Stack Developer & Systems Architect',
    description: 'Full-stack e-commerce solution with advanced inventory management, AI-powered recommendations, and multi-payment gateway integration for high-volume retail.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    tech: ['Vue.js', 'Django', 'PostgreSQL', 'Stripe', 'Docker', 'Elasticsearch'],
    metrics: [
      { icon: TrendingUp, value: '3x', label: 'Sales Growth' },
      { icon: Zap, value: '50%', label: 'Faster Load' },
      { icon: Database, value: '1M+', label: 'Products' },
    ],
    highlights: [
      'Built recommendation engine increasing conversions by 35%',
      'Implemented Elasticsearch for sub-50ms product searches',
      'Integrated Stripe, PayPal, and M-Pesa payment gateways',
      'Designed inventory system tracking 1M+ SKUs',
    ],
    architecture: 'Django REST API with Vue.js SPA, Elasticsearch, Celery task queue, PostgreSQL with read replicas',
  },
  {
    title: 'Easy Track Organization',
    subtitle: 'Task Management Platform',
    role: 'Full-Stack Developer & Product Designer',
    description: 'Comprehensive organization and task tracking platform designed to streamline project management, enhance team collaboration, and boost productivity through intuitive dashboards.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
    liveUrl: 'https://easy-track-organization.vercel.app/',
    githubUrl: 'https://github.com/bossy254-levi/easy-track-organization',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel', 'Pusher'],
    metrics: [
      { icon: TrendingUp, value: '50%', label: 'Efficiency Gain' },
      { icon: Users, value: '5K+', label: 'Active Users' },
      { icon: Shield, value: 'SOC2', label: 'Compliant' },
    ],
    highlights: [
      'Built drag-and-drop Kanban with optimistic updates',
      'Implemented real-time collaboration with Pusher',
      'Designed role-based access control (RBAC) system',
      'Created automated workflow triggers and notifications',
    ],
    architecture: 'Next.js App Router with Prisma ORM, real-time sync via Pusher, edge functions on Vercel',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      ref={ref}
      className={`group glass rounded-2xl overflow-hidden card-hover transition-all duration-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Role badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="glass" className="text-xs backdrop-blur-xl">
            {project.role}
          </Badge>
        </div>
        
        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.liveUrl && (
            <Button variant="glow" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="glass" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-primary font-medium mb-1">{project.subtitle}</p>
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="tech" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{project.tech.length - 5}
            </Badge>
          )}
        </div>

        {/* Metrics */}
        <div className="flex gap-4 pt-4 border-t border-border">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-2">
              <metric.icon className="w-4 h-4 text-primary" />
              <div>
                <span className="font-bold gradient-text">{metric.value}</span>
                <span className="text-xs text-muted-foreground ml-1">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable details */}
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-primary hover:underline"
        >
          {showDetails ? 'Hide details' : 'View technical details →'}
        </button>

        {showDetails && (
          <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
              <ul className="space-y-1">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Architecture</h4>
              <p className="text-xs text-muted-foreground">{project.architecture}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Portfolio</Badge>
          <h2>Featured Projects</h2>
          <p>Enterprise-grade solutions delivering measurable business impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Want to see more projects or code samples?</p>
          <Button variant="hero-outline" asChild>
            <a href="https://github.com/BOSSY254-LEVI" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
