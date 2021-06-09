import IsLoadingState from "./shared/IsLoadingState";
import QuestionModel from "../models/QuestionModel";
import Queue from "../data-structures/Queue";

interface QuestionPanelState extends IsLoadingState {
    shouldBegin: boolean;
    currentQuestion: QuestionModel;
    possibleAnswers: Array<string>;

    onCorrectAnswer(): void;

    onWrongAnswer(): void;

    answerGiven: boolean;
}

export default QuestionPanelState;
