import { Badge } from '@/components/ui/badge';
import { Code2, Server, Cloud, Palette, Shield, TestTube, Gauge, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    title: 'Frontend Mastery',
    icon: Code2,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React & Next.js 14', level: 96 },
      { name: 'TypeScript (Strict)', level: 94 },
      { name: 'Vue.js & Nuxt', level: 88 },
      { name: 'State Management (Zustand, TanStack)', level: 92 },
    ],
    extras: ['Server Components', 'React Query', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    title: 'Backend & Database',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js & Express', level: 95 },
      { name: 'Python & Django', level: 90 },
      { name: 'PostgreSQL & MongoDB', level: 93 },
      { name: 'GraphQL & REST APIs', level: 94 },
    ],
    extras: ['Microservices', 'WebSockets', 'Redis', 'Prisma ORM'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'AWS (EC2, Lambda, S3)', level: 88 },
      { name: 'Docker & Kubernetes', level: 85 },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Serverless Architecture', level: 82 },
    ],
    extras: ['Terraform', 'GitHub Actions', 'Vercel', 'Nginx'],
  },
  {
    title: 'Design & UX',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Figma & Adobe XD', level: 92 },
      { name: 'User Research', level: 88 },
      { name: 'Prototyping & Testing', level: 90 },
      { name: 'Design Systems', level: 85 },
    ],
    extras: ['WCAG Accessibility', 'Motion Design', 'Responsive Design', 'UX Writing'],
  },
];

const additionalSkills = [
  {
    title: 'System Design',
    icon: Gauge,
    items: ['Load Balancing', 'Caching Strategies', 'Database Sharding', 'Event-Driven Architecture'],
  },
  {
    title: 'Security',
    icon: Shield,
    items: ['OAuth 2.0 / JWT', 'Encryption', 'OWASP Best Practices', 'Penetration Testing'],
  },
  {
    title: 'Testing',
    icon: TestTube,
    items: ['Jest & Vitest', 'Cypress E2E', 'React Testing Library', 'TDD Methodology'],
  },
  {
    title: 'Leadership',
    icon: Users,
    items: ['Code Reviews', 'Tech Interviews', 'Agile Coaching', 'Sprint Planning'],
  },
];

function SkillBar({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out',
            color,
            isIntersecting ? 'w-full' : 'w-0'
          )}
          style={{
            maxWidth: `${level}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" className="section bg-surface/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Technical Expertise</Badge>
          <h2>Full-Stack Mastery</h2>
          <p>Mastering the tools and technologies that power enterprise applications</p>
        </div>

        {/* Main skill categories */}
        <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="glass rounded-2xl p-6 lg:p-8 card-hover"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', category.color)}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-4 mb-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={(catIndex * 4 + skillIndex) * 100}
                    color={category.color}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {category.extras.map((extra) => (
                  <Badge key={extra} variant="outline" className="text-xs">
                    {extra}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {additionalSkills.map((skill, index) => (
            <div 
              key={skill.title}
              className="glass rounded-xl p-5 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <skill.icon className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">{skill.title}</h4>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div className="mt-16 pt-8 border-t border-border overflow-hidden">
          <p className="text-center text-sm text-muted-foreground mb-6">Technologies I work with daily</p>
          <div className="flex gap-4 animate-marquee">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Prisma', 'Tailwind', 'Figma'].map((tech) => (
              <Badge key={tech} variant="glass" className="py-2 px-4 whitespace-nowrap">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
