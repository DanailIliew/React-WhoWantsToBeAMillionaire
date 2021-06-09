import React from 'react';
import LifelinesState from "../states/LifelinesState";
import LifelinesProps from "../props/LifelinesProps";
import {MDBBtn, MDBBtnGroup, MDBCol, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow} from "mdbreact";
import LifelineModel from "../models/LifelineModel";
import LifelineHelper from "../helpers/LifelineHelper";
import Constants from "../helpers/Constants";
import LifelinesEnum from "../models/enums/LifelinesEnum";
import AudienceVotingModel from "../models/AudienceVotingModel";

class Lifelines extends React.Component<LifelinesProps, LifelinesState> {
    constructor(props: LifelinesProps) {
        super(props);

        this.state = {
            isLoading: true,
            lifelines: new Array<LifelineModel>(),
            shouldBegin: props.shouldBegin,
            fiftyFiftyLifeline: props.fiftyFiftyLifeline,
            askTheAudienceLifeline: props.askTheAudienceLifeline,
            callAFriendLifeline: props.callAFriendLifeline,
            callAFriendModal: false,
            friendsAnswer: '',
            audienceVoteModal: false,
            audienceVoting: new Array<AudienceVotingModel>()
        };
    }

    componentDidMount(): void {
        this.setState({isLoading: true});
        let helper = new LifelineHelper();
        this.setState({lifelines: helper.getLifelines()});
        this.setState({isLoading: false});
    }

    async componentWillReceiveProps(nextProps: Readonly<LifelinesProps>, nextContext: any): Promise<void> {
        await this.setState({shouldBegin: nextProps.shouldBegin});
    }

    useLifeline = async (type: LifelinesEnum) => {
        let lifelines = this.state.lifelines;
        lifelines.filter(l => l.type == type).forEach((l) => {
            l.isUsed = true
        });

        await this.setState({lifelines: lifelines});

        switch (type) {
            case LifelinesEnum.FiftyFifty: {
                await this.state.fiftyFiftyLifeline();
                break;
            }

            case LifelinesEnum.AskTheAudience: {
                let audienceVoting = await this.state.askTheAudienceLifeline();
                await this.setState({audienceVoting: audienceVoting, audienceVoteModal: true});
                break;
            }

            case LifelinesEnum.CallAFriend: {
                let answer = await this.state.callAFriendLifeline();
                await this.setState({callAFriendModal: true, friendsAnswer: answer});
                break;
            }

            default:
                break;
        }
    };

    toggleCallAFriendModal = async () => {
        await this.setState({callAFriendModal: false});
    };

    toggleAudienceVoteModal = async () => {
        await this.setState({audienceVoteModal: false});
    };

    render() {
        const {isLoading, lifelines, shouldBegin, friendsAnswer, audienceVoting} = this.state;

        if (isLoading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        return (
            <div className='questionPanelFooter'>
                <MDBModal isOpen={this.state.callAFriendModal} centered>
                    <MDBModalHeader>You asked to call a friend</MDBModalHeader>
                    <MDBModalBody>
                        I believe the right answer is....{friendsAnswer}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="success" onClick={this.toggleCallAFriendModal}>I got it</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>


                <MDBModal isOpen={this.state.audienceVoteModal} centered>
                    <MDBModalHeader>You asked the audience for help</MDBModalHeader>
                    <MDBModalBody>
                        {audienceVoting.map((vote: AudienceVotingModel) =>
                            <p key={vote.voting}>{vote.voting}% of the audience think the answer
                                is: <b>{vote.answer}</b></p>
                        )}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color={Constants.SuccessColor} onClick={this.toggleAudienceVoteModal}>I got it</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <div className='lifelines'>
                    <MDBRow>
                        <MDBCol xl="2" lg="3" md="4" className="mb-md-0 mb-4">
                            <MDBBtnGroup vertical>
                                {lifelines.map((l: LifelineModel) =>
                                    <MDBBtn key={l.type}
                                            color={l.isUsed ? Constants.BlueGreyColor : Constants.InfoColor}
                                            disabled={l.isUsed || !shouldBegin}
                                            onClick={() => this.useLifeline(l.type)}>{l.type}</MDBBtn>
                                )}
                            </MDBBtnGroup>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}

export default Lifelines;
