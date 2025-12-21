import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Clock, Eye } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const articles = [
  {
    title: 'Microservices in Node.js: Lessons from Health Wise Buddy',
    excerpt: 'How I architected a healthcare platform to handle 50K+ daily requests with 99.9% uptime using event-driven microservices.',
    category: 'Architecture',
    readTime: '12 min',
    views: '2.3K',
    date: 'Dec 2024',
  },
  {
    title: 'React Performance: How I Achieved 95+ Lighthouse Scores',
    excerpt: 'Practical techniques for optimizing React applications including code splitting, lazy loading, and bundle analysis.',
    category: 'Performance',
    readTime: '8 min',
    views: '1.8K',
    date: 'Nov 2024',
  },
  {
    title: 'Database Optimization: PostgreSQL Best Practices',
    excerpt: 'Advanced indexing strategies, query optimization, and replication patterns I use in production applications.',
    category: 'Database',
    readTime: '15 min',
    views: '3.1K',
    date: 'Oct 2024',
  },
  {
    title: 'CI/CD Pipeline: From Zero to Production in 5 Minutes',
    excerpt: 'Building automated deployment pipelines with GitHub Actions, Docker, and Kubernetes for seamless releases.',
    category: 'DevOps',
    readTime: '10 min',
    views: '1.5K',
    date: 'Sep 2024',
  },
  {
    title: 'Technical Leadership: Mentoring Junior Developers',
    excerpt: 'Lessons learned from mentoring 8+ developers and helping 2 achieve senior positions within 18 months.',
    category: 'Leadership',
    readTime: '7 min',
    views: '2.7K',
    date: 'Aug 2024',
  },
];

export function BlogSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="section bg-surface/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Tech Writing</Badge>
          <h2>Insights & Articles</h2>
          <p>Sharing knowledge from real-world experience building enterprise applications</p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="glass rounded-2xl p-6 card-hover group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="tech" className="text-xs">{article.category}</Badge>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              
              <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">More articles coming soon on Medium and Dev.to</p>
          <Button variant="hero-outline" asChild>
            <a href="https://linkedin.com/in/livingstone-otieno-bb0baa373" target="_blank" rel="noopener noreferrer">
              <BookOpen className="w-5 h-5" />
              Follow for Updates
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
