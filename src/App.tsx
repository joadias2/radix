import React, { Component } from 'react';
import Counter from 'components/Counter';

import styles from './App.scss';

const initialState = {
  counter: 0
};

type State = typeof initialState;
export default class App extends Component<object, State> {
  readonly state = initialState;

  private interval: number;

  public componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter + 1
      }));
    }, 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return (
      <div className={styles.container}>
        <h1>Hello World!</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta eos labore adipisci?</p>
        <Counter counter={this.state.counter} />
      </div>
    );
  }
}
