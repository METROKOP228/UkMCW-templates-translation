const javaVer = "1.21.1";
let translations_java = [];
const selectElementJava = document.getElementById('version-choice-je');

function fetchJavaFile(version) {
    const javaUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/${version}.txt`;
    
    return fileFetch(javaUrl)
        .then(data => {
            translations_java = data;
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

function getSelectValueJava() {
    ver = selectElementJava.value;
    fetchJavaFile(ver);
}

selectElementJava.addEventListener('change', getSelectValueJava);

// Завантаження файлу за замовчуванням при завантаженні сторінки
fetchJavaFile(javaVer);

const bedrockVer = "1.21.20";
let translations_bedrock = [];
const selectElementBedrock = document.getElementById('version-choice-be');

function fetchBedrockFile(version) {
    const bedrockUrl = `https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/${version}.txt`;
    
    return fileFetch(bedrockUrl)
        .then(data => {
            translations_bedrock = data;
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

function getSelectValueBedrock() {
    ver = selectElementBedrock.value;
    fetchBedrockFile(ver);
}

selectElementBedrock.addEventListener('change', getSelectValueBedrock);

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