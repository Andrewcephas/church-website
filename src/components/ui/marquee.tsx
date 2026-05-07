import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
}

export const Marquee = ({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {/* First copy */}
      <div
        className={cn(
          "flex shrink-0 justify-around gap-4",
          vertical ? "flex-col py-4 animate-[marquee-vert_20s_linear_infinite]" : "animate-[marquee-horiz_30s_linear_infinite]",
          reverse && "direction-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      {/* Second copy for seamless loop */}
      <div
        className={cn(
          "flex shrink-0 justify-around gap-4",
          vertical ? "flex-col py-4 animate-[marquee-vert_20s_linear_infinite]" : "animate-[marquee-horiz_30s_linear_infinite]",
          reverse && "direction-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export const MarqueeItem = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex-shrink-0", className)}>
      {children}
    </div>
  )
}
