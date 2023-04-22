"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Pressure_table, _PressureDifference_table;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pressure = void 0;
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
        convertFromSI: (valueSI) => {
            return valueSI;
        },
        convertToSI: (valueCurrent) => {
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
        convertFromSI: (valueSI) => {
            return (valueSI / 1e5);
        },
        convertToSI: (valueCurrent) => {
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
        convertFromSI: (valueSI) => {
            return (valueSI / ((0.45359237 * 9.80665) / (0.0254 ** 2)));
        },
        convertToSI: (valueCurrent) => {
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
        convertFromSI: (valueSI) => {
            return (valueSI / 101325);
        },
        convertToSI: (valueCurrent) => {
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
        convertFromSI: (valueSI) => {
            return (valueSI / 98066.5);
        },
        convertToSI: (valueCurrent) => {
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
        convertFromSI: (valueSI) => {
            return (valueSI / (101325 / 760));
        },
        convertToSI: (valueCurrent) => {
            return (valueCurrent * (101325 / 760));
        }
    }
];
const unitSI = pressureUnitsMap.filter((unitMeta) => {
    return unitMeta.isSIUnit;
})[0];
const toJSONKeyType = [
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
function unitResolver(unit) {
    if (typeof unit !== "string") {
        throw new TypeError(`Argument \`unit\` must be type of string!`);
    }
    for (let unitMeta of pressureUnitsMap) {
        if (unit === unitMeta.nameASCII ||
            unit === unitMeta.nameStandard ||
            unit === unitMeta.symbolASCII ||
            unit === unitMeta.symbolStandard ||
            unitMeta.nameRegExp.test(unit) ||
            unitMeta.symbolRegExp.test(unit)) {
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
    static difference(a, b) {
        return new PressureDifference(a, b);
    }
    /**
     * @static
     * @method unit
     * @description Get a pressure unit meta.
     * @param {PressureUnits | string} unit Unit.
     * @returns {PressureUnitMeta} Unit meta.
     */
    static unit(unit) {
        let unitResolve = unitResolver(unit);
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
    static units() {
        return pressureUnitsMap.map((unitMeta) => {
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
    static unitSI() {
        return {
            nameASCII: unitSI.nameASCII,
            nameStandard: unitSI.nameStandard,
            symbolASCII: unitSI.symbolASCII,
            symbolStandard: unitSI.symbolStandard,
            isSIUnit: unitSI.isSIUnit
        };
    }
    /**
     * @constructor
     * @param {number} value Value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     */
    constructor(value, unit = "Pa") {
        _Pressure_table.set(this, new Map());
        if (!(typeof value === "number" && !Number.isNaN(value))) {
            throw new TypeError(`Argument \`value\` must be type of number!`);
        }
        let unitResolve = unitResolver(unit);
        __classPrivateFieldGet(this, _Pressure_table, "f").set(unitResolve.nameASCII, value);
        if (!unitResolve.isSIUnit) {
            __classPrivateFieldGet(this, _Pressure_table, "f").set(unitSI.nameASCII, unitResolve.convertToSI(value));
        }
        for (let unitMeta of pressureUnitsMap) {
            if (!__classPrivateFieldGet(this, _Pressure_table, "f").has(unitMeta.nameASCII)) {
                __classPrivateFieldGet(this, _Pressure_table, "f").set(unitMeta.nameASCII, unitMeta.convertFromSI(__classPrivateFieldGet(this, _Pressure_table, "f").get(unitSI.nameASCII)));
            }
        }
    }
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType = "symbolASCII") {
        if (!toJSONKeyType.includes(keyType)) {
            throw new RangeError(`\`${keyType}\` is not a valid key type!`);
        }
        let result = {};
        for (let unitMeta of pressureUnitsMap) {
            result[unitMeta[keyType]] = __classPrivateFieldGet(this, _Pressure_table, "f").get(unitMeta.nameASCII);
        }
        return result;
    }
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringASCII(unit = "Pa") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _Pressure_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
    }
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringStandard(unit = "Pa") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _Pressure_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
    }
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {number}
     */
    toValue(unit = "Pa") {
        return __classPrivateFieldGet(this, _Pressure_table, "f").get(unitResolver(unit).nameASCII);
    }
}
exports.Pressure = Pressure;
_a = Pressure, _Pressure_table = new WeakMap();
/** @alias difference */ Pressure.diff = _a.difference;
/**
 * @class PressureDifference
 * @description Calculate pressure difference by units.
 */
class PressureDifference {
    /**
     * @constructor
     * @param {Pressure} a
     * @param {Pressure} b
     */
    constructor(a, b) {
        _PressureDifference_table.set(this, new Map());
        if (!(a instanceof Pressure) ||
            !(b instanceof Pressure)) {
            throw new TypeError(`Arguments must be instance of Pressure!`);
        }
        for (let unitMeta of pressureUnitsMap) {
            __classPrivateFieldGet(this, _PressureDifference_table, "f").set(unitMeta.nameASCII, a.toValue(unitMeta.nameASCII) - b.toValue(unitMeta.nameASCII));
        }
    }
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {PressureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType = "symbolASCII") {
        if (!toJSONKeyType.includes(keyType)) {
            throw new RangeError(`\`${keyType}\` is not a valid key type!`);
        }
        let result = {};
        for (let unitMeta of pressureUnitsMap) {
            result[unitMeta[keyType]] = __classPrivateFieldGet(this, _PressureDifference_table, "f").get(unitMeta.nameASCII);
        }
        return result;
    }
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringASCII(unit = "Pa") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _PressureDifference_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
    }
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {string}
     */
    toStringStandard(unit = "Pa") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _PressureDifference_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
    }
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {PressureUnits | string} [unit="Pa"] Unit.
     * @returns {number}
     */
    toValue(unit = "Pa") {
        return __classPrivateFieldGet(this, _PressureDifference_table, "f").get(unitResolver(unit).nameASCII);
    }
}
_PressureDifference_table = new WeakMap();
exports.default = Pressure;
