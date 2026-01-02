import { Badge } from '@/components/ui/badge';
import { Award, Target, Star, Trophy, Medal, Rocket } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const certifications = [
  {
    title: 'Bachelor of Information Technology',
    issuer: 'Tom Mboya University',
    date: '2025 - Present',
    status: 'In Progress',
    description: 'Specializing in Cloud Computing and AI. Dean\'s List for Academic Excellence.',
    icon: Award,
  },
  {
    title: 'Full Stack Web Developer',
    issuer: 'Power Learn Project Organization',
    date: '2025',
    status: 'Completed',
    description: 'Cloud infrastructure design, serverless architecture, and cost optimization.',
    icon: Medal,
  },
  {
    title: 'Database Design & SQL Programming',
    issuer: 'Power Learn Project Organization',
    date: '2024',
    status: 'Completed',
    description: 'Advanced database design, PHP integration, and PostgreSQL implementation.',
    icon: Star,
  },
  {
    title: 'Google UX Design Professional',
    issuer: 'Google Career Certificates',
    date: '2023',
    status: 'Completed',
    description: 'User research, prototyping, accessibility, and inclusive design practices.',
    icon: Trophy,
  },
];

const upcomingCerts = [
  { title: 'AWS Solutions Architect', target: 'Q2 2025', progress: 65 },
  { title: 'Microsoft Azure Fundamentals', target: 'Q3 2025', progress: 30 },
  { title: 'Scrum Master Certification', target: 'Q4 2025', progress: 20 },
];

const achievements = [
  'Top Mathematics & English Student - Sawagongo High School',
  'Certified Student Leader - High School',
  'Hackathon Participant - Multiple Events',
  'Dean\'s List - Tom Mboya University',
  'Open Source Contributor - 500+ Contributions',
];

export function CertificationsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Credentials</Badge>
          <h2>Education & Certifications</h2>
          <p>Continuous learning and professional development journey</p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Completed Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Completed Credentials
            </h3>
            
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className="glass rounded-xl p-5 card-hover flex gap-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{cert.title}</h4>
                    <Badge variant={cert.status === 'Completed' ? 'glow' : 'tech'} className="text-xs shrink-0">
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upcoming certifications */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Learning Roadmap
              </h3>
              <div className="space-y-4">
                {upcomingCerts.map((cert) => (
                  <div key={cert.title}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{cert.title}</span>
                      <span className="text-muted-foreground">{cert.target}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Achievements
              </h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Star className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
