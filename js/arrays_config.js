var objsUk = {}
var objsEn = {}




// JAVA




var translations_java = {};

var versJson = []
var versLang = []

if (localStorage.getItem('cookieConsent') && localStorage.getItem('loadJava') === "major") {
    versJson = [ "1.21.7", "1.20.6", "1.19.4", "1.18.2", "1.17.1", "1.16.5", "1.15.2", "1.14.4", "1.13.2" ]

    versLang = [ "1.12.2", "1.11.2" ]
} else if (localStorage.getItem('cookieConsent') && localStorage.getItem('loadJava') === "last") {
    versJson = ["1.21.7"]
} else {
    versJson = 
        [ "1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.1", "1.21", "1.20.6", "1.20.5", "1.20.4", "1.20.3",
         "1.20.2", "1.20.1", "1.20", "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19", "1.18.2", "1.18.1", "1.18", "1.17.1", "1.17",
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
    if (processedTranslations < totalTranslations || document.getElementById("version-choice-bedrock").value === "Зачекайте…") {
        bar.value = processedTranslations;
        bar.max = totalTranslations + 2; // встановлюємо максимальне значення прогресбару
        setTimeout(() => {
            trackProgress();
        }, 100);
    } else {
        screen.style.display = "none"; // приховуємо екран завантаження
    }
}

let tpWindow = document.getElementById("loading-window");

if (localStorage.getItem("loadingScreen") === "false") {
    tpWindow.style.display = "flex";
    trackProgressWindow();
}

function trackProgressWindow()  {
    if (processedTranslations < totalTranslations || document.getElementById("version-choice-bedrock").value === "Зачекайте…") {
        setTimeout(() => {
            trackProgressWindow();
        }, 100);
    } else {
        tpWindow.style.display = "none"; // приховуємо екран завантаження
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





// BEDROCK




var beVer;
var beVer2;

var translations_bedrock = {};

let versBedrock = [];

async function getAllStableTags(owner, repo) {
    let page = 1;
    let stableTags = [];

    while (true) {
        const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100&page=${page}`;
        
        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const releases = await response.json();
            if (releases.length === 0) break; // Якщо більше немає сторінок, виходимо

            stableTags.push(...releases
                .filter(release => !release.prerelease)
                .map(release => release.tag_name));

            page++; // Переходимо до наступної сторінки
        } catch (error) {
            console.error('Error fetching stable tags:', error);
            break;
        }
    }

    versBedrock = stableTags;
}

// Виклик функції та очікування завершення
async function initBedrock() {
    await getAllStableTags('Mojang', 'bedrock-samples');
    await processVersionsBedrock();
    syncBedrockVers();
    beVer = document.getElementById('version-choice-bedrock').value;
    beVer2 = document.getElementById('version-choice-bedrock2').value;
    newestBeVer = versBedrock[0]
}

async function processVersionsBedrock() {
    await Promise.all(versBedrock.map(async (ver) => {
        await createVerArrayBedrock(ver);
        processedTranslations++; // Оновлюємо прогрес
    }));

    for (const ver of versBedrock) {
        const ukObj = objsUk[ver] || {};
        const enObj = objsEn[ver] || {};

        translations_bedrock[ver] = Object.keys(enObj).map(key => {
            const enValue = enObj[key] || "";
            const ukValue = ukObj[key] || "";
            return [enValue, ukValue, key];
        });
        translations_bedrock[ver].sort((a, b) => b[0].length - a[0].length);
    }
}

async function createVerArrayBedrock(ver) {
    let ukUrl = `https://raw.githubusercontent.com/Mojang/bedrock-samples/${ver}/resource_pack/texts/uk_UA.lang`;
    let enUrl = `https://raw.githubusercontent.com/Mojang/bedrock-samples/${ver}/resource_pack/texts/en_US.lang`;

    try {
        let [ukResponse, enResponse] = await Promise.all([
            fetch(ukUrl),
            fetch(enUrl)
        ]);

        if (!ukResponse.ok || !enResponse.ok) {
            throw new Error(`Не вдалося отримати файли для версії ${ver}`);
        }

        const ukText = await ukResponse.text();
        const enText = await enResponse.text();

        function cleanValue(value) {
            return value
                .replace(/\t+$/, '')      // Видаляє табуляцію в кінці рядка
                .replace(/\s*#.*$/, '');  // Видаляє пробіли перед # та сам # з коментарем
        }

        const ukObj = Object.fromEntries(
            ukText.trim().split('\n')
                .filter(line => line.includes('='))
                .map(line => {
                    let [key, value] = line.split('=').map(part => part.trim());
                    return [key, cleanValue(value)];
                })
        );

        const enObj = Object.fromEntries(
            enText.trim().split('\n')
                .filter(line => line.includes('='))
                .map(line => {
                    let [key, value] = line.split('=').map(part => part.trim());
                    return [key, cleanValue(value)];
                })
        );

        objsUk[ver] = ukObj;
        objsEn[ver] = enObj;

    } catch (error) {
        console.log(`Error processing version ${ver}:`, error);
    }
}

function syncBedrockVers() {
    const vCBedrock = document.getElementById('version-choice-bedrock');
    const vCBedrock2 = document.getElementById('version-choice-bedrock2');
    vCBedrock.innerHTML = '';
    vCBedrock2.innerHTML = '';

    for (let ver of versBedrock) {
        // Створюємо окремі елементи для кожного select
        let option1 = document.createElement('option');
        option1.value = ver;
        option1.textContent = ver;
        vCBedrock.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = ver;
        option2.textContent = ver;
        vCBedrock2.appendChild(option2);
    }
}

// Запуск основної функції
initBedrock();

document.getElementById('version-choice-java').addEventListener('change', function() {
    syncVers();
});
document.getElementById('version-choice-java2').addEventListener('change', function() {
    syncVers();
});
document.getElementById('version-choice-bedrock').addEventListener('change', function() {
    syncVers();
});
document.getElementById('version-choice-bedrock2').addEventListener('change', function() {
    syncVers();
});
function syncVers() {
    jeVer = document.getElementById('version-choice-java').value;
    jeVer2 = document.getElementById('version-choice-java2').value;
    beVer = document.getElementById('version-choice-bedrock').value;
    beVer2 = document.getElementById('version-choice-bedrock2').value;
}








// EARTH, LEGENDS, EDUCATION




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