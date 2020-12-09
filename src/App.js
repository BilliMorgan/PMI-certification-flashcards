import "./App.css";
import ReactCardFlip from "react-card-flip";
import React, { Component } from "react";
import Front from "../src/components/front";
import Back from "../src/components/back";
import Start from "../src/components/Start";
import data from "./assets/pmi.json";

class App extends Component {
  state = {
    isFlipped: false,
    isStart: true,
    questionId: 0,
    cases: [],
  };

  shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  onStartHandler = () => {
    this.setState((prevState) => ({ isStart: false }));
    let casesOptions = this.shuffleArray(data);
    this.setState((prevState) => ({ cases: casesOptions }));
  };

  nextQuestion = () => {
    console.log(this.state.questionId);
    console.log(this.state.cases.length);
    if (this.state.questionId < this.state.cases.length - 1) {
      this.setState((prevState) => ({ questionId: this.state.questionId + 1 }));
    } else {
      this.setState((prevState) => ({ isStart: true, questionId: 0 }));
    }
  };

  render() {
    console.log(this.state.cases);

    return (
      <div>
        {this.state.isStart ? (
          <div className="wrapper">
            <h1>PMI CERTIFICATION FLASHCARDS</h1>
            <h3>
              This application was built to help PMI candidates to prepare for PMP
              certification
            </h3>
            <Start clicked={this.onStartHandler}></Start>
          </div>
        ) : (
          <div className="flip-card">
            <ReactCardFlip
              isFlipped={this.state.isFlipped}
              flipDirection="horizontal"
              flipSpeedFrontToBack="1"
              flipSpeedBackToFront="1"
              infinite
              cardZIndex="-1"
            >
              <Front clicked={this.handleClick}>
                <h1>{this.state.cases[this.state.questionId].question}</h1>
              </Front>

              <Back clicked={this.handleClick}>
                <h1>{this.state.cases[this.state.questionId].answer}</h1>
              </Back>
            </ReactCardFlip>

            <button onClick={this.nextQuestion} className="next">NEXT QUESTION</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
