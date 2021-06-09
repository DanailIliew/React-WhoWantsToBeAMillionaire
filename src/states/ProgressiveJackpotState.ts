import IsLoadingState from "./shared/IsLoadingState";
import WinningsModel from "../models/WinningsModel";

interface ProgressiveJackpotState extends IsLoadingState{
    currentQuestionNumber: number;
    winnings: Array<WinningsModel>;
}

export default ProgressiveJackpotState;
