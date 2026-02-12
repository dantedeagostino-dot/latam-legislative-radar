import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { ArrowLeft, ArrowRightLeft } from 'lucide-react';
import CongressRadar from './CongressRadar';

const ComparisonView = ({ countries, onBack }) => {
    const [c1, c2] = countries;

    const chartData = {
        labels: ['Accesibilidad', 'Búsqueda Semántica', 'Datos Abiertos', 'Infraestructura', 'UX/UI'],
        datasets: [
            {
                label: c1.country,
                data: c1.radar_data,
                backgroundColor: 'rgba(0, 242, 255, 0.2)',
                borderColor: '#00f2ff',
                borderWidth: 2,
                pointBackgroundColor: '#00f2ff',
            },
            {
                label: c2.country,
                data: c2.radar_data,
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: '#8b5cf6',
                borderWidth: 2,
                pointBackgroundColor: '#8b5cf6',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: {
                    color: '#e5e7eb',
                    font: { family: "'Space Grotesk', sans-serif" }
                },
                ticks: { display: false, backdropColor: 'transparent' }
            },
        },
        plugins: {
            legend: {
                labels: { color: '#e5e7eb', font: { family: "'Space Grotesk', sans-serif" } }
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-sm text-accent-cyan hover:text-white transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                VOLVER
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="glass-card p-6 rounded-xl flex items-center justify-center">
                    <div className="w-full h-80">
                        <Radar data={chartData} options={options} />
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl space-y-6">
                    <h3 className="text-xl font-bold font-tech text-white flex items-center gap-2">
                        <ArrowRightLeft className="text-accent-cyan" />
                        Comparativa Directa
                    </h3>

                    <div className="grid grid-cols-3 gap-4 text-sm border-b border-white/10 pb-2 font-bold text-gray-500">
                        <div>Metric</div>
                        <div className="text-accent-cyan">{c1.country}</div>
                        <div className="text-accent-purple">{c2.country}</div>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm">
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="font-bold text-gray-400">Score</div>
                            <div className="font-tech text-xl text-white">{c1.maturity_score}/10</div>
                            <div className="font-tech text-xl text-white">{c2.maturity_score}/10</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-start border-t border-white/5 pt-4">
                            <div className="font-bold text-gray-400">Core System</div>
                            <div className="text-gray-300">{c1.diagnostic.infrastructure.core_system}</div>
                            <div className="text-gray-300">{c2.diagnostic.infrastructure.core_system}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-start border-t border-white/5 pt-4">
                            <div className="font-bold text-gray-400">Voto Remoto</div>
                            <div className="text-gray-300">{c1.diagnostic.legislative_flow.remote_voting}</div>
                            <div className="text-gray-300">{c2.diagnostic.legislative_flow.remote_voting}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-start border-t border-white/5 pt-4">
                            <div className="font-bold text-gray-400">IA / Modernización</div>
                            <div className="text-gray-300">{c1.diagnostic.modernization.ai_initiatives}</div>
                            <div className="text-gray-300">{c2.diagnostic.modernization.ai_initiatives}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
