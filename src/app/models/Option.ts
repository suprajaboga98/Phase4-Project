export class Option {
    id: number;
    questionid: number;
    name: boolean;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionid = data.questionid;
        this.name = data.name;
        this.isAnswer = data.isAnswer;
    }
}