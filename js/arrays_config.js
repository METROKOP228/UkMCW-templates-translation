var objsUk = {}
var objsEn = {}
var translations_java = {};

var versJson = []
var versLang = []

if (localStorage.getItem('cookieConsent') && localStorage.getItem('loadJava') === "major") {
    versJson = [ "1.21.4", "1.20.6", "1.19.4", "1.18.2", "1.17.1", "1.16.5", "1.15.2", "1.14.4", "1.13.2" ]

    versLang = [ "1.12.2", "1.11.2" ]
} else if (localStorage.getItem('cookieConsent') && localStorage.getItem('loadJava') === "last") {
    versJson = ["1.21.4"]
} else {
    versJson = 
        [ "1.21.4", "1.21.3", "1.21.1", "1.21", "1.20.6", "1.20.5", "1.20.4", "1.20.3", "1.20.2", "1.20.1",
         "1.20", "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19", "1.18.2", "1.18.1", "1.18", "1.17.1", "1.17",
         "1.16.5", "1.16.4", "1.16.3", "1.16.2", "1.16.1", "1.16", "1.15.2", "1.15.1", "1.15",
         "1.14.4", "1.14.3", "1.14", "1.13.2", "1.13" ]

    versLang = [ "1.12.2", "1.12.1", "1.12", "1.11.2", "1.11.1", "1.11" ]
}

newestJeVer = versJson[0]


let screen = document.getElementById("loading-screen");
let bar = document.getElementById("progress-bar");

let totalTranslations = versJson.length + versLang.length;
let processedTranslations = 0;

function trackProgress() {
    screen.style.display = "flex";
    if (processedTranslations < totalTranslations) {
        bar.value = processedTranslations;
        bar.max = totalTranslations; // встановлюємо максимальне значення прогресбару
        setTimeout(() => {
            trackProgress();
        }, 100);
    } else {
        screen.style.display = "none"; // приховуємо екран завантаження
    }
}

async function processVersions() {

    // Обробка всіх версій з versJson та versLang
    await Promise.all([
        ...versJson.map(async (ver) => {
            await createVerArray(ver);
            processedTranslations++; // Оновлюємо прогрес
        }),
        ...versLang.map(async (ver) => {
            await createVerArrayLang(ver);
            processedTranslations++; // Оновлюємо прогрес
        })
    ]);

    // Об'єднуємо дані після обробки всіх версій
    for (const ver of [...versJson, ...versLang]) {
        const ukObj = objsUk[ver] || {};
        const enObj = objsEn[ver] || {};

        translations_java[ver] = Object.keys(enObj).map(key => {
            const enValue = enObj[key] || "";
            const ukValue = ukObj[key] || "";
            return [enValue, ukValue, key];
        });
        translations_java[ver].sort((a, b) => b[0].length - a[0].length);
    }
}

// Викликаємо прогрес і обробку версій
if (localStorage.getItem("loadingScreen") !== "false") {
    trackProgress();
}
processVersions();

function syncJavaVers() {
    const vCJava = document.getElementById('version-choice-java');
    const vCJava2 = document.getElementById('version-choice-java2');
    vCJava.innerHTML = '';
    vCJava2.innerHTML = '';

    for (let ver of versJson) {
        // Створюємо окремі елементи для кожного select
        let option1 = document.createElement('option');
        option1.value = ver;
        option1.textContent = ver;
        vCJava.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = ver;
        option2.textContent = ver;
        vCJava2.appendChild(option2);
    }

    for (let ver of versLang) {
        let option1 = document.createElement('option');
        option1.value = ver;
        option1.textContent = ver;
        vCJava.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = ver;
        option2.textContent = ver;
        vCJava2.appendChild(option2);
    }
}

syncJavaVers();

var jeVer = document.getElementById('version-choice-java').value
var jeVer2 = document.getElementById('version-choice-java2').value
var java_vers = Array.from(document.getElementById("version-choice-java").options).map(option => option.value);
async function createVerArray(ver) {
    let url = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/uk_ua.json`;
    let enUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/en_us.json`;

    try {
        const [ukResponse, enResponse] = await Promise.all([
            fetch(url),
            fetch(enUrl)
        ]);

        if (!ukResponse.ok) {
            throw new Error(`Error fetching UK file: ${ukResponse.statusText}`);
        }
        if (!enResponse.ok) {
            throw new Error(`Error fetching EN file: ${enResponse.statusText}`);
        }

        const ukData = await ukResponse.json();
        const enData = await enResponse.json();

        objsUk[ver] = ukData;
        objsEn[ver] = enData;
    } catch (error) {
        console.error(`Error processing version ${ver}:`, error);
    }
}

async function createVerArrayLang(ver) {
    // Початкові URL для завантаження
    let ukUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/uk_ua.lang`;
    let ukAltUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/uk_UA.lang`;
    let enUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/en_us.lang`;
    let enAltUrl = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/lang/en_US.lang`;

    try {
        // Завантаження файлів з первинними URL
        let [ukResponse, enResponse] = await Promise.all([
            fetch(ukUrl),  // Якщо перший запит не вдасться, спробуємо інший
            fetch(enUrl)   // Якщо перший запит не вдасться, спробуємо інший
        ]);

        // Перевірка статусу відповіді
        if (!ukResponse.ok || !enResponse.ok) {
            [ukResponse, enResponse] = await Promise.all([
                fetch(ukAltUrl),  // Якщо перший запит не вдасться, спробуємо інший
                fetch(enAltUrl)   // Якщо перший запит не вдасться, спробуємо інший
            ]);
        }

        // Отримуємо текст із обох відповідей
        const ukText = await ukResponse.text();
        const enText = await enResponse.text();

        // Перетворення тексту у об'єкт для української версії
        const ukObj = {};
        ukText.trim().split('\n').forEach(line => {
            if (line.includes('=')) {
                const [key, value] = line.split('=').map(part => part.trim());
                ukObj[key] = value;
            }
        });

        // Перетворення тексту у об'єкт для англійської версії
        const enObj = {};
        enText.trim().split('\n').forEach(line => {
            if (line.includes('=')) {
                const [key, value] = line.split('=').map(part => part.trim());
                enObj[key] = value;
            }
        });

        // Збереження оброблених даних
        objsUk[ver] = ukObj;
        objsEn[ver] = enObj;

    } catch (error) {
        console.log(`Error processing version ${ver}:`, error);
    }
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

const newestBeVer = '1.21.60'

var beVer = '1.21.60'
var beVer2 = '1.21.60'

const translations_bedrock = {};
var bedrock_vers = Array.from(document.getElementById("version-choice-bedrock").options).map(option => option.value);
for (let verB of bedrock_vers) {
    fileFetch(`https://raw.githubusercontent.com/METROKOP228/UkMCW-templates-translation/main/files/bedrock/${verB}.txt`)
        .then(data => {
            translations_bedrock[verB] = data;
        })
        .catch(error => {
            console.error(`Error fetching file translations_bedrock[${verB}]:`, error);
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