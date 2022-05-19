import React, { Component, Fragment } from 'react';
import Quiz from '../Quiz/Quiz';
import classes from './QuizMenu.module.css';

class QuizMenu extends Component {
    constructor(props) {
        super(props);

        this.wasQuizStarted = sessionStorage.getItem(this.props.name) ? true : false;

        this.state = {
            numberOfQuestions: 1,
            operators: {
                "+": false,
                "-": false,
                "*": false,
                "/": false
            },
            maxOperand: 20,
            quizStarted: this.wasQuizStarted
        }
    }

    onQuizStart = () => {
        this.setState({
            quizStarted: true
        });
    }

    onQuizResetHander = () => {
        this.setState({
            quizStarted: false
        }, () => {
            sessionStorage.removeItem(this.props.name);
        })
    }

    onQuizAttributtesUpdate = event => {
        const newState = {
            ...this.state
        };

        newState[event.target.name] = event.target.value;
        
        this.setState(newState);
    }

    onOperatorChangeHandler = event => {
        const currentOperatorsState = {
            ...this.state.operators
        };

        currentOperatorsState[event.target.name] = event.target.checked;

        this.setState({
            operators: currentOperatorsState
        }, () => {
            // console.log(this.state.operators);
        });

    }

    checkValidConfigOfQuiz = () => {

        if (this.state.numberOfQuestions <= 0 || this.state.maxOperand <= 0) {
            return false;
        }

        for (const [key, value] of Object.entries(this.state.operators)) {
            if (value === true) {
                return true;
            }
        }

        return false;
    }

    render() {
        if (this.state.quizStarted) {
            const operators = [];
            for (const [key, value] of Object.entries(this.state.operators)) {
                if (value === true) {
                    operators.push(key);
                }
            }

            console.log(this.state.quizStarted);

            return (
                <div className={classes.QuizContainer}>
                    <Quiz 
                        name={this.props.name}
                        numberOfQuestions={this.state.numberOfQuestions}
                        operators={operators}
                        maxOperand={this.state.maxOperand}
                        onQuizFinished={data => this.props.onQuizFinished(data)}
                        quizStarted={this.state.quizStarted}
                    />

                    <button 
                        onClick={this.onQuizResetHander}
                    >
                        Reset Quiz
                    </button>
                </div>
            );
        }

        return (
            <div className={classes.QuizMenu}>
                <div className={classes.QuizHeader}>{this.props.name}</div>
                <div className={classes.QuizMenuInputBlock}>
                    <label>Number of Questions</label>
                    <input 
                        name="numberOfQuestions"
                        value={this.state.numberOfQuestions}
                        onChange={this.onQuizAttributtesUpdate}
                        type="number"
                    />
                </div>

                <div className={classes.QuizMenuInputBlock}>
                    <label>Max Operand</label>
                    <input 
                        name="maxOperand"
                        value={this.state.maxOperand}
                        onChange={this.onQuizAttributtesUpdate}
                        type="number"
                    />
                </div>

                <div className={classes.QuizMenuInputBlock}>
                    {Object.entries(this.state.operators).map(operator => {
                        return (
                            <div key={operator[0]}>
                                <label>{operator[0]}: </label>
                                <input 
                                    type="checkbox"
                                    name={operator[0]}
                                    value={operator[1]}
                                    onChange={this.onOperatorChangeHandler}
                                    defaultChecked={operator[1]}
                                />
                            </div>
                        )
                    })}
                    
                </div>

                <button 
                    onClick={this.onQuizStart}
                    disabled={!this.checkValidConfigOfQuiz()}
                >
                    Start Quiz
                </button>
            </div>    
        );
    }
};

export default QuizMenu;