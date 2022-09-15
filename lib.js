let stack = [];

/**
 * ### definedComp
 * @param {{ template: HTMLTemplateElement, style: HTMLStyleElement }} opts
 * @returns HTMLTemplateElement
 */
export function definedComp(opts) {
    let { template, style, methods } = opts;

    const hash = useAlphaHash();
    stack.push(hash);

    // TEMPLATE
    let templateParts = template.split('class=');
    for (let i = 0; i < templateParts.length; i++) {
        const isClassList = templateParts[i].startsWith('"');
        if (isClassList) {
            // removes first " mark so we can test the string easier
            let tempClass = '$class' + templateParts[i];
            let tempTemplateParts = tempClass.split('$class"');

            let element;
            let classNames = [];
            for (let i = 0; i < tempTemplateParts.length; i++) {
                element = tempTemplateParts[i];
                let classList = element.slice(0, element.indexOf('"'));
                let restOfElement = element.slice(element.indexOf('"') + 1);

                let hashName;
                for (let i = 0; i < stack.length; i++) {
                    const stackedHash = stack[i];
                    if (classList.includes(stackedHash)) {
                        hashName = stackedHash;
                    }
                }

                if (element !== '') {
                    classNames = classList.split(' ');
                }

                // creates classlist with hashes
                let newClassNames = [];
                for (let i = 0; i < classNames.length; i++) {
                    let className = classNames[i];

                    if (!hashName && !className.includes(undefined)) {
                        className = hash + '-' + className;
                        newClassNames.push(className);
                    }
                }

                if (newClassNames.length) {
                    classNames = newClassNames;
                }

                classList = 'class="' + classNames.join(' ') + '"';
                element = [classList, restOfElement].join('');
            }

            templateParts[i] = element;
        }
    }
    template = templateParts.filter(Boolean).join('');

    // STYLES
    if (style) {
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

        document.head.append(css);
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
    if (app) {
        app.innerHTML = appTemplate;
    }
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
    let materials = ['mud', 'pebble', 'sand', 'andesite', 'basalt', 'diorite', 'dunite', 'granite', 'ice', 'norite', 'quartz', 'sovite', 'tuff', 'banded', 'breccia', 'chalk', 'clay', 'coal', 'dolomite', 'jasper', 'marble', 'shale', 'silt', 'flint', 'lapis', 'lux', 'wad', 'unakite', 'taconite', 'lime', 'gold', 'silver', 'bronze'];
    let types = ['brick', 'plaster', 'stone', 'wood', 'cement', 'glass', 'steel'];
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 3; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    hash = 
    materials[Math.floor(Math.random() * materials.length)] + '-' +
    types[Math.floor(Math.random() * types.length)] + '-' + hash

    return hash;
}

window.defineComp = definedComp
window.renderApp = renderApp