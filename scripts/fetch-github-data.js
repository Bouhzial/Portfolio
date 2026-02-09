import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'Bouhzial';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

const OUTPUT_FILE = path.join(__dirname, '../src/data/github-stats.json');

const headers = GITHUB_TOKEN
    ? {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    }
    : {};

async function fetchGitHubData() {
    try {
        console.log(`Fetching data for ${GITHUB_USERNAME}...`);

        // 1. Fetch User Profile
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        const userData = await userRes.json();

        if (!userRes.ok) throw new Error(`Failed to fetch user: ${userData.message}`);

        // 2. Fetch Repositories
        // Fetching up to 100 repos sorted by updated
        const reposRes = await fetch(
            `https://api.github.com/search/repositories?q=user:${GITHUB_USERNAME}&per_page=100&sort=updated`,
            { headers }
        );
        const reposData = await reposRes.json();
        const repos = reposData.items || [];

        // 3. Calculate Total Stars
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        // 4. Fetch Languages
        const languageBytes = {};
        let totalBytes = 0;

        // Limit to top 30 repos to avoid rate limits and long wait times
        console.log('Fetching languages...');
        for (const repo of repos.slice(0, 30)) {
            try {
                const langRes = await fetch(repo.languages_url, { headers });
                if (langRes.ok) {
                    const langData = await langRes.json();
                    Object.entries(langData).forEach(([lang, bytes]) => {
                        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
                        totalBytes += bytes;
                    });
                }
            } catch (err) {
                console.error(`Error fetching languages for ${repo.name}:`, err.message);
            }
        }

        const languages = Object.entries(languageBytes)
            .map(([name, bytes]) => ({
                name,
                percentage: (bytes / totalBytes) * 100,
                // Colors will be handled in frontend or we can map them here if needed
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 8);


        // 5. Fetch Commit Activity (Weekdays)
        console.log('Fetching commit activity...');
        const dayCommits = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
        let totalCommits = 0;
        let totalCommitsYear = 0;
        const currentYear = new Date().getFullYear();

        // We use a simplified approach: fetch recent activity events or search commits
        // Search API for commits is rate limited strictly.
        // Better approach for "Total Commits this year":
        // Use search API: author:USERNAME committer-date:>=2024-01-01

        // Fetch total commits count for the year
        const commitsSearchRes = await fetch(
            `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}+committer-date:>=${currentYear}-01-01&per_page=1`,
            { headers: { ...headers, 'Accept': 'application/vnd.github.cloak-preview' } }
        );
        const commitsSearchData = await commitsSearchRes.json();
        totalCommitsYear = commitsSearchData.total_count || 0;

        // For weekdays distribution, we need actual commit dates.
        // We can fetch events from /users/:username/events (public activity)
        // This gives recent activity (last 90 days), which is often enough for "weekday habits"
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, { headers });
        const events = await eventsRes.json();

        if (Array.isArray(events)) {
            events.filter(e => e.type === 'PushEvent').forEach(e => {
                if (e.payload && e.payload.commits) {
                    const date = new Date(e.created_at);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    // dayCommits[dayName] is initialized to 0 above
                    dayCommits[dayName] = (dayCommits[dayName] || 0) + e.payload.commits.length;
                    totalCommits += e.payload.commits.length; // This is recent total, not year total
                }
            });
        }



        // Fallback/Augment: Fetch commits from top 5 recently updated repos to ensure we have data
        console.log('Fetching repo commits for fallback...');
        for (const repo of repos.slice(0, 5)) {
            try {
                const commitsRes = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&per_page=20`,
                    { headers }
                );
                if (commitsRes.ok) {
                    const commits = await commitsRes.json();
                    commits.forEach(commit => {
                        const date = new Date(commit.commit.author.date);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        dayCommits[dayName] = (dayCommits[dayName] || 0) + 1;
                        // We don't add to totalCommits here to avoid double counting if events worked, 
                        // or we just accept some overlap. For a distribution chart, overlap doesn't matter much.
                        // But we want to ensure totalCommits > 0 for percentages.
                        totalCommits++;
                    });
                }
            } catch (err) {
                console.error(`Error fetching commits for ${repo.name}:`, err.message);
            }
        }

        const weekdays = Object.entries(dayCommits).map(([day, count]) => ({
            name: day,
            percentage: totalCommits > 0 ? (count / totalCommits) * 100 : 0
        }));

        // 6. Fetch Issues & PRs counts
        const issuesRes = await fetch(
            `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue+created:>=${currentYear}-01-01`,
            { headers }
        );
        const issuesData = await issuesRes.json();
        const totalIssues = issuesData.total_count || 0;

        const prsRes = await fetch(
            `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+created:>=${currentYear}-01-01`,
            { headers }
        );
        const prsData = await prsRes.json();
        const totalPRs = prsData.total_count || 0;


        const stats = {
            profile: {
                followers: userData.followers,
                totalStars,
                totalCommits: totalCommitsYear,
                totalPRs,
                totalIssues,
                url: userData.html_url
            },
            languages,
            weekdays,
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(stats, null, 2));
        console.log(`Success! Stats saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        process.exit(1);
    }
}

fetchGitHubData();
