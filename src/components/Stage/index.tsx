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
  const [started, setStarted] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);

  const handleStart = () => {
    setMistakes(0);
    setWords([generateWord(6)!, generateWord(6)!, generateWord(6)!]);
    setStarted(true);
  };

  const handleFinish = () => {
    const newWord = generateWord(6);
    if (!newWord) return;

    setWords((prevWords) => [...prevWords.slice(1), newWord]);
  };

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
  };

  if (!started) {
    return (
      <div className="stage stage--start">
        <h1>Datluj.cz</h1>
        <p>Trénuj psaní všemi deseti</p>
        <button onClick={handleStart}>Start</button>
      </div>
    );
  }

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
