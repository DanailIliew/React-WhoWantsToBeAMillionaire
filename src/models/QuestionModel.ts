class QuestionModel {
    private _text: string;
    private _category: string;
    private _incorrectAnswers: Array<string>;
    private _correctAnswer: string;

    constructor(text: string, category: string, incorrectAnswers: Array<string>, correctAnswer: string) {
        this._text = text;
        this._category = category;
        this._incorrectAnswers = incorrectAnswers;
        this._correctAnswer = correctAnswer;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get incorrectAnswers(): Array<string> {
        return this._incorrectAnswers;
    }

    set incorrectAnswers(value: Array<string>) {
        this._incorrectAnswers = value;
    }

    get correctAnswer(): string {
        return this._correctAnswer;
    }

    set correctAnswer(value: string) {
        this._correctAnswer = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }
}

export default QuestionModel;
