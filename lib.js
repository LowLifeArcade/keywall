let stack = [];

/**
 * ### RenderComp
 * @param {{ template: HTMLTemplateElement, style: HTMLStyleElement }} opts
 * @returns HTMLTemplateElement
 */
export function renderComp(opts) {
    let { template, style, methods } = opts;

    const hash = useAlphaHash();
    stack.push(hash);

    // TEMPLATE
    template = template.split('class=');
    for (let i = 0; i < template.length; i++) {
        // if starts with " that means it was split on class and is therefor a classList
        if (template[i].startsWith('"')) {
            // removes first " mark so we can test the string easier
            let tempClass = '$class' + template[i];
            let elArr = tempClass.split('$class"');

            let element;
            let classNames = [];
            for (let i = 0; i < elArr.length; i++) {
                element = elArr[i];
                let classList = element.slice(0, element.indexOf('"'));
                let hasNoHash = !stack.includes(classList.slice(0, classList.indexOf('-')));

                if (element !== '') {
                    classNames = classList.split(' ');
                }

                // creates classlist with hashes
                let newClassNames = [];
                for (let i = 0; i < classNames.length; i++) {
                    let className = classNames[i];

                    if (hasNoHash) {
                        className = hash + '-' + className;
                        newClassNames.push(className);
                    }

                }

                if (newClassNames.length) {
                    classNames = newClassNames;
                }

                let restOfElement = element.slice(element.indexOf('"') + 1);
                classList = 'class="' + classNames.join(' ') + '"';
                element = [classList, restOfElement].join('');
            }
            template[i] = element;
        }
    }
    template = template.filter(Boolean).join('');

    // STYLES
    style = style.split('.')
    for (let i = 1; i < style.length; i++) {
        let pattern = /^[A-z]/
        if (pattern.test(style[i])) {
            style[i] = '.' + hash + '-' + style[i];
        } else {
            style[i] = '.' + style[i]
        }
    }
    style = style.join('');

    let css;
    let existingStyles = document.querySelector('style');
    if (existingStyles) {
        css = existingStyles;
        css.innerHTML = existingStyles.innerHTML + style;
    } else {
        css = document.createElement('style');
        css.innerHTML = style;
    }

    // JAVASCRIPT
    let jsString = '';
    for (const k in methods) {
        if (Object.hasOwnProperty.call(methods, k)) {
            let method = methods[k];
            method = method.toString();
            if (!jsString.includes(method)) {
                jsString = jsString + method + '\n';
            }
        }
    }
    // jsString =jsString.join('')
    // TODO: Use array instead of string
    let js;
    let existingJs = document.querySelector('script');
    if (existingJs.innerHTML) {
        if (existingJs.innerHTML == jsString) {
            js = existingJs;
            js.innerHTML = existingJs.innerHTML + jsString;
        }
    } else {
        js = document.createElement('script');
        js.setAttribute('async', true);
        js.innerHTML = jsString;
    }

    js !== undefined && document.head.append(js);
    document.head.append(css);

    return template;
}

// TODO: find way to make Ids type from querying all elements by id
/**
 * @typedef { 'app' | 'webApp' | 'root' | 'id' } Ids
 * @type {<K extends Ids>(
 * elementId: K | HTMLDivElement, 
 * appTemplate: string | function, 
 * options: { testCount: number, test: boolean })}
 */
export function renderApp(elementId, appTemplate, options) {
    const app = document.getElementById(elementId);
    app.innerHTML = appTemplate;
    options?.test && performanceTest(appTemplate, options);
}

function performanceTest(appTemplate, { testCount = 100 }) {
    const pTimeStart = Math.round(performance.now());
    console.log('Test start: ', pTimeStart + 'ms', );

    for (let i = 0; i < testCount; i++) {
        const div = document.createElement('div');
        div.innerHTML = appTemplate;
        app.appendChild(div);
    }

    const pTimeEnd = Math.round(performance.now());
    console.log('Test end: ', pTimeEnd);
    console.log('Total render time: ', pTimeEnd - pTimeStart);
}

export function useAlphaHash() {
    let hash = '';
    let materials = ['sand', 'rock', 'pebble', 'rock', 'mud', 'granit'];
    let types = ['brick', 'plaster', 'stone', 'wood'];
    // let colors = ['salmon', 'lime', 'orange', 'gold', 'silver', 'bronze']
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 5; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // let newHash = ''
    // let numbers = [1,2,3,4,5,6,7,8,9]
    // for (let i = 0; i < 2; i++) {
    //         newHash += numbers[Math.floor(Math.random() * numbers.length)];
    //     }

    hash = 
    // colors[Math.floor(Math.random() * colors.length)] + '_' +
    materials[Math.floor(Math.random() * materials.length)] + '_' +
    types[Math.floor(Math.random() * types.length)] + '_' + hash

    return hash;
}
