import React, { useState } from 'react';
import classes from './App.module.css';
import CimulativeScorecard from './components/CimulativeScorecard/CimulativeScorecard';

import QuizMenu from './containers/QuizMenu/QuizMenu';

function App() {
  const numberOfQuizes = 2;

  const [finishedQuizes, setFinishedQuizes] = useState(0);

  const updateQuizesCount = () => {
    setFinishedQuizes(finishedQuizes + 1);
  }

  return (
    <div className={classes.App}>
      {finishedQuizes === numberOfQuizes ? <CimulativeScorecard /> : null}
      <QuizMenu 
        name={"Quiz 1"}
        onQuizFinished={updateQuizesCount}
      />
      
      <QuizMenu 
        name={"Quiz 2"}
        onQuizFinished={updateQuizesCount}
      />

    </div>
  );
}

export default App;
