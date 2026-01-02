import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StarCursor } from '@/components/StarCursor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Calendar, Clock, BookOpen, TrendingUp, Zap, Sparkles,
  ChevronRight, Eye, Bookmark, Share2, ExternalLink, Tag, User,
  Brain, Cpu, Database, Shield, Rocket, Palette, Globe, Terminal,
  BarChart, Layers, Target, Search
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: 'Microservices in Node.js: Lessons from Health Wise Buddy',
    excerpt: 'How I architected a scalable health platform handling 50K+ daily requests with event-driven microservices, Redis caching, and auto-scaling on AWS.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'Architecture',
    readTime: '12 min',
    date: 'Dec 2024',
    tags: ['Node.js', 'Microservices', 'AWS', 'Redis', 'Scalability'],
    views: '2.4K',
    likes: 128,
    comments: 42,
    featured: true,
    difficulty: 'Advanced'
  },
  {
    id: 2,
    title: 'React Performance: How I Achieved 95+ Lighthouse Scores',
    excerpt: 'Practical techniques for optimizing React applications including code splitting, lazy loading, bundle analysis, and Core Web Vitals optimization.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'Performance',
    readTime: '10 min',
    date: 'Nov 2024',
    tags: ['React', 'Performance', 'Lighthouse', 'Web Vitals', 'Optimization'],
    views: '3.1K',
    likes: 156,
    comments: 38,
    featured: true,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Database Optimization: PostgreSQL Best Practices',
    excerpt: 'Deep dive into PostgreSQL optimization strategies including indexing, query analysis, connection pooling, and replication for high-traffic applications.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    category: 'Database',
    readTime: '15 min',
    date: 'Oct 2024',
    tags: ['PostgreSQL', 'Database', 'Optimization', 'Scaling', 'Performance'],
    views: '1.8K',
    likes: 94,
    comments: 28,
    featured: false,
    difficulty: 'Advanced'
  },
  {
    id: 4,
    title: 'CI/CD Pipeline: From Zero to Production',
    excerpt: 'Complete guide to setting up CI/CD pipelines with GitHub Actions, including testing strategies, staging environments, and blue-green deployments.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
    category: 'DevOps',
    readTime: '14 min',
    date: 'Sep 2024',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automation', 'Deployment'],
    views: '2.2K',
    likes: 112,
    comments: 35,
    featured: false,
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    title: 'Technical Leadership: Mentoring Junior Developers',
    excerpt: 'Lessons learned from mentoring 8+ developers, establishing coding standards, and building a culture of continuous improvement and knowledge sharing.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    category: 'Leadership',
    readTime: '8 min',
    date: 'Aug 2024',
    tags: ['Leadership', 'Mentoring', 'Team Building', 'Culture', 'Growth'],
    views: '2.7K',
    likes: 142,
    comments: 41,
    featured: true,
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    title: 'Real-time Features with WebSockets and Redis',
    excerpt: 'Building scalable real-time features for Community Hub including WebSocket clustering, Redis pub/sub, and handling 100K+ concurrent connections.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    category: 'Real-time',
    readTime: '11 min',
    date: 'Jul 2024',
    tags: ['WebSockets', 'Redis', 'Real-time', 'Scaling', 'Node.js'],
    views: '1.9K',
    likes: 88,
    comments: 26,
    featured: false,
    difficulty: 'Advanced'
  },
  {
    id: 7,
    title: 'Building Secure Authentication Systems',
    excerpt: 'Comprehensive guide to implementing OAuth 2.0, JWT tokens, refresh token rotation, and security best practices for modern web applications.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    category: 'Security',
    readTime: '13 min',
    date: 'Jun 2024',
    tags: ['Security', 'OAuth', 'JWT', 'Authentication', 'Best Practices'],
    views: '3.4K',
    likes: 178,
    comments: 52,
    featured: true,
    difficulty: 'Advanced'
  },
  {
    id: 8,
    title: 'Designing Scalable APIs with GraphQL Federation',
    excerpt: 'How to design and implement federated GraphQL APIs that scale across multiple services while maintaining type safety and developer experience.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'API Design',
    readTime: '16 min',
    date: 'May 2024',
    tags: ['GraphQL', 'API', 'Federation', 'Schema Design', 'Scalability'],
    views: '1.5K',
    likes: 76,
    comments: 22,
    featured: false,
    difficulty: 'Expert'
  },
];

const categories = [
  { name: 'All', icon: <Globe className="w-4 h-4" />, count: articles.length },
  { name: 'Architecture', icon: <Cpu className="w-4 h-4" />, count: 1 },
  { name: 'Performance', icon: <Zap className="w-4 h-4" />, count: 1 },
  { name: 'Database', icon: <Database className="w-4 h-4" />, count: 1 },
  { name: 'DevOps', icon: <Rocket className="w-4 h-4" />, count: 1 },
  { name: 'Leadership', icon: <User className="w-4 h-4" />, count: 1 },
  { name: 'Real-time', icon: <Terminal className="w-4 h-4" />, count: 1 },
  { name: 'Security', icon: <Shield className="w-4 h-4" />, count: 1 },
  { name: 'API Design', icon: <Layers className="w-4 h-4" />, count: 1 },
];

