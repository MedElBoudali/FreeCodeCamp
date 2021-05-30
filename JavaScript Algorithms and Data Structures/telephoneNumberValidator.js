function telephoneCheck(str) {
	const validReg = [/^\d{3}[- ]?\d{3}[- ]?\d{4}$/, /^1 \d{3}[- ]\d{3}[- ]\d{4}$/, /^\(\d{3}\) ?\d{3}-\d{4}$/, /^1 ?\(\d{3}\) ?\d{3}-\d{4}$/];
	return validReg.some(reg => reg.test(str));
}

telephoneCheck("555-555-5555");
telephoneCheck("(555)555-5555");
telephoneCheck("(555) 555-5555");
telephoneCheck("555 555 5555");
telephoneCheck("5555555555");
telephoneCheck("1 555-555-5555");
telephoneCheck("1 555 555 5555");
telephoneCheck("1 (555) 555-5555");
telephoneCheck("1(555)555-5555");
telephoneCheck("555-5555"); //false
telephoneCheck("123**&!!asdf#"); //false
