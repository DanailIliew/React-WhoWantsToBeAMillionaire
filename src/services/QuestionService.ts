import QuestionModel from "../models/QuestionModel";
import QuestionDifficultyEnum from "../models/enums/QuestionDifficultyEnum";
import Axios from 'axios';
import Queue from "../data-structures/Queue";

class QuestionService {

    private static questionPerType: number = 5;
    private static questionSelectType: string = 'multiple';
    private static baseUrl = `https://opentdb.com/api.php?amount=${QuestionService.questionPerType}&type=${QuestionService.questionSelectType}&difficulty=`;

    public static async GetQuestions(): Promise<Queue<QuestionModel>> {

        let questions = new Queue<QuestionModel>();

        let response = await this.apiCall(QuestionDifficultyEnum.Easy);
        questions = this.mapQuestions(response, questions);

        response = await this.apiCall(QuestionDifficultyEnum.Medium);
        questions = this.mapQuestions(response, questions);

        response = await this.apiCall(QuestionDifficultyEnum.Hard);
        questions = this.mapQuestions(response, questions);

        return questions;
    }

    private static mapQuestions(response: any, questions: Queue<QuestionModel>): Queue<QuestionModel> {
        response.data.results.forEach(function (value: any) {
            let qModel = new QuestionModel(value.question, value.category, value.incorrect_answers, value.correct_answer);
            questions.push(qModel);
        });

        return questions;
    }

    private static async apiCall(difficulty: QuestionDifficultyEnum) {
        let response = await Axios.get(this.baseUrl + difficulty);
        return response;
    }
}

export default QuestionService;
