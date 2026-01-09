import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import { words } from './data';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState(words);
  const [shuffled, setShuffled] = useState(false);

  // Reset flip when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex, deck]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % deck.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const toggleShuffle = () => {
    if (shuffled) {
      // Restore original order
      const currentWordId = deck[currentCardIndex].id;
      const originalDeck = [...words].sort((a, b) => a.id - b.id);
      setDeck(originalDeck);
      const newIndex = originalDeck.findIndex(w => w.id === currentWordId);
      setCurrentCardIndex(newIndex !== -1 ? newIndex : 0);
      setShuffled(false);
    } else {
      // Shuffle
      const currentWordId = deck[currentCardIndex].id;
      const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffledDeck);
      const newIndex = shuffledDeck.findIndex(w => w.id === currentWordId);
      setCurrentCardIndex(newIndex !== -1 ? newIndex : 0);
      setShuffled(true);
    }
  };

  const resetDeck = () => {
    setDeck(words);
    setShuffled(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800">
      
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">WordMasters Challenge™</h1>
        <p className="text-gray-600">Grade 8 – Gold Division (Winter 2026)</p>
      </header>

      {/* Main Card Area */}
      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        
        <Flashcard 
          data={deck[currentCardIndex]} 
          isFlipped={isFlipped} 
          onFlip={handleFlip} 
        />

        {/* Controls */}
        <div className="flex items-center justify-between w-full max-w-lg mt-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
          
          <button 
            onClick={prevCard}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600 active:scale-95"
            aria-label="Previous Card"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex flex-col items-center">
            <span className="font-mono text-lg font-bold text-gray-700">
              {currentCardIndex + 1} / {deck.length}
            </span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {shuffled ? 'Shuffled' : 'Ordered'}
            </span>
          </div>

          <button 
            onClick={nextCard}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600 active:scale-95"
            aria-label="Next Card"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Deck Options */}
        <div className="flex gap-4">
          <button 
            onClick={toggleShuffle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              shuffled 
                ? 'bg-blue-100 border-blue-300 text-blue-700 font-semibold' 
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Shuffle size={18} />
            {shuffled ? 'Unshuffle' : 'Shuffle'}
          </button>

          <button 
            onClick={resetDeck}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

      </main>

      <footer className="mt-12 text-sm text-gray-400 text-center max-w-md">
        <p>Definitions provided by Merriam-Webster.</p>
        <p>Click card to flip.</p>
      </footer>
    </div>
  );
};

export default App;
