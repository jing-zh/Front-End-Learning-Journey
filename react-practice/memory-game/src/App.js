import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard.js";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards: duplicate cards
  // ==============================
  const shuffleCards = () => {
    // duplicate each card
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    // randomize

    // update cards
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  // ===============

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // ++++n1++++
    // if compare cards right here, it might not work because these state updates are scheduled
    // code might fire first before even the state value is updated.
    // that's why we need to use useEffect hook
  };

  // compare 2 selected cards
  // =======================
  useEffect(() => {
    // setDisabled(true);
    // ++++n2+++++
    // 不要放在这个位置，因为这会直接在component load以后disable所有card
    // useEffect runs automatically when the component first evaluates, and when the disabled is true, we cannot flip the card.

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      // 在choices have been compared后
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          // 这里return了一个new array
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
              // ++++q1++++
              // 这一步有一点模糊
              // 怎么使用map和...

              // A：将原来的cards array改变，把其中match的card的matched property改变为true，并返回一个新的array
            } else {
              return card;
            }
          });
        });
        resetTurn();
        // 这里是设置了一个new card state
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  // ============================

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  // ==============================

  useEffect(() => {
    shuffleCards();
  }, []);

  // 这一步useffect没有放在上一个useeffect是因为不想要每次change choice one and choice two的时候，就restart the game

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            // when to keep the card flipped
            // three scenarios:
            // 1.when we flip the card one
            // 2. when we flip the card two
            // 3. when our cards are matched
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
