import React, { Component } from 'react';
import classes from './Quiz.module.css';

import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizScoreCard from '../../components/QuizScoreCard/QuizScoreCard';

import { randomInteger } from './../../utility/Random';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.questions = [];
        this.evaluatedAnswers = [];
        

        this.quizDataFromPrevSession = sessionStorage.getItem(this.props.name);

        if (this.quizDataFromPrevSession !== null) {
            const {
                questions,
                currentQuestionIndex,
                evaluatedAnswers,
                displayScoreCard
            } = JSON.parse(this.quizDataFromPrevSession);

            this.evaluatedAnswers = evaluatedAnswers;
            this.questions = questions;
            this.state = {
                currentQuestionIndex: currentQuestionIndex,
                displayScoreCard: displayScoreCard
            }
        } else {
            this.state = {
                currentQuestionIndex: 0,
                displayScoreCard: false
            }
            this.generateQuestions();
        }
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
    }

    handleUnload = () => {
        console.log(this.props.quizStarted);
        if (
            this.state.displayScoreCard === false && 
            this.props.quizStarted === true
        ) {
            // sessionStorage.setItem(this.props.name, JSON.stringify({
            //     questions: this.questions,
            //     currentQuestionIndex: this.state.currentQuestionIndex,
            //     evaluatedAnswers: this.evaluatedAnswers,
            //     displayScoreCard: this.state.displayScoreCard
            // }));
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
                            Question Number {this.state.currentQuestionIndex + 1} / {this.questions.length}
                        </div>
                        <QuizQuestion
                            question={this.questions[this.state.currentQuestionIndex]}
                            onAnswerSubmit={this.onAnswerSubmitHandler}
                        />

                    </div>
                )}
            </div>
        );
    }

}

export default Quiz;