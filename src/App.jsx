/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Maximize2, Search, Info, ExternalLink } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setGames(gamesData);
    
    // Generate random bubbles for the background
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10
    }));
    setBubbles(newBubbles);
  }, []);

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen font-sans bg-[#050505] text-white">
      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto pt-16 pb-12 px-6 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Gamepad2 className="w-16 h-16 text-[#00f2ff] drop-shadow-[0_0_15px_#00f2ff]" />
              <div className="absolute -inset-4 bg-[#00f2ff]/20 blur-2xl rounded-full -z-10" />
            </div>
            <h1 
              className="text-7xl font-black tracking-tighter uppercase glitch-text"
              data-text="JOSHY'S ARCADE V2"
            >
              JOSHY'S ARCADE V2
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#00f2ff]/50" />
            <p className="text-[#00f2ff] font-bold tracking-[0.3em] uppercase text-xs">
              Next-Gen Retro Experience
            </p>
            <div className="h-[1px] w-12 bg-[#00f2ff]/50" />
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-12 relative">
          <div className="cyber-card flex items-center px-8 py-4 border-[#00f2ff]/50">
            <Search className="w-5 h-5 text-[#00f2ff] mr-4" />
            <input
              type="text"
              placeholder="INITIALIZING SEARCH PROTOCOL..."
              className="bg-transparent border-none outline-none text-[#00f2ff] placeholder-[#00f2ff]/30 w-full font-bold tracking-widest text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="cyber-card group cursor-pointer overflow-hidden flex flex-col"
              onClick={() => setSelectedGame(game)}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-[#00f2ff] text-black text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">
                    Active
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-black mb-2 text-white group-hover:text-[#00f2ff] transition-colors tracking-tight uppercase italic">
                  {game.title}
                </h3>
                <p className="text-white/50 text-xs font-medium leading-relaxed mb-6 line-clamp-2 uppercase tracking-wider">
                  {game.description}
                </p>
                <div className="mt-auto">
                  <button className="neon-button w-full text-xs">
                    Execute Play
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-32">
            <Info className="w-20 h-20 text-[#00f2ff]/20 mx-auto mb-6" />
            <p className="text-[#00f2ff]/40 text-2xl font-black uppercase tracking-[0.2em]">Data Not Found</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card w-full max-w-6xl h-full max-h-[90vh] flex flex-col border-[#00f2ff]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#00f2ff]/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-tr-xl rounded-bl-xl border border-[#00f2ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                    <Gamepad2 className="w-6 h-6 text-[#00f2ff]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">{selectedGame.title}</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse" />
                      <p className="text-[10px] text-[#00f2ff] uppercase tracking-[0.3em] font-bold">System Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="p-3 border border-[#00f2ff]/30 hover:border-[#00f2ff] hover:bg-[#00f2ff]/10 rounded-lg transition-all text-[#00f2ff]"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-3 border border-[#ff00ff]/30 hover:border-[#ff00ff] hover:bg-[#ff00ff]/10 rounded-lg transition-all text-[#ff00ff]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Game Iframe */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 bg-[#00f2ff]/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    Latency: <span className="text-[#00f2ff]">Optimal</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    Resolution: <span className="text-[#00f2ff]">Max</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="neon-button text-xs"
                >
                  Terminate Session
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 text-center border-t border-[#00f2ff]/10 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex gap-12 mb-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="w-24 h-8 bg-[#00f2ff]/20 border border-[#00f2ff] rounded-sm" />
            <div className="w-24 h-8 bg-[#ff00ff]/20 border border-[#ff00ff] rounded-sm" />
            <div className="w-24 h-8 bg-[#ccff00]/20 border border-[#ccff00] rounded-sm" />
          </div>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
            &copy; 2026 JOSHY'S ARCADE V2 // ALL RIGHTS RESERVED
          </p>
          <div className="flex justify-center gap-10">
            {['Network', 'Security', 'Protocol'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-[#00f2ff]/40 hover:text-[#00f2ff] transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
