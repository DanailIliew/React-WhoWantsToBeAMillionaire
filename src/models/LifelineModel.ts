import LifelinesEnum from "./enums/LifelinesEnum";

class LifelineModel {
    private _type: LifelinesEnum;
    private _isUsed: boolean;

    constructor(type: LifelinesEnum) {
        this._type = type;
        this._isUsed = false;
    }

    get type(): LifelinesEnum {
        return this._type;
    }

    set type(value: LifelinesEnum) {
        this._type = value;
    }

    get isUsed(): boolean {
        return this._isUsed;
    }

    set isUsed(value: boolean) {
        this._isUsed = value;
    }
}

export default LifelineModel;
