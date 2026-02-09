import { FaUsers, FaStar, FaCodeBranch, FaExclamationCircle, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';
// @ts-ignore
import statsData from '../data/github-stats.json';
import { useLanguage } from '../contexts/LanguageContext';

interface GitHubStats {
    followers: number;
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
}

const GITHUB_USERNAME = 'Bouhzial';

export function GitHubStats() {
    const { t } = useLanguage();
    // Direct access to cached data
    const stats = statsData.profile;

    const statItems = [
        { icon: FaUsers, label: t('followers'), value: stats.followers },
        { icon: FaStar, label: t('total_stars'), value: stats.totalStars },
        { icon: BiGitCommit, label: `${t('total_commits')} (${new Date().getFullYear()})`, value: stats.totalCommits },
        { icon: FaCodeBranch, label: t('total_prs'), value: stats.totalPRs },
        { icon: FaExclamationCircle, label: t('total_issues'), value: stats.totalIssues },
    ];

    return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <FaGithub size={16} style={{ color: 'var(--color-text-secondary)' }} />
                    <span style={{ color: 'var(--color-text-primary)' }}>{t('github_stats')}</span>
                </h3>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    <FaExternalLinkAlt size={12} />
                </a>
            </div>

            <div className="space-y-2">
                {statItems.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Icon size={14} style={{ color: 'var(--color-text-secondary)' }} />
                                <span style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</span>
                            </div>
                            <span className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</span>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
