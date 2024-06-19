
let replacements_id = ["=y","ID table","editions","{{edition|","firstcolumnname","nonameid","notnamespaced",
    "shownumericids","showaliasids","showfluidtags","showblocktags","edition",
    "showitemtags","showentitytags","showforms","notshowbeitemforms",
    "itemform","itemform2","generatetranslationkeys","nocat","displayname",
    "spritename","nameid","aliasid","form","fluidtags",
    "blocktags","itemtags","entitytags","translationkey","translationtype",
    "foot=","spritetype=block","spritetype=item","spritetype=entity",
    "spritetype=biome","spritetype=environment","spritetype=env","spritetype=effect","form=block",
    "form=item","form=entity","form=biome","form=environment","form=effect"];
let replace_with_id = ["=т","ID таблиця","видання","{{el|","назвапершогостовпця","немаєназвиid","безінтервалуміжіменами",
    "показатичисловийid","показатипсевдонімиid","показатитеґирідини","показатитеґиблоку","видання",
    "показатитеґипредмету","показатитеґисутности","показатиформи","непоказуватиформипредмету",
    "формапредмету","формапредмету2","генеруватиключіперекладу","некат","відображуванеім'я",
    "назваспрайту","назваid","псевдонімиid","форма","теґирідини",
    "теґиблоку","теґипредмету","теґисутности","ключперекладу","типперекладу",
    "підвал=","типспрайту=блок","типспрайту=предмет","типспрайту=сутність",
    "типспрайту=біом","типспрайту=оточення","типспрайту=оточення","типспрайту=ефект","форма=блок",
    "форма=предмет","форма=сутність","форма=біом","форма=оточення","форма=ефект"];

let replacements_sound = ["Sound table", "sound", "sound1", "sound2", "sound3", "sound4", "sound5", "sound6", "sound7", "sound8",
    "subtitle=", "source=block", "description", "translationkey", "pitch", "distance", "rowspan",
    "volume", "foot=", "nocat", "type", "Baby:", "''varies''", "master", "music", "record", "weather",
    "hostile", "neutral", "player", "source", "ambient", "voice", "dependent", "''None''"];
let replace_with_sound = ["Звукова таблиця", "звук", "звук1", "звук2", "звук3", "звук4", "звук5", "звук6", "звук7", "звук8",
    "субтитри=", "джерело=блок", "опис", "ключперекладу", "висотазвуку", "відстань", "рядки",
    "гучність", "підвал=", "некат", "тип", "Дитинча:", "''варіюється''", "загальне", "музика", "платівка",
    "погода", "ворожі", "нейтральні", "гравець", "джерело", "середовище", "голос", "залежний", "''Немає''"];

let replacements_vn = ["Version nav","version nav", "Infobox version", "infobox version", "othereditions","edition","title","server","prefix","image","name","client",
    "build","internal","versioncode", "prevparent","prev","nextparent","next","type","unreleased","planned","|date","| date",
    "compiled","devversions", "version","hash","dl","downloads","file","other","maps","map","protocol_manual",
    "data_manual","no_protocol","no_data","no_","_manual","parent", "{{vl"];
let replace_with_vn = ["Версія навігація","Версія навігація","Версія навігація","Версія навігація","іншівидання","видання","назва","сервер","префікс","зобр","ім\'я","клієнт",
    "збірка","внутрішній","кодверсії","поперверсія","попер","настверсія","наст","тип","невипущено","заплановано","|дата","| дата",
    "скомпільований","поперзбірки","версія","хеш","зп","завантаження","файл","інше","карти","карта","протокол_вручну",
    "дані_вручну","немає_протоколу","немає_даних","немає_","_вручну","знімокдля", "{{вер"];

let replacements_entity = ["health","armor","behavior","classification","family","damage","size",
    "group","speed","knockbackresistance","spawn","equipment","usableitems","rarity",
    "notes","invimage","image","{{Infobox entity","{{Entity","{{hp","{{drop"];
let replace_with_entity = ["здоров'я","обладунки","поведінка","класифікація","сімейство","атака","розмір",
    "група","швидкість","стійкістьдовіддачі","спавн","екіпірування","корисніпредмети","рідкісність",
    "примітки","інвзображення","зобр","{{Сутність","{{Сутність","{{оз","{{дроп"];

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let months_uk = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

var textarea = document.getElementById('textareaOutput');

let checkedRadioButton = document.querySelector('input[name="templates"]:checked');
console.log(checkedRadioButton.value);

