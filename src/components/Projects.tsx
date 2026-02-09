import { FaExternalLinkAlt, FaFolder, FaCode } from 'react-icons/fa';

interface Project {
    name: string;
    description: string;
    url?: string;
    technologies: string[];
    image?: string;
}

import { useLanguage } from '../contexts/LanguageContext';

export function Projects() {
    const { t } = useLanguage();

    const projects: Project[] = [
        {
            name: "Forquant",
            description: "proj_forquant_desc",
            url: "https://forquant.net/",
            technologies: ["Python", "MariaDB", "Nginx", "Playwright", "BeautifulSoup", "Docker", "GitHub Actions", "Matplotlib"],
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAqklEQVR4AW2OIQyDMBBFT802VTVovEBU1C9BTlU0qblkXuMtEo9CzSvUifoEh3eYS/C3rh1qe6bpS17uw3+0C8EpuLj5xJnkb9//cBJai3QO1QSedOkm9uVNZLTJaENJZeEY23XPbP2TbSmsGZcPnWVfBfQxBgNQRU7UJnJ0AFgSlajd1v6uQBOVcZ6Xfa5nH9cwmZVDkpfT1/TRHSJysoeKbpqIMSK28MMbg/NMVMibWCgAAAAASUVORK5CYII="
        },
        {
            name: "TrajEco",
            description: "proj_trajeco_desc",
            url: "https://github.com/Bouhzial/TrajEco",
            technologies: ["Spring Boot", "NextJs", "MariaDB"],
            image: "https://camo.githubusercontent.com/fd174389248d2d75f1b710306c80ef74d7b61d4ae47895f947861d042553836c/68747470733a2f2f692e6962622e636f2f6a50425a66466a722f696d6167652e706e67"
        },
        {
            name: "Document Authenticity Verification",
            description: "proj_dav_desc",
            url: "https://github.com/Bouhzial/Authentication-des-documents",
            technologies: ["NextJs", "Prisma"]
        },
        {
            name: "CarrerCruiser",
            description: "proj_hirepilot_desc",
            url: "https://hirepilott.me/",
            technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "OpenAI API", "Puppeteer", "Stripe", "Python (Flask)", "Docker"],
            image: "https://hirepilott.me/logo.svg"
        }
    ];

    return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <FaFolder size={16} style={{ color: 'var(--color-text-secondary)' }} />
                <span>{t('projects')}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, idx) => (
                    <div key={idx} className="flex flex-col p-4 rounded-lg border transition-all hover:shadow-md"
                        style={{
                            backgroundColor: 'var(--color-bg-primary)',
                            borderColor: 'var(--color-border)'
                        }}>

                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-[18px] h-[18px] rounded object-cover"
                                    />
                                ) : (
                                    <FaCode className="text-lg" style={{ color: 'var(--color-text-secondary)' }} />
                                )}
                                <h4 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{project.name}</h4>
                            </div>
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-70"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    <FaExternalLinkAlt size={12} />
                                </a>
                            )}
                        </div>

                        <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            {t(project.description)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
