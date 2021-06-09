import IsLoadingState from "./shared/IsLoadingState";
import LifelineModel from "../models/LifelineModel";
import AudienceVotingModel from "../models/AudienceVotingModel";

interface LifelinesState extends IsLoadingState {
    lifelines: Array<LifelineModel>;
    shouldBegin: boolean;
    callAFriendModal: boolean;
    friendsAnswer: string;
    audienceVoteModal: boolean;
    audienceVoting: Array<AudienceVotingModel>;

    fiftyFiftyLifeline(): Promise<void>;

    askTheAudienceLifeline(): Promise<Array<AudienceVotingModel>>;

    callAFriendLifeline(): Promise<string>;
}

export default LifelinesState;
