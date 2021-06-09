import QuestionModel from "../models/QuestionModel";
import Queue from "../data-structures/Queue";

interface QuestionPanelProps {
    shouldBegin: boolean;

    onCorrectAnswer(): Promise<void>;

    onWrongAnswer(): Promise<void>;

    wonGame(): void;

    currentQuestion: QuestionModel;

    possibleAnswers: Array<string>;
}

export default QuestionPanelProps;
