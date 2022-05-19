import React from 'react';
import classes from './CimulativeScorecard.module.css';

const CimulativeScorecard = props => {
    let finalUserTotal = 0,
        finalTotal = 0;

    return (
        <div className={classes.CimulativeScorecard}>
            <table className={classes.CimulativeScorecardTable}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Quiz Name</th>
                        <th>Your Score</th>
                        <th>Total Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>d</td>
                        <td>d</td>
                        <td>d</td>
                        <td>d</td>
                    </tr>
                </tbody>
            </table>

            <div className={classes.FinalScore}>
                Score: {finalUserTotal} / {finalTotal}                
            </div>
        </div>
    )
}

export default CimulativeScorecard;