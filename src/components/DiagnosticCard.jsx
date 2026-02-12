import React from 'react';
import { Server, FileText, Cpu, ExternalLink } from 'lucide-react';
import CongressRadar from './CongressRadar';

const DiagnosticCard = ({ countryData }) => {
    if (!countryData) return null;

    const { country, congress_name, diagnostic, maturity_score, radar_data, links } = countryData;

    return (
        <div className="glass-card p-6 md:p-8 rounded-xl h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold font-tech text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                        {country}
                    </h2>
                    <p className="text-sm text-gray-400 font-mono mt-1">{congress_name}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Maturity Score</div>
                    <div className="text-4xl font-bold font-tech text-white">{maturity_score}<span className="text-base text-gray-600">/10</span></div>
                </div>
            </div>

            <div className="mb-8 h-64 w-full">
                <CongressRadar data={radar_data} />
            </div>

            <div className="space-y-6 flex-grow">
                {/* Infrastructure */}
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-3 text-accent-cyan">
                        <Server size={18} />
                        <h3 className="font-bold font-tech uppercase tracking-wider text-sm">Infraestructura</h3>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2 font-light">
                        <li><span className="text-gray-500 font-semibold text-xs">CORE:</span> {diagnostic.infrastructure.core_system}</li>
                        <li><span className="text-gray-500 font-semibold text-xs">PORTAL:</span> {diagnostic.infrastructure.public_portal}</li>
                        <li><span className="text-gray-500 font-semibold text-xs">DATA:</span> {diagnostic.infrastructure.data_layers}</li>
                    </ul>
                </div>

                {/* Legislative Flow */}
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-3 text-accent-purple">
                        <FileText size={18} />
                        <h3 className="font-bold font-tech uppercase tracking-wider text-sm">Flujo Digital</h3>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-2 font-light">
                        <li><span className="text-gray-500 font-semibold text-xs">INGRESO:</span> {diagnostic.legislative_flow.digital_entry}</li>
                        <li><span className="text-gray-500 font-semibold text-xs">VOTO:</span> {diagnostic.legislative_flow.remote_voting}</li>
                    </ul>
                </div>

                {/* Modernization */}
                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 mb-3 text-emerald-400">
                        <Cpu size={18} />
                        <h3 className="font-bold font-tech uppercase tracking-wider text-sm">Modernización (IA)</h3>
                    </div>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                        {diagnostic.modernization.ai_initiatives}
                    </p>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {links.map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 px-3 py-2 rounded text-gray-400 hover:text-white transition-colors">
                        Fuente {i + 1} <ExternalLink size={10} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DiagnosticCard;
