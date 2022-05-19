// Stateless Component used as Button in the application

import React from 'react';
import classes from './Button.module.css';

const Button = props => {
    return (
        <button
            className={classes.Button}
            onClick={props.onClick}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button;