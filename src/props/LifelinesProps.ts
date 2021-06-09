import AudienceVotingModel from "../models/AudienceVotingModel";

interface LifelinesProps {
    shouldBegin: boolean;
    fiftyFiftyLifeline(): Promise<void>;

    askTheAudienceLifeline(): Promise<Array<AudienceVotingModel>>;

    callAFriendLifeline(): Promise<string>;
}

export default LifelinesProps;
