import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Option } from 'src/app/models/Option';
import { Question } from 'src/app/models/Question';
import { Quiz } from 'src/app/models/quiz';
import { QuizConfig } from 'src/app/models/quiz-config';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  score: number;
  totalScore: number;

  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false,
    duration: 300,
    pageSize: 1,
    requiredAll: false,
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quizes = this.quizService.getAll();
    this.score = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const quizName: string = params.get('quizName');
      const quiz: any = this.quizes.find(o => o.name === quizName);
      const quizUrl: string = quiz.id;
      this.loadQuiz(quizUrl);
    })
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      console.log(res);
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.totalScore = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => {
        this.tick();
      },1000);
      this.duration = this.parseTime(this.config.duration);
    })
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if(diff >= this.config.duration)
      this.onSubmit();
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return this.quiz.questions ? this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    // console.log('selected option ' + option.id + option.selected);
    if(question.questionTypeId === 1) {
      question.options.forEach(x => {
        if(x.id !== option.id)
        {
          x.selected = false;
          // console.log(x.id , x.selected);
        }
      });

      if(this.isCorrect(question) == 'correct')
        this.score = this.score + 1;
    }

    if(this.config.autoMove)
      this.goTo(this.pager.index + 1);
  }

  goTo(index: number) {
    if(index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => {
      answers.push({
        quizId: this.quiz.id,
        questionId: x.id,
        answered: x.answered,
      })
    })
    this.mode = 'result';
  }

}
