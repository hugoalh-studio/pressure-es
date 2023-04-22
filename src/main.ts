type PressureUnitMeta = {
	isSIUnit: boolean;
	nameASCII: string;
	nameStandard: string;
	symbolASCII: string;
	symbolStandard: string;
};
type PressureUnitMetaInternal = PressureUnitMeta & {
	convertFromSI: (valueSI: number) => number;
	convertToSI: (valueCurrent: number) => number;
	nameRegExp: RegExp;
	symbolRegExp: RegExp;
};
/*
[FOR DEVELOPERS]

`pressureUnitsMap` should do these in order to correctly generate lints:

- Follow `PressureUnitMetaInternal[]` pattern, but never assign `PressureUnitMetaInternal[]` when commit.
- End with `as const`.
*/
const pressureUnitsMap = [
	{
		nameASCII: "Pascal",
		nameStandard: "Pascal",
		nameRegExp: /^[Pp]ascal$/u,
		symbolASCII: "Pa",
		symbolStandard: "Pa",
		symbolRegExp: /^Pa$/u,
		isSIUnit: true,
		convertFromSI: (valueSI: number): number => {
			return valueSI;
		},
		convertToSI: (valueCurrent: number): number => {
			return valueCurrent;
		}
	},
	{
		nameASCII: "Bar",
		nameStandard: "Bar",
		nameRegExp: /^[Bb]ar$/u,
		symbolASCII: "bar",
		symbolStandard: "bar",
		symbolRegExp: /^bar$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI / 1e5);
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent * 1e5);
		}
	},
	{
		nameASCII: "PoundPerSquareInch",
		nameStandard: "PoundPerSquareInch",
		nameRegExp: /^[Pp]ound ?[Pp]er ?[Ss]quare ?[Ii]nch$/u,
		symbolASCII: "psi",
		symbolStandard: "psi",
		symbolRegExp: /^psi$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI / ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent * ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		}
	},
	{
		nameASCII: "StandardAtmosphere",
		nameStandard: "StandardAtmosphere",
		nameRegExp: /^[Ss]tandard ?[Aa]tmosphere$/u,
		symbolASCII: "atm",
		symbolStandard: "atm",
		symbolRegExp: /^atm$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI / 101325);
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent * 101325);
		}
	},
	{
		nameASCII: "TechnicalAtmosphere",
		nameStandard: "TechnicalAtmosphere",
		nameRegExp: /^[Tt]echnical ?[Aa]tmosphere$/u,
		symbolASCII: "at",
		symbolStandard: "at",
		symbolRegExp: /^at$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI / 98066.5);
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent * 98066.5);
		}
	},
	{
		nameASCII: "Torr",
		nameStandard: "Torr",
		nameRegExp: /^[Tt]orr$/u,
		symbolASCII: "Torr",
		symbolStandard: "Torr",
		symbolRegExp: /^Torr$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI / (101325 / 760));
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent * (101325 / 760));
		}
	}
] as const;
type PressureUnitsNameASCII = (typeof pressureUnitsMap)[number]["nameASCII"];
type PressureUnitsNameStandard = (typeof pressureUnitsMap)[number]["nameStandard"];
type PressureUnitsSymbolASCII = (typeof pressureUnitsMap)[number]["symbolASCII"];
type PressureUnitsSymbolStandard = (typeof pressureUnitsMap)[number]["symbolStandard"];
type PressureUnitsName = PressureUnitsNameASCII | PressureUnitsNameStandard;
type PressureUnitsSymbol = PressureUnitsSymbolASCII | PressureUnitsSymbolStandard;
type PressureUnits = PressureUnitsName | PressureUnitsSymbol;
type PressureToJSONKeyType = keyof Omit<PressureUnitMeta, "isSIUnit">;
const unitSI: PressureUnitMetaInternal = pressureUnitsMap.filter((unitMeta): boolean => {
	return unitMeta.isSIUnit;
})[0];
const toJSONKeyType: PressureToJSONKeyType[] = [
	"nameASCII",
	"nameStandard",
	"symbolASCII",
	"symbolStandard"
];
/**
 * @access private
 * @function unitResolver
 * @param {PressureUnits | string} unit Unit.
 * @returns {PressureUnitMetaInternal} Unit meta.
 */
function unitResolver(unit: PressureUnits | string): PressureUnitMetaInternal {
	if (typeof unit !== "string") {
		throw new TypeError(`Argument \`unit\` must be type of string!`);
	}
	for (let unitMeta of pressureUnitsMap) {
		if (
			unit === unitMeta.nameASCII ||
			unit === unitMeta.nameStandard ||
			unit === unitMeta.symbolASCII ||
			unit === unitMeta.symbolStandard ||
			unitMeta.nameRegExp.test(unit) ||
			unitMeta.symbolRegExp.test(unit)
		) {
			return unitMeta;
		}
	}
	throw new SyntaxError(`\`${unit}\` is not a known pressure unit!`);
}
/**
 * @class Pressure
 * @description Convert pressure units.
 */
