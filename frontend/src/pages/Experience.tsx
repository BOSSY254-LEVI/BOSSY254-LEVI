import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { ExperienceSection } from '@/components/ExperienceSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Briefcase, GraduationCap, Award, TrendingUp, Users, Zap,
  Rocket, Target, Compass, Globe, Clock, Sparkles, ChevronRight, Cpu,
  BarChart, Shield, Cloud, Code, Server, Database, Palette, Brain,
  CheckCircle, DollarSign, Target as TargetIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const achievements = [
  {
    icon: TrendingUp,
    value: '60%',
    label: 'Performance Improvement',
    description: 'Achieved through microservices optimization',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    value: '75%',
    label: 'Faster Deployments',
    description: 'Via advanced CI/CD pipelines',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Users,
    value: '8+',
    label: 'Developers Mentored',
    description: 'Promotions under my leadership',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Award,
    value: '50K+',
    label: 'Users Impacted',
    description: 'Across enterprise applications',
    gradient: 'from-purple-500 to-pink-500'
  },
];

const careerGoals = [
  {
    icon: Rocket,
    title: 'Technical Leadership Roles',
    description: 'Senior/Staff Engineer, Technical Lead, or Engineering Manager positions at innovative tech companies',
    items: ['Architecture Design', 'Team Leadership', 'Technical Strategy', 'Mentoring']
  },
  {
    icon: Globe,
    title: 'Remote-First Companies',
    description: 'Global organizations with strong remote culture and distributed teams',
    items: ['Async Communication', 'Global Collaboration', 'Flexible Work', 'Results-Oriented']
  },
  {
    icon: Target,
    title: 'Impact-Focused Projects',
    description: 'Working on meaningful problems that create real value for users and businesses',
    items: ['Scalable Solutions', 'User-Centric Design', 'Business Impact', 'Sustainable Growth']
  },
  {
    icon: Compass,
    title: 'Continuous Growth',
    description: 'Environments that support learning, innovation, and career advancement',
    items: ['Learning Culture', 'Innovation Labs', 'Conference Budgets', 'Certification Support']
  }
];

const compensationTiers = [
  {
    type: 'Full-Time Senior',
    range: '$120K - $180K',
    equity: '0.1% - 1%',
    level: 'Senior/Staff Engineer',
    features: ['Health Insurance', '401k Matching', 'Paid Time Off', 'Remote Work']
  },
  {
    type: 'Technical Leadership',
    range: '$150K - $250K',
    equity: '0.5% - 2%',
    level: 'Lead/Manager',
    features: ['Stock Options', 'Bonus Structure', 'Conference Budget', 'Team Budget']
  },
  {
    type: 'Contract/Consulting',
    rate: '$80 - $150/hr',
    duration: '3-12 month contracts',
    level: 'Enterprise Consultant',
    features: ['Flexible Hours', 'Project-Based', 'Expertise-Focused', 'NDA Protected']
  }
];

export default function Experience() {
  const [activeCompensation, setActiveCompensation] = useState('Full-Time Senior');

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
              Professional Journey
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="cyber-gradient">Experience</span> & Career Path
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              5+ years of architecting scalable applications, leading high-performing teams, 
              and delivering measurable <span className="text-primary font-semibold">business impact</span> across 
              <span className="text-secondary font-semibold"> startups</span> and 
              <span className="text-accent font-semibold"> enterprises</span>.
            </p>

            {/* Experience Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {[
                { label: 'Years Experience', value: '5+', icon: <Clock className="w-4 h-4" /> },
                { label: 'Projects Delivered', value: '50+', icon: <Code className="w-4 h-4" /> },
                { label: 'Team Size Led', value: '8+', icon: <Users className="w-4 h-4" /> },
                { label: 'Success Rate', value: '100%', icon: <TargetIcon className="w-4 h-4" /> },
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

      {/* Key Achievements - Enhanced */}
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
              <Award className="w-3 h-3 mr-2" />
              Key Achievements
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-gradient">
              Measurable Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quantifiable results and business value delivered across projects and roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="cyber-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-500">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.gradient} w-fit mx-auto mb-6`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {achievement.value}
                    </div>
                    
                    {/* Label */}
                    <div className="font-semibold text-lg mb-2">{achievement.label}</div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <ExperienceSection />

      {/* Career Goals - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
                <Target className="w-3 h-3 mr-2" />
                Career Objectives
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
                What I'm Looking For
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic roles and environments where I can maximize impact and drive innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {careerGoals.map((goal, index) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cyber-card p-8 rounded-2xl group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                      <goal.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{goal.title}</h3>
                      <p className="text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {goal.items.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compensation & Expectations - Enhanced */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary">
                <DollarSign className="w-3 h-3 mr-2" />
                Compensation & Expectations
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
                Value Proposition
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transparent expectations based on role, responsibility, and business impact
              </p>
            </div>

            {/* Compensation Tiers */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {compensationTiers.map((tier) => (
                  <button
                    key={tier.type}
                    onClick={() => setActiveCompensation(tier.type)}
                    className={`px-6 py-3 rounded-xl transition-all font-medium ${
                      activeCompensation === tier.type
                        ? 'cyber-glow-sm bg-primary text-white'
                        : 'cyber-glass hover:bg-primary/10'
                    }`}
                  >
                    {tier.type}
                  </button>
                ))}
              </div>

              {/* Active Tier Details */}
              {compensationTiers.map((tier) => (
                <div
                  key={tier.type}
                  className={`cyber-card rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeCompensation === tier.type ? 'block' : 'hidden'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{tier.type}</h3>
                        <Badge className="bg-primary/20 text-primary">{tier.level}</Badge>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-bold cyber-gradient mb-1">
                          {'rate' in tier ? tier.rate : tier.range}
                        </div>
                        {'equity' in tier && (
                          <div className="text-sm text-muted-foreground">Equity: {tier.equity}</div>
                        )}
                        {'duration' in tier && (
                          <div className="text-sm text-muted-foreground">{tier.duration}</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {tier.features.map((feature) => (
                        <div key={feature} className="cyber-glass p-4 rounded-xl text-center">
                          <div className="text-sm font-medium">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Considerations */}
            <div className="cyber-glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                Additional Considerations
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Benefits & Perks
                  </h4>
                  <ul className="space-y-2">
                    {['Remote-first culture', 'Health & wellness benefits', 'Continuous learning budget', 'Conference & training allowance', 'Flexible working hours'].map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-primary" />
                    Growth Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {['Clear career progression', 'Leadership opportunities', 'Mentorship programs', 'Impact-driven projects', 'Innovation time'].map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="cyber-glass rounded-3xl p-12 max-w-4xl mx-auto text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The <span className="cyber-gradient">Value</span> I Bring
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Beyond technical skills, I deliver strategic value through leadership, innovation, 
                and business-aligned technology solutions.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: <Cpu className="w-6 h-6" />,
                    title: 'Technical Excellence',
                    description: 'Proven expertise in modern stacks and architecture patterns'
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: 'Team Leadership',
                    description: 'Experience building and mentoring high-performing teams'
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: 'Business Impact',
                    description: 'ROI-focused approach with measurable results'
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
                  <Link to="/contact">
                    <span className="flex items-center gap-3">
                      Discuss Opportunities
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </Button>
                
                <Button className="cyber-glass border-primary/50 hover:border-primary px-8 py-6 text-lg rounded-xl" asChild>
                  <a href="/Assets/Livingstone_cv.pdf" download>
                    <span className="flex items-center gap-3">
                      Download Resume
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </a>
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Response within 24 hours
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    Confidentiality Guaranteed
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    Global Remote Experience
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