import React, { useEffect } from 'react';
import classes from './QuizScoreCard.module.css';

const QuizScoreCard = props => {
    const {
        answerDetails,
        questions
    } = props;

    let numberOfCorrectAnswers = props.answerDetails.length;

    let scoreCardRows = answerDetails.map(answerDetail => {
        let rowBackgroundColor = "lightgreen";
        if (
            answerDetail.submittedAnswer === "Unanswered" ||
            answerDetail.actualAnswer !== answerDetail.submittedAnswer
        ) {
            rowBackgroundColor = "indianred";
            numberOfCorrectAnswers--;
        }

        return (
            <tr 
                className={classes.ScoreCardRow} 
                key={answerDetail.index}
                style={{
                    backgroundColor: rowBackgroundColor
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
                    {answerDetail.submittedAnswer}
                </td>

                <td className={classes.ScoreCardColumn}>
                    {answerDetail.actualAnswer}
                </td>
            </tr>
        );
    });

    
    useEffect(() => {
        props.onEvaluationFinish({
            numberOfCorrectAnswers,
            totalQuestions: props.answerDetails.length
        });
    
    }, [])

    return (
        <div className={classes.ScoreCardContainer}>
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

            <div className={classes.FinalScore}>
                Score: {numberOfCorrectAnswers} / {props.answerDetails.length}                
            </div>
        </div>
    );
}

export default QuizScoreCard;