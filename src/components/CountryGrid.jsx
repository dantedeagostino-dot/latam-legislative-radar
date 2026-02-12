import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CountryGrid = ({ data, onSelectCountry }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.congress_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="relative mb-8 max-w-md">
                <input
                    type="text"
                    placeholder="Buscar país o congreso..."
                    className="w-full bg-bg-card border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3 text-gray-500" size={18} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((country, index) => (
                    <div
                        key={index}
                        onClick={() => onSelectCountry(country)}
                        className="glass-card p-6 rounded-xl cursor-pointer hover:border-accent-cyan/50 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold font-tech text-white group-hover:text-accent-cyan transition-colors">{country.country}</h3>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${country.maturity_score >= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                                    country.maturity_score >= 5 ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-red-500/20 text-red-400'
                                }`}>
                                Score: {country.maturity_score}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-mono mb-4">{country.congress_name}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Infraestructura</span>
                                <div className="w-20 bg-white/10 h-1.5 rounded-full mt-1 overflow-hidden">
                                    <div className="bg-accent-cyan h-full" style={{ width: `${country.radar_data[3]}%` }}></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Modernización</span>
                                <div className="w-20 bg-white/10 h-1.5 rounded-full mt-1 overflow-hidden">
                                    <div className="bg-accent-purple h-full" style={{ width: `${country.radar_data[2]}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryGrid;
