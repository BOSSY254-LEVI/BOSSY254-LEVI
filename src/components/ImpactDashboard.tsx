import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Clock, Users, Zap, Server } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useState } from 'react';

const metrics = [
  {
    icon: DollarSign,
    value: '$2M+',
    label: 'Revenue Generated',
    description: 'For clients through optimized solutions',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    value: '75%',
    label: 'Faster Deployments',
    description: 'Through CI/CD pipeline optimization',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    value: '60%',
    label: 'Latency Reduction',
    description: 'Via microservices architecture',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    value: '100K+',
    label: 'Users Served',
    description: 'Across all deployed applications',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Server,
    value: '99.9%',
    label: 'Uptime Achieved',
    description: 'With robust monitoring systems',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: TrendingUp,
    value: '95+',
    label: 'Lighthouse Scores',
    description: 'Consistent performance optimization',
    color: 'from-pink-500 to-rose-500',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (!isIntersecting) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isIntersecting, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function ImpactDashboard() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Business Impact</Badge>
          <h2>Measurable Results</h2>
          <p>Real metrics from real projects - demonstrating value beyond code</p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="glass rounded-2xl p-6 card-hover relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient */}
              <div 
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-10 blur-2xl`}
              />
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="text-3xl font-bold gradient-text mb-1">
                  {metric.value}
                </div>
                
                <h3 className="font-semibold mb-2">{metric.label}</h3>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Why These Numbers Matter</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Every metric represents real business value delivered to clients. From reducing operational costs 
            through automation to increasing user engagement through better UX - I measure success by impact, 
            not just code delivered. My goal is always to create technology that drives tangible business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
