import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { SkillsSection } from '@/components/SkillsSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Server, Cloud, Palette, Shield, 
  TestTube, Zap, Users, GitBranch, Database, Globe,
  Cpu, Terminal, Layers, Monitor, ShieldCheck, Rocket,
  BarChart, Wrench, Sparkles, Target, TrendingUp, Brain,
  CheckCircle, ChevronRight, ArrowUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const toolsAndTech = {
  'Languages': {
    items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL', 'HTML5', 'CSS3', 'GraphQL'],
    icon: <Terminal className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-500',
    proficiency: 'Expert'
  },
  'Frontend': {
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TailwindCSS', 'Framer Motion', 'Redux', 'Zustand'],
    icon: <Monitor className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-500',
    proficiency: 'Advanced'
  },
  'Backend': {
    items: ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot', 'GraphQL', 'REST APIs'],
    icon: <Server className="w-5 h-5" />,
    gradient: 'from-green-500 to-emerald-500',
    proficiency: 'Expert'
  },
  'Databases': {
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Prisma', 'Firebase'],
    icon: <Database className="w-5 h-5" />,
    gradient: 'from-orange-500 to-red-500',
    proficiency: 'Advanced'
  },
  'Cloud & DevOps': {
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel', 'Netlify'],
    icon: <Cloud className="w-5 h-5" />,
    gradient: 'from-yellow-500 to-amber-500',
    proficiency: 'Advanced'
  },
  'Tools': {
    items: ['Git', 'GitHub Actions', 'Jira', 'Figma', 'VS Code', 'Postman', 'Sentry'],
    icon: <Wrench className="w-5 h-5" />,
    gradient: 'from-indigo-500 to-violet-500',
    proficiency: 'Expert'
  },
};

const expertiseAreas = [
  {
    icon: Brain,
    title: 'System Architecture',
    description: 'Designing scalable, maintainable systems',
    items: ['Microservices Architecture', 'Event-Driven Design', 'Database Sharding', 'Load Balancing', 'Caching Strategies'],
    level: 95
  },
  {
    icon: ShieldCheck,
    title: 'Security Engineering',
    description: 'Implementing robust security measures',
    items: ['OAuth 2.0 / JWT', 'Data Encryption', 'RBAC/ABAC', 'API Security', 'OWASP Best Practices'],
    level: 90
  },
  {
    icon: TestTube,
    title: 'Quality Assurance',
    description: 'Ensuring code reliability and quality',
    items: ['Jest', 'Cypress', 'React Testing Library', 'TDD/BDD', 'Load Testing'],
    level: 88
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Maximizing application speed and efficiency',
    items: ['Lighthouse Optimization', 'Bundle Analysis', 'Core Web Vitals', 'CDN Configuration', 'Image Optimization'],
    level: 92
  },
  {
    icon: Users,
    title: 'Technical Leadership',
    description: 'Leading teams to technical excellence',
    items: ['Code Reviews', 'Technical Interviews', 'Sprint Planning', 'Agile Coaching', 'Mentoring'],
    level: 85
  },
  {
    icon: Rocket,
    title: 'DevOps & Automation',
    description: 'Streamlining development workflows',
    items: ['Git Workflows', 'CI/CD Pipelines', 'Trunk-Based Dev', 'Feature Flags', 'A/B Testing'],
    level: 90
  },
];

