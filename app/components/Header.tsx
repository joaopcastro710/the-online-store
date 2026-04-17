import { Link } from "react-router"
import { ShoppingBag, Search, User } from "lucide-react"

export default function Header() {
    return(
        <header className="border-b border-[#e2e2e2] bg-white">
            <div className="w-full px-6 py-4 grid grid-cols-[2fr_1fr_2fr] items-center">
                <Link to="/" className="font-sans font-bold text-sm md:text-2x1 tracking-[0.05em] uppercase text-[#1b2a4a] whitespace-nowrap">
                    The Online Store
                </Link>  

                <nav className="hidden md:flex items-center justify-center gap-8">
                    <Link to="/" className="text-sm text-[#1b2a4a] hover:opacity-60">Home</Link>
                    <Link to="/" className="text-sm text-[#1b2a4a] hover:opacity-60">Shop</Link>
                    <Link to="/" className="text-sm text-[#1b2a4a] hover:opacity-60">About</Link>
                    <Link to="/" className="text-sm text-[#1b2a4a] hover:opacity-60">Contact</Link>
                    <Link to="/" className="text-sm text-[#1b2a4a] hover:opacity-60">Blog</Link>
                </nav>

                <div className="flex items-center justify-end gap-4">
                    <Search size={18} className="text-[#1b2a4a] cursor-pointer hover:opacity-60"/>
                    <User size={18} className="text-[#1b2a4a] cursor-pointer hover:opacity-60"/>
                    <Link to="/cart" className="relative">
                        <ShoppingBag size={18} className="text-[#1b2a4a] hover:opacity-60"/>
                    </Link>
                </div>
            </div>            

        </header>
    )
}