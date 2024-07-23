let javaVer = "1.21";

function getSelectValue() {
    const selectElement = document.getElementById('version-choice-je');
    const selectedValue = selectElement.value;
    console.log(selectedValue);
    // Тепер змінна selectedValue містить вибране значення
    javaVer = selectedValue;
    javaUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/${javaVer}.txt`;
    fileFetch(javaUrl)
        .then(data => {
            translations_java = data;
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

document.getElementById('version-choice-je').addEventListener('change', getSelectValue);

let javaUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/1.21.txt`;
let translations_java = [];

fileFetch(javaUrl)
    .then(data => {
        translations_java = data;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

const bedrockUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/newest.txt';
let translations_bedrock = [];

fileFetch(bedrockUrl)
    .then(data => {
        translations_bedrock = data;
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });

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

const educationUrl = 'https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/education/1.20.1305.0.txt';
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
                // Розділити отримані дані на масив рядків за символом '\n'
                array = data.split('\r\n');
                resolve(array); // Повертаємо масив рядків через resolve
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                reject(error); // Передаємо помилку через reject у випадку невдалої вибірки
            });
    });
}