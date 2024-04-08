//#region Define Units Conversion
const unitsSymbols = {
	/*
	KEY: ASCII symbol of the unit.
	VALUES: Symbols of the unit, the standard symbol must at the first index.

	SI unit must at the first row.
	*/
	"Pa": ["Pa"],// SI
	"bar": ["bar"],
	"psi": ["psi"],
	"atm": ["atm"],
	"at": ["at"],
	"Torr": ["Torr"]
} as const;
/**
 * Type of the ASCII symbol of all of the supported pressure units.
 */
export type PressureUnitsSymbolASCII = keyof typeof unitsSymbols;
const unitSISymbolASCII: PressureUnitsSymbolASCII = Object.keys(unitsSymbols)[0] as PressureUnitsSymbolASCII;
/**
 * Type of the symbols of all of the supported pressure units.
 */
export type PressureUnitsSymbols = typeof unitsSymbols[PressureUnitsSymbolASCII][number];
const unitsNames = {
	/*
	KEY: ASCII symbol of the unit.
	VALUES: Names of the unit, the standard name must at the first index.

	SI unit must at the first row.
	*/
	"Pa": ["Pascal"],// SI
	"bar": ["Bar"],
	"psi": ["Pound Per Square Inch"],
	"atm": ["Standard Atmosphere"],
	"at": ["Technical Atmosphere"],
	"Torr": ["Torr"]
} as const;
/**
 * Type of the names of all of the supported pressure units.
 */
export type PressureUnitsNames = typeof unitsNames[PressureUnitsSymbolASCII][number];
/**
 * Type of the unit input of all of the supported pressure units.
 */
export type PressureUnitsInput = PressureUnitsNames | PressureUnitsSymbolASCII | PressureUnitsSymbols;
interface UnitConverter {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const unitsConverters: Record<PressureUnitsSymbolASCII, UnitConverter> = {
	Pa: {// SI
		fromSI(valueSI: number): number {
			return valueSI;
		},
		toSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	bar: {
		fromSI(valueSI: number): number {
			return (valueSI / 1e5);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 1e5);
		}
	},
	psi: {
		fromSI(valueSI: number): number {
			return (valueSI / ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * ((0.45359237 * 9.80665) / (0.0254 ** 2)));
		}
	},
	atm: {
		fromSI(valueSI: number): number {
			return (valueSI / 101325);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 101325);
		}
	},
	at: {
		fromSI(valueSI: number): number {
			return (valueSI / 98066.5);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 98066.5);
		}
	},
	Torr: {
		fromSI(valueSI: number): number {
			return (valueSI / (101325 / 760));
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * (101325 / 760));
		}
	}
};
//#endregion
//#region Converter
export interface PressureUnitMeta {
	/**
	 * Whether this is the SI unit of the pressure.
	 */
	isSIUnit: boolean;
	/**
	 * Names of the pressure unit, the standard name is at the first index.
	 */
	names: string[];
	/**
	 * ASCII symbol of the pressure unit, design for internal usage.
	 */
	symbolASCII: string;
	/**
	 * Symbols of the pressure unit, the standard symbol is at the first index.
	 */
	symbols: string[];
}
/**
 * Resolve unit input as ASCII symbol of the unit.
 * @access private
 * @param {string} unitInput Unit input.
 * @returns {PressureUnitsSymbolASCII} ASCII symbol of the unit.
 */
function resolveUnitInput(unitInput: string): PressureUnitsSymbolASCII {
	for (const [unitSymbolASCII, unitSymbols] of Object.entries(unitsSymbols)) {
		const unitNames = unitsNames[unitSymbolASCII as PressureUnitsSymbolASCII];
		if (
			unitInput === unitSymbolASCII ||
			//@ts-ignore Type conflict not exist.
			unitSymbols.includes(unitInput) ||
			//@ts-ignore Type conflict not exist.
			unitNames.includes(unitInput)
		) {
			return unitSymbolASCII as PressureUnitsSymbolASCII;
		}
	}
	throw new SyntaxError(`\`${unitInput}\` is not a known pressure unit!`);
}
/**
 * Convert between units of the pressure.
 */
