// Statefull component responsible for maintaining each question state and user answer 

import React, { Component } from 'react';
import classes from './QuizQuestion.module.css'

import Timer from '../Timer/Timer';
import Button from '../../components/Button/Button';

class QuizQuestion extends Component {
    constructor(props) {
        super(props);

        this.timeAllowedPerQuestion = 20;

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
                return ((Number(this.props.question.operand1) / Number(this.props.question.operand2))).toFixed(2);
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
                    <div className={classes.QuizQuestionOperand}><b>Question: </b></div>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operand1}</div>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operator}</div>
                    <div className={classes.QuizQuestionOperand}>{this.props.question.operand2}</div>
                </div>

                <form onSubmit={(event) => {event.preventDefault()}} className={classes.QuizQuestionForm}>
                    <label><b>Your Answer: </b></label>
                    <input 
                        onChange={this.onChangeAnswerInputHandler}
                        value={this.state.answerInput}
                        name="answerInput"
                        type="number"
                        placeholder='Answer'
                        className={classes.QuizQuestionInput}
                    />

                    <Button 
                        onClick={this.onAnswerSubmitHandler}
                    >
                        Submit Answer!
                    </Button>
                </form>

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