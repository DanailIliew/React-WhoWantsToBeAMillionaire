class AudienceVotingModel {
    private _answer: string;
    private _voting: number;

    constructor(answer: string, voting: number) {
        this._answer = answer;
        this._voting = voting;
    }

    get answer(): string {
        return this._answer;
    }

    set answer(value: string) {
        this._answer = value;
    }

    get voting(): number {
        return this._voting;
    }

    set voting(value: number) {
        this._voting = value;
    }
}

export default AudienceVotingModel;
