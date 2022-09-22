import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizes : any[] = [];

  constructor(private quizService : QuizServiceService) { }

  ngOnInit(): void {
    this.quizes = this.quizService.getAll();
    // console.log(this.quizes);
  }

}