const proficiencyLevels = [
  { level: 'Expert', description: '5+ years experience, deep architectural knowledge', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { level: 'Advanced', description: '3-5 years experience, production-ready skills', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  { level: 'Proficient', description: '1-3 years experience, comfortable in projects', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Languages');

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
              Technical Mastery
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Skills & <span className="cyber-gradient">Technologies</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive full-stack expertise across modern technologies, with specialized focus on 
              <span className="text-primary font-semibold"> scalable architecture</span>, 
              <span className="text-secondary font-semibold"> performance optimization</span>, and 
              <span className="text-accent font-semibold"> user-centered design</span>.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {[
                { label: 'Technologies', value: '25+', icon: <Cpu className="w-4 h-4" /> },
                { label: 'Projects Built', value: '50+', icon: <Layers className="w-4 h-4" /> },
                { label: 'Years Experience', value: '5+', icon: <TrendingUp className="w-4 h-4" /> },
                { label: 'Proficiency Level', value: '98%', icon: <Target className="w-4 h-4" /> },
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

      {/* Main Skills Section */}
      <SkillsSection />

      {/* Tools & Technologies Grid - Enhanced */}
      <section className="py-24 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.2) 0%, transparent 50%)`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Cpu className="w-3 h-3 mr-2" />
              Tech Stack
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Technologies & Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(toolsAndTech).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeCategory === category
                    ? 'bg-primary text-white cyber-glow-sm'
                    : 'cyber-glass hover:bg-primary/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  {toolsAndTech[category as keyof typeof toolsAndTech].icon}
                  {category}
                </span>
              </button>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(toolsAndTech).map(([category, data]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`cyber-card p-8 rounded-2xl relative overflow-hidden group ${
                  activeCategory === category ? 'border-primary/50' : ''
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${data.gradient}`}>
                        {data.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{category}</h3>
                        <Badge className="mt-1 bg-primary/20 text-primary text-xs">
                          {data.proficiency}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {data.items.map((tool, index) => (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="cyber-glass p-3 rounded-lg text-center group/item hover:bg-primary/10 transition-colors">
                          <div className="text-sm font-medium mb-1">{tool}</div>
                          <div className="flex items-center justify-center">
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${data.gradient} rounded-full`}
                                style={{ width: `${data.proficiency === 'Expert' ? '95%' : '85%'}` }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* View Details */}
                  <div className="mt-6 pt-6 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">View details</span>
                      <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Proficiency Legend */}
          <div className="mt-12 pt-12 border-t border-border/50">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-center text-lg font-semibold mb-6">Proficiency Levels</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {proficiencyLevels.map((level) => (
                  <div key={level.level} className="cyber-glass p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span className="font-medium">{level.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
              <Brain className="w-3 h-3 mr-2" />
              Specialized Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep expertise in critical areas that drive project success and technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-card p-8 rounded-2xl group"
              >
                {/* Icon with Gradient */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 w-fit mb-6">
                  <area.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Title & Description */}
                <h3 className="font-bold text-xl mb-2">{area.title}</h3>
                <p className="text-muted-foreground mb-6">{area.description}</p>
                
                {/* Proficiency Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="font-medium">{area.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${area.level}%` }}
                    />
                  </div>
                </div>
                
                {/* Skills List */}
                <ul className="space-y-3">
                  {area.items.map((item) => (
                    <li key={item} className="text-sm flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover Effect */}
                <div className="mt-6 pt-6 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">View case studies</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="cyber-glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 cyber-gradient">
                Development Methodologies
              </h2>
              <p className="text-xl text-muted-foreground">
                Structured approaches that ensure quality, efficiency, and maintainability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Agile/Scrum',
                  description: 'Iterative development with continuous feedback',
                  practices: ['Sprint Planning', 'Daily Standups', 'Retrospectives']
                },
                {
                  title: 'Test-Driven',
                  description: 'Writing tests before implementation',
                  practices: ['Unit Testing', 'Integration Tests', 'E2E Testing']
                },
                {
                  title: 'CI/CD',
                  description: 'Automated deployment pipelines',
                  practices: ['GitHub Actions', 'Automated Testing', 'Rollback Strategies']
                },
                {
                  title: 'Code Reviews',
                  description: 'Collaborative quality assurance',
                  practices: ['Pull Requests', 'Static Analysis', 'Knowledge Sharing']
                }
              ].map((methodology) => (
                <div key={methodology.title} className="cyber-card p-6 rounded-xl">
                  <h3 className="font-bold mb-3">{methodology.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{methodology.description}</p>
                  <ul className="space-y-2">
                    {methodology.practices.map((practice) => (
                      <li key={practice} className="text-xs flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="cyber-glass rounded-3xl p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Leverage <span className="cyber-gradient">Expert Skills?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                See how these technical capabilities translate into real-world solutions that deliver measurable business value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button px-8 py-6 text-lg rounded-xl group" asChild>
                  <Link to="/projects">
                    <span className="flex items-center gap-3">
                      View Project Portfolio
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </Button>
                
                <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                  <Link to="/experience">
                    <span className="flex items-center gap-3">
                      See Experience
                      <BarChart className="w-5 h-5" />
                    </span>
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Proven Track Record
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    Enterprise Experience
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Quick Implementation
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
