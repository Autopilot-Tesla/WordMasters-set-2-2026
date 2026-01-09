import React from 'react';
import { WordData } from '../types';

interface FlashcardProps {
  data: WordData;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, isFlipped, onFlip }) => {
  return (
    <div 
      className="w-full max-w-2xl h-[450px] cursor-pointer perspective-1000 mx-auto"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of Card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-8 select-none">
          <div className="absolute top-4 left-4 text-gray-400 text-sm font-mono">WordMasters - List #1</div>
          <h2 className="text-5xl font-serif font-bold text-gray-800 text-center tracking-wide">
            {data.word}
          </h2>
          <p className="mt-4 text-gray-500 font-medium text-lg">
            Tap to see definitions
          </p>
        </div>

        {/* Back of Card - Specific Handwritten Format */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg border border-gray-200 overflow-hidden text-left font-serif text-gray-800 text-lg leading-8 lined-paper">
          
          {/* Red margin line visual cue */}
          <div className="lined-paper-red-line opacity-50 z-0"></div>

          <div className="relative z-10 p-8 pl-12 h-full overflow-y-auto custom-scrollbar">
            
            {/* Pronunciation */}
            <div className="mb-2">
              <span className="font-bold">Pronunciation:</span> 
              <span className="ml-2">{data.pronunciation} ({data.partOfSpeech})</span>
            </div>

            {/* Definitions */}
            <div className="mb-2">
              <span className="font-bold">Definitions:</span>
              <ul className="list-none ml-1 inline">
                {data.definitions.map((def, idx) => (
                  <li key={idx} className="inline ml-1">
                    {def}
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Forms */}
            {data.otherForms && (
              <div className="mb-2">
                <span className="font-bold">Other forms:</span>
                <span className="ml-2">{data.otherForms}</span>
              </div>
            )}

            {/* Example Sentence */}
            <div className="mt-2">
               <span className="font-bold">Example Sentence:</span>
               <span className="ml-2 italic">
                 {data.exampleSentence}
               </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
