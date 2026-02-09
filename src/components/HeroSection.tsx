import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <div className="p-6 rounded-lg space-y-4" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="mb-8">
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    {t('hero_intro')} <span className="font-bold">Ahmed BOUHZILA</span>.
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {t('current_student')}{' '}
                    <a href="http://master-info.univ-lyon1.fr/TIW/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-accent)' }}>{t('master_student')}</a>
                    {' '}@{' '}
                    <a href="https://www.univ-lyon1.fr/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-accent)' }}>Université Claude Bernard Lyon 1</a>.
                </p>
            </div>

            <div className="mb-8">
                <p className="text-2xl font-bold leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                    {t('hero_role_1')} <span style={{ color: 'var(--color-accent)' }}>{t('hero_role_web')}</span> {t('hero_role_2')} <span style={{ color: 'var(--color-accent)' }}>{t('hero_role_saas')}</span> {t('hero_role_3')}
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                <ActionButton icon={<FaEnvelope size={14} />} label={t('email')} href="mailto:bouhzialahmed2@gmail.com" />
                <ActionButton icon={<FaFileAlt size={14} />} label={t('resume')} href="/AhmedBouhzila.pdf" />
            </div>
        </div>
    );
}

function ActionButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
    return (
        <a
            href={href}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors hover:bg-opacity-80"
            style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)'
            }}
        >
            <span style={{ color: 'var(--color-text-secondary)' }}>{icon}</span>
            <span>{label}</span>
        </a>
    );
}
