import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'livingstoneoduory@gmail.com', href: 'mailto:livingstoneoduory@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+254 721373455', href: 'tel:+254721373455' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya (Remote Global)' },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/livingstone-otieno-bb0baa373' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/BOSSY254-LEVI' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/nairobian_bossy' },
];

const budgetOptions = [
  { value: '1k-5k', label: '$1,000 - $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
];

export function ContactSection() {
  const { toast } = useToast();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. I\'ll get back to you within 24 hours.',
    });

    setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <Badge variant="glow" className="mb-4">Contact</Badge>
          <h2>Let's Build Something Amazing</h2>
          <p>Ready to bring your vision to life? Let's discuss your project</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="font-medium hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I'm currently accepting new projects and open to full-time opportunities. 
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Budget</label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Details *</label>
              <Textarea
                required
                placeholder="Tell me about your project requirements, timeline, and goals..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary/50 border-border focus:border-primary resize-none"
              />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Proposal Request
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
