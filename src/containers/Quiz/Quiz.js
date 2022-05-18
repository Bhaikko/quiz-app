import React, { Component } from 'react';
import classes from './Quiz.module.css';

import QuizQuestion from '../QuizQuestion/QuizQuestion';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [
                {
                    operand1: 2,
                    operand2: 3,
                    operator: "+"
                },
                {
                    operand1: 6,
                    operand2: 3,
                    operator: "-"
                },
                {
                    operand1: 2,
                    operand2: 3,
                    operator: "*"
                },
                {
                    operand1: 2,
                    operand2: 3,
                    operator: "/"
                },
            ],
            currentQuestionIndex: 0
        }

        this.evaluatedAnswers = [];
    }

    onAnswerSubmitHandler = (answerDetails) => {
        answerDetails.index = this.state.currentQuestionIndex;
        console.log(answerDetails);
        this.evaluatedAnswers.push(answerDetails);

        let newIndex = this.state.currentQuestionIndex + 1;
        if (newIndex >= this.state.questions.length) {
            this.onQuizFinishHandler();
        } else {
            this.setState({
                currentQuestionIndex: newIndex
            });
        }
    }

    onQuizFinishHandler = () => {
        console.log("Quiz Finished.");
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizHeader}>Quiz 1</div>

                <QuizQuestion
                    question={this.state.questions[this.state.currentQuestionIndex]}
                    onAnswerSubmit={this.onAnswerSubmitHandler}
                />
            </div>
        );
    }

}

export default Quiz;