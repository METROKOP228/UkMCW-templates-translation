var jeVer = document.getElementById('version-choice-java').value
var jeVer2 = document.getElementById('version-choice-java2').value

const newestJeVer = '1.21.3'

const translations_java = {};
var java_vers = Array.from(document.getElementById("version-choice-java").options).map(option => option.value);
for (let verJ of java_vers) {
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/java/${verJ}.txt`)
        .then(data => {
            translations_java[verJ] = data;
        })
        .catch(error => {
            console.error(`Error fetching file translations_java[${verJ}]:`, error);
        });
}
document.getElementById('version-choice-java').addEventListener('change', function() {
    syncVers();
});
document.getElementById('version-choice-java2').addEventListener('change', function() {
    syncVers();
});
function syncVers() {
    jeVer = document.getElementById('version-choice-java').value;
    jeVer2 = document.getElementById('version-choice-java2').value;
    beVer = document.getElementById('version-choice-bedrock').value;
    beVer2 = document.getElementById('version-choice-bedrock2').value;
}


var beVer = '1.21.40'
var beVer2 = '1.21.40'

const newestBeVer = '1.21.40'

const translations_bedrock = {};
var bedrock_vers = Array.from(document.getElementById("version-choice-bedrock").options).map(option => option.value);
for (let verB of bedrock_vers) {
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/${verB}.txt`)
        .then(data => {
            translations_bedrock[verB] = data;
        })
        .catch(error => {
            console.error(`Error fetching file translations_java[${verB}]:`, error);
        });
}
document.getElementById('version-choice-bedrock').addEventListener('change', function() {
    syncVers();
});
document.getElementById('version-choice-bedrock2').addEventListener('change', function() {
    syncVers();
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