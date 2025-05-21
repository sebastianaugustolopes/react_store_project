import React from 'react'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'

interface AuthorCardProps {
  image: string
  name: string
  bio: string
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ image, name, bio }) => {
  return (
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <a
          className="group flex h-full w-full select-none flex-col justify-end rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-zinc-900/80 p-6 no-underline outline-none ring-offset-2 ring-offset-zinc-900 focus:ring-2 focus:ring-purple-500 relative"
          href="#"
        >
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Imagem do autor */}
          <div className="relative z-10 flex items-center justify-center mb-5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-75 group-hover:scale-100"></div>
            <img
              src={image}
              alt="Foto do autor"
              className="relative w-30 h-30 rounded-full object-cover border-2 border-white/10 shadow-lg shadow-purple-900/30 transition-all duration-300 group-hover:scale-105 z-10"
            />
          </div>

          {/* Nome/Título do autor */}
          <div className="mb-3 text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent relative z-10">
            {name}
          </div>

          {/* Bio do autor */}
          <p className="text-base leading-relaxed text-zinc-300/90 relative z-10">{bio}</p>

          {/* Chamada para ação */}
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-300 group-hover:text-purple-200 transition-colors relative z-10">
            Saiba mais
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
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
