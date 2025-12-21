import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface TimelineItemData {
  type: string;
  period: string;
  title: string;
  company: string;
  location?: string;
  points: string[];
}

const experience: TimelineItemData[] = [
  {
    type: 'work',
    period: '2022 - Present',
    title: 'Senior Full-Stack Developer',
    company: 'TechInnovate Solutions',
    location: 'Remote',
    points: [
      'Led development of enterprise SaaS platform serving 50,000+ users',
      'Architected microservices infrastructure reducing latency by 60%',
      'Mentored 8 junior developers and established coding standards',
      'Implemented CI/CD pipelines reducing deployment time by 75%',
    ],
  },
  {
    type: 'work',
    period: '2020 - 2022',
    title: 'Full-Stack Developer',
    company: 'Power Learn Project Org',
    location: 'Nairobi',
    points: [
      'Developed 30+ web applications for international clients',
      'Increased client website performance scores by 40% on average',
      'Integrated third-party APIs and payment systems',
      'Collaborated with UX team to implement responsive designs',
    ],
  },
  {
    type: 'work',
    period: '2019 - 2020',
    title: 'Frontend Developer',
    company: 'Private Organization',
    location: 'Nairobi',
    points: [
      'Built responsive user interfaces for e-commerce platforms',
      'Optimized web applications for core web vitals',
      'Collaborated with backend team on API design',
      'Implemented accessibility standards across all projects',
    ],
  },
];

const education: TimelineItemData[] = [
  {
    type: 'education',
    period: '2025 - Present',
    title: 'Bachelor of Information Technology',
    company: 'Tom Mboya University',
    points: [
      'Specializing in Cloud Computing and AI',
      'Dean\'s List - Academic Excellence',
      'Research in Machine Learning Applications',
    ],
  },
  {
    type: 'education',
    period: '2025',
    title: 'Full Stack Web Developer',
    company: 'Power Learn Project Organization',
    points: [
      'Cloud infrastructure design and deployment',
      'Serverless architecture implementation',
      'Cost optimization strategies',
    ],
  },
  {
    type: 'education',
    period: '2024',
    title: 'Database Design & SQL Programming',
    company: 'Power Learn Project Organization',
    points: [
      'Created databases with PHP and connected them with live projects',
      'Built Startup apps integrated with PostgreSQL',
      'Participated in multiple Hackathons',
    ],
  },
  {
    type: 'education',
    period: '2023',
    title: 'Google UX Design Professional',
    company: 'Google Career Certificates',
    points: [
      'User research and testing methodologies',
      'Prototyping and interaction design',
      'Accessibility and inclusive design',
    ],
  },
];

function TimelineItem({ item, index, isLeft }: { item: TimelineItemData; index: number; isLeft: boolean }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const Icon = item.type === 'work' ? Briefcase : GraduationCap;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex gap-6 md:gap-0 transition-all duration-700',
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        'md:justify-center'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Content - Left side on desktop for odd items */}
      <div className={cn(
        'flex-1 md:w-5/12',
        isLeft ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12 md:text-left'
      )}>
        <div className={cn(
          'glass rounded-2xl p-6 card-hover',
          isLeft ? 'md:ml-auto' : 'md:mr-auto'
        )}>
          <Badge variant="tech" className="mb-3">{item.period}</Badge>
          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
          <p className="text-primary font-medium text-sm mb-4">
            {item.company}
            {item.location && <span className="text-muted-foreground"> • {item.location}</span>}
          </p>
          <ul className={cn('space-y-2 text-sm text-muted-foreground', isLeft ? 'md:text-right' : 'md:text-left')}>
            {item.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={cn('text-primary mt-1', isLeft && 'md:order-2')}>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center line and icon */}
      <div className="hidden md:flex flex-col items-center md:order-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Mobile icon */}
      <div className="flex md:hidden flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Empty space for alternating layout */}
      <div className={cn('hidden md:block md:w-5/12', isLeft ? 'md:order-3' : '')} />
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section bg-surface/50">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Journey</Badge>
          <h2>Professional Experience</h2>
          <p>Building expertise through diverse challenges and innovative solutions</p>
        </div>

        {/* Work Experience */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-primary" />
            Work Experience
          </h3>
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-8">
              {experience.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} isLeft={index % 2 === 0} />
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education & Certifications
          </h3>
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-8">
              {education.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} isLeft={index % 2 === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
