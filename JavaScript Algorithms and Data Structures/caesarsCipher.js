function rot13(str) {
	const input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
	let res = "";

	for (let i = 0; i < str.length; i++) {
		if (/^[a-zA-Z]*$/.test(str.charAt(i))) {
			const index = input.indexOf(str.charAt(i));
			res += output.charAt(index);
		} else {
			res += str.charAt(i);
		}
	}

	return res;
}

rot13("SERR PBQR PNZC");
rot13("SERR CVMMN!");
rot13("SERR YBIR?");
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
