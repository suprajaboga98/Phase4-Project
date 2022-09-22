import { Option } from "./Option";

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach(option => {
            this.options.push(new Option(option))
        })
    }
}