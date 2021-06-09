import React from "react";
import QuestionPanelProps from "../props/QuestionPanelProps";
import QuestionPanelState from "../states/QuestionPanelState";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import Constants from "../helpers/Constants";

class QuestionPanel extends React.Component<
  QuestionPanelProps,
  QuestionPanelState
> {
  constructor(props: QuestionPanelProps) {
    super(props);

    this.state = {
      isLoading: true,
      shouldBegin: props.shouldBegin,
      currentQuestion: props.currentQuestion,
      possibleAnswers: props.possibleAnswers,
      onCorrectAnswer: props.onCorrectAnswer,
      onWrongAnswer: props.onWrongAnswer,
      answerGiven: false,
    };
  }

  async componentWillReceiveProps(
    nextProps: Readonly<QuestionPanelProps>,
    nextContext: any
  ): Promise<void> {
    await this.setState({
      shouldBegin: nextProps.shouldBegin,
      currentQuestion: nextProps.currentQuestion,
      possibleAnswers: nextProps.possibleAnswers,
    });
  }

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    //TODO: ...
    this.setState({ isLoading: false });
  }

  handleAnswer = async (answer: string) => {
    await this.setState({ answerGiven: true });

    if (answer == this.state.currentQuestion.correctAnswer) {
      await this.state.onCorrectAnswer();
      /*await this.getNextQuestion();*/
      await this.setState({ answerGiven: false });
    } else {
      await this.state.onWrongAnswer();
    }
  };

  render() {
    const {
      isLoading,
      possibleAnswers,
      currentQuestion,
      shouldBegin,
      answerGiven,
    } = this.state;

    if (isLoading) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <div className="questionPanelFooter">
        <div className="questionPanel">
          <MDBContainer>
            <MDBRow style={{ background: "#4abde8" }}>
              <MDBCol>
                <p className="h2 text-center mb-4">Question:</p>
                <p>{currentQuestion.text}</p>
                <br />
                <div className="questionPanelButton">
                  {possibleAnswers.map((answer: string) => (
                    <MDBBtn
                      color={Constants.DarkColor}
                      type="button"
                      disabled={!shouldBegin || answerGiven}
                      onClick={() => this.handleAnswer(answer)}
                    >
                      {answer}
                    </MDBBtn>
                  ))}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default QuestionPanel;
