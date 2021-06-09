import LifelineModel from "../models/LifelineModel";
import LifelinesEnum from "../models/enums/LifelinesEnum";

class LifelineHelper {
    private readonly lifelines: Array<LifelineModel>;

    constructor() {
        this.lifelines = new Array<LifelineModel>();
        this.seed();
    }

    private seed(): void {
        let model1 = new LifelineModel(LifelinesEnum.AskTheAudience);
        let model2 = new LifelineModel(LifelinesEnum.CallAFriend);
        let model3 = new LifelineModel(LifelinesEnum.FiftyFifty);

        this.lifelines.push(model1, model2, model3);
    }

    public getLifelines(): Array<LifelineModel> {
        return this.lifelines;
    }
}

export default LifelineHelper;
