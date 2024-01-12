import { images } from "./images";

const shuffleImages = (numOfCards) =>
  [...images.slice(0, numOfCards)].sort(() => Math.random() - 0.5);

export default shuffleImages;
