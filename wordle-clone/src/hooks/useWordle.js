import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState(["hello", "ninja"]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //green letters

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
        //这一步是为了确保下一步变颜色成yellow，不会影响到已经变green的字母
      }
    });

    //yellow letters
    // _ _ _ e d,  s p e a k
    //     green     yellow
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = () => {};

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      //turn < 5, no duplicated words, word.length === 5
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("you already tried that word");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("word must be 5 characters long");
        return;
      }
      const formatted = formatGuess();
      console.log(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
