import { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox = ({ word }: IWordboxProp) => {
  // 1️⃣ stav – zbývající písmena slova
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  // 2️⃣ useEffect – práce s document eventem
  useEffect(() => {
    // arrow function – posluchač klávesnice
    const handleKeyUp = (e: KeyboardEvent) => {
      // pokud už je slovo dopsané, nic neděláme
      if (lettersLeft.length === 0) {
        return;
      }

      const firstLetter = lettersLeft[0];

      // kontrola správného znaku
      if (e.key === firstLetter) {
        // 3️⃣ immutable změna stavu
        setLettersLeft(lettersLeft.slice(1));
      }
    };

    // 4️⃣ přidání posluchače
    document.addEventListener('keyup', handleKeyUp);

    // 5️⃣ úklid + výměna funkce (řešení stale state)
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft]); // 👈 klíčová část zadání

  // 6️⃣ vykreslení
  return <div className="wordbox">{lettersLeft}</div>;
};

export default Wordbox;
