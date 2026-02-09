import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

interface Stage {
    label: string;
    color: string;
    startYear: number;
    startMonthIdx: number; // 0: Mar, 1: Jun, 2: Sep, 3: Dec
    endYear: number;
    endMonthIdx: number;
}

const startYear = 2016;
const endYear = 2026;
// On ajoute 1 à la différence pour inclure la colonne de l'année de fin
const totalYears = (endYear - startYear) + 1;

export function LifeTracker() {
    const { t } = useLanguage();
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

    const months = [t('month_mar'), t('month_jun'), t('month_sep'), t('month_dec')];

    const stages: Stage[] = [
        { label: t('life_middle_school'), color: '#fb923c', startYear: 2016, startMonthIdx: 0, endYear: 2017, endMonthIdx: 1 },
        { label: t('life_high_school'), color: '#a78bfa', startYear: 2017, startMonthIdx: 2, endYear: 2020, endMonthIdx: 2 },
        { label: t('life_bachelor'), color: '#22d3d8', startYear: 2020, startMonthIdx: 3, endYear: 2023, endMonthIdx: 1 },
        { label: t('life_master_ai'), color: '#facc15', startYear: 2023, startMonthIdx: 2, endYear: 2024, endMonthIdx: 1 },
        // Fin réglée sur Dec (index 3) de 2026 pour remplir la colonne
        { label: t('life_master_web'), color: '#60a5fa', startYear: 2024, startMonthIdx: 2, endYear: 2026, endMonthIdx: 1 },
        { label: t('life_ongoing'), color: '#', startYear: 2026, startMonthIdx: 1, endYear: 2026, endMonthIdx: 4 }
    ];

    const getLinearTime = (y: number, mIdx: number) => y * 4 + mIdx;

    const generateGrid = () => {
        const grid: { color: string; label: string }[][] = Array.from({ length: 4 }, () => []);

        for (let yOffset = 0; yOffset < totalYears; yOffset++) {
            const currentYear = startYear + yOffset;

            for (let qIdx = 0; qIdx < 4; qIdx++) {
                const currentTime = getLinearTime(currentYear, qIdx);

                const stage = stages.find(s => {
                    const startTime = getLinearTime(s.startYear, s.startMonthIdx);
                    const endTime = getLinearTime(s.endYear, s.endMonthIdx);
                    return currentTime >= startTime && currentTime <= endTime;
                });

                grid[qIdx].push({
                    color: stage?.color || 'var(--color-bg-secondary)',
                    label: stage?.label || ''
                });
            }
        }
        return grid;
    };

    const gridData = generateGrid();

    return (
        <div className="p-4 rounded-lg w-full" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--color-text-primary)' }}>
                <FaCalendarAlt size={20} style={{ color: 'var(--color-text-secondary)' }} />
                <span className="text-sm font-medium">Life tracker</span>
            </div>

            {/* Year labels - Aligned with grid columns */}
            <div className="flex mb-2 w-full">
                <div className="w-8 shrink-0"></div>
                <div className="flex gap-1.5 flex-1 w-full justify-between">
                    {Array.from({ length: totalYears }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 text-[10px] flex justify-center"
                            style={{
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                color: 'var(--color-text-secondary)',
                                height: '35px'
                            }}
                        >
                            {startYear + i}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 w-full">
                {/* Month labels */}
                <div className="flex flex-col justify-between py-1 text-[10px] shrink-0 w-8" style={{ color: 'var(--color-text-secondary)' }}>
                    {months.map(m => <div key={m} className="h-6 flex items-center">{m}</div>)}
                </div>

                {/* Grid */}
                <div className="flex flex-col gap-1.5 flex-1 w-full">
                    {gridData.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex gap-1.5 w-full justify-between">
                            {row.map((cell, colIdx) => (
                                <div
                                    key={`${rowIdx}-${colIdx}`}
                                    className="flex-1 h-6 rounded-sm transition-all hover:scale-125 hover:z-10 relative cursor-pointer"
                                    style={{
                                        backgroundColor: cell.color,
                                        opacity: cell.label ? 1 : 0.1,
                                        border: cell.label ? 'none' : '1px solid var(--color-border)'
                                    }}
                                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                                    onMouseLeave={() => setHoveredCell(null)}
                                >
                                    {hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx && cell.label && (
                                        <div
                                            className="absolute left-1/2 -translate-x-1/2 bottom-8 px-3 py-1.5 rounded text-[10px] whitespace-nowrap z-50 shadow-lg"
                                            style={{
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            {cell.label} ({months[rowIdx]} {startYear + colIdx})
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}