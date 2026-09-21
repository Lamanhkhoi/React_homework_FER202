import { Component } from "react";
import { Players } from "/src/Players/ListOfPlayers";
import PlayersPresentation from "./PlayersPresentation";
export class Main extends Component {
  constructor() {
    super();
    this.state = {
      props: Players,
    };
  }
  render() {
    return <PlayersPresentation props={this.state.props} />;
  }
}
export default Main;
