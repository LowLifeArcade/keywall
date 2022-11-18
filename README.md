# KEYWALL

A small front end library for making component based apps with vanilla javascript. No bundler required. Just install or use a CDN and start using Keywall on any html project. Styles are scoped so no need to worry about style name collisions or overrides.

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

    return defineComp({
        template: 
        /* HTML */ `
            <div class="container">
                <h1 class="title">Hello ${ name }</h1>
                ${Button({ name: 'Click Me', color: 'salmon' })}
                ${Button({ name: 'Click You', color: 'lightgreen' })}
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

## Using CDN

Very similar but you can just do the work in the html file as the methods are global. Good for getting an app up and running quickly.

```html
<head>
    <script async src="https://unpkg.com/keywall@latest"></script>
</head>
<body>
    <div id="app"></div>
    <script type="module">
        window.onload = () => {
            function Button(props) {
                return defineComp({
                    template:
                    /* HTML */ `
                        <button class="button">${ props.name }</button>
                    `,
                    style:
                    /* CSS */ `
                        .button {
                            background-color: ${ props.color };
                            border: none;
                            padding: .3rem 2rem;
                            border-radius: 3px;
                            box-shadow: 1px 1px 5px rgba(0,0,0,.3)
                        }
                    `
                });
            }
            
            function App(props) {
                const name = 'World';

                return defineComp({
                    template: 
                    /* HTML */ `
                        <div class="container">
                            <h1 class="title">Hello ${ name }</h1>
                            ${Button({ name: 'Click Me', color: 'salmon' })}
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
        }
    </script>
</body>
```
