import "./SingleCard.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className={flipped ? "card flipped" : "card"}
      data-testid="cardID"
      onClick={handleClick}
    >
      <div>
        <img className="front" src={card.src} alt={card.alt} />
        <img className="back" src="/images/cover.jpg" alt="card back" />
      </div>
    </div>
  );
};

export default Card;
