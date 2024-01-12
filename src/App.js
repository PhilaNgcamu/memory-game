import { useSelector } from "react-redux";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import Game from "./components/Game/Game";

const App = () => {
  const selectGridSize = useSelector((state) => state.numOfCards);

  return (
    <div className="app-container">
      {!selectGridSize ? <HomeLayout /> : <Game />}
    </div>
  );
};

export default App;
