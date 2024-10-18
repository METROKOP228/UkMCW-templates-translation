let javaVer = "1.21.1";

function getSelectValue() {
    const selectedValue = document.getElementById('version-choice-java').value;
    // Тепер змінна selectedValue містить вибране значення
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/${selectedValue}.txt`)
        .then(data => {
            translations_java = data;
        })
        .catch(error => {
            console.error('Error fetching file translations_java:', error);
        });

    const selectedValue2 = document.getElementById('version-choice-java2').value;
    // Тепер змінна selectedValue містить вибране значення
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/${selectedValue2}.txt`)
        .then(data => {
            translations_java2 = data;
        })
        .catch(error => {
            console.error('Error fetching file translations_java2:', error);
        });
}

document.getElementById('version-choice-java').addEventListener('change', getSelectValue);
document.getElementById('version-choice-java2').addEventListener('change', getSelectValue);

let javaUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/1.21.1.txt`;
let translations_java = [];
let translations_java2 = [];

getSelectValue();

let bedrockVer = "1.21.30";

function getSelectValueBedrock() {
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/${document.getElementById('version-choice-bedrock').value}.txt`)
        .then(data => {
            translations_bedrock = data;
        })
        .catch(error => {
            console.error('Error fetching file translations_bedrock:', error);
        });

    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/${document.getElementById('version-choice-bedrock2').value}.txt`)
        .then(data => {
            translations_bedrock2 = data;
        })
        .catch(error => {
            console.error('Error fetching file translations_bedrock2:', error);
        });
}

document.getElementById('version-choice-bedrock').addEventListener('change', getSelectValueBedrock);
document.getElementById('version-choice-bedrock2').addEventListener('change', getSelectValueBedrock);

let bedrockUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/1.21.30.txt`;
let translations_bedrock = [];
let translations_bedrock2 = [];

getSelectValueBedrock();

const earthUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/earth/newest.txt';
let translations_earth = [];

fileFetch(earthUrl)
    .then(data => {
        translations_earth = data;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

const legendsUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/legends/newest.txt';
let translations_legends = [];

fileFetch(legendsUrl)
    .then(data => {
        translations_legends = data;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

const educationUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/education/1.21.202.0.txt';
let translations_education = [];

fileFetch(educationUrl)
    .then(data => {
        translations_education = data;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

function fileFetch(url, array) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // Заміна всіх символів '\r\n' на '\n'
                const normalizedData = data.replace(/\r\n/g, '\n');
                // Розділити отримані дані на масив рядків за символом '\n'
                const array = normalizedData.split('\n');
                resolve(array); // Повертаємо масив рядків через resolve
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                reject(error); // Передаємо помилку через reject у випадку невдалої вибірки
            });
    });
}