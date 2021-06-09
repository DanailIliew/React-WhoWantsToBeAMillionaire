import React from "react";
import Game from "./Game";
import AppState from "../states/AppState";

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gameKey: 0,
    };
  }

  restartGame = async (): Promise<void> => {
    let previousKey = this.state.gameKey;
    await this.setState({ gameKey: Math.random() });
    let newKey = this.state.gameKey;

    if (previousKey == newKey) await this.restartGame();
  };

  render() {
    const { gameKey } = this.state;

    return <Game key={gameKey} restartGame={this.restartGame} />;
  }
}

export default App;