const difficultyLevels = [
  { level: 'Beginner', color: 'from-green-500 to-emerald-500', description: 'Entry-level concepts' },
  { level: 'Intermediate', color: 'from-blue-500 to-cyan-500', description: 'Practical applications' },
  { level: 'Advanced', color: 'from-purple-500 to-pink-500', description: 'Deep technical dive' },
  { level: 'Expert', color: 'from-orange-500 to-red-500', description: 'Cutting-edge topics' },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColor = difficultyLevels.find(d => d.level === article.difficulty)?.color;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cyber-card rounded-2xl overflow-hidden h-full group transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Category & Featured Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className="backdrop-blur-xl bg-primary/20 text-primary border-primary/30">
            {article.category}
          </Badge>
          {article.featured && (
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        {/* Difficulty Level */}
        <div className="absolute top-4 right-4">
          <Badge className="backdrop-blur-xl bg-white/10 text-white">
            {article.difficulty}
          </Badge>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {article.views}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="w-4 h-4" />
              {article.comments}
            </span>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </span>
          </div>
          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${difficultyColor}`} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} className="text-xs bg-primary/10 text-primary/80">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read Article Button */}
        <Button className="w-full cyber-glass border-border/50 hover:border-primary/50 group/button transition-all duration-300">
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Read Article
            </span>
            <ChevronRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredArticles = articles.filter(article => {
    if (activeCategory !== 'All' && article.category !== activeCategory) return false;
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    if (featuredOnly && !article.featured) return false;
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
              Technical Blog
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Technical <span className="cyber-gradient">Insights</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Sharing deep technical knowledge, lessons learned from building 
              <span className="text-primary font-semibold"> enterprise applications</span>, and insights on 
              <span className="text-secondary font-semibold"> modern web development</span> practices.
            </p>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {[
                { label: 'Articles', value: articles.length, icon: <BookOpen className="w-4 h-4" /> },
                { label: 'Total Views', value: '17K+', icon: <Eye className="w-4 h-4" /> },
                { label: 'Categories', value: categories.length - 1, icon: <Tag className="w-4 h-4" /> },
                { label: 'Featured', value: articles.filter(a => a.featured).length, icon: <Sparkles className="w-4 h-4" /> },
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

      {/* Filters & Search - Enhanced */}
      <section className="py-8 sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles by title or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl cyber-glass border border-border focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeCategory === category.name
                        ? 'cyber-glow-sm bg-primary text-white'
                        : 'cyber-glass hover:bg-primary/10'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                    <span className="text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                  />
                  <div className={`block w-12 h-6 rounded-full transition-colors ${
                    featuredOnly ? 'bg-primary' : 'bg-muted'
                  }`} />
                  <div className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    featuredOnly ? 'transform translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium">Featured Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {filteredArticles.length} {activeCategory === 'All' ? 'Articles' : `${activeCategory} Articles`}
              </h2>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Latest technical insights'}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredArticles.length} of {articles.length} articles
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">No Articles Found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <Button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setFeaturedOnly(false);
                }}
                className="cyber-button"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Articles */}
              {!searchQuery && !featuredOnly && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Featured Articles
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {filteredArticles
                      .filter(article => article.featured)
                      .slice(0, 2)
                      .map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                          <div className="cyber-card rounded-2xl overflow-hidden group">
                            <div className="flex flex-col lg:flex-row">
                              <div className="lg:w-2/5">
                                <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent lg:hidden" />
                                </div>
                              </div>
                              <div className="lg:w-3/5 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                                    Featured
                                  </Badge>
                                  <Badge className="bg-primary/20 text-primary">
                                    {article.category}
                                  </Badge>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                  {article.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{article.readTime} read</span>
                                    <span>{article.views} views</span>
                                    <span>{article.likes} likes</span>
                                  </div>
                                  <Button className="cyber-button">
                                    Read Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {/* All Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredArticles
                    .filter(article => !featuredOnly || article.featured)
                    .map((article, index) => (
                      <ArticleCard key={article.id} article={article} index={index} />
                    ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="cyber-glass rounded-3xl p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss a <span className="cyber-gradient">Technical Insight</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join developers and technical leaders who receive exclusive content, 
                deep dives, and practical guides on modern web development.
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl cyber-glass border border-border focus:border-primary focus:outline-none"
                  />
                  <Button className="cyber-button px-8">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Weekly Technical Guides
                  </span>
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    Architecture Deep Dives
                  </span>
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-red-400" />
                    Exclusive Content
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