import React, { Component } from 'react';
import classes from './App.module.css';
import CimulativeScorecard from './components/CimulativeScorecard/CimulativeScorecard';

import QuizMenu from './containers/QuizMenu/QuizMenu';

class App extends Component {
  constructor (props) {
    super(props);

    this.numberOfQuizes = 2;

    this.state = {
      finishedQuizesCount: 0,
      finishedQuizData: {}
    }
  }

  onQuizFinishHandler = (finishedData) => {
    const currentData = {
      ...this.state.finishedQuizData
    }

    currentData[finishedData.name] = finishedData;

    this.setState({
      finishedQuizesCount: this.state.finishedQuizesCount + 1,
      finishedQuizData: currentData
    });
  }

  render() {
    return (
      <div className={classes.App}>
        {this.state.finishedQuizesCount === this.numberOfQuizes ? 
          <CimulativeScorecard 
            quizData={this.state.finishedQuizData}
          /> : 
          null
        }
  
        <QuizMenu 
          name={"Quiz 1"}
          onQuizFinished={this.onQuizFinishHandler}
        />
        
        <QuizMenu 
          name={"Quiz 2"}
          onQuizFinished={this.onQuizFinishHandler}
        />
  
      </div>
    );
  }
}

export default App;
