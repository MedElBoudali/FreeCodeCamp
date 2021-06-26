const fetchingFunc = async setQuotesArray => {
	const res = await fetch(
		"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
	);
	const data = await res.json();
	return setQuotesArray(data.quotes);
};

const Index = () => {
	const [quotesArray, setQuotesArray] = React.useState([]);
	React.useEffect(() => {
		fetchingFunc(setQuotesArray);
	});

	if (!quotesArray.length) {
		return (
			<div id="loading">
				<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 12C1 14.1756 1.64514 16.3023 2.85383 18.1113C4.06253 19.9202 5.7805 21.3301 7.79048 22.1627C9.80047 22.9952 12.0122 23.2131 14.146 22.7886C16.2798 22.3642 18.2398 21.3166 19.7782 19.7782C21.3166 18.2398 22.3642 16.2798 22.7886 14.146C23.2131 12.0122 22.9952 9.80047 22.1627 7.79048C21.3301 5.78049 19.9202 4.06253 18.1113 2.85383C16.3023 1.64514 14.1756 1 12 1" />
				</svg>
			</div>
		);
	}

	return <Quotes quotesArray={quotesArray} />;
};

const Quotes = ({ quotesArray }) => {
	const [selectedQuote, setSelectedQuote] = React.useState(quotesArray[0]);
	const onClick = () => {
		setSelectedQuote(quotesArray[Math.floor(Math.random() * (quotesArray.length + 1 - 0) + 0)]);
	};
	return (
		<div id="quote-box">
			<div id="text">{selectedQuote.quote}</div>
			<div id="author">{selectedQuote.author}</div>
			<div id="buttons-wrapper">
				<a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
					</svg>
				</a>
				<button id="new-quote" onClick={onClick}>
					New Quote
				</button>
			</div>
		</div>
	);
};

ReactDOM.render(<Index />, document.getElementById("app"));
