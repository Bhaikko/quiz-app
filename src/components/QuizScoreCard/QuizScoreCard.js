import React from 'react';
import classes from './QuizScoreCard.module.css';

const QuizScoreCard = props => {
    const {
        answerDetails,
        questions
    } = props;

    let scoreCardRows = answerDetails.map(answerDetail => {
        return (
            <tr 
                className={classes.ScoreCardRow} 
                key={answerDetail.index}
                style={{
                    backgroundColor: (
                        answerDetail.actualAnswer === answerDetail.submittedAnswer ? 
                        "lightgreen" : 
                        "indianred"
                    )
                }}
            >
                <td >{answerDetail.index + 1}</td>
                <td className={classes.ScoreCardColumn}>
                    {
                     questions[answerDetail.index].operand1 + " " +
                     questions[answerDetail.index].operator + " " +
                     questions[answerDetail.index].operand2
                    } 
                </td>
                
                <td className={classes.ScoreCardColumn}>
                    {answerDetail.actualAnswer}
                </td>

                <td className={classes.ScoreCardColumn}>
                    {answerDetail.submittedAnswer}
                </td>
            </tr>
        );
    });

    return (
        <table className={classes.ScoreCard}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                </tr>
            </thead>
            <tbody>
                {scoreCardRows}
            </tbody>
        </table>
    );
}

export default QuizScoreCard;