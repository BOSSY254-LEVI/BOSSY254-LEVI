import { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Code, Mail, BookOpen, } from 'lucide-react';

const commands = [
  {
    id: 'home',
    title: 'Home',
    description: 'Go to homepage',
    icon: Home,
    path: '/',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn more about me',
    icon: User,
    path: '/about',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'View my portfolio',
    icon: Briefcase,
    path: '/projects',
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Technical expertise',
    icon: Code,
    path: '/skills',
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Work history',
    icon: Briefcase,
    path: '/experience',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch',
    icon: Mail,
    path: '/contact',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Read my articles',
    icon: BookOpen,
    path: '/blog',
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: typeof commands[0]) => {
    navigate(command.path);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-2xl">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {commands.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => runCommand(command)}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <command.icon className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{command.title}</span>
                    <span className="text-sm text-muted-foreground">{command.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
