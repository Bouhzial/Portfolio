
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface Translations {
    [key: string]: {
        en: string;
        fr: string;
    };
}

const translations: Translations = {
    // Header & Meta
    'projects': { en: 'Projects', fr: 'Projets' },
    'tech_stack': { en: 'Tech stack', fr: 'Compétences' },
    'languages': { en: 'Languages', fr: 'Langues' },
    'hobbies': { en: 'Hobbies', fr: 'Loisirs' },
    'github_stats': { en: 'GitHub stats', fr: 'Stats GitHub' },
    'life_tracker': { en: 'Life tracker', fr: 'Suivi de vie' },
    'weather': { en: 'Weather', fr: 'Météo' },
    'resume': { en: 'Resume', fr: 'CV' },
    'email': { en: 'Email', fr: 'Email' },

    // Hero
    'hero_intro': { en: 'Hello, my name is', fr: 'Bonjour, je m\'appelle' },
    'hero_role_1': { en: 'I do', fr: 'Je fais du' },
    'hero_role_web': { en: 'Web Development', fr: 'Développement Web' },
    'hero_role_2': { en: 'by day, build', fr: 'le jour, je bâtis des' },
    'hero_role_saas': { en: 'SaaS Products', fr: 'Produits SaaS' },
    'hero_role_3': { en: 'by night.', fr: 'la nuit.' },
    'current_student': { en: 'I\'m currently a', fr: 'Je suis actuellement' },
    'master_student': { en: 'Master student', fr: 'étudiant en Master' },

    // Weather
    'feels_like': { en: 'Feels Like', fr: 'Ressenti' },
    'humidity': { en: 'Humidity', fr: 'Humidité' },
    'wind_speed': { en: 'Wind Speed', fr: 'Vent' },

    // Stats
    'followers': { en: 'Followers', fr: 'Abonnés' },
    'total_stars': { en: 'Total stars earned', fr: 'Étoiles gagnées' },
    'total_commits': { en: 'Total commits', fr: 'Total commits' },
    'total_prs': { en: 'Total PRs', fr: 'Total PRs' },
    'total_issues': { en: 'Total Issues', fr: 'Total Issues' },
    'weekdays': { en: 'Weekdays', fr: 'Jours de la semaine' },
    'steam_games': { en: 'Steam Games', fr: 'Jeux Steam' },

    // Languages Levels
    'advanced': { en: 'Advanced', fr: 'Avancé' },
    'native': { en: 'Native', fr: 'Natif' },

    // Language Names
    'lang_en': { en: 'English', fr: 'Anglais' },
    'lang_fr': { en: 'French', fr: 'Français' },
    'lang_ar': { en: 'Arabic', fr: 'Arabe' },

    // Hobbies
    'hobby_cycling': { en: 'Cycling', fr: 'Cyclisme' },
    'hobby_f1': { en: 'Formula 1', fr: 'Formule 1' },
    'hobby_chess': { en: 'Chess', fr: 'Échecs' },
    'hobby_sim_racing': { en: 'Sim Racing', fr: 'Sim Racing' },
    'hobby_economics': { en: 'Economics', fr: 'Économie' },

    // Life Tracker Stages
    'life_middle_school': { en: 'Middle school', fr: 'Collège' },
    'life_high_school': { en: 'High school', fr: 'Lycée' },
    'life_bachelor': { en: 'Bachelor in Math & CS at USTHB', fr: 'Licence Math-Info à l\'USTHB' },
    'life_master_ai': { en: 'Masters in AI at USTHB', fr: 'Master IA à l\'USTHB' },
    'life_master_web': { en: 'Masters in Web Dev at UCBL', fr: 'Master Dév Web à l\'UCBL' },
    'life_ongoing': { en: 'On going', fr: 'En cours' },

    // Weekdays
    'Monday': { en: 'Monday', fr: 'Lundi' },
    'Tuesday': { en: 'Tuesday', fr: 'Mardi' },
    'Wednesday': { en: 'Wednesday', fr: 'Mercredi' },
    'Thursday': { en: 'Thursday', fr: 'Jeudi' },
    'Friday': { en: 'Friday', fr: 'Vendredi' },
    'Saturday': { en: 'Saturday', fr: 'Samedi' },
    'Sunday': { en: 'Sunday', fr: 'Dimanche' },

    // Months
    'month_mar': { en: 'Mar', fr: 'Mars' },
    'month_jun': { en: 'Jun', fr: 'Juin' },
    'month_sep': { en: 'Sep', fr: 'Sep' },
    'month_dec': { en: 'Dec', fr: 'Déc' },

    // Projects (Descriptions logic might need dynamic Handling, but for now fixed)
    'proj_forquant_desc': {
        en: 'AI-driven algorithmic trading engine with real-time Forex recommendations and historical backtesting system.',
        fr: 'Moteur de trading algorithmique piloté par l\'IA avec recommandations Forex en temps réel et système de backtesting.'
    },
    'proj_trajeco_desc': {
        en: 'Eco-friendly trip planner integrating Google Maps and carbon footprint calculation.',
        fr: 'Planificateur de voyage écologique intégrant Google Maps et calcul de l\'empreinte carbone.'
    },
    'proj_dav_desc': {
        en: 'Blockchain-based document verification platform using Ethereum smart contracts.',
        fr: 'Plateforme de vérification de documents basée sur la blockchain utilisant des smart contracts Ethereum.'
    },
    'proj_hirepilot_desc': {
        en: 'Comprehensive career automation platform with AI resume generation and autonomous job application agents.',
        fr: 'Plateforme complète d\'automatisation de carrière avec génération de CV par IA et agents de candidature autonomes.'
    },
    'proj_netflix_desc': {
        en: 'Netflix clone with real-time streaming and torrent integration.',
        fr: 'Clone de Netflix avec streaming en temps réel et intégration torrent.'
    }
};

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'fr' : 'en');
    };

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
