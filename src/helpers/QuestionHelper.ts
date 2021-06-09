import QuestionDifficultyEnum from "../models/enums/QuestionDifficultyEnum";

class QuestionHelper {

    public static GetQuestionDifficulty(questionNumber: number): QuestionDifficultyEnum {
        if (questionNumber < 6)
            return QuestionDifficultyEnum.Easy;
        else if (questionNumber < 11)
            return QuestionDifficultyEnum.Medium;
        else
            return QuestionDifficultyEnum.Hard;
    }
}

export default QuestionHelper;
