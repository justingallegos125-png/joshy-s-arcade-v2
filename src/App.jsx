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
    <div className="relative min-h-screen font-sans">
      {/* Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="bubble"
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.6, 0.6, 0],
              x: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: bubble.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: bubble.id * 0.5
            }}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-4 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <Gamepad2 className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-lg italic">
              JOSHY'S<span className="text-white/80"> ARCADE V2</span>
            </h1>
          </div>
          <p className="text-white/90 font-medium tracking-widest uppercase text-xs">
            The Ultimate Glossy Game Hub
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-10 relative">
          <div className="glass-card flex items-center px-6 py-3">
            <Search className="w-5 h-5 text-white/70 mr-3" />
            <input
              type="text"
              placeholder="Search unblocked games..."
              className="bg-transparent border-none outline-none text-white placeholder-white/50 w-full font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="glass-card group cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold flex items-center gap-2">
                    Play Now <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-white drop-shadow-sm">{game.title}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Info className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-xl font-medium">No games found matching your search.</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-6xl h-full max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{selectedGame.title}</h2>
                    <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Now Playing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(selectedGame.url, '_blank')}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
              </div>

              {/* Game Iframe */}
              <div className="flex-1 bg-black/20 relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-white/5 flex items-center justify-between">
                <p className="text-white/60 text-sm italic">
                  Tip: If the game doesn't load, try opening it in a new tab.
                </p>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="glossy-button text-sm"
                >
                  Close Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 text-center border-t border-white/10">
        <p className="text-white/40 text-sm font-medium">
          &copy; 2026 Joshy's Arcade V2. All games are property of their respective owners.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
          <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Terms</a>
          <a href="#" className="text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Contact</a>
        </div>
      </footer>
    </div>
  );
}
