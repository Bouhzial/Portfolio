import { useState, useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';

interface StockData {
    symbol: string;
    price: string | number;
    change: string | number;
    changePercent: string | number;
    isPositive: boolean;
    history: number[];
}

export function StockTracker() {
    const [data, setData] = useState<StockData | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch('/stock-data.json');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (error) {
            console.error('Failed to fetch stock data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 3600000); // Update every hour (3600000 ms)
        return () => clearInterval(interval);
    }, []);

    if (!data) return null; // Or a loading skeleton

    const { symbol, price, change, changePercent, isPositive, history } = data;

    // Generate path from history
    const points = history && history.length > 0 ? history : [0, 5, 2, 8, 5, 10]; // fallback
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    // Normalize to 0-40 height, 0-100 width
    const normalizedPoints = points.map((p, i) => {
        const x = (i / (points.length - 1)) * 100;
        const y = 40 - ((p - min) / range) * 40;
        return [x, y];
    });

    const pathD = `M ${normalizedPoints.map(p => p.join(',')).join(' L ')}`;

    return (
        <div className="p-4 rounded-lg flex items-center justify-between"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)'
            }}>

            <div className="flex flex-col">
                <h3 className="text-xs font-medium flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                    <FaChartLine />
                    <span>{symbol}</span>
                </h3>
                <div className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
                    {price}
                </div>
            </div>

            <div className="h-8 w-24 mx-4">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path
                        d={pathD}
                        fill="none"
                        stroke={isPositive ? "#4ade80" : "#ef4444"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className={`text-xs font-medium text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                <div>{change}</div>
                <div>({changePercent}%)</div>
            </div>
        </div>
    );
}
