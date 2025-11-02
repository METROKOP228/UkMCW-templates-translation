function translateLootchest() {
	if (document.getElementById("lc-items").checked) {
		translateLootchestItems();
	} else if (document.getElementById("lc-chests").checked) {
		translateLootchestChests();
	}
}

function translateLootchestItems() {
	let text = editor3.getValue();
	let lines = text.split("\n");

	for (i in lines) {
		let line = lines[i];
		let newLine = line;
		if (line.startsWith("\t[\"") || line.startsWith("    [\"")) {
			newLine = line.replace("\"block\"", "\"блок\"").replace("\"item\"", "\"предмет\"");

			let name = line.match(/\["(.*?)"\].*/)[1];
			newLine = newLine.replace(name, translateJava(name, false, true));

			let params = line.match(/\[".*?"\].*{(.*)}/)[1];

			let title = params.match(/title="(.*?)"/);
			if (title !== null) {
				title = title[1]
				newLine = newLine.replace(title, translateJava(title, false));
			}

			let link = params.match(/link="(.*?)"/);
			if (link !== null) {
				link = link[1]
				newLine = newLine.replace(link, translateJava(link, false));
			}

			let plural = params.match(/,\s*plural=\s*"(.*?)"|,\s*plural=false/);
			if (plural !== null) {
				newLine = newLine.replace(plural[0], "")
			}
		}

		lines[i] = newLine;
	}

	output = lines.join("\n");
	output3.setValue(output);
}

