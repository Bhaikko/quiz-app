import React, { Component } from 'react';
import classes from './Quiz.module.css';

import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizScoreCard from '../../components/QuizScoreCard/QuizScoreCard';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuestionIndex: 0,
            displayScoreCard: false
        }

        this.questions = [
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
            // {
            //     operand1: 2,
            //     operand2: 3,
            //     operator: "*"
            // },
            // {
            //     operand1: 2,
            //     operand2: 3,
            //     operator: "/"
            // },
        ];

        this.evaluatedAnswers = [];
    }

    onAnswerSubmitHandler = (answerDetails) => {
        answerDetails.index = this.state.currentQuestionIndex;

        this.evaluatedAnswers.push(answerDetails);

        let newIndex = this.state.currentQuestionIndex + 1;
        if (newIndex >= this.questions.length) {
            // this.onQuizFinishHandler();
            this.setState({
                displayScoreCard: true
            })
        } else {
            this.setState({
                currentQuestionIndex: newIndex
            });
        }
    }

    onQuizFinishHandler = () => {
        // console.log("Quiz Finished.");
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizHeader}>Quiz 1</div>

                {this.state.displayScoreCard ? (
                    <QuizScoreCard
                        answerDetails={this.evaluatedAnswers}
                        questions={this.questions}
                    />
                ) : (
                    <QuizQuestion
                        question={this.questions[this.state.currentQuestionIndex]}
                        onAnswerSubmit={this.onAnswerSubmitHandler}
                    />
                )}
            </div>
        );
    }

}

export default Quiz;