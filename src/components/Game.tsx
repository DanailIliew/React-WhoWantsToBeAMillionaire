import React from 'react';
import GameProps from "../props/GameProps";
import GameState from "../states/GameState";
import {MDBBtn} from "mdbreact";
import '../css/Game.css';
import Constants from "../helpers/Constants";
import ProgressiveJackpot from "./ProgressiveJackpot";
import QuestionPanel from "./QuestionPanel";
import Lifelines from "./Lifelines";
import QuestionService from "../services/QuestionService";
import QuestionModel from "../models/QuestionModel";
import Queue from "../data-structures/Queue";
import RandomizeHelper from "../helpers/RandomizeHelper";
import AudienceVotingModel from "../models/AudienceVotingModel";
import WinningsHelper from "../helpers/WinningsHelper";

class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            restartGame: props.restartGame,
            isLoading: true,
            shouldBegin: false,
            startGameColor: Constants.InfoColor,
            disableStartGameButton: false,
            currentQuestionNumber: 0,
            isGameLost: false,
            isGameWon: false,
            questions: new Queue<QuestionModel>(),
            currentQuestion: new QuestionModel("Who wants to be a millionaire?", "Game night", ["", "", ""], ""),
            possibleAnswers: new Array<string>(),
            isResigned: false
        };
    }

    async componentDidMount(): Promise<void> {
        this.setState({isLoading: true});
        await this.setState({questions: await QuestionService.GetQuestions()});
        await this.setPossibleAnswers();
        this.setState({isLoading: false})
    }

    startGame = async (): Promise<void> => {
        await this.setState({
            startGameColor: Constants.BlueGreyColor,
            disableStartGameButton: true,
            shouldBegin: true
        });

        await this.getNextQuestion();
    };

    getNextQuestion = async () => {
        let questions = this.state.questions;

        if (questions._store.length == 0)
            this.wonGame();

        let currQuestion = questions.pop();
        await this.setState({questions: questions, currentQuestion: currQuestion as QuestionModel});
        await this.setPossibleAnswers();
    };

    setPossibleAnswers = async () => {
        let possibleAnswers = new Array<string>();
        possibleAnswers = this.pushAnswers(possibleAnswers);
        await this.setState({possibleAnswers: possibleAnswers});
        console.log("Possible answers", possibleAnswers);
    };

    pushAnswers = (possibleAnswers: string[]): Array<string> => {
        possibleAnswers = new Array<string>();
        this.state.currentQuestion.incorrectAnswers.forEach((value: string) => {
            possibleAnswers.push(value);
        });

        possibleAnswers.push(this.state.currentQuestion.correctAnswer);

        return RandomizeHelper.shuffleStrings(possibleAnswers);
    };

    onCorrectAnswer = async (): Promise<void> => {
        this.setState({currentQuestionNumber: this.state.currentQuestionNumber + 1});
        await this.getNextQuestion();
    };

    onWrongAnswer = async (): Promise<void> => {
        this.setState({isGameLost: true});
    };

    wonGame = () => {
        this.setState({isGameWon: true});
    };

    fiftyFiftyLifeline = async (): Promise<void> => {
        let possibleAnswers = this.state.possibleAnswers;
        let i = 0;
        while (i < 2) {
            let rnd = RandomizeHelper.randomFromRange(0, possibleAnswers.length - 1);
            if (possibleAnswers[rnd] != this.state.currentQuestion.correctAnswer) {
                possibleAnswers.splice(rnd, 1);
                i++;
            }
        }

        await this.setState({possibleAnswers: possibleAnswers});
    };

    askTheAudienceLifeline = async (): Promise<Array<AudienceVotingModel>> => {
        let giveRightAnswer = RandomizeHelper.successAtGivenRate(Constants.AudienceAnswerAccuracyPercentage);
        let audienceVoting = new Array<AudienceVotingModel>();
        let possibleAnswers = this.state.possibleAnswers;
        let correctAnswer = this.state.currentQuestion.correctAnswer;
        let audiencePercentageRemaining = 100;

        //If the answer is right over 51% of the audience should vote on it else -> fully random
        if (giveRightAnswer) {
            let rnd = RandomizeHelper.randomFromRange(51, 100);
            audiencePercentageRemaining -= rnd;
            audienceVoting.push(new AudienceVotingModel(correctAnswer, rnd));
            possibleAnswers = possibleAnswers.filter(a => a != correctAnswer);
        }

        //Sometimes not all the audience members vote
        for (let i = 0; i < possibleAnswers.length /*- 1*/; i++) {
            let rnd = RandomizeHelper.randomFromRange(1, audiencePercentageRemaining);
            audiencePercentageRemaining -= rnd;
            audienceVoting.push(new AudienceVotingModel(possibleAnswers[i], rnd));
        }

        /*audienceVoting.push(new AudienceVotingModel(possibleAnswers[possibleAnswers.length - 1], audiencePercentageRemaining));*/

        return RandomizeHelper.shuffleVoting(audienceVoting);
    };

    callAFriendLifeline = async () => {
        let possibleAnswers = this.state.possibleAnswers;
        let rnd = RandomizeHelper.randomFromRange(0, possibleAnswers.length - 1);
        return possibleAnswers[rnd];
    };

    resign = () => {
        this.setState({isResigned: true});
    };

    render() {
        const {startGameColor, disableStartGameButton, isLoading, isGameLost, isGameWon, isResigned} = this.state;

        if (isLoading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        if (isResigned) {
            let winningsHelper = new WinningsHelper();
            let yourWinnings = winningsHelper.getCurrentWinning(this.state.currentQuestionNumber);

            return (
                <div className='backgroundImage'>
                    <div className="center-restart-game">
                        <MDBBtn color="success"
                                onClick={this.state.restartGame}>{Constants.OnResignMessage + yourWinnings}</MDBBtn>s
                    </div>
                </div>
            );
        }

        if (isGameLost) {
            return (
                <div className='backgroundImage'>
                    <div className="center-restart-game">
                        <MDBBtn color="danger"
                                onClick={this.state.restartGame}>{Constants.OnLoseMessage}</MDBBtn>
                    </div>
                </div>
            );
        }

        if (isGameWon) {
            return (
                <div className='backgroundImage'>
                    <div className="center-restart-game">
                        <MDBBtn color="success"
                                onClick={this.state.restartGame}>{Constants.OnWinMessage}</MDBBtn>
                    </div>
                </div>
            );
        }

        return (
            <div className='gameContainer'>
                <div className='backgroundImage'/>
                <div className="header">
                    <MDBBtn className='headerResign' color={Constants.InfoColor} disabled={!disableStartGameButton}
                            onClick={this.resign}>Resign</MDBBtn>
                </div>
                <Lifelines shouldBegin={this.state.shouldBegin} askTheAudienceLifeline={this.askTheAudienceLifeline}
                           callAFriendLifeline={this.callAFriendLifeline} fiftyFiftyLifeline={this.fiftyFiftyLifeline}/>
                <QuestionPanel possibleAnswers={this.state.possibleAnswers}
                               currentQuestion={this.state.currentQuestion}
                               shouldBegin={this.state.shouldBegin}
                               onCorrectAnswer={this.onCorrectAnswer}
                               onWrongAnswer={this.onWrongAnswer} wonGame={this.wonGame}/>
                <ProgressiveJackpot currentQuestionNumber={this.state.currentQuestionNumber}/>
                <div className='footer'>
                    <MDBBtn className='footerStartGame' color={startGameColor} disabled={disableStartGameButton}
                            onClick={this.startGame}>Start
                        game</MDBBtn>
                </div>
            </div>
        );
    }
}

export default Game;
