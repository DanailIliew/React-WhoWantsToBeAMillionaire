import AudienceVotingModel from "../models/AudienceVotingModel";

class RandomizeHelper {
    public static randomFromRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static shuffleStrings = (array: Array<string>): Array<string> => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    public static shuffleVoting = (array: Array<AudienceVotingModel>): Array<AudienceVotingModel> => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    public static successAtGivenRate(chancePercentage: number): boolean {
        let rnd = this.randomFromRange(1, 100);

        return rnd < chancePercentage;
    }
}

export default RandomizeHelper;
