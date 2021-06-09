import WinningsModel from "../models/WinningsModel";

class WinningsHelper {
    private winnings: Array<WinningsModel>;


    constructor() {
        this.winnings = new Array<WinningsModel>();
        this.seed();
    }

    private seed(): void {
        let model1 = new WinningsModel(1000000, 15);
        let model2 = new WinningsModel(500000, 14);
        let model3 = new WinningsModel(250000, 13);
        let model4 = new WinningsModel(125000, 12);
        let model5 = new WinningsModel(64000, 11);
        let model6 = new WinningsModel(32000, 10);
        let model7 = new WinningsModel(16000, 9);
        let model8 = new WinningsModel(8000, 8);
        let model9 = new WinningsModel(4000, 7);
        let model10 = new WinningsModel(2000, 6);
        let model11 = new WinningsModel(1000, 5);
        let model12 = new WinningsModel(500, 4);
        let model13 = new WinningsModel(300, 3);
        let model14 = new WinningsModel(200, 2);
        let model15 = new WinningsModel(100, 1);
        let model16 = new WinningsModel(0, 0);

        this.winnings.push(model1, model2, model3, model4, model5, model6, model7, model8, model9, model10, model11, model12, model13, model14, model15, model16);
    }

    public getWinnings(): Array<WinningsModel> {
        return this.winnings;
    }

    public getCurrentWinning(questionNumber: number): number {
        let result = this.winnings.find(w => w.numberInSequel == questionNumber);

        if (result != null)
            return result.amount;

        return 0;
    }
}

export default WinningsHelper;
