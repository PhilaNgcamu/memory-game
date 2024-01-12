const HomeGridOptions = ({ numOfColumns, numOfRows, onClick }) => {
  const numOfCards = numOfColumns * numOfRows;

  return (
    <div
      data-testid={`${numOfColumns}x${numOfRows} Grid`}
      className="nav-link"
      onClick={onClick}
    >
      <div className="grid-option">
        <span>
          {numOfColumns}x{numOfRows} Grid
        </span>
        <p>{numOfCards} Cards</p>
      </div>
    </div>
  );
};

export default HomeGridOptions;
