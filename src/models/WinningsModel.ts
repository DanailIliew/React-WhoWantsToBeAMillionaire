class WinningsModel {
    private _amount: number;
    private _numberInSequel: number;

    constructor(amount: number, numberInSequel: number) {
        this._amount = amount;
        this._numberInSequel = numberInSequel;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get numberInSequel(): number {
        return this._numberInSequel;
    }

    set numberInSequel(value: number) {
        this._numberInSequel = value;
    }
}

export default WinningsModel;