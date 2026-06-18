import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import LogoSVG from '@/Components/LogoSVG';

const NAV = [
    { href: '/',           label: 'Accueil' },
    { href: '/gouverneur', label: 'Le Gouverneur' },
    { href: '/cabinet',    label: 'Cabinet' },
    { href: '/communes',   label: 'Communes' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/mediatheque',label: 'Médiathèque' },
    { href: '/agenda',     label: 'Agenda' },
];

export default function PublicLayout({ children, title }) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Utility bar */}
            <div className="bg-bleu-ng text-[#cfe0f2] text-xs hidden sm:block">
                <div className="wrap flex justify-between items-center h-[34px] font-label tracking-wider">
                    <span className="uppercase tracking-widest text-[0.72rem]">Union des Comores · Île Autonome de Ngazidja</span>
                    <span className="flex gap-5 items-center">
                        <Link href="/agenda" className="opacity-80 hover:opacity-100 transition-opacity">Agenda</Link>
                        <Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</Link>
                    </span>
                </div>
            </div>

            {/* Main header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ligne shadow-soft">
                <div className="wrap flex items-center justify-between h-[74px]">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3">
                        <LogoSVG size={46} id="hdr" />
                        <div>
                            <strong className="font-serif text-[1.06rem] text-bleu-ng block leading-tight">Gouvernorat de Ngazidja</strong>
                            <span className="font-label text-[0.62rem] tracking-[.22em] uppercase text-gris">Île Autonome · Grande Comore</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex gap-1 items-center">
                        {NAV.map(({ href, label }) => {
                            const active = url === href || (href !== '/' && url.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`text-[0.9rem] font-medium px-3 py-2 rounded-[9px] transition-colors relative ${
                                        active
                                            ? 'text-bleu-ng after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-or after:rounded-full'
                                            : 'text-bleu-nuit hover:bg-azur-pale hover:text-bleu-ng'
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile burger */}
                    <button
                        className="lg:hidden flex flex-col gap-[5px] p-2"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        <span className={`w-6 h-0.5 bg-bleu-ng rounded-full transition-transform ${open ? 'rotate-45 translate-y-[7px]' : ''}`}/>
                        <span className={`w-6 h-0.5 bg-bleu-ng rounded-full transition-opacity ${open ? 'opacity-0' : ''}`}/>
                        <span className={`w-6 h-0.5 bg-bleu-ng rounded-full transition-transform ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
                    </button>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="lg:hidden border-t border-ligne bg-white px-4 pb-4">
                        {NAV.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="block py-3 px-2 text-[0.95rem] font-medium border-b border-ligne/50 last:border-0 text-bleu-nuit hover:text-bleu-ng"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Page content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-bleu-nuit text-[#9ab0c8] pt-14 pb-8">
                <div className="wrap">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <LogoSVG size={52} id="ftr" />
                                <div>
                                    <strong className="font-serif text-white block text-[1.1rem] leading-tight">Gouvernorat de Ngazidja</strong>
                                    <span className="font-label text-[0.62rem] tracking-widest uppercase text-[#6a8aaa]">Île Autonome · Grande Comore</span>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed max-w-sm">
                                Portail institutionnel du Gouvernorat de l'Île Autonome de Ngazidja. La référence numérique de l'administration générale de l'île.
                            </p>
                            <div className="flex gap-3 mt-5">
                                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-azur/30 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.5.4-1 1-1Z"/></svg>
                                </a>
                                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-azur/30 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12c0-2-.2-3.4-.4-4.2-.3-.9-1-1.5-1.9-1.6C18.6 6 12 6 12 6s-6.6 0-8.7.2c-.9.1-1.6.7-1.9 1.6C1.2 8.6 1 10 1 12s.2 3.4.4 4.2c.3.9 1 1.5 1.9 1.6C5.4 18 12 18 12 18s6.6 0 8.7-.2c.9-.1 1.6-.7 1.9-1.6.2-.8.4-2.2.4-4.2ZM10 15V9l5 3-5 3Z"/></svg>
                                </a>
                                <a href="#" aria-label="X" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-azur/30 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H-.5l7.5-9L0 3h6l4 5 5-5Z" transform="translate(2)"/></svg>
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="font-label text-xs uppercase tracking-widest text-or font-semibold mb-4">Navigation</h4>
                            <ul className="space-y-2 text-sm">
                                {NAV.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-label text-xs uppercase tracking-widest text-or font-semibold mb-4">Contact</h4>
                            <address className="not-italic text-sm space-y-2 leading-relaxed">
                                <p>Palais du Gouvernorat<br/>Mrodjuu, Moroni</p>
                                <p>Ngazidja — Union des Comores</p>
                            </address>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6a8aaa]">
                        <span>© {new Date().getFullYear()} Gouvernorat de l'Île Autonome de Ngazidja</span>
                        <span className="font-label uppercase tracking-widest">Union des Comores</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
