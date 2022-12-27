import { Component, OnInit } from '@angular/core';
import quizz_questionsJson from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  finished: boolean = false
  title: string = ''
  questions: any
  questionSelected: any
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  answers: string[] = []
  answerSelected:string = ""
  img: string = "";

  constructor() { }

  ngOnInit(): void {
    if (quizz_questionsJson) {
      this.finished = false
      this.title = quizz_questionsJson.title
      this.questions = quizz_questionsJson.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length

    }
  }

  playerChoice(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex++

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      const obj = quizz_questionsJson.results
      .filter(answer => answer.hasOwnProperty(finalAnswer))
      this.answerSelected = obj[0][finalAnswer as keyof object]
      this.img =  obj[0].img
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) =>{
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
    return result
  }

  restart() {
    this.finished = false
    this.questionIndex = 0
    this.questionSelected = this.questions[this.questionIndex]
    this.answers = []
  }

}
