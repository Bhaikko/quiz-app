import React, { Component } from 'react';
import classes from './QuizQuestion.module.css'

import Timer from '../Timer/Timer';

class QuizQuestion extends Component {
    constructor(props) {
        super(props);

        this.timeAllowedPerQuestion = 5;

        this.state = {
            answerInput: "",
            resetTimer: true
        }
    }

    calculateAnswer = () => {
        switch (this.props.question.operator) {
            case "+":
                return Number(this.props.question.operand1) + Number(this.props.question.operand2);
            case "-":
                return Number(this.props.question.operand1) - Number(this.props.question.operand2);
            case "*":
                return Number(this.props.question.operand1) * Number(this.props.question.operand2);
            case "/":
                return (Number(this.props.question.operand1) / Number(this.props.question.operand2)).toPrecision(2);
            default:
                return null;
        }
    }

    onChangeAnswerInputHandler = event => {
        this.setState({
            answerInput: event.target.value
        });
    }

    onAnswerSubmitHandler = event => {
        event.preventDefault();

        const actualAnswer = this.calculateAnswer();

        this.props.onAnswerSubmit({
            actualAnswer,
            submittedAnswer: Number(this.state.answerInput)
        });
        
        // console.log(this.state.answerInput);
        this.setState({
            answerInput: "",
            resetTimer: true
        });
    }

    onTimeUpHandler = () => {
        const actualAnswer = this.calculateAnswer();

        this.props.onAnswerSubmit({
            actualAnswer,
            submittedAnswer: "Unanswered"
        });

        this.setState({
            answerInput: "",
            resetTimer: true
        });
    }

    timerUpdated = () => {
        this.setState({
            resetTimer: false
        });
    }

    render() {
        return (
            <div className={classes.QuizQuestion}>
                <div className={classes.QuizQuestionContainer}>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operand1}</div>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operator}</div>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operand2}</div>
                </div>

                <input 
                    onChange={this.onChangeAnswerInputHandler}
                    value={this.state.answerInput}
                    name="answerInput"
                    type="number"
                />

                <button 
                    onClick={this.onAnswerSubmitHandler}
                >
                    Submit Answer!
                </button>

                <Timer 
                    timerValue={this.timeAllowedPerQuestion}
                    resetTimer={this.state.resetTimer}
                    onTimeUp={this.onTimeUpHandler}
                    timerUpdated={this.timerUpdated}
                />
            </div>  
        );
    }
};

export default QuizQuestion;