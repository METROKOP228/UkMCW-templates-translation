function translateNames() {
    let text = editor2.getValue();
    let radioButtonsEd = document.getElementsByName('editions');

    for (let i = 0; i < radioButtonsEd.length; i++) {
        if (radioButtonsEd[i].checked) {
            let id = radioButtonsEd[i].id;
            console.log(id);

            switch (id) {
            case 'java':
                output2.setValue(translateJava(text));
                break;
            case 'bedrock':
                output2.setValue(translateBedrock(text));
                break;
            case 'earth':
                translateEarth(text);
                break;
            case 'legends':
                translateLegends(text);
                break;
            case 'education':
                translateEducation(text);
                break;
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
            let matches = [];
            if (text[i].includes("[[File:") || text[i].includes("[[Файл:")) {
                matches = text[i].match(/\[\[(File|Файл):[^\]]*\]\]/g);
                for (let j = 0; j < matches.length; j++) {
                    for (let match of matches) {
                        text[i] = text[i].replace(match, 'ЗАМІНИТИ');
                    }
                }
            }
            for (let j = 0; j < translations_java[jeVer].length; j++) {
                en_uk = translations_java[jeVer][j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
            if (matches.length > 0) {
                for (let match of matches) {
                    text[i] = text[i].replace('ЗАМІНИТИ', match);
                }
            }
        }
        text = text.join("\n");
        return text;
    } catch (error) {
        console.log(error);
        return text;
    }
}


function translateBedrock(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < translations_bedrock[beVer].length; j++) {
                en_uk = translations_bedrock[beVer][j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
        }

        text = text.join("\n");
        return text;
    } catch (error) {
        output.setValue("Error");
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
        output2.setValue(text);
    } catch (error) {
        output2.setValue("Error");
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
        output2.setValue(text);
    } catch (error) {
        output2.setValue("Error");
    }
}

function translateEducation(text) {
    text = text.split("\n");
    let en_uk = [];
    try {
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < translations_education.length; j++) {
                en_uk = translations_education[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            } 
            for (let j = 0; j < translations_bedrock.length; j++) {
                en_uk = translations_bedrock[j].split("=");
                if (text[i].includes(en_uk[0]) && en_uk[1] !== undefined) {
                    text[i] = text[i].replace(en_uk[0], en_uk[1]);
                }
            }
        }
        text = text.join("\n");
        output2.setValue(text);
    } catch (error) {
        output2.setValue("Error");
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
        searchInArrays(translations_java[jeVer2], translations_bedrock[beVer2], translations_earth, translations_legends, translations_education);
    } else {
        let radioButtonsEd = document.getElementsByName('editions2');
        for (let i = 0; i < radioButtonsEd.length; i++) {
            if (radioButtonsEd[i].checked) {
                let id = radioButtonsEd[i].id;
                console.log(id);
                switch (id) {
                    case 'java2':
                        searchInArrays(translations_java[jeVer2]);
                        break;
                    case 'bedrock2':
                        searchInArrays(undefined, translations_bedrock[beVer2]);
                        break;
                    case 'earth2':
                        searchInArrays(undefined, undefined, translations_earth);
                        break;
                    case 'legends2':
                        searchInArrays(undefined, undefined, undefined, translations_legends);
                        break;
                    case 'education2':
                        searchInArrays(undefined, undefined, undefined, undefined, translations_education);
                        break;
                }
            }
        }
    }
    return;
}

function searchInArrays(arrayJ, arrayB, arrayE, arrayL, arrayEdu) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Clear previous results
    const text = document.getElementById("text-to-search").value;
    let matches = [];
    let matches2 = [];
    let matches3 = [];
    let matches4 = [];
    let matches5 = [];

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
            let element = '<span style="font-size: 25px;" id="mcjeText">Java Edition:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayJ.length; i++) {
                searchAndHighlight(arrayJ[i], matches);
            }
            if (matches[0] === undefined) {
                document.getElementById('mcjeText').classList.add('hidden');
            } else {
                document.getElementById('mcjeText').classList.remove('hidden');
            }
        }
        if (arrayB !== undefined) {
            let element = '<span style="font-size: 25px;" id="mcbeText">Bedrock Edition:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayB.length; i++) {
                searchAndHighlight(arrayB[i], matches2);
            }
            if (matches2[0] === undefined) {
                document.getElementById('mcbeText').classList.add('hidden');
            } else {
                document.getElementById('mcbeText').classList.remove('hidden');
            }
        }
        if (arrayE !== undefined) {
            let element = '<span style="font-size: 25px;" id="mceText">Minecraft Earth:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayE.length; i++) {
                searchAndHighlight(arrayE[i], matches3);
            }
            if (matches3[0] === undefined) {
                document.getElementById('mceText').classList.add('hidden');
            } else {
                document.getElementById('mceText').classList.remove('hidden');
            }
        }
        if (arrayL !== undefined) {
            let element = '<span style="font-size: 25px;" id="mclgText">Minecraft Legends:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayL.length; i++) {
                searchAndHighlight(arrayL[i], matches4);
            }
            if (matches4[0] === undefined) {
                document.getElementById('mclgText').classList.add('hidden');
            } else {
                document.getElementById('mclgText').classList.remove('hidden');
            }
        }
        if (arrayEdu !== undefined) {
            let element = '<span style="font-size: 25px;" id="mceeText">Minecraft Education:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayEdu.length; i++) {
                searchAndHighlight(arrayEdu[i], matches5);
            }
            if (matches5[0] === undefined) {
                document.getElementById('mceeText').classList.add('hidden');
            } else {
                document.getElementById('mceeText').classList.remove('hidden');
            }
        }
        if (matches[0] === undefined && matches2[0] === undefined && matches3[0] === undefined && matches4[0] === undefined && matches5[0] === undefined) {
            let noMatches = document.createElement('div');
            noMatches.innerHTML = '<i style="font-size: 25px;">Не знайдено жодних збігів</i>';
            resultsContainer.appendChild(noMatches);
        }
    }
}
