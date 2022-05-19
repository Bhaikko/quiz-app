import React from 'react';
import classes from './CimulativeScorecard.module.css';

const CimulativeScorecard = props => {
    let finalUserTotal = 0,
        finalTotal = 0;

    const { quizData } = props;

    let cimulativeScoreJSX = Object.entries(quizData).map((pair, index) => {
        const key = pair[0];

        finalUserTotal += quizData[key].numberOfCorrectAnswers;
        finalTotal += quizData[key].totalQuestions;

        return (
            <tr key={key}>
                <td>{index + 1}</td>
                <td>{key}</td>
                <td>{quizData[key].numberOfCorrectAnswers}</td>
                <td>{quizData[key].totalQuestions}</td>
            </tr>
        );
    });

    return (
        <div className={classes.CimulativeScorecard}>
            <div className={classes.CimulativeScorecardHeader}>Cimulative Score</div>
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
                    {cimulativeScoreJSX}
                </tbody>
            </table>

            <div className={classes.FinalScore}>
                Your Final Score: {finalUserTotal} / {finalTotal}                
            </div>
        </div>
    )
}

export default CimulativeScorecard;