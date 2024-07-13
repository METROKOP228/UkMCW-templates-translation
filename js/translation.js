const javaUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/1.21.txt';
let translations_java;
fileFetch(javaUrl, translations_java)

const bedrockUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/newest.txt';
let translations_bedrock;
fileFetch(bedrockUrl, translations_bedrock)

const earthUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/earth/newest.txt';
let translations_earth;
fileFetch(earthUrl, translations_earth)

const legendsUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/legends/newest.txt';
let translations_legends;
fileFetch(legendsUrl, translations_legends)

function fileFetch(url, array) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        array = data;
        array = array.split('\n');
    })
    .catch(error => console.error('Error fetching file:', error));
}

function translateNames() {
    let text = editor.getValue();
    let radioButtonsEd = document.getElementsByName('editions');

    for (let i = 0; i < radioButtonsEd.length; i++) {
        if (radioButtonsEd[i].checked) {
            let id = radioButtonsEd[i].id;
            console.log(id);

            switch (id) {
            case 'java':
                textarea.value = translateJava(text);
                break;
            case 'bedrock':
                textarea.value = translateBedrock(text);
                break;
            case 'earth':
                translateEarth(text);
                break;
            case 'legends':
                translateLegends(text);
                break;
            default:
                textarea.value = 'Error';
            }
            return;
        }
    }
}

// Don't even try to optimize
function translateJava(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            if (text[i].includes("[[File:") || text[i].includes("[[Файл:")) {
                var matches = text[i].match(/\[\[(File|Файл):[^\]]*\]\]/g);
                text[i] = text[i].replace(matches, 'ЗАМІНИТИ');
            }
            for (let j = 0; j < translations_java.length; j++) {
                en_uk = translations_java[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
            text[i] = text[i].replace('ЗАМІНИТИ', matches)
        }
        text = text.join("\n");
        return text;
    } catch (error) {
        textarea.value = "Error";
    }
}

function translateBedrock(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < translations_bedrock.length; j++) {
                en_uk = translations_bedrock[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
        }

        text = text.join("\n");
        return text;
    } catch (error) {
        textarea.value = "Error";
    }
}

function translateEarth(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < translations_earth.length; j++) {
                en_uk = translations_earth[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
        }

        text = text.join("\n");
        textarea.value = text;
    } catch (error) {
        textarea.value = "Error";
    }
}

function translateLegends(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < translations_legends.length; j++) {
                en_uk = translations_legends[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
        }

        text = text.join("\n");
        textarea.value = text;
    } catch (error) {
        textarea.value = "Error";
    }
}

var isGlobal;
var useRegex;
var caseSensitive;

function searchMatches() {
    isGlobal = document.getElementById("global-search").checked;
    useRegex = document.getElementById("regex-search").checked;
    caseSensitive = document.getElementById("cs-search").checked;
    console.log(`Global: ${isGlobal}, regex: ${useRegex}, case sensitive: ${caseSensitive}`);
    if (isGlobal) {
        searchInArrays(translations_java, translations_bedrock, translations_earth, translations_legends);
    } else {
        let radioButtonsEd = document.getElementsByName('editions');
        for (let i = 0; i < radioButtonsEd.length; i++) {
            if (radioButtonsEd[i].checked) {
                let id = radioButtonsEd[i].id;
                console.log(id);
                switch (id) {
                    case 'java':
                        searchInArrays(translations_java);
                        break;
                    case 'bedrock':
                        searchInArrays(undefined, translations_bedrock);
                        break;
                    case 'earth':
                        searchInArrays(undefined, undefined, translations_earth);
                        break;
                    case 'legends':
                        searchInArrays(undefined, undefined, undefined, translations_legends);
                        break;
                }
            }
        }
    }
    return;
}

function searchInArrays(arrayJ, arrayB, arrayE, arrayL) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Clear previous results
    const text = document.getElementById("text-to-search").value;
    let matches = [];
    let matches2 = [];
    let matches3 = [];
    let matches4 = [];
    console.log(text);

    if (text !== "") {
        let regex;
        if (useRegex) {
            try {
                regex = new RegExp(text, caseSensitive ? 'g' : 'gi');
            } catch (e) {
                console.error("Invalid regular expression: ", e);
                return;
            }
        }

        const searchAndHighlight = (el, arrayName) => {
            const matchFound = useRegex ? regex.test(el) : (caseSensitive ? el.includes(text) : el.toLowerCase().includes(text.toLowerCase()));

            if (matchFound) {
                let els = el.split("=");
                el = els[0] + ` <span class="arrow"> --&gt; </span> ` + els[1];
                arrayName.push(el);

                let highlightedEl;
                if (useRegex) {
                    highlightedEl = el.replace(regex, (match) => `<span class="highlight-search">${match}</span>`);
                } else {
                    highlightedEl = caseSensitive 
                        ? el.replace(new RegExp(text, 'g'), (match) => `<span class="highlight-search">${match}</span>`)
                        : el.replace(new RegExp(text, 'gi'), (match) => `<span class="highlight-search">${match}</span>`);
                }

                let resultElement = document.createElement('div');
                resultElement.innerHTML = highlightedEl;
                resultsContainer.appendChild(resultElement);
            }
        };

        if (arrayJ !== undefined) {
            let element = '<span style="font-size: 25px;">Java Edition:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayJ.length; i++) {
                searchAndHighlight(arrayJ[i], matches);
            }
        }
        if (arrayB !== undefined) {
            let element = '<span style="font-size: 25px;">Bedrock Edition:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayB.length; i++) {
                searchAndHighlight(arrayB[i], matches2);
            }
        }
        if (arrayE !== undefined) {
            let element = '<span style="font-size: 25px;">Minecraft Earth:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayE.length; i++) {
                searchAndHighlight(arrayE[i], matches3);
            }
        }
        if (arrayL !== undefined) {
            let element = '<span style="font-size: 25px;">Minecraft Legends:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayL.length; i++) {
                searchAndHighlight(arrayL[i], matches4);
            }
        }
    }
}


