# KEYWALL

A small front end library for making component based apps with vanilla javascript. The css is auto scopped so building components won't have random effects on other parts of your app, making it fun to build components with playfull styling.

> npm i keywall (coming soon)

```js
import { renderApp, renderComp } from 'keywall'
import { Button } from './components/button.js';
import { Card } from './components/card.js'

function App(props) {
    const name = 'World';

    return renderComp({
        template: 
        /* HTML */ `
            <div class="container">
                <h1 class="title">Hello ${name}</h1>
                ${Button({ name: 'click me', color: 'salmon' })}
                ${Button({ name: 'click moo', color: 'lightgreen' })}
                ${Card({ name: 'card', color: 'salmon', shadow: true})}
            </div>
        `,
        style: 
        /* CSS */ `
            .container {
                display: flex;
                flex-direction: column;
                place-items: center;
            }
            .title {
                background: lightblue;
                padding: 10px;
                border-radius: 3px;
            }
            html {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `,
    });
}

renderApp('app', App());
```
