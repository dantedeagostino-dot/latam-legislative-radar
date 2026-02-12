import React, { useState } from 'react';
import { Share2, BookOpen, Database, ArrowLeft, PlusCircle, CheckCircle2, XCircle } from 'lucide-react';
import CountryGrid from './components/CountryGrid';
import DiagnosticCard from './components/DiagnosticCard';
import ComparisonView from './components/ComparisonView';
import congressData from './data/congress_data.json';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareQueue, setCompareQueue] = useState([]);

  const handleCountryClick = (country) => {
    if (compareMode) {
      if (compareQueue.find(c => c.country === country.country)) {
        setCompareQueue(compareQueue.filter(c => c.country !== country.country));
      } else {
        if (compareQueue.length < 2) {
          setCompareQueue([...compareQueue, country]);
        }
      }
    } else {
      setSelectedCountry(country);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setCompareQueue([]);
    setSelectedCountry(null);
  };

  return (
    <div className="min-h-screen bg-grid p-6 md:p-12 font-sans text-gray-200">

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center glass-card p-6 rounded-xl relative z-10 sticky top-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedCountry(null); setCompareMode(false); }}>
          <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-sm rotate-45 shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>
          <h1 className="text-2xl font-bold uppercase tracking-widest glow-text font-tech hidden md:block">
            LatAm<span className="text-accent-cyan">.Radar</span>
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          {compareMode && (
            <div className="flex items-center gap-2 text-xs font-mono mr-4">
              <span className={compareQueue.length >= 1 ? "text-accent-cyan" : "text-gray-600"}>SLOT_1</span>
              <span className="text-gray-600">/</span>
              <span className={compareQueue.length >= 2 ? "text-accent-purple" : "text-gray-600"}>SLOT_2</span>
            </div>
          )}

          <button
            onClick={toggleCompareMode}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest border transition-all ${compareMode
                ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
          >
            {compareMode ? 'Cancelar Comparación' : 'Comparar Países'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto relative z-10">

        {/* VIEW: COMPARISON RESULT */}
        {compareMode && compareQueue.length === 2 ? (
          <ComparisonView countries={compareQueue} onBack={() => setCompareQueue([])} />
        ) :

          /* VIEW: DETAIL CARD */
          selectedCountry ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="flex items-center gap-2 text-sm text-accent-cyan hover:text-white transition-colors group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  VOLVER AL MAPA
                </button>
              </div>
              <DiagnosticCard countryData={selectedCountry} />
            </div>
          ) : (

            /* VIEW: GRID / HERO */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!compareMode && (
                <div className="mb-12 text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold font-tech mb-4 text-white">Observatorio <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Legislativo</span></h2>
                  <p className="text-gray-400 text-lg">
                    Análisis comparativo de transformación digital, infraestructura y modernización en los congresos de Latinoamérica.
                  </p>
                </div>
              )}

              {compareMode && (
                <div className="mb-8 text-center bg-accent-cyan/10 border border-accent-cyan/20 p-4 rounded-xl">
                  <p className="text-accent-cyan font-mono text-sm">SELECCIONA DOS PAÍSES PARA COMPARAR: {compareQueue.length}/2</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {congressData.map((country, index) => {
                  const isSelected = compareQueue.find(c => c.country === country.country);
                  return (
                    <div
                      key={index}
                      onClick={() => handleCountryClick(country)}
                      className={`glass-card p-6 rounded-xl cursor-pointer group relative ${isSelected ? 'border-accent-cyan bg-accent-cyan/5 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'hover:border-accent-cyan/50'
                        }`}
                    >
                      {compareMode && (
                        <div className="absolute top-4 right-4">
                          {isSelected ? <CheckCircle2 className="text-accent-cyan" size={20} /> : <PlusCircle className="text-gray-600 group-hover:text-accent-cyan" size={20} />}
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold font-tech text-white transition-colors">{country.country}</h3>
                      </div>
                      <p className="text-xs text-gray-500 font-mono mb-4">{country.congress_name}</p>

                      <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
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
                  );
                })}
              </div>
            </div>
          )}
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-[0.3em] pb-8">
        LatAm Congress Radar // Technical Audit 2026 // Powered by Gemini
      </footer>
    </div>
  );
}

export default App;