function translateLootchestChests() {
	let text = editor3.getValue();
	let lines = text.split("\n");

	for (i in lines) {
		let line = lines[i];
		let newLine = line;
		if (line.includes("\"") && !line.match(/\s*\[\".*?\"\]\s*=\s*{(}|[^}]*)$/) && !line.match(/\s*{\s*--\s.*$/)) {
			if (line.match(/\s*\[\".*\"\]\s*=\s*{.*},*/)) {
				let object = line.match(/\s*\[\"(.*)\"\]\s*=\s*{.*},*/)
				newLine = object[0].replace(object[1], translateChestsItem(object[1]));
			} else {
				newLine = translateChestsHeader(line);
			}
		}

		lines[i] = newLine;
	}

	output = lines.join("\n");
	output3.setValue(output);
}

function translateChestsHeader(line) {
	//chest_type - 19 container - 65 header - 64 link - 65 structID - 65 structure - 65 superheader - 39

	let chest_types = {
		"minecart with chest": "вагонетка зі скринею",
		"dispenser": "роздавач",
		"suspicious gravel": "підозрілий гравій",
		"suspicious sand": "підозрілий пісок",
		"barrel": "діжка",
		"reward container": "скриня винагороди",
		"decorated pot": "оздоблений горщик",
		"ominous trial spawner": "зловісний породжувач випробувань",
		"trial spawner": "породжувач випробувань",
		"green shulker box": "зелена шалкерова коробка",
		"chest": "скриня"
	};

	let header = line.match(/\s*(.*?)\s*=\s\"(.*?)\"/);
	let headerName = header[1];
	let headerValue = header[2];
	
	if (headerName === "chest_type") {
		for (let key in chest_types) {
			headerValue = headerValue.replace(key, chest_types[key]);
		}
		console.log(headerValue);
	}
}

function translateChestsItem(line) {
	let translatedLine = line;

	let otherTranslations = {
		"tipped-arrow-poison": "Оброблена стріла отруєння",
		"tipped-arrow-slowness": "Оброблена стріла повільности",
		"tipped-arrow-strong-slowness": "Оброблена стріла сильної повільности",
		"enchanted-book-rnd-efficiency": "Зачарована книга rnd ефективність",
		"enchanted-book-rnd-mending-trident": "Зачарована книга rnd лагодження тризубця",
		"enchanted-book-rnd-mending": "Зачарована книга rnd лагодження",
		"enchanted-book-rnd-quick-charge": "Зачарована книга rnd швидке заряджання",
		"enchanted-book-rnd-soul-speed": "Зачарована книга rnd швидкість душ",
		"enchanted-book-rnd-swift-sneak": "Зачарована книга rnd біг крадькома",
		"enchanted-book-rnd-unbreaking": "Зачарована книга rnd незламність",
		"enchanted-book-rnd-trial-chambers-2": "Зачарована книга rnd палацу випробувань 2",
		"enchanted-book-rnd-trial-chambers": "Зачарована книга rnd палацу випробувань",
		"enchanted-book-rnd-breach-density": "Зачарована книга rnd щільність",
		"enchanted-book-rnd-wind-burst": "Зачарована книга rnd порив вітру",
		"enchanted-book-rnd": "Зачарована книга rnd",
		"damaged-shield": "Пошкоджений щит",
		"disc-fragment-5": "Фрагмент платівки 5",
		"disc-creator-music-box": "Платівка creator музична скринька"
	};

	for (let key in otherTranslations) {
		if (line.includes(key)) {
			return line.replace(key, otherTranslations[key]);
		}
	} 
	if (line.includes("-smithing-template")) {
		let armorTrim = translateJava(line.replace("-smithing-template", ""), false, true)
		//translatedLine = "Ковальський шаблон " + armorTrim.charAt(0).toLowerCase() + armorTrim.slice(1);
	} else if ((line.includes("enchanted") || line.includes("damaged")) && !line.includes("golden-apple") && !line.includes("enchanted-book")) {
		//translatedLine = translateChestsInstrumentsArmor(line);
	} else if (line.includes("disc")) {
		//translatedLine = line.replace("disc-", "Платівка ");
	} else {
		//translatedLine = translateJava(line, false, true).replace("-2\"", " 2\"");
	}
	return translatedLine;
}

function translateChestsInstrumentsArmor(line) {
	let bases = {
		"cap": ["шапка", "ж"],
		"pants": ["штани", "м"],
		"tunic": ["туніка", "ж"],

		"helmet": ["шолом", "ч"],
		"chestplate": ["нагрудник", "ч"],
		"leggings": ["наголінники", "м"],
		"boots": ["чоботи", "м"],

		"sword": ["меч", "ч"],
		"pickaxe": ["кайло", "с"],
		"axe": ["сокира", "ж"],
		"shovel": ["лопата", "ж"],
		"hoe": ["мотика", "ж"],
		"crossbow": ["арбалет", "ч"],
		"bow": ["лук", "ч"],
		"spear": ["спис", "ч"],
		"fishing-rod": ["вудка", "ж"]
	}
	let materials = {
		"netherite": {"ч":"незеритовий ", "ж":"незеритова ", "с":"незеритове ", "м":"незеритові "},
		"diamond": {"ч":"діамантовий ", "ж":"діамантова ", "с":"діамантове ", "м":"діамантові "},
		"golden": {"ч":"золотий ", "ж":"золота ", "с":"золоте ", "м":"золоті "},
		"iron": {"ч":"залізний ", "ж":"залізна ", "с":"залізне ", "м":"залізні "},
		"stone": {"ч":"кам'яний ", "ж":"кам'яна ", "с":"кам'яне ", "м":"кам'яні "},
		"wooden": {"ч":"дерев'яний ", "ж":"дерев'яна ", "с":"дерев'яне ", "м":"дерев'яні "},
		"leather": {"ч":"шкіряний ", "ж":"шкіряна ", "с":"шкіряне ", "м":"шкіряні "}
	}
	let modifiers = {
		"damaged": {"ч":"пошкоджений ", "ж":"пошкоджена ", "с":"пошкоджене ", "м":"пошкоджені "}
	}
	let extras = {
		"unknown-enchanted": " з невідомими чарами",
		"level-enchanted": " з рівнем чарів",
		"soul-speed-enchanted": " з чарами швидкість душ"
	}
	let modifiers2 = {
		"random-enchanted": {"ч":"випадково зачарований ", "ж":"випадково зачарована ", "с":"випадково зачароване ", "м":"випадково зачаровані "},
		"enchanted": {"ч":"зачарований ", "ж":"зачарована ", "с":"зачароване ", "м":"зачаровані "}
	}

	let gender = "";

	let modifier = {"ч": "", "ж": "", "с": "", "м": ""};
	let modifier2 = {"ч": "", "ж": "", "с": "", "м": ""};
	let material = {"ч": "", "ж": "", "с": "", "м": ""};
	let base = "";
	let extra = "";

	for (let key in materials) {
		if (line.includes(key)) {
			material = materials[key];
			line = line.replace(key+"-", "");
			break;
		}
	}
	for (let key in modifiers) {
		if (line.includes(key)) {
			modifier = modifiers[key];
			line = line.replace(key+"-", "");
			break;
		}
	}
	for (let key in bases) {
		if (line.includes(key)) {
			base = bases[key][0];
			gender = bases[key][1];
			line = line.replace(key, "");
			break;
		}
	}
	for (let key in extras) {
		if (line.includes(key)) {
			extra = extras[key];
			line = line.replace(key+"-", "");
			break;
		}
	}
	for (let key in modifiers2) {
		if (line.includes(key)) {
			modifier2 = modifiers2[key];
			line = line.replace(key+"-", "");
			break;
		}
	}

	let translatedLine = modifier[gender] + modifier2[gender] + material[gender] + base + extra + line.replace("-", " ");

	return translatedLine.charAt(0).toUpperCase() + translatedLine.slice(1);;
}