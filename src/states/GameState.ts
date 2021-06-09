import IsLoadingState from "./shared/IsLoadingState";
import QuestionModel from "../models/QuestionModel";
import Queue from "../data-structures/Queue";

interface GameState extends IsLoadingState {
    restartGame(): Promise<void>;

    shouldBegin: boolean;
    startGameColor: string;
    disableStartGameButton: boolean;
    currentQuestionNumber: number;
    isGameLost: boolean;
    isGameWon: boolean;
    questions: Queue<QuestionModel>;
    currentQuestion: QuestionModel;
    possibleAnswers: Array<string>;
    isResigned: boolean;
}

export default GameState;
