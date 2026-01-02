import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

const themes = [
  { value: 'obsidian-tech', label: 'Obsidian Tech', description: 'Deep near-black, electric cyan & violet' },
  { value: 'midnight-aurora', label: 'Midnight Aurora', description: 'Dark blue, soft neon gradients' },
  { value: 'minimal-ivory', label: 'Minimal Ivory', description: 'Off-white, charcoal text' },
  { value: 'cyber-noir', label: 'Cyber Noir', description: 'Pure black, sharp neon accents' },
  { value: 'solar-dusk', label: 'Solar Dusk', description: 'Warm dark, amber & rose highlights' },
] as const;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentTheme?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="flex flex-col items-start"
          >
            <div className="font-medium">{themeOption.label}</div>
            <div className="text-xs text-muted-foreground">{themeOption.description}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
