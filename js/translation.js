// ПЕРЕКЛАД ВНУТРІШНЬОІГРОВИХ НАЗВ

function translateNames() {
    let text = editor2.getValue();
    let radioButtonsEd = document.getElementsByName('editions');

    for (let i = 0; i < radioButtonsEd.length; i++) {
        if (radioButtonsEd[i].checked) {
            let id = radioButtonsEd[i].id;
            console.log(id);

            switch (id) {
            case 'java':
                output2.setValue(translateNamesTemplate(text, translations_java[jeVer], true));
                break;
            case 'bedrock':
                output2.setValue(translateNamesTemplate(text, translations_bedrock[beVer], true));
                break;
            case 'earth':
                output2.setValue(translateNamesTemplate(text, translations_earth, false));
                break;
            case 'legends':
                output2.setValue(translateNamesTemplate(text, translations_legends, false));
                break;
            case 'education':
                output2.setValue(translateNamesTemplate(text, translations_education, false));
                break;
            }
            return;
        }
    }
}

function translateNamesTemplate(text, iArray, arrays, outside=false) {
    template = document.getElementById("advanced-replacement").checked;
    text = text.split("\n");
    let en_uk = [];
    for (let i = 0; i < text.length; i++) {
        let matches = [];
        if ((text[i].includes("[[File:") || text[i].includes("[[Файл:")) && !(outside)) {
            matches = text[i].match(/\[\[(File|Файл):[^\]]*\]\]/g);
            for (let match of matches) {
                text[i] = text[i].replace(match, 'ЗАМІНИТИ');
            }
        }
        if (arrays) {
            for (let j = 0; j < iArray.length; j++) {
                en_uk = iArray[j];
                let searchTerm = en_uk[0];
                let replacement = en_uk[1];
                
                if (template && !(outside)) {
                    let patternTJ = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                    text[i] = text[i].replace(patternTJ, replacement);
                } else {
                    let patternTJ = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    text[i] = text[i].replace(patternTJ, replacement);
                }
            }
        } else {
            for (let j = 0; j < iArray.length; j++) {
                en_uk = iArray[j].split("=");
                if (!(en_uk || en_uk[0] || en_uk[1]) || en_uk[0].length < 3 || en_uk[1].length < 3) continue
                if (template && !(outside)) {
                    let patternT = new RegExp(en_uk[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                    text[i] = text[i].replace(patternT, en_uk[1]);
                } else {
                    try {
                        let patternT = new RegExp(en_uk[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                        text[i] = text[i].replace(patternT, en_uk[1]);
                    } catch {
                        console.log('Помилка; Рядок: ' + en_uk);
                    }
                }
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
}

function translateJava(text, outside) {
    return translateNamesTemplate(text, translations_java[jeVer], true, outside)
}

function translateBedrock(text, outside) {
    return translateNamesTemplate(text, translations_bedrock[beVer], true, outside)
}

function translateEarth(text, outside) {
    return translateNamesTemplate(text, translations_earth, false, outside)
}

function translateLegends(text, outside) {
    return translateNamesTemplate(text, translations_legends, false, outside)
}

function translateEducation(text, outside) {
    return translateNamesTemplate(text, translations_education, false, outside)
}










// ПОШУК СЕРЕД ВНУТРІШНЬОІГРОВИХ НАЗВ

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

        const searchAndHighlight = (el, arrayName, arrays=false) => {
            // Визначаємо регулярний вираз для пошуку
            const flags = caseSensitive ? 'g' : 'gi';
            const searchRegex = useRegex ? regex : new RegExp(text, flags);

            // Перевіряємо, чи знайдений збіг
            let matchFound;
            if (arrays) {
                for (let elel of el) {
                    matchFound = useRegex 
                        ? regex.test(elel) 
                        : (caseSensitive ? elel.includes(text) : elel.toLowerCase().includes(text.toLowerCase()));
                    if (matchFound) {
                        break;
                    }
                }
            } else {             
                matchFound = useRegex 
                    ? regex.test(el) 
                    : (caseSensitive ? el.includes(text) : el.toLowerCase().includes(text.toLowerCase()));
            }

            if (matchFound) {
                let els;
                els = arrays ? el : el.split("=");
                
                // Підсвічуємо всі збіги в частинах елемента
                const replaceParts = els.map(part => 
                    part.replace(searchRegex, match => `<span class="highlight-search">${match}</span>`)
                );

                // Екрануємо `, " і \ в текстах els[0] та els[1]
                let escapedEls0 = els[0].replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, '\\`');
                let escapedEls1 = els[1].replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, '\\`');

                // Формуємо відформатований HTML з екранованими символами
                let processedEl;
                if (arrays) {
                    processedEl = `<span class="changesHover" onclick="(() => copyText(\`${escapedEls0}\`))();">${replaceParts[0]}</span> <span class="arrow"> --&gt; </span> <span class="changesHover" onclick="(() => copyText(\`${escapedEls1}\`))();">${replaceParts[1]}</span> <small class="changesHover" onclick="(() => copyText(\`${els[2]}\`))();">(${replaceParts[2]})</small><hr>`;
                } else {
                    processedEl = `<span class="changesHover" onclick="(() => copyText(\`${escapedEls0}\`))();">${replaceParts[0]}</span> <span class="arrow"> --&gt; </span> <span class="changesHover" onclick="(() => copyText(\`${escapedEls1}\`))();">${replaceParts[1]}</span><hr>`;
                }
                // Додаємо до масиву результатів
                arrayName.push(processedEl);

                // Відображаємо результат у контейнері результатів
                let resultElement = document.createElement('div');
                resultElement.innerHTML = processedEl;
                resultsContainer.appendChild(resultElement);
            }
        };


        if (arrayJ !== undefined) {
            let element = '<span style="font-size: 25px;" id="mcjeText">Java Edition:</span>';
            let resultElement = document.createElement('div');
            resultElement.innerHTML = element;
            resultsContainer.appendChild(resultElement);
            for (let i = 0; i < arrayJ.length; i++) {
                searchAndHighlight(arrayJ[i], matches, true);
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
                searchAndHighlight(arrayB[i], matches2, true);
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







// ПОРІВНЯННЯ ІГРОВИХ ФАЙЛІВ

function parse_lines(lines, arrays=false) {
    parsed_dict = {};

    if (arrays) {
        for (const line of lines) {
            let key = line[2].trim();
            let valueEn = line[0].trim();
            let valueUk = line[1].trim();
            parsed_dict[key] = { en: valueEn, uk: valueUk};
        }
    } else {
        for (const line of lines) {
            if (!(line || line[0] || line[1] || line[2] || line.split("=").length === 2)) continue
            let key = line.split("=")[0].trim();
            let valueEn = line.split("=")[1].trim();
            let valueUk = line.split("=")[2].trim();
            parsed_dict[key] = { en: valueEn, uk: valueUk};
        }
    }
    return parsed_dict;
}

function find_new_lines(old_dict, new_dict) {
    const new_lines = {};
    for (const key in new_dict) {
        if (!(key in old_dict)) {
            new_lines[key] = new_dict[key];
        }
    }
    return new_lines;
}

function find_changed_lines(old_dict, new_dict) {
    const changed_lines = {};
    for (const key in new_dict) {
        if (key in old_dict) {
            if (old_dict[key].uk !== new_dict[key].uk) {
                changed_lines[key] = `<span class="changesHover" onclick="copyText((() => copyText(\`${old_dict[key].uk}\`))(););">${old_dict[key].uk}</span> <span class="arrow"> --&gt; </span> <span class="changesHover" onclick="(() => copyText(\`${new_dict[key].uk}\`))();">${new_dict[key].uk}</span>`;
            }
        }
    }
    return changed_lines;
}

function find_removed_lines(old_dict, new_dict) {
    const removed_lines = {};
    for (const key in old_dict) {
        if (!(key in new_dict)) {
            removed_lines[key] = old_dict[key];
        }
    }
    return removed_lines;
}

function insert_changes(new_lines, changed_lines, removed_lines) {
    let compareText = '<br><br><span style="font-size: 25px;" id="Нові рядки">Нові рядки:</span><br>';

    for (const key in new_lines) {
        const { en, uk } = new_lines[key]; // Деструктуризація об'єкта
        compareText += `<span class="changesHover" onclick="(() => copyText(\`${en}\`))();">${en}</span> 
        <span class="arrow"> --&gt; </span> 
        <span class="changesHover" onclick="(() => copyText(\`${uk}\`))();">${uk}</span> 
        <small class="changesHover" onclick="(() => copyText(\`${key}\`))();">(${key})</small><br><hr>`;
    }
    compareText += '<br><span style="font-size: 25px;" id="Змінені рядки">Змінені рядки:</span><br>';
    const sortedChangedLines = Object.entries(changed_lines)
        .sort((a, b) => b[1].length - a[1].length);

    for (const [key, value] of sortedChangedLines) {
        compareText += `<span class="arrow">${key}:</span> ${value}<br><hr>`;
    }

    compareText += '<br><span style="font-size: 25px;" id="Видалені рядки">Видалені рядки:</span><br>';


    for (const key in removed_lines) {
        const { en, uk } = removed_lines[key]; // Деструктуризація об'єкта
        compareText += `<span class="changesHover" onclick="(() => copyText(\`${en}\`))();">${en}</span> 
        <span class="arrow"> --&gt; </span> 
        <span class="changesHover" onclick="(() => copyText(\`${uk}\`))();">${uk}</span> 
        <small class="changesHover" onclick="(() => copyText(\`${key}\`))();">(${key})</small><br><hr>`;
    }

    let compareDiv = document.createElement('div');
    compareDiv.innerHTML = `<span>${compareText}</span>`;
    document.getElementById("compare-results-container").appendChild(compareDiv);
}


function trackChanges() {
    document.getElementById("compare-results-container").innerHTML = '';
    let old_dict = {};
    let new_dict = {};
    if ((translations_java[document.getElementById("compare-version-1").value] && translations_java[document.getElementById("compare-version-2").value]) || (translations_bedrock[document.getElementById("compare-version-1").value] && translations_bedrock[document.getElementById("compare-version-2").value])) {
        let new_lines = find_new_lines(old_dict, new_dict);
        let changed_lines = find_changed_lines(old_dict, new_dict);
        let removed_lines = find_removed_lines(old_dict, new_dict);
        if (document.getElementById("edition-choice-changes").value === "Java Edition") {
            old_dict = parse_lines(translations_java[document.getElementById("compare-version-1").value], true);
            new_dict = parse_lines(translations_java[document.getElementById("compare-version-2").value], true);

            new_lines = find_new_lines(old_dict, new_dict);
            changed_lines = find_changed_lines(old_dict, new_dict);
            removed_lines = find_removed_lines(old_dict, new_dict);

            insert_changes(new_lines, changed_lines, removed_lines);
        } else if (document.getElementById("edition-choice-changes").value === "Bedrock Edition") {
            old_dict = parse_lines(translations_bedrock[document.getElementById("compare-version-1").value], true);
            new_dict = parse_lines(translations_bedrock[document.getElementById("compare-version-2").value], true);

            new_lines = find_new_lines(old_dict, new_dict);
            changed_lines = find_changed_lines(old_dict, new_dict);
            removed_lines = find_removed_lines(old_dict, new_dict);

            insert_changes(new_lines, changed_lines, removed_lines);
        }
        console.log("Зміни вставлено у код");
    } else {
        let compareDiv = document.createElement('div');
        compareDiv.innerHTML = `<h3>Помилка: Невибрана версія або погане підключення до інтернету</h3>`;
        document.getElementById("compare-results-container").appendChild(compareDiv);
    }
}

function syncCompareOptions() {
    let selectedValue;
    selectedValue = document.getElementById('edition-choice-changes').value; // Отримуємо значення вибраного варіанту
    // Вибираємо версії в залежності від вибору
    let versionsSelect;
    if (selectedValue === "Java Edition") {
        versionsSelect = java_vers; // Ваша змінна з версіями Java
    } else {
        versionsSelect = versBedrock; // Ваша змінна з версіями Bedrock
    }
    const version1Select = document.getElementById('compare-version-1');
    const version2Select = document.getElementById('compare-version-2');

    // Очищаємо попередні опції
    version1Select.innerHTML = '';
    version2Select.innerHTML = '';

    // Додаємо опцію "Версія"
    const defaultOption = document.createElement('option');
    defaultOption.text = "Версія";
    defaultOption.value = ""; // Додаємо пусте значення
    version1Select.add(defaultOption);
    version2Select.add(defaultOption.cloneNode(true)); // Клон для другого select

    // Додаємо нові опції до select
    versionsSelect.forEach(function(version) {
        const option = document.createElement('option');
        option.text = version; // Текст опції
        option.value = version; // Значення опції
        version1Select.add(option);
        version2Select.add(option.cloneNode(true)); // Клон для другого select
    });

    // Вимкнути опцію, якщо потрібно
    if (version1Select.options.length > 1) {
        version1Select.options[1].disabled = true; // Вимкнути другу опцію
    }
    
    if (version2Select.options.length > 0) {
        version2Select.options[version2Select.options.length - 1].disabled = true; // Вимкнути останню опцію
    }
}

document.getElementById('edition-choice-changes').addEventListener('change', syncCompareOptions);
document.getElementById('compare-version-1').addEventListener('change', function() {
    cv1change();
});
document.getElementById('compare-version-2').addEventListener('change', function() {
    cv1change();
});

function cv1change() {
    document.getElementById('compare-version-1').options[0].disabled = true;
    const selectedValue = document.getElementById('compare-version-1').value;

    const selectedIndex = document.getElementById('compare-version-1').selectedIndex;

    // Розблокувати всі option в другому select
    for (let i = 0; i < document.getElementById('compare-version-2').options.length; i++) {
        document.getElementById('compare-version-2').options[i].disabled = false; // Спочатку розблокувати всі
    }

    // Заблокувати option з індексами вищими або рівними вибраному
    for (let i = selectedIndex; i < document.getElementById('compare-version-2').options.length; i++) {
        document.getElementById('compare-version-2').options[i].disabled = true; // Заблокувати
    }
}
function cv2change() {
    document.getElementById('compare-version-2').options[0].disabled = true;
    const selectedValue = document.getElementById('compare-version-2').value;
    const selectedIndex = document.getElementById('compare-version-2').selectedIndex;

    // Розблокувати всі option в другому select
    for (let i = 0; i < document.getElementById('compare-version-2').options.length; i++) {
        document.getElementById('compare-version-1').options[i].disabled = false; // Спочатку розблокувати всі
    }

    // Заблокувати option з індексами нижчими за вибраний
    for (let i = 0; i <= selectedIndex; i++) {
        document.getElementById('compare-version-1').options[i].disabled = true; // Заблокувати
    }
}

syncCompareOptions();