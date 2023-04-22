type PressureUnitMeta = {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
};
declare const pressureUnitsMap: readonly [{
    readonly nameASCII: "Pascal";
    readonly nameStandard: "Pascal";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "Pa";
    readonly symbolStandard: "Pa";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: true;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Bar";
    readonly nameStandard: "Bar";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "bar";
    readonly symbolStandard: "bar";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "PoundPerSquareInch";
    readonly nameStandard: "PoundPerSquareInch";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "psi";
    readonly symbolStandard: "psi";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "StandardAtmosphere";
    readonly nameStandard: "StandardAtmosphere";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "atm";
    readonly symbolStandard: "atm";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "TechnicalAtmosphere";
    readonly nameStandard: "TechnicalAtmosphere";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "at";
    readonly symbolStandard: "at";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Torr";
    readonly nameStandard: "Torr";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "Torr";
    readonly symbolStandard: "Torr";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}];
type PressureUnitsNameASCII = (typeof pressureUnitsMap)[number]["nameASCII"];
type PressureUnitsNameStandard = (typeof pressureUnitsMap)[number]["nameStandard"];
type PressureUnitsSymbolASCII = (typeof pressureUnitsMap)[number]["symbolASCII"];
type PressureUnitsSymbolStandard = (typeof pressureUnitsMap)[number]["symbolStandard"];
type PressureUnitsName = PressureUnitsNameASCII | PressureUnitsNameStandard;
type PressureUnitsSymbol = PressureUnitsSymbolASCII | PressureUnitsSymbolStandard;
type PressureUnits = PressureUnitsName | PressureUnitsSymbol;
type PressureToJSONKeyType = keyof Omit<PressureUnitMeta, "isSIUnit">;
/**
 * @class Pressure
 * @description Convert pressure units.
 */
declare class Pressure {
    #private;
    /**
     * @static
     * @method difference
     * @description Calculate pressure difference by units.
     * @param {Pressure} a
     * @param {Pressure} b
     * @returns {PressureDifference}
     */
    static difference(a: Pressure, b: Pressure): PressureDifference;
    /**
     * @static
     * @method unit
     * @description Get a pressure unit meta.
     * @param {PressureUnits | string} unit Unit.
     * @returns {PressureUnitMeta} Unit meta.
     */
    static unit(unit: PressureUnits | string): PressureUnitMeta;
    /**
     * @static
     * @method units
     * @description Get all of the pressure units meta.
     * @returns {PressureUnitMeta[]} Units meta.
     */
    static units(): PressureUnitMeta[];
    /**
     * @static
     * @method unitSI
     * @description Get pressure SI unit meta.
     * @returns {PressureUnitMeta} SI unit meta.
     */
    static unitSI(): PressureUnitMeta;
    /** @alias difference */ static diff: typeof Pressure.difference;
    /**
     * @constructor
     * @param {number} value Value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     */
    constructor(value: number, unit?: PressureUnits | string);
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: PressureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: PressureUnits | string): string;
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: PressureUnits | string): string;
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {number}
     */
    toValue(unit?: PressureUnits | string): number;
}
/**
 * @class PressureDifference
 * @description Calculate pressure difference by units.
 */
declare class PressureDifference {
    #private;
    /**
     * @constructor
     * @param {Pressure} a
     * @param {Pressure} b
     */
    constructor(a: Pressure, b: Pressure);
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: PressureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: PressureUnits | string): string;
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: PressureUnits | string): string;
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {number}
     */
    toValue(unit?: PressureUnits | string): number;
}
export default Pressure;
export { Pressure, type PressureToJSONKeyType, type PressureUnitMeta, type PressureUnits, type PressureUnitsName, type PressureUnitsNameASCII, type PressureUnitsNameStandard, type PressureUnitsSymbol, type PressureUnitsSymbolASCII, type PressureUnitsSymbolStandard };
//# sourceMappingURL=main.d.ts.map