export class Pressure {
	#table: Map<PressureUnitsSymbolASCII, number> = new Map<PressureUnitsSymbolASCII, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {PressureUnitsInput} [fromUnit="Pa"] From unit.
	 */
	constructor(fromValue: number, fromUnit: PressureUnitsInput = "Pa") {
		if (!(typeof fromValue === "number" && !Number.isNaN(fromValue))) {
			throw new TypeError(`Argument \`fromValue\` must be type of number!`);
		}
		const fromUnitSymbolASCII: PressureUnitsSymbolASCII = resolveUnitInput(fromUnit);
		this.#table.set(fromUnitSymbolASCII, fromValue);
		if (fromUnitSymbolASCII !== unitSISymbolASCII) {
			this.#table.set(unitSISymbolASCII, unitsConverters[fromUnitSymbolASCII].toSI(fromValue));
		}
		for (const [unitSymbolASCII, unitConverter] of (Object.entries(unitsConverters) as [PressureUnitsSymbolASCII, UnitConverter][])) {
			if (!this.#table.has(unitSymbolASCII)) {
				this.#table.set(unitSymbolASCII, unitConverter.fromSI(this.#table.get(unitSISymbolASCII)!));
			}
		}
	}
	/**
	 * Get values of all of the units.
	 * @returns {Record<PressureUnitsSymbolASCII, number>} Values of all of the units.
	 */
	toObject(): Record<PressureUnitsSymbolASCII, number> {
		return Object.fromEntries(this.#table.entries()) as Record<PressureUnitsSymbolASCII, number>;
	}
	/**
	 * Get value of the unit with standard symbol.
	 * @param {PressureUnitsInput} [toUnit="Pa"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: PressureUnitsInput = "Pa"): string {
		const toUnitSymbolASCII: PressureUnitsSymbolASCII = resolveUnitInput(toUnit);
		return `${this.#table.get(toUnitSymbolASCII)!} ${unitsSymbols[toUnitSymbolASCII][0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {PressureUnitsInput} [toUnit="Pa"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: PressureUnitsInput = "Pa"): number {
		return this.#table.get(resolveUnitInput(toUnit))!;
	}
	/**
	 * Get meta of the unit.
	 * @param {PressureUnitsInput} [unit="Pa"] Unit.
	 * @returns {PressureUnitMeta} Meta of the unit.
	 */
	static unit(unit: PressureUnitsInput = "Pa"): PressureUnitMeta {
		const unitSymbolASCII: PressureUnitsSymbolASCII = resolveUnitInput(unit);
		return {
			isSIUnit: unitSymbolASCII === unitSISymbolASCII,
			names: [...unitsNames[unitSymbolASCII as PressureUnitsSymbolASCII] as unknown as string[]],
			symbolASCII: unitSymbolASCII,
			symbols: [...unitsSymbols[unitSymbolASCII] as unknown as string[]]
		};
	}
	/**
	 * Get meta of the units.
	 * @returns {PressureUnitMeta[]} Meta of the units.
	 */
	static units(): PressureUnitMeta[] {
		return Object.entries(unitsSymbols).map(([unitSymbolASCII, unitSymbols]): PressureUnitMeta => {
			return {
				isSIUnit: unitSymbolASCII === unitSISymbolASCII,
				names: [...unitsNames[unitSymbolASCII as PressureUnitsSymbolASCII] as unknown as string[]],
				symbolASCII: unitSymbolASCII,
				symbols: [...unitSymbols as unknown as string[]]
			};
		});
	}
}
export default Pressure;
/**
 * Convert between units of the pressure.
 * @param {number} fromValue From value.
 * @param {PressureUnitsInput} [fromUnit="Pa"] From unit.
 * @param {PressureUnitsInput} [toUnit="Pa"] To unit.
 * @returns {number} Value of the unit.
 */
export function convertPressure(fromValue: number, fromUnit: PressureUnitsInput = "Pa", toUnit: PressureUnitsInput = "Pa"): number {
	return new Pressure(fromValue, fromUnit).toValue(toUnit);
}
//#endregion
