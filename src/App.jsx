import { useEffect, useState } from "react";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Container } from "./components/Container/Container";
import { data, questionMarkImg } from "./data/data";
import { shuffleArray } from "./helpers/shuffleArray";
import { Result } from "./components/Result/Result";
import Confetti from "react-confetti";

function App() {
  const [cardsArray, setCardsArray] = useState(data);
  const [onResetClick, setOnResetClick] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isTwoCardsClicked, setIsTwoCardsClicked] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    setCardsArray(shuffleArray(data));
    setSelectedCards([]);
    setIsTwoCardsClicked(false);
    setClickCounter(0);
    setIsGameFinished(false);
  }, [onResetClick]);

  useEffect(() => {
    cardsArray.every((card) => card.isGuessed) ? setIsGameFinished(true) : "";
  }, [cardsArray]);

  useEffect(() => {
    const [firstCard, secondCard] = selectedCards;
    if (selectedCards.length === 2) {
      setIsTwoCardsClicked(true);
      if (firstCard.alt === secondCard.alt) {
        setCardsArray((prevArray) =>
          prevArray.map((c) => {
            if (c.id === firstCard.id || c.id === secondCard.id) {
              return { ...c, isGuessed: true };
            } else {
              return { ...c, isClicked: false };
            }
          })
        );
        setIsTwoCardsClicked(false);
      } else {
        setTimeout(() => {
          setCardsArray((prevArray) =>
            prevArray.map((c) => {
              if (c.id === firstCard.id || c.id === secondCard.id) {
                return { ...c, isClicked: false };
              } else {
                return c;
              }
            })
          );
          setIsTwoCardsClicked(false);
        }, 1000);
      }
      setSelectedCards([]);
      setClickCounter((prev) => prev + 1);
    }
  }, [selectedCards]);

  function onClickCard(id) {
    setSelectedCards((prev) => [
      ...prev,
      ...cardsArray.filter((card) => card.id === id),
    ]);
    setCardsArray(
      cardsArray.map((c) => {
        if (c.id === id) {
          return { ...c, isClicked: true };
        } else {
          return c;
        }
      })
    );
  }

  return (
    <Container>
      {cardsArray.map((card) => (
        <Card
          isGuessed={card.isGuessed}
          imgSrc={
            card.isClicked || card.isGuessed ? card.imgSrc : questionMarkImg
          }
          key={card.id}
          clickedCard={card.isClicked}
          onClick={() => onClickCard(card.id)}
          isTwoCardsClicked={isTwoCardsClicked}
        />
      ))}
      <Button onClick={() => setOnResetClick((prev) => !prev)}>Reset</Button>
      {isGameFinished && (
        <>
          <Result clickCounter={clickCounter} />
          <Confetti
            recycle={false}
            gravity={0.4}
            tweenDuration={2000}
            numberOfPieces={400}
          />
        </>
      )}
    </Container>
  );
}

export default App;
