import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'quiz/:quizName', component: QuizComponent },
  { path: 'quiz', component: QuizListComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
