import { FaSteam, FaGithub, FaCode } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
// @ts-ignore
import statsData from '../data/github-stats.json';

interface StatItem {
    name: string;
    percentage: number;
    color: string;
}

const languageColors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'Go': '#00add8',
    'Rust': '#dea584',
    'PHP': '#4f5d95',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#41b883',
    // Add defaults
};

// Hardcoded Steam games data
const steamGames: StatItem[] = [
    { name: 'Rainbow Six Siege', percentage: 40, color: '#FF9900' },       // Orange
    { name: 'CS2', percentage: 30, color: '#DECB13' },         // Yellowish
    { name: 'Assetto Corsa', percentage: 20, color: '#FF0000' }, // Red
    { name: 'Fortnite', percentage: 10, color: '#A259FF' },    // Purple
];

const dayColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39', '#0e4429', '#006d32'];

export function ProgressBars() {
    const { t } = useLanguage();
    // Process static data
    const languages: StatItem[] = (statsData.languages || []).map((lang: any) => ({
        name: lang.name,
        percentage: lang.percentage,
        color: languageColors[lang.name] || '#8b949e'
    }));

    const weekdays: StatItem[] = (statsData.weekdays || []).map((day: any, idx: number) => ({
        name: day.name,
        percentage: day.percentage,
        color: dayColors[idx % dayColors.length]
    }));

    const StackedBar = ({ items, label, icon: Icon }: { items: StatItem[], label: string, icon: any }) => (
        <div className="flex items-center gap-4 mb-5">
            <div className="w-32 flex items-center gap-2 text-xs font-mono shrink-0" style={{ color: 'var(--color-text-secondary)' }}>
                <Icon />
                <span>{label}</span>
            </div>

            <div className="h-4 flex-1 flex bg-gray-700 relative rounded">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={`h-full relative transition-all hover:brightness-110 cursor-pointer group ${idx === 0 ? 'rounded-l' : ''} ${idx === items.length - 1 ? 'rounded-r' : ''}`}
                        style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                        }}
                    >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                                zIndex: 50
                            }}
                        >
                            <span className="font-bold">{t(item.name) || item.name}</span>: {item.percentage.toFixed(1)}%
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                                style={{ borderTopColor: 'var(--color-border)' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <StackedBar items={languages} label={`${t('languages')}:`} icon={FaCode} />
            <StackedBar items={weekdays} label={`${t('weekdays')} (2024):`} icon={FaGithub} />
            <StackedBar items={steamGames} label={`${t('steam_games')}:`} icon={FaSteam} />
        </div>
    );
}
