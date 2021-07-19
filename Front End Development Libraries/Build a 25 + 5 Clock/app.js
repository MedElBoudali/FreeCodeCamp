class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bl: 5,
			sl: 25,
			running: false,
			left: "25:00",
			current: "sl",
			remaining: 0,
			interval: "",
			audio: ""
		};

		this.modifyTimes = this.modifyTimes.bind(this);
		this.reset = this.reset.bind(this);
		this.playPause = this.playPause.bind(this);
		this.parseLeft = this.parseLeft.bind(this);
		this.select = this.select.bind(this);
	}

	componentDidMount() {
		this.setState({ audio: document.getElementById("beep") });
	}

	modifyTimes(e) {
		const { bl, sl } = this.state;

		if (!this.state.running) {
			let vals = e.split("-");
			let [a, b] = vals;

			let inc = 0;

			if (a == "break") {
				if (b === "increment" && bl < 60) {
					inc = 1;
				} else if (b === "decrement" && bl > 1) {
					inc = -1;
				}

				this.setState(
					state => ({
						bl: state.bl + inc
					}),
					this.parseLeft
				);
			} else {
				if (b === "increment" && sl < 60) {
					inc = 1;
				} else if (b === "decrement" && sl > 1) {
					inc = -1;
				}

				this.setState(
					state => ({
						sl: state.sl + inc
					}),
					this.parseLeft
				);
			}
		}
	}

	select(s) {
		const { running } = this.state;

		if (running) {
			this.reset();
		}

		this.setState(
			{
				current: s === "break" ? "bl" : "sl"
			},
			this.parseLeft
		);
	}

	parseLeft() {
		const { current, bl, sl, running, remaining } = this.state;
		let left;

		if (!running) {
			if (current == "bl") {
				left = bl < 10 ? "0" + bl + ":00" : bl + ":00";
			} else {
				left = sl < 10 ? "0" + sl + ":00" : sl + ":00";
			}
		} else {
			const mins = Math.floor(remaining / 1000 / 60);
			const secs = (remaining / 1000) % 60;

			left = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
		}

		this.setState({
			left: left
		});
	}

	playPause() {
		let { running } = this.state;

		if (running) {
			this.pause();
		} else {
			this.play();
		}

		this.setState(state => ({
			running: !state.running
		}));
	}

	play() {
		let { current, sl, bl, remaining, interval } = this.state;

		if (remaining === 0) {
			if (current === "sl") {
				remaining = this.getMS(sl);
			} else {
				remaining = this.getMS(bl);
			}
		}

		this.setState({ remaining: remaining });

		clearInterval(interval);

		interval = setInterval(() => {
			let remaining = this.state.remaining - 1000;
			this.setState(
				{
					remaining: remaining
				},
				this.parseLeft
			);

			if (remaining < 0) {
				current = current === "sl" ? "bl" : "sl";
				this.setState(
					{
						current: current,
						remaining: this.getMS(eval(current))
					},
					() => {
						this.parseLeft();
						this.state.audio.play();
					}
				);
			}
		}, 1000);

		this.setState({ interval: interval });
	}

	pause() {
		const { interval } = this.state;

		clearInterval(interval);

		this.setState({
			interval: ""
		});
	}

	reset() {
		const { audio } = this.state;

		clearInterval(this.state.interval);

		this.setState(
			{
				bl: 5,
				sl: 25,
				running: false,
				current: "sl",
				interval: "",
				remaining: 0
			},
			this.parseLeft
		);

		audio.pause();
		audio.load();
	}

	getMS(m) {
		return m * 60 * 1000;
	}

	render() {
		let { bl, sl, left, current, running } = this.state;

		return (
			<div id="app">
				<h1 id="title">25 + 5 Clock</h1>
				<Time left={left} res={this.reset} play={this.playPause} current={current} running={running} />
				<Settings select={this.select} break={bl} session={sl} mod={this.modifyTimes} />
				<audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
			</div>
		);
	}
}

function Time(props) {
	return (
		<div id="time">
			<h3 id="timer-label">{props.current === "sl" ? "Session" : "Break"}</h3>
			<div id="time-left">{props.left}</div>
			<div id="controls">
				<button id="start_stop" onClick={props.play}>
					{<i className={"fa " + (props.running ? "fa-pause" : "fa-play")}></i>}
				</button>
				<button id="reset" onClick={props.res}>
					<i className="fa fa-redo"></i>
				</button>
			</div>
		</div>
	);
}

function Panel(props) {
	const id = [props.id + "-decrement", props.id + "-increment"];

	return (
		<div className="panel">
			<button
				id={id[0]}
				onClick={() => {
					props.mod(id[0]);
				}}>
				<i className="far fa-arrow-alt-circle-down"></i>
			</button>
			<span id={props.id + "-length"}>{props.num}</span>
			<button
				id={id[1]}
				onClick={() => {
					props.mod(id[1]);
				}}>
				<i className="far fa-arrow-alt-circle-up"></i>
			</button>
		</div>
	);
}

function Settings(props) {
	return (
		<div id="settings">
			<div id="break">
				<h2 id="break-label">
					<span
						className="clickable"
						onClick={() => {
							props.select("break");
						}}>
						Break
					</span>
					Length
				</h2>
				<Panel id="break" num={props.break} mod={props.mod} />
			</div>
			<div id="session">
				<h2 id="session-label">
					<span
						className="clickable"
						onClick={() => {
							props.select("session");
						}}>
						Session
					</span>
					Length
				</h2>
				<Panel id="session" num={props.session} mod={props.mod} />
			</div>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("app"));
