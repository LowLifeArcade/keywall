let stack = [];

/**
 *
 * @param {{ template: InnerHTML, style: InnerHTML }} opts
 * @returns InnerHTML
 */
export function renderComp(opts) {
    let { template, style } = opts;
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

            let classList;
            let classNames = [];
            for (let i = 0; i < elArr.length; i++) {
                let elementItems = [
                    elArr[i].slice(0, elArr[i].indexOf('"')), // classList
                    elArr[i].slice(elArr[i].indexOf('"') + 1) // rest of element
                ];
                
                let hasNoHash = !stack.includes(elementItems[0].split('-')[0]);

                if (elArr[i] !== '') {
                    classList = elArr[i].substr(0, elArr[i].indexOf('"'));
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
                    classNames = newClassNames
                }
                
                elementItems[0] = 'class="' + classNames.join(' ') + '"';
                classList = elementItems.join('');

            }
            template[i] = classList;
        }
    }
    template = template.filter(Boolean).join('');
    
    // STYLES
    style = style.split('.');
    for (let i = 1; i < style.length; i++) {
        style[i] = '.' + hash + '-' + style[i];
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

    return template;
}

export function renderApp(elementId, appTemplate) {
    const app = document.getElementById(elementId);
    app.innerHTML = appTemplate;
}

export function useAlphaHash() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
