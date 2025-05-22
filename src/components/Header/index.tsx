import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Github,
  Linkedin,
  MessageSquare,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Shadcn components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Import images using relative paths instead of alias paths
import logo from '../../assets/images/logo.png'
import avatar from '../../assets/images/avatar.jpg'
import { AuthorCard } from './AthorCard'
import { SocialLink } from './NavigationMenuLink'
import { useState } from 'react'

const Header = ({ onMenuHover }: { onMenuHover?: (isHovered: boolean) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleMenuHover = (isHovered: boolean) => {
    if (onMenuHover) {
      onMenuHover(isHovered)
    }
  }
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center px-5 py-4 bg-neutral-950/60">
      <div className="flex gap-x-2">
        <img className="w-9" src={logo} alt="Logo" />
        <span
          onClick={() => setMenuOpen(true)}
          className="flex sm:hidden items-center justify-center"
        >
          {menuOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {/* Navegação do menu desktop */}
      <NavigationMenu
        className="justify-self-center"
        onMouseEnter={() => handleMenuHover(true)}
        onMouseLeave={() => handleMenuHover(false)}
      >
        <NavigationMenuList className="hidden sm:flex">
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink>Eventos</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-2 md:w-[440px] md:grid-cols-2 lg:w-[600px] ">
                <li>Categorias...</li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Sobre mim</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-x-6 p-4 md:w-[500px] lg:w-[750px] lg:grid-cols-[.8fr_1fr] bg-gradient-to-br from-zinc-900/90 to-black/95 backdrop-blur-xl rounded-2xl border border-zinc-800/60 shadow-2xl shadow-purple-900/10">
                <AuthorCard
                  image={avatar}
                  name="Sebastian Augusto"
                  bio="Desenvolvedor Web Full Stack especializado em JavaScript, com ênfase na criação de interfaces de usuário modernas e no desenvolvimento de aplicações de página única (SPA)."
                />

                {/* Seção de links sociais */}
                <div className="space-y-4">
                  <SocialLink
                    href="https://github.com/sebastianaugustolopes"
                    title="GitHub"
                    icon={<Github className="h-5 w-5" />}
                    description="Acesse repositórios com projetos pessoais, protótipos e contribuições open source no GitHub."
                  />

                  <SocialLink
                    href="https://www.linkedin.com/in/sebastianaugusto/"
                    title="LinkedIn"
                    icon={<Linkedin className="h-5 w-5" />}
                    description="Perfil profissional com experiências, tecnologias utilizadas e histórico de projetos."
                  />

                  <SocialLink
                    href="https://www.threads.com/@_ssebastianaugusto"
                    title="Threads"
                    icon={<MessageSquare className="h-5 w-5" />}
                    description="Publicações técnicas e comentários sobre tendências em desenvolvimento web e JavaScript."
                  />
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Sobreposição do menu mobile */}
      {menuOpen || isClosing ? (
        <div className="fixed inset-0 z-50 bg-black/50  backdrop-blur-sm ">
          <aside
            className={`absolute left-0 top-0 h-full w-60 p-4 bg-neutral-950/60 backdrop-blur-md shadow-2xl rounded-r-xl transition-all duration-300 animate-slide-in ease-in-out ${
              isClosing ? '-translate-x-full ' : 'translate-x-0 '
            }`}
          >
            {/* Botão de fechar */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  handleClose()
                }}
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navegação */}
            <nav className="flex flex-col gap-3 ">
              <Link
                to="/docs"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Eventos</span>
              </Link>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Categoria 1</SelectItem>
                  <SelectItem value="dark">Gategoria 2</SelectItem>
                  <SelectItem value="system">Categoria 3</SelectItem>
                </SelectContent>
              </Select>

              <a
                href="/sobre"
                className="flex items-center gap-4 pb-3 rounded-lg absolute bottom-0 "
              >
                <img
                  src={avatar}
                  alt="Foto do autor"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold leading-tight">Sebastian Augusto</h3>
                  <p className="text-xs text-zinc-400">@_ssebastianaugusto</p>
                </div>
              </a>
            </nav>
          </aside>
        </div>
      ) : null}

      <Sheet>
        <SheetTrigger className="flex items-center gap-2 transition-colors duration-200">
          {/* Ícone do carrinho: visível até LG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 h-8 text-neutral-400 hover:text-white cursor-pointer lg:hidden "
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 11-1 9" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
            <path d="M4.5 15.5h15" />
            <path d="m5 11 4-7" />
            <path d="m9 11 1 9" />
          </svg>

          {/* Texto "Carrinho": visível a partir de LG */}
          <span className="hidden lg:inline text-neutral-400 hover:text-white cursor-pointer">
            Carrinho
          </span>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header
