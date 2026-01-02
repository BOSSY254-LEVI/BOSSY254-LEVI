import { Badge } from '@/components/ui/badge';
import { Award, Target, Users, Zap, Globe, BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const highlights = [
  {
    icon: Users,
    title: 'Technical Leadership',
    description: 'Mentored 8+ junior developers, 2 promoted to senior roles',
  },
  {
    icon: Zap,
    title: 'Performance Focus',
    description: '60% latency reduction, 75% faster deployments',
  },
  {
    icon: Target,
    title: 'Business Impact',
    description: 'Delivered 50+ projects generating measurable ROI',
  },
  {
    icon: Globe,
    title: 'Remote Excellence',
    description: '5+ years successful remote collaboration globally',
  },
];

const competencies = [
  'Enterprise Architecture',
  'Microservices Design',
  'Cloud-Native Development',
  'DevOps & CI/CD',
  'System Design',
  'Technical Leadership',
  'Agile Coaching',
  'Performance Optimization',
];

const details = [
  { label: 'Location', value: 'Nairobi, Kenya (Remote Global)' },
  { label: 'Email', value: 'livingstoneoduory@gmail.com' },
  { label: 'Phone', value: '+254 721373455' },
  { label: 'Status', value: 'Available for Senior Roles' },
];

export function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">About Me</Badge>
          <h2>Crafting Digital Excellence Since 2019</h2>
          <p>From Nairobi to the global stage - building technology that matters</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a seasoned <span className="text-foreground font-medium">Senior Full-Stack Developer</span> and 
              <span className="text-foreground font-medium"> UI/UX Specialist</span> with over 5 years of experience 
              creating digital solutions for startups and enterprises worldwide. My journey from Sawagongo High School 
              to becoming a technical leader exemplifies dedication to continuous growth.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently pursuing my <span className="text-foreground font-medium">Bachelor's in Information Technology</span> at 
              Tom Mboya University while leading enterprise projects. I specialize in building scalable, cloud-native 
              applications using React, Node.js, and AWS. My work has helped businesses increase efficiency by 60%, 
              reduce costs, and achieve 99.9% uptime.
            </p>

            {/* Leadership Philosophy */}
            <div className="glass rounded-xl p-6 border-l-4 border-primary">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Leadership Philosophy
              </h4>
              <p className="text-sm text-muted-foreground">
                "Great code is written by great teams. My role as a technical leader is to empower developers, 
                establish clear coding standards, and create environments where innovation thrives. I've mentored 
                8+ developers, with 2 achieving senior positions within 18 months."
              </p>
            </div>

            {/* Mission */}
            <div className="glass rounded-xl p-6 border-l-4 border-accent">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Personal Mission
              </h4>
              <p className="text-sm text-muted-foreground">
                Creating technology that solves real African and global challenges. I believe in building 
                solutions that are not just technically excellent, but make genuine impact on people's lives.
              </p>
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{detail.label}:</span>
                  <span className="font-medium truncate">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Highlight cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-4 card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Core Competencies */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {competencies.map((comp, index) => (
                  <Badge 
                    key={index} 
                    variant="tech" 
                    className="text-sm py-2 px-3"
                  >
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Code snippet */}
            <div className="glass rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground ml-2">developer.ts</span>
              </div>
              <div className="text-muted-foreground text-xs">
                <span className="text-primary">interface</span> Developer {'{'}
                <br />
                <span className="ml-4">name: <span className="text-green-400">"Livingstone Oduor Otieno"</span>;</span>
                <br />
                <span className="ml-4">role: <span className="text-green-400">"Senior Full-Stack Developer"</span>;</span>
                <br />
                <span className="ml-4">yearsOfExperience: <span className="text-primary">5</span>;</span>
                <br />
                <span className="ml-4">projectsDelivered: <span className="text-primary">50</span>;</span>
                <br />
                <span className="ml-4">developersMentored: <span className="text-primary">8</span>;</span>
                <br />
                <span className="ml-4">passion: <span className="text-green-400">"∞"</span>;</span>
                <br />
                {'}'};
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
