import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http : HttpClient) { }

  get(url : string) {
    // console.log(this.http.get(url));
    return this.http.get(url);
  }

  getAll() {
    return [
      {
        id: 'assets/data/java.json',
        name: 'Java',
        description:
          "Let's Play java quiz that will help you clear the concepts and will prepare you for interviews. This is a basic level quiz and contains 10 Questions.",
        imageUrl: 'assets/images/JAVA.jpg',
      },
      {
        id: 'assets/data/python.json',
        name: 'Python',
        description:
          "Let's Play Python quiz that will help you clear the concepts and will prepare you for interviews. This is a basic level quiz and contains 10 Questions.",
        imageUrl: 'assets/images/PYTHON.jpg',
      },
      {
        id: 'assets/data/csharp.json',
        name: 'C Sharp',
        description:
          "Let's Play C# quiz that will help you clear the concepts and will prepare you for interviews. This is a basic level quiz and contains 10 Questions.",
        imageUrl: 'assets/images/CSHARP.png',
      },
    ];
  }
}
