const diffBarPascal = 1e5;
const diffPsiPascal = (0.45359237 * 9.80665) / (0.0254 ** 2);
const diffAtmPascal = 101325;
const diffAtPascal = 98066.5;
const diffTorrPascal = diffAtmPascal / 760;
/**
 * @class Pressure
 * @description Convert pressure units.
 */
class Pressure {
	/**
	 * @constructor
	 * @param {number} value Value.
	 * @param {string} [unit="Pa"] Unit.
	 */
	constructor(value, unit = "Pa") {
		if (!Number.isFinite(value)) {
			throw new TypeError(`Argument \`value\` must be type of number (finite)!`);
		};
		if (typeof unit !== "string") {
			throw new TypeError(`Argument \`unit\` must be type of string!`);
		};
		switch (unit) {
			case "Pa":
			case "pascal":
			case "Pascal":
				this.pascal = value;
				break;
			case "bar":
			case "Bar":
				this.bar = value;
				this.pascal = value * diffBarPascal;
				break;
			case "poundPerSquareInch":
			case "PoundPerSquareInch":
			case "psi":
				this.poundPerSquareInch = value;
				this.pascal = value * diffPsiPascal;
				break;
			case "atm":
			case "atmosphere":
			case "Atmosphere":
			case "standardAtmosphere":
			case "StandardAtmosphere":
				this.standardAtmosphere = value;
				this.pascal = value * diffAtmPascal;
				break;
			case "at":
			case "technicalAtmosphere":
			case "TechnicalAtmosphere":
				this.technicalAtmosphere = value;
				this.pascal = value * diffAtPascal;
				break;
			case "torr":
			case "Torr":
				this.torr = value;
				this.pascal = value * diffTorrPascal;
				break;
			default:
				throw new SyntaxError(`\`${unit}\` is not a known pressure unit!`);
		};
		if (typeof this.bar === "undefined") {
			this.bar = this.pascal / diffBarPascal;
		};
		if (typeof this.poundPerSquareInch === "undefined") {
			this.poundPerSquareInch = this.pascal / diffPsiPascal;
		};
		if (typeof this.standardAtmosphere === "undefined") {
			this.standardAtmosphere = this.pascal / diffAtmPascal;
		};
		if (typeof this.technicalAtmosphere === "undefined") {
			this.technicalAtmosphere = this.pascal / diffAtPascal;
		};
		if (typeof this.torr === "undefined") {
			this.torr = this.pascal / diffTorrPascal;
		};
	};
	get Pa() {
		return this.pascal;
	};
	get Pascal() {
		return this.pascal;
	};
	get Bar() {
		return this.bar;
	};
	get PoundPerSquareInch() {
		return this.poundPerSquareInch;
	};
	get psi() {
		return this.poundPerSquareInch;
	};
	get atm() {
		return this.standardAtmosphere;
	};
	get Atmosphere() {
		return this.standardAtmosphere;
	};
	get atmosphere() {
		return this.standardAtmosphere;
	};
	get StandardAtmosphere() {
		return this.standardAtmosphere;
	};
	get at() {
		return this.technicalAtmosphere;
	};
	get TechnicalAtmosphere() {
		return this.technicalAtmosphere;
	};
	get Torr() {
		return this.torr;
	};
	/**
	 * @static
	 * @method difference
	 * @description Calculate pressure difference by units.
	 * @param {Pressure} a
	 * @param {Pressure} b
	 * @returns {PressureDifference}
	 */
	static difference(a, b) {
		return new PressureDifference(a, b);
	};
	static diff = this.difference;
};
/**
 * @class PressureDifference
 * @description Calculate pressure difference by units.
 */
class PressureDifference extends Pressure {
	/**
	 * @constructor
	 * @param {Pressure} a
	 * @param {Pressure} b
	 */
	constructor(a, b) {
		if (
			!(a instanceof Pressure) ||
			!(b instanceof Pressure)
		) {
			throw new TypeError(`Arguments must be instance of Pressure!`);
		};
		super(0);
		for (let key of Object.keys(this)) {
			this[key] = a[key] - b[key];
		};
	};
};
module.exports = Pressure;
