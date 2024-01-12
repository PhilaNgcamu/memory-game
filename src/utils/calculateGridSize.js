const calculateGridSize = (numOfCards) => {
  const totalCards = numOfCards;
  const rows = Math.ceil(Math.sqrt(totalCards));
  const columns = Math.ceil(totalCards / rows);
  return { rows, columns };
};

export default calculateGridSize;
