import { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  active: boolean;
  onFinish: () => void;
  onMistake: () => void;
}

const Wordbox = ({ word, active, onFinish, onMistake }: IWordboxProp) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (lettersLeft.length === 0) {
        return;
      }

      const firstLetter = lettersLeft[0];

      if (e.key === firstLetter) {
        setMistake(false);

        if (lettersLeft.length === 1) {
          onFinish();
        } else {
          setLettersLeft(lettersLeft.slice(1));
        }
      } else {
        setMistake(true);
        onMistake();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, active, onFinish, onMistake]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
