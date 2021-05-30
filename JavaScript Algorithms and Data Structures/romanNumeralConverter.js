function convertToRoman(num) {
	let romansNumerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
	let roman = "";

	for (const i in romansNumerals) {
		while (num >= romansNumerals[i]) {
			roman += i;
			num -= romansNumerals[i];
		}
	}

	return roman;
}

convertToRoman(2);
convertToRoman(68);
convertToRoman(83);