function translateuk() {
    const text = document.getElementById('textareaInput').value;

    let radioButtons = document.getElementsByName('templates');

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            let id = radioButtons[i].id;
            console.log(id);

            if (id === 'auto') {
                console.log('yea')
                if (text.includes('{{ID table')) {
                    id_table(text);
                } else if (text.includes('{{Sound table')) {
                    sound_table(text);
                } else if (text.includes('{{Version nav') || text.includes('{{Infobox version') || text.includes('{{infobox version')) {
                    version_nav(text);
                } else if (text.includes('{{Entity') || text.includes('{{Infobox entity')) {
                    entity(text);
                } else if (text === "") {
                    textarea.value = "Введіть справжній текст шаблона, а не пустоту";
                } else {
                    textarea.value = "Не можливо розпізнати шаблон";
                }
            } else if (id === 'id') {
                id_table(text);
            } else if (id === 'sound') {
                sound_table(text);
            } else if (id === 'vn') {
                version_nav(text);
            } else if (id === 'entity') {
                entity(text);
            }
            return;
        }
    }
}

function id_table(text) {
    text = text.split("\n");
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < replacements_id.length; j++) {
            if (text[i].includes(replacements_id[j])) {
                text[i] = text[i].replace(replacements_id[j], replace_with_id[j]);
            }
        }
    }
    text = text.join("\n");
    textarea.value = text;
}

function sound_table(text) {
    text = text.split("\n");
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < replacements_sound.length; j++) {
            if (text[i].includes(replacements_sound[j])) {
                text[i] = text[i].replace(replacements_sound[j], replace_with_sound[j]);
            }
        }
    }
    text = text.join("\n");
    textarea.value = text;
}


function version_nav(text) {
    text = text.split("\n");
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < replacements_vn.length; j++) {
            if (text[i].includes(replacements_vn[j])) {
                text[i] = text[i].replace(replacements_vn[j], replace_with_vn[j]);
            }
        }
    }
    text = text.join("\n");
    let lines = text.split('\n');

    if (text.includes('зобр2')) {;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (line.includes('зобр2')) {
                image2_line = line;
                break;
            }
        }
        try {
            let edition = null;
            m = image2_line.replace('.png', 'Тут потрібно розрізати');
            if (m.includes('Bedrock')) {
                if (m.includes('Edition')) {
                    m = m.replace("Bedrock Edition ", "Тут потрібно розрізати");
                } else {
                    m = m.replace("Bedrock ", "Тут потрібно розрізати");
                }
                let edition = "Bedrock";
            } else if (m.includes('Pocket')) {
                m = m.replace("Pocket Edition ", "Тут потрібно розрізати");
                edition = "Pocket";
            } else if (m.includes('Windows 10')) {
                m = m.replace("Windows 10 Edition ", "Тут потрібно розрізати");
                edition = "Windows 10";
            } else if (m.includes('Java')) {
                m = m.replace("Java Edition ", "Тут потрібно розрізати");
                edition = "Java";
            }
            m = m.split("Тут потрібно розрізати");
            let changed_image_line = m[0] + m[1] + " (" + edition + " Edition) меню.png" + m[2];
            text = text.replace(image2_line, changed_image_line)
        } catch (error) {
            console.log("Error in image2 translation");
        }
    }
    if (text.includes('дата')) {
        for (let i = 0; i < lines.length; i++) {
            let d_line = lines[i];
            if (d_line.includes('дата')) {
                date_line = d_line;
                break;
            }
        }

        let lines1 = null;
        let date_line_new = null;
        let date_line_after = null;
        if (date_line.includes("<")) {
            lines1 = date_line.split("<");
            date_line_new = lines1[0];
            date_line_after = '<' + lines1.slice(1).join('<');
        } else if (date_line.includes("{{")) {
            lines1 = date_line.split("{{");
            date_line_new = lines1[0];
            date_line_after = '{{' + lines1.slice(1).join('{{');
        } else {
            date_line_after = '';
            date_line_new = date_line;
        }
        try {
            for (let month = 0; month < months.length; month++) {
                if (date_line_new.includes(months[month])) {
                    let d = date_line_new.replace(',', 'Розрізати');
                    d = d.replace(months[month], 'Розрізати');
                    d = d.split('Розрізати');
                    let changed_date_line = d[0] + d[1] + ' ' + months_uk[month] + d[2] + ' року' + date_line_after;

                    text = text.replace(date_line, changed_date_line);
                }
            }
        } catch (error) {
            console.log("Error in date translation");
        }
    }
    textarea.value = text;
}

function entity(text) {
    text = text.split("\n");
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < replacements_entity.length; j++) {
            if (text[i].includes(replacements_entity[j])) {
                text[i] = text[i].replace(replacements_entity[j], replace_with_entity[j]);
            }
        }
    }
    text = text.join("\n");
    textarea.value = text;
}
