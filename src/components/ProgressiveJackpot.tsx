import React from "react";
import { MDBContainer, MDBListGroup, MDBListGroupItem } from "mdbreact";
import ProgressiveJackpotProps from "../props/ProgressiveJackpotProps";
import ProgressiveJackpotState from "../states/ProgressiveJackpotState";
import WinningsModel from "../models/WinningsModel";
import WinningsHelper from "../helpers/WinningsHelper";

class ProgressiveJackpot extends React.Component<
  ProgressiveJackpotProps,
  ProgressiveJackpotState
> {
  constructor(props: ProgressiveJackpotProps) {
    super(props);

    this.state = {
      isLoading: true,
      currentQuestionNumber: props.currentQuestionNumber,
      winnings: new Array<WinningsModel>(),
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    let helper = new WinningsHelper();
    await this.setState({ winnings: helper.getWinnings() });
    this.setState({ isLoading: false });
  }

  async componentWillReceiveProps(
    nextProps: Readonly<ProgressiveJackpotProps>,
    nextContext: any
  ): Promise<void> {
    await this.setState({
      currentQuestionNumber: nextProps.currentQuestionNumber,
    });
  }

  render() {
    const { isLoading, winnings, currentQuestionNumber } = this.state;

    if (isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <div className="progressiveJackpot">
        <MDBContainer>
          <MDBListGroup className="winnings">
            {winnings.map((w: WinningsModel) => (
              <MDBListGroupItem
                key={w.numberInSequel}
                active={currentQuestionNumber == w.numberInSequel}
              >
                Q{w.numberInSequel}: ${w.amount}
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBContainer>
      </div>
    );
  }
}

export default ProgressiveJackpot;
