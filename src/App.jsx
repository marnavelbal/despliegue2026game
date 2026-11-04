import React, { useState, useEffect } from 'react';

const CARDS_DATA = [
  { id: 1, icon: '🚀', label: 'Vercel' },
  { id: 2, icon: '⚡', label: 'Vite' },
  { id: 3, icon: '⚛️', label: 'React' },
  { id: 4, icon: '🐙', label: 'GitHub' },
  { id: 5, icon: '🇳🇱', label: 'Holland' },
  { id: 6, icon: '🇪🇸', label: 'España' },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const deck = [...CARDS_DATA, ...CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, instanceId: index }));
    setCards(deck);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Tech Memory Challenge (DAW & NL) 🚀</h1>
      <p>Movimientos: {moves} | Parejas encontradas: {matched.length / 2} / {CARDS_DATA.length}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 80px)', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                width: '80px', height: '80px', fontSize: '2rem', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                background: isFlipped ? '#1e293b' : '#334155', color: '#fff', borderRadius: '8px'
              }}
            >
              {isFlipped ? card.icon : '❓'}
            </div>
          );
        })}
      </div>
    </div>
  );
}
