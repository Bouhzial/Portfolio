import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AvatarCard } from './components/AvatarCard';
import { WeatherWidget } from './components/WeatherWidget';

import { LifeTracker } from './components/LifeTracker';
import { GitHubStats } from './components/GitHubStats';
import { StockTracker } from './components/StockTracker';
import { TechStack } from './components/TechStack';
import { ProgressBars } from './components/ProgressBars';
import { Projects } from './components/Projects';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <Header />

        <main className="p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-4">
              <HeroSection />
              <div className="grid grid-cols-2 gap-4">
                <AvatarCard />
                <GitHubStats />
              </div>
              <StockTracker />
            </div>

            {/* Center Column */}
            <div className="lg:col-span-5 space-y-4">
              <WeatherWidget />
              <LifeTracker />
              <ProgressBars />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 space-y-4">
              <TechStack />
            </div>

            {/* Projects Section - Full Width */}
            <div className="lg:col-span-12">
              <Projects />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
