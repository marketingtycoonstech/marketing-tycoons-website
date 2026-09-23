import React from 'react';
import {
  Code,
  Palette,
  Crown,
  TrendingUp,
  Share2,
  Target,
  Globe,
  Layers,
  Sparkles,
  Shield,
  Rocket,
  Check,
  Star,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  Play,
  Moon,
  Sun,
  Menu,
  X,
  Lock,
  Eye,
  Trash2,
  Edit3,
  Plus,
  RefreshCw,
  Sliders,
  Award,
  Users,
  Briefcase,
  Clock,
  Compass,
  Zap,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  const iconMap: Record<string, React.ElementType> = {
    Code,
    Palette,
    Crown,
    TrendingUp,
    Share2,
    Target,
    Globe,
    Layers,
    Sparkles,
    Shield,
    Rocket,
    Check,
    Star,
    ExternalLink,
    ChevronRight,
    ArrowRight,
    Mail,
    Phone,
    MessageSquare,
    Play,
    Moon,
    Sun,
    Menu,
    X,
    Lock,
    Eye,
    Trash2,
    Edit3,
    Plus,
    RefreshCw,
    Sliders,
    Award,
    Users,
    Briefcase,
    Clock,
    Compass,
    Zap,
    BarChart3,
    CheckCircle2,
    AlertCircle
  };

  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
};
