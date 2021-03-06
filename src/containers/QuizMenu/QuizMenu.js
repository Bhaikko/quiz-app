// Responible for maintaining Quiz Attribute state 

import React, { Component, Fragment } from 'react';
import Button from '../../components/Button/Button';
import Quiz from '../Quiz/Quiz';
import classes from './QuizMenu.module.css';

class QuizMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfQuestions: 1,       // Number of questions the quiz should have
            operators: {                // Operands allowed in the quiz
                "+": false,
                "-": false,
                "*": false,
                "/": false
            },
            maxOperand: 20,             // Max operand value that can be there in a question. Range will be from 1 to maxOperand
            quizStarted: false          
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
            // Converting Quiz operator object into array 
            // This allows to pick random operator by index
            const operators = [];
            for (const [key, value] of Object.entries(this.state.operators)) {
                if (value === true) {
                    operators.push(key);
                }
            }

            return (
                <div 
                    className={classes.QuizContainer}
                    style={{
                        backgroundColor: this.props.bgColor
                    }}
                >
                    <div className={classes.QuizHeader}>
                        {this.props.name}
                    </div>

                    <Quiz 
                        name={this.props.name}
                        numberOfQuestions={this.state.numberOfQuestions}
                        operators={operators}
                        maxOperand={this.state.maxOperand}
                        onQuizFinished={data => this.props.onQuizFinished(data)}
                        quizStarted={this.state.quizStarted}
                        onReset={this.onQuizResetHander}
                    />
                </div>
            );
        }

        return (
            <div 
                className={classes.QuizContainer} 
                style={{backgroundColor: this.props.bgColor}}
            >
                <div className={classes.QuizHeader}>
                    {this.props.name}
                </div>

                <form onSubmit={(event) => {event.preventDefault()}} className={classes.QuizMenuForm}>
                    <div className={classes.QuizMenuInputBlock}>
                        <label 
                            className={classes.QuizMenuInputBlockLabel}
                        >
                            Number of Questions:
                        </label>

                        <input 
                            name="numberOfQuestions"
                            value={this.state.numberOfQuestions}
                            onChange={this.onQuizAttributtesUpdate}
                            type="number"
                            className={classes.QuizMenuInputBlockInput}
                        />
                    </div>

                    <div className={classes.QuizMenuInputBlock}>
                        <label 
                            className={classes.QuizMenuInputBlockLabel}
                        >
                            Max Operand Value:
                        </label>

                        <input 
                            name="maxOperand"
                            value={this.state.maxOperand}
                            onChange={this.onQuizAttributtesUpdate}
                            type="number"
                            className={classes.QuizMenuInputBlockInput}
                        />
                    </div>

                    <div className={classes.QuizMenuInputBlock}>
                        <label className={classes.QuizMenuInputBlockLabel}>Operators: </label>
                        {Object.entries(this.state.operators).map(operator => {
                            return (
                                <div key={operator[0]} className={classes.QuizMenuSelectBlock}>
                                    <label>{operator[0]}: </label>
                                    <input 
                                        type="checkbox"
                                        name={operator[0]}
                                        value={operator[1]}
                                        onChange={this.onOperatorChangeHandler}
                                        defaultChecked={operator[1]}
                                        className={classes.QuizMenuInputBlockInput}
                                    />
                                </div>
                            )
                        })}
                        
                    </div>

                    <Button 
                        onClick={this.onQuizStart}
                        disabled={!this.checkValidConfigOfQuiz()}
                    >
                        Start Quiz
                    </Button>
                </form>

                <div className={classes.MenuFooterNote}>
                    Please select atleast one operator to continue.
                </div>
                <div className={classes.MenuFooterNote}>
                    Note: For division, give answer till two decimal point.
                </div>
            </div>    
        );
    }
};

export default QuizMenu;