class Pressure {
	/**
	 * @static
	 * @method difference
	 * @description Calculate pressure difference by units.
	 * @param {Pressure} a
	 * @param {Pressure} b
	 * @returns {PressureDifference}
	 */
	static difference(a: Pressure, b: Pressure): PressureDifference {
		return new PressureDifference(a, b);
	}
	/**
	 * @static
	 * @method unit
	 * @description Get a pressure unit meta.
	 * @param {PressureUnits | string} unit Unit.
	 * @returns {PressureUnitMeta} Unit meta.
	 */
	static unit(unit: PressureUnits | string): PressureUnitMeta {
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		return {
			nameASCII: unitResolve.nameASCII,
			nameStandard: unitResolve.nameStandard,
			symbolASCII: unitResolve.symbolASCII,
			symbolStandard: unitResolve.symbolStandard,
			isSIUnit: unitResolve.isSIUnit
		};
	}
	/**
	 * @static
	 * @method units
	 * @description Get all of the pressure units meta.
	 * @returns {PressureUnitMeta[]} Units meta.
	 */
	static units(): PressureUnitMeta[] {
		return pressureUnitsMap.map((unitMeta): PressureUnitMeta => {
			return {
				nameASCII: unitMeta.nameASCII,
				nameStandard: unitMeta.nameStandard,
				symbolASCII: unitMeta.symbolASCII,
				symbolStandard: unitMeta.symbolStandard,
				isSIUnit: unitMeta.isSIUnit
			};
		});
	}
	/**
	 * @static
	 * @method unitSI
	 * @description Get pressure SI unit meta.
	 * @returns {PressureUnitMeta} SI unit meta.
	 */
	static unitSI(): PressureUnitMeta {
		return {
			nameASCII: unitSI.nameASCII,
			nameStandard: unitSI.nameStandard,
			symbolASCII: unitSI.symbolASCII,
			symbolStandard: unitSI.symbolStandard,
			isSIUnit: unitSI.isSIUnit
		};
	}
	/** @alias difference */static diff = this.difference;
	#table: Map<string, number> = new Map<string, number>();
	/**
	 * @constructor
	 * @param {number} value Value.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 */
	constructor(value: number, unit: PressureUnits | string = "Pa") {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Argument \`value\` must be type of number!`);
		}
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		this.#table.set(unitResolve.nameASCII, value);
		if (!unitResolve.isSIUnit) {
			this.#table.set(unitSI.nameASCII, unitResolve.convertToSI(value));
		}
		for (let unitMeta of pressureUnitsMap) {
			if (!this.#table.has(unitMeta.nameASCII)) {
				this.#table.set(unitMeta.nameASCII, unitMeta.convertFromSI(this.#table.get(unitSI.nameASCII)));
			}
		}
	}
	/**
	 * @method toJSON
	 * @description Get all of the units value.
	 * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
	 * @returns {{ [x: string]: number; }} Units value.
	 */
	toJSON(keyType: PressureToJSONKeyType = "symbolASCII"): { [x: string]: number; } {
		if (!toJSONKeyType.includes(keyType)) {
			throw new RangeError(`\`${keyType}\` is not a valid key type!`);
		}
		let result: { [x: string]: number; } = {};
		for (let unitMeta of pressureUnitsMap) {
			result[unitMeta[keyType]] = this.#table.get(unitMeta.nameASCII);
		}
		return result;
	}
	/**
	 * @method toStringASCII
	 * @description Get unit's value with ASCII symbol.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {string}
	 */
	toStringASCII(unit: PressureUnits | string = "Pa"): string {
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
	}
	/**
	 * @method toStringStandard
	 * @description Get unit's value with Standard symbol.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {string}
	 */
	toStringStandard(unit: PressureUnits | string = "Pa"): string {
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
	}
	/**
	 * @method toValue
	 * @description Get unit's value.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {number}
	 */
	toValue(unit: PressureUnits | string = "Pa"): number {
		return this.#table.get(unitResolver(unit).nameASCII);
	}
}
/**
 * @class PressureDifference
 * @description Calculate pressure difference by units.
 */
class PressureDifference {
	#table: Map<string, number> = new Map<string, number>();
	/**
	 * @constructor
	 * @param {Pressure} a
	 * @param {Pressure} b
	 */
	constructor(a: Pressure, b: Pressure) {
		if (
			!(a instanceof Pressure) ||
			!(b instanceof Pressure)
		) {
			throw new TypeError(`Arguments must be instance of Pressure!`);
		}
		for (let unitMeta of pressureUnitsMap) {
			this.#table.set(unitMeta.nameASCII, a.toValue(unitMeta.nameASCII) - b.toValue(unitMeta.nameASCII));
		}
	}
	/**
	 * @method toJSON
	 * @description Get all of the units value.
	 * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
	 * @returns {{ [x: string]: number; }} Units value.
	 */
	toJSON(keyType: PressureToJSONKeyType = "symbolASCII"): { [x: string]: number; } {
		if (!toJSONKeyType.includes(keyType)) {
			throw new RangeError(`\`${keyType}\` is not a valid key type!`);
		}
		let result: { [x: string]: number; } = {};
		for (let unitMeta of pressureUnitsMap) {
			result[unitMeta[keyType]] = this.#table.get(unitMeta.nameASCII);
		}
		return result;
	}
	/**
	 * @method toStringASCII
	 * @description Get unit's value with ASCII symbol.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {string}
	 */
	toStringASCII(unit: PressureUnits | string = "Pa"): string {
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
	}
	/**
	 * @method toStringStandard
	 * @description Get unit's value with Standard symbol.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {string}
	 */
	toStringStandard(unit: PressureUnits | string = "Pa"): string {
		let unitResolve: PressureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
	}
	/**
	 * @method toValue
	 * @description Get unit's value.
	 * @param {PressureUnits | string} [unit="Pa"] Unit.
	 * @returns {number}
	 */
	toValue(unit: PressureUnits | string = "Pa"): number {
		return this.#table.get(unitResolver(unit).nameASCII);
	}
}
export default Pressure;
export {
	Pressure,
	type PressureToJSONKeyType,
	type PressureUnitMeta,
	type PressureUnits,
	type PressureUnitsName,
	type PressureUnitsNameASCII,
	type PressureUnitsNameStandard,
	type PressureUnitsSymbol,
	type PressureUnitsSymbolASCII,
	type PressureUnitsSymbolStandard
};
