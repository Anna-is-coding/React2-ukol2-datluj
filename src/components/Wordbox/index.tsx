import { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox = ({ word, onFinish }: IWordboxProp) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (lettersLeft.length === 0) {
        return;
      }

      const firstLetter = lettersLeft[0];

      if (e.key === firstLetter) {
        // poslední písmeno
        if (lettersLeft.length === 1) {
          onFinish();
        } else {
          setLettersLeft(lettersLeft.slice(1));
        }
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  return <div className="wordbox">{lettersLeft}</div>;
};

export default Wordbox;
