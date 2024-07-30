import styles from "./Card.module.css";

export const Card = ({
  imgSrc,
  clickedCard,
  onClick,
  isGuessed,
  isTwoCardsClicked,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${
        clickedCard || isGuessed ? styles.clickedCard : styles.notClickedCard
      } ${
        isTwoCardsClicked || isGuessed || clickedCard ? styles.notClickable : ""
      }`}
    >
      <img src={imgSrc} className={styles.img} />
    </div>
  );
};
