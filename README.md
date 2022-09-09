# KEYWALL

A small front end library for making component based apps with vanilla javascript. No bundler required. Just install and start using keywall on any html project.

## Install

> npm i keywall

## Usage

`app.js`

>Use Tobermory's [es6-String-Html vscode plugin](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)  for syntax highlighting in your template strings.

```js
import { renderApp, renderComp } from './node_modules/keywall/lib.js'
import { Button } from './components/button.js';
import { Card } from './components/card.js'

function App(props) {
    const name = 'World';

    return renderComp({
        template: 
        /* HTML */ `
            <div class="container">
                <h1 class="title">Hello ${ name }</h1>
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

`index.html`

```html
<body>
    <div id="app"></div>
    <script type="module" src="./app.js"></script>
</body>
```

> Note the install is from a full path ( './node_modules/keywall/lib.js' ). This is because we're not using a bundler.
> 