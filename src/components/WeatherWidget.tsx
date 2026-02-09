import { useState, useEffect } from 'react';
import { WiDaySunny, WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiDayCloudy, WiCloud, WiCloudy, WiShowers, WiDayRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherData {
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
    sunrise: number;
    sunset: number;
}

interface ForecastDay {
    date: string;
    temp: number;
    icon: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CITY = 'Lyon';
const COUNTRY = 'FR';
const REFRESH_INTERVAL = 60000; // 1 minute in milliseconds

export function WeatherWidget() {
    const { t, language } = useLanguage();
    const [current, setCurrent] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        try {
            // Fetch current weather
            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`
            );

            if (currentRes.status === 401) {
                setError('API Key Pending Activation (Takes 2-4 hours)');
                setLoading(false);
                return;
            }

            if (!currentRes.ok) throw new Error('Failed to fetch weather');
            const currentData = await currentRes.json();

            setCurrent({
                temp: Math.round(currentData.main.temp),
                feels_like: Math.round(currentData.main.feels_like),
                description: currentData.weather[0].description,
                icon: currentData.weather[0].icon,
                humidity: currentData.main.humidity,
                wind_speed: currentData.wind.speed,
                sunrise: currentData.sys.sunrise,
                sunset: currentData.sys.sunset,
            });

            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load weather');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();

        // Refresh every minute
        const interval = setInterval(fetchWeather, REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (loading) {
        return (
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="h-32 flex items-center justify-center" style={{ color: 'var(--color-text-secondary)' }}>
                    Loading weather...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <WiDaySunny size={20} style={{ color: 'var(--color-text-secondary)' }} />
                    Weather
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            </div>
        );
    }

    const getWeatherIcon = (iconCode: string) => {
        const style = { color: 'var(--color-text-primary)' };
        switch (iconCode?.slice(0, 2)) {
            case '01': return <WiDaySunny size={48} style={style} />;
            case '02': return <WiDayCloudy size={48} style={style} />;
            case '03': return <WiCloud size={48} style={style} />;
            case '04': return <WiCloudy size={48} style={style} />;
            case '09': return <WiShowers size={48} style={style} />;
            case '10': return <WiDayRain size={48} style={style} />;
            case '11': return <WiThunderstorm size={48} style={style} />;
            case '13': return <WiSnow size={48} style={style} />;
            case '50': return <WiFog size={48} style={style} />;
            default: return <WiDaySunny size={48} style={style} />;
        }
    };

    return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                    <WiDaySunny size={20} style={{ color: 'var(--color-text-secondary)' }} />
                    {CITY}
                </h3>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
            </div>

            {current && (
                <>
                    {/* Current Weather */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                {current.temp}°C
                            </div>
                            <div className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                {t('feels_like')} {current.feels_like}°C
                            </div>
                            <div className="text-xs capitalize" style={{ color: 'var(--color-text-secondary)' }}>
                                {current.description}
                            </div>
                        </div>
                        {getWeatherIcon(current.icon)}
                    </div>

                    {/* Sun Times */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className="flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <WiSunrise size={18} />
                            <span>{formatTime(current.sunrise)}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <WiSunset size={18} />
                            <span>{formatTime(current.sunset)}</span>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <WiHumidity size={18} />
                            <span>{current.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <WiStrongWind size={18} />
                            <span>{current.wind_speed} m/s</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
