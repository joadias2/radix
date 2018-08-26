import React, { Component } from 'react';
import Counter from 'components/Counter';

import styles from './App.scss';
import logo from 'images/logo.svg';
import Lazy from 'components/Lazy';

const initialState = {
  counter: 0,
  Lazy: null
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

    setTimeout(async () => {
      const module = await import('./components/Lazy');
      this.setState({ Lazy: module.default });
    }, 1500);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    const { Lazy } = this.state;

    return (
      <div className={styles.container}>
        <h1>Hello World!</h1>
        {Lazy ? <Lazy /> : null}
        <img src={logo} className="App-logo" alt="logo" />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta eos labore adipisci?</p>
        <Counter counter={this.state.counter} />
      </div>
    );
  }
}
