import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useSettings } from '@/contexts/SettingsContext';

interface ScrollingHeadlineProps {
  enabled?: boolean;
  text?: string;
  link?: string;
  linkText?: string;
}

export function ScrollingHeadline({
  enabled = true,
  text,
  link,
  linkText
}: ScrollingHeadlineProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useSettings();

  // Get headlines from settings or use empty array
  const headlines = settings?.headlines || [];

  // Don't show if disabled, not visible, and no dynamic text OR no headlines
  if (!enabled || !isVisible || (!text && headlines.length === 0)) return null;

  return (
    <div className="relative overflow-hidden text-blue-900 shadow-sm border-b border-blue-100 bg-white">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        {/* Updates Badge */}
        <div className="shrink-0">
          <Badge className="gap-1.5 bg-primary text-white shadow-md hover:bg-primary/90 transition-all">
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span className="font-semibold text-[10px] uppercase tracking-wider">Updates</span>
          </Badge>
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left whitespace-nowrap flex">
            {text ? (
              <div className="flex items-center">
                <span className="text-sm font-semibold px-8 inline-block text-slate-800">
                  {text}
                </span>
                {link && (
                  <Link to={link || "#"} className="text-sm font-bold text-primary hover:underline ml-[-20px] mr-8">
                    {linkText || 'Learn More'}
                  </Link>
                )}
              </div>
            ) : (
              [...headlines, ...headlines].map((headline, index) => (
                <span
                  key={index}
                  className="text-sm font-medium px-8 inline-block text-gray-800 transition-colors"
                >
                  {headline}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="shrink-0 h-6 w-6 text-gray-500 hover:text-gray-700"
          aria-label="Close announcement"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
