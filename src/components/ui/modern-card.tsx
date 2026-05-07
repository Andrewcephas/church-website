import * as React from "react";
import { cn } from "@/lib/utils";

export interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'glass' | 'elevated';
  hoverEffect?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'top' | 'left';
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'accent';
  asChild?: boolean;
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ 
    className, 
    variant = 'default', 
    hoverEffect = true,
    icon,
    iconPosition = 'top',
    badge,
    badgeVariant = 'primary',
    children,
    asChild = false,
    ...props 
  }, ref) => {
    
    const baseClasses = cn(
      "relative overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
      hoverEffect && "hover:-translate-y-3 hover:shadow-[0_32px_64px_-16px_rgba(139,26,140,0.15)]",
      className
    );

    const variantClasses = {
      default: cn(
        "bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800/50",
        "shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
      ),
      glow: cn(
        "bg-white dark:bg-zinc-900 border-primary/10",
        "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        "after:absolute after:inset-0 after:rounded-[2rem] after:shadow-[inset_0_0_0_1px_rgba(139,26,140,0.1)] after:pointer-events-none"
      ),
      glass: cn(
        "bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border-white/20 dark:border-white/5",
        "shadow-[0_8px_32px_0_rgba(139,26,140,0.05)]"
      ),
      elevated: cn(
        "bg-white dark:bg-zinc-900 border-transparent",
        "shadow-[0_20px_40px_rgba(0,0,0,0.04)]",
        "hover:border-primary/20"
      )
    };

    return (
      <div ref={ref} className={cn(baseClasses, variantClasses[variant])} {...props}>
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-6 right-6 z-10">
            <span className={cn(
              "px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full",
              badgeVariant === 'primary' && "bg-primary text-white shadow-lg shadow-primary/20",
              badgeVariant === 'secondary' && "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20",
              badgeVariant === 'accent' && "bg-accent text-accent-foreground shadow-sm"
            )}>
              {badge}
            </span>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="relative z-10 p-8 md:p-10">
          {icon && iconPosition === 'top' && (
            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-sm">
              {React.cloneElement(icon as React.ReactElement, { className: cn((icon as React.ReactElement).props.className, "w-6 h-6") })}
            </div>
          )}
          
          <div className={cn(
            iconPosition === 'left' && "flex items-start gap-6",
            iconPosition === 'top' && ""
          )}>
            {icon && iconPosition === 'left' && (
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {React.cloneElement(icon as React.ReactElement, { className: cn((icon as React.ReactElement).props.className, "w-5 h-5") })}
              </div>
            )}
            <div className="flex-1 space-y-4">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

ModernCard.displayName = "ModernCard";

export { ModernCard };

// DataCard for Admin/Dashboard Stats
export const DataCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend = 'up',
  className 
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down';
  className?: string;
}) => {
  return (
    <ModernCard 
      variant="glow" 
      hoverEffect={true}
      className={cn("group", className)}
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        {change && (
          <span className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              "bg-red-100/80 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {trend === 'up' ? "?" : "?"} {change}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-muted-foreground mb-1.5">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
      </div>
    </ModernCard>
  );
};
