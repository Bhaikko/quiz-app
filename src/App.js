import React from 'react';
import classes from './App.module.css';

import QuizMenu from './containers/QuizMenu/QuizMenu';

function App() {
  return(
    <div className={classes.App}>
      <QuizMenu />
      {/* <QuizMenu /> */}
    </div >
  );
}

export default App;
