import React, { Component } from 'react';
import classes from './Timer.module.css';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timer: this.props.timerValue,
        }

        this.timerIntervalRef = null;
    }

    componentDidMount() {
        this.resetTimer();
        this.props.timerUpdated();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.resetTimer === true) {
            // this.resetTimer();
            this.props.timerUpdated();
            this.setState({
                timer: this.props.timerValue
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalRef);
    }

    resetTimer = () => {
        clearInterval(this.timerIntervalRef);

        this.timerIntervalRef = setInterval(() => {
            const currentValue = this.state.timer - 1;
            if (currentValue === -1) {
                this.props.onTimeUp();

                this.setState({
                    timer: this.props.timerValue
                });
                
            } else {
                this.setState({
                    timer: currentValue
                })
            }
        }, 1000);
    }

    render() {
        return (
            <div className={classes.Timer}>
                Time: {this.state.timer}
            </div>
        )
    }
};

export default Timer;