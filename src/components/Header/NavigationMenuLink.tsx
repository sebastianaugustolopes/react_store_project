import React from 'react'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
  href: string
  title: string
  icon: React.ReactNode
  description: string
  className?: string
  target?: string
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  title,
  icon,
  description,
  className,
  target = '_blank',
}) => {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        target={target}
        className={cn(
          'group items-start p-2 rounded-2xl transition-all duration-200 hover:bg-white/5 hover:backdrop-blur-sm',
          className
        )}
      >
        <div className="mb-1 mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-900 text-purple-400 shadow-md group-hover:text-purple-300 group-hover:shadow-purple-800/20 group-hover:border-purple-900/50 transition-all">
          {icon}
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-white group-hover:text-purple-200 transition-colors">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-400 group-hover:text-zinc-300 transition-colors">
            {description}
          </p>
        </div>

        <div className="ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </div>
      </a>
    </NavigationMenuLink>
  )
}
