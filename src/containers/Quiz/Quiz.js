import React, { Component } from 'react';
import classes from './Quiz.module.css';

import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizScoreCard from '../../components/QuizScoreCard/QuizScoreCard';

import { randomInteger } from './../../utility/Random';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.questions = [
            // {
                //     operand1: 2,
                //     operand2: 3,
                //     operator: "+"
            // }
        ];

        this.evaluatedAnswers = [];
        
        this.generateQuestions();

        this.state = {
            currentQuestionIndex: 0,
            displayScoreCard: false
        }
    }

    generateQuestions = () => {
        const {
            numberOfQuestions,
            operators,
            maxOperand
        } = this.props;

        for (let i = 0; i < numberOfQuestions; i++) {
            this.questions.push({
                operand1: randomInteger(1, maxOperand),
                operand2: randomInteger(1, maxOperand),
                operator: operators[randomInteger(0, operators.length - 1)]
            });
        }

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

    onQuizFinishHandler = (quizData) => {
        quizData.name = this.props.name;

        this.props.onQuizFinished(quizData);
    }

    render() {
        return (
            <div className={classes.Quiz}>

                {this.state.displayScoreCard ? (
                    <QuizScoreCard
                        onEvaluationFinish={this.onQuizFinishHandler}
                        answerDetails={this.evaluatedAnswers}
                        questions={this.questions}
                    />
                ) : (
                    <div>
                        <div className={classes.QuizQuestionsCount}>
                            Question Number {this.state.currentQuestionIndex + 1} / {this.props.numberOfQuestions}
                        </div>
                        <QuizQuestion
                            question={this.questions[this.state.currentQuestionIndex]}
                            onAnswerSubmit={this.onAnswerSubmitHandler}
                        />

                        <button onClick={this.props.onQuizReset}> 
                            Reset Quiz
                        </button>
                    </div>
                )}
            </div>
        );
    }

}

export default Quiz;