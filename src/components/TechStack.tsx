import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiVuedotjs,
    SiAngular,
    SiNextdotjs,
    SiNodedotjs,
    SiNestjs,
    SiSpring,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiPython,
    SiDocker,
    SiGithubactions,
    SiGitlab,
    SiFigma,
    SiNumpy,
    SiPandas,
    SiScikitlearn
} from 'react-icons/si';
import { FaTools, FaGlobe, FaBicycle, FaFlagCheckered, FaChessKnight, FaGamepad, FaHeart, FaChartLine } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const technologies = [
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'Vue.js', icon: SiVuedotjs, color: '#42b883' },
    { name: 'Angular', icon: SiAngular, color: '#dd0031' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'NestJS', icon: SiNestjs, color: '#e0234e' },
    { name: 'Spring Boot', icon: SiSpring, color: '#6db33f' },
    { name: 'Laravel', icon: SiLaravel, color: '#ff2d20' },
    { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'Python', icon: SiPython, color: '#3776ab' },
    { name: 'Docker', icon: SiDocker, color: '#2496ed' },
    { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
    { name: 'GitLab CI', icon: SiGitlab, color: '#fc6d26' },
    { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
    { name: 'NumPy', icon: SiNumpy, color: '#013243' },
    { name: 'Pandas', icon: SiPandas, color: '#150458' },
    { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#f7931e' },
];

export function TechStack() {
    const { t } = useLanguage();

    const languages = [
        { name: t('lang_en'), level: t('advanced'), code: 'EN' },
        { name: t('lang_fr'), level: t('advanced'), code: 'FR' },
        { name: t('lang_ar'), level: t('native'), code: 'AR' },
    ];

    return (
        <div className="space-y-4">
            {/* Technologies */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <FaTools size={16} style={{ color: 'var(--color-text-secondary)' }} />
                    <span>{t('tech_stack')}</span>
                </h3>

                <div className="grid grid-cols-6 gap-3">
                    {technologies.map((tech, idx) => {
                        const Icon = tech.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative group"
                            >
                                <Icon size={24} style={{ color: 'var(--color-text-primary)' }} />
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                    style={{
                                        backgroundColor: 'var(--color-bg-card)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text-primary)'
                                    }}
                                >
                                    {tech.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Languages */}
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <FaGlobe size={16} style={{ color: 'var(--color-text-secondary)' }} />
                    <span>{t('languages')}</span>
                </h3>

                <div className="space-y-2">
                    {languages.map((lang, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[10px] px-1 rounded" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>
                                    {lang.code}
                                </span>
                                <span style={{ color: 'var(--color-text-primary)' }}>{lang.name}</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-secondary)'
                            }}>
                                {lang.level}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hobbies */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <FaHeart size={16} style={{ color: 'var(--color-text-secondary)' }} />
                    <span>{t('hobbies')}</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { name: t('hobby_cycling'), icon: FaBicycle },
                        { name: t('hobby_f1'), icon: FaFlagCheckered },
                        { name: t('hobby_chess'), icon: FaChessKnight },
                        { name: t('hobby_sim_racing'), icon: FaGamepad },
                        { name: t('hobby_economics'), icon: FaChartLine },
                    ].map((hobby, idx) => {
                        const Icon = hobby.icon;
                        return (
                            <div key={idx} className="flex items-center gap-1 text-xs p-1 rounded transition-colors hover:bg-opacity-80" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                                <Icon size={14} style={{ color: 'var(--color-text-primary)' }} />
                                <span style={{ color: 'var(--color-text-primary)' }}>{hobby.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
