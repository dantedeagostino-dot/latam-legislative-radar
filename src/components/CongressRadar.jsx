import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const CongressRadar = ({ data }) => {
    const chartData = {
        labels: ['Accesibilidad', 'Búsqueda Semántica', 'Datos Abiertos', 'Infraestructura', 'UX/UI'],
        datasets: [
            {
                label: 'Nivel Actual',
                data: data || [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(0, 242, 255, 0.2)',
                borderColor: '#00f2ff',
                borderWidth: 2,
                pointBackgroundColor: '#00f2ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00f2ff',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#e5e7eb',
                    font: {
                        family: "'Space Grotesk', sans-serif",
                        size: 10
                    }
                },
                ticks: {
                    display: false,
                    backdropColor: 'transparent'
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(13, 13, 13, 0.9)',
                titleColor: '#00f2ff',
                bodyColor: '#e5e7eb',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                titleFont: { family: "'Space Grotesk', sans-serif" },
                bodyFont: { family: "'Inter', sans-serif" }
            }
        },
        maintainAspectRatio: false,
    };

    return <Radar data={chartData} options={options} />;
};

export default CongressRadar;
