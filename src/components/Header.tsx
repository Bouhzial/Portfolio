import { FaGithub, FaLinkedin, FaCode, FaInstagram } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { FaXTwitter } from 'react-icons/fa6';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const socialLinks = [
    { name: 'GITHUB', icon: FaGithub, url: 'https://github.com/Bouhzial' },
    { name: 'LINKEDIN', icon: FaLinkedin, url: 'https://www.linkedin.com/in/ahmed-bouhzila-29b06421a/?locale=fr_FR' },
    { name: 'Twitter', icon: FaXTwitter, url: 'https://x.com/AhmedBouhzila' },
    { name: 'INSTAGRAM', icon: FaInstagram, url: 'https://www.instagram.com/bouhzila.ahmed/' },
];

import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
    const { isDark, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)'
        }}>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded flex items-center justify-center text-xl" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <FaCode size={20} className="text-white" />
                </div>
            </div>

            <nav className="flex items-center gap-6">
                {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-medium tracking-wide hover:opacity-80 transition-opacity"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <Icon size={16} />
                            <span>{link.name}</span>
                        </a>
                    );
                })}
            </nav>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleLanguage}
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-primary)'
                    }}
                >
                    {language === 'en' ? 'FR' : 'EN'}
                </button>
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                    {isDark ? <MdLightMode size={20} style={{ color: 'var(--color-text-primary)' }} /> : <MdDarkMode size={20} style={{ color: 'var(--color-text-primary)' }} />}
                </button>
            </div>
        </header>
    );
}
