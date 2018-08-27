import React, { Component } from 'react';
import Counter from 'components/Counter';

import styles from './App.scss';
import logo from 'images/logo.svg';

const longString = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tempore sit sequi, aspernatur esse repudiandae odio qui, ipsam nisi illum fugit aperiam! Vel mollitia aliquam minus? Omnis laudantium rerum, dicta odit nobis exercitationem libero hic porro sint illo! Et quo, quod placeat est harum suscipit cumque, ipsum molestiae asperiores aspernatur illum! Veritatis doloribus tenetur incidunt, fuga nam nemo, ex accusamus, quo voluptate quasi accusantium dolorum asperiores ullam qui? Nisi repudiandae architecto tenetur nobis voluptate eveniet, consequatur ut aliquid sapiente nihil non minus et optio ipsa veniam magnam distinctio fugit assumenda incidunt alias dolores debitis perspiciatis quae doloremque. Quas nobis quibusdam veniam ea, illo provident ipsum deserunt dolorum dolore repudiandae, repellendus unde consequuntur mollitia accusantium, debitis laboriosam velit voluptate aliquid? Ad laboriosam eum fugiat veritatis laborum? Tenetur, quos ipsa natus mollitia eveniet sequi odit voluptas, doloribus praesentium quia itaque minima illo blanditiis vel. A dolor doloribus ullam expedita ratione cupiditate nisi quis, ut saepe maiores qui totam possimus iste quam repellat molestias quod tempore aperiam harum. Nobis maxime aliquam aspernatur iure recusandae porro ab, aperiam inventore obcaecati voluptatum voluptates officiis aliquid voluptatem consectetur saepe excepturi veniam officia tempora illum fuga quisquam. Alias nulla dignissimos iusto illum adipisci quas culpa nesciunt animi! Mollitia velit omnis laboriosam assumenda vitae, quas qui, magni veritatis asperiores voluptatibus facilis. Ut ex, maiores hic veniam temporibus asperiores aspernatur sapiente magni quasi neque consectetur dolorem praesentium sequi, accusamus porro quidem. Voluptas et consectetur asperiores voluptatibus corporis error minus quos minima sapiente officiis quo obcaecati at libero sit rem, provident velit, quis nostrum est quaerat nobis tempora? Aut ducimus vitae aperiam assumenda accusamus excepturi officiis quasi dolorum non recusandae ipsam quo accusantium iste, tempora aliquid nesciunt eligendi cupiditate autem atque et velit sapiente ipsum? Atque at consectetur minus cumque in est iste totam, dolorum voluptatum nobis necessitatibus rerum reiciendis cupiditate, id obcaecati. Aperiam numquam repellendus corporis eos eius sit quod ducimus porro impedit, non iusto placeat magnam quibusdam tenetur voluptatibus sequi aliquid ex in. Dolorem aperiam velit perspiciatis laboriosam! Culpa sed ex placeat natus dolorem a incidunt ut optio voluptatem, qui sapiente labore odio repellendus molestias inventore nesciunt? Impedit ipsam, molestiae animi temporibus nemo nihil. Consequuntur molestiae eum laboriosam beatae hic asperiores magni officiis. Dolorum saepe aliquam cupiditate veritatis consequuntur adipisci, tenetur facere, ut, eligendi porro repellat. Et nesciunt dolorum repellendus a modi odio ducimus accusamus impedit dolorem laboriosam earum hic laudantium veniam voluptatum odit velit, eaque illo. Voluptate natus, culpa eum velit quia ea animi magni architecto ullam corporis, officiis vel cumque quo laborum iure dolor, est aliquam? Commodi aut aspernatur temporibus ex laudantium magnam, provident veritatis accusantium! Perspiciatis voluptate, inventore aperiam, et voluptates illum quasi culpa, similique explicabo repudiandae consequatur dolor? Delectus omnis nisi similique, nam ea excepturi laborum rem quaerat ratione, quis eius eligendi magni ipsa minima aliquid reiciendis voluptas. Distinctio vel ad, veniam, neque officiis aliquam eaque dolores, deserunt quod at eveniet eos commodi perferendis. Asperiores incidunt dolor placeat expedita suscipit nemo, totam aut illo velit explicabo porro eaque, assumenda fugit iusto culpa cum quod.';
console.log('This is here just for minification purpose', longString);
console.log(process.env.NODE_ENV);

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
