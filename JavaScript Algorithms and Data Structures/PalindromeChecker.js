function palindrome(str) {
	const newArr = [];
	const revArr = [];

	//push alphanumeric to newArr
	for (let i = 0; i < str.length; i++) {
		if (/^[a-zA-Z0-9]*$/.test(str.charAt(i))) {
			newArr.push(str.charAt(i).toLowerCase());
		}
	}

	// reverse array
	for (let i = newArr.length - 1; i >= 0; i--) {
		revArr.push(newArr[i]);
	}

	for (let i = 0; i < newArr.length; i++) {
		if (newArr[i] !== revArr[i]) {
			console.log(false); //for testing using node
			return false;
		}
	}
	console.log(true); //for testing using node
	return true;
}

palindrome("eye"); //=> true
palindrome("not a palindrome"); //=> false
