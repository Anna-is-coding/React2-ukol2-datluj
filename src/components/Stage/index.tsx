import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size: number) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(6)!,
    generateWord(6)!,
    generateWord(6)!,
  ]);

  const [mistakes, setMistakes] = useState<number>(0);

  const handleFinish = () => {
    const newWord = generateWord(6);
    if (!newWord) return;

    setWords((prevWords) => [...prevWords.slice(1), newWord]);
  };

  const handleMistake = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>

      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            key={`${word}-${index}`}
            word={word}
            active={index === 0}
            onFinish={handleFinish}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
