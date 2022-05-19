// Statefull component responsible for Quiz state
// state contains current questions related to quiz and answers to each question

import React, { Component } from 'react';
import classes from './Quiz.module.css';

import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizScoreCard from '../../components/QuizScoreCard/QuizScoreCard';

import { randomInteger } from './../../utility/Random';
import Button from '../../components/Button/Button';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.questions = [];            // List of questions generated in the quiz
        this.evaluatedAnswers = [];     // Evaluated answers of users along with actual answers

        this.state = {
            currentQuestionIndex: 0,    // Current Question index in quiz
            displayScoreCard: false 
        }
        this.generateQuestions();
    
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
                    <div className={classes.Quiz}>
                        <div className={classes.QuizQuestionsCount}>
                            <b>Question Number: </b> {this.state.currentQuestionIndex + 1} / {this.questions.length}
                        </div>
                        <QuizQuestion
                            question={this.questions[this.state.currentQuestionIndex]}
                            onAnswerSubmit={this.onAnswerSubmitHandler}
                        />

                        <Button
                            onClick={this.props.onReset}
                        >
                        Reset Quiz
                    </Button>
                    </div>
                )}
            </div>
        );
    }

}

export default Quiz;