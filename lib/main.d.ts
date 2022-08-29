export = Pressure;
/**
 * @class Pressure
 * @description Convert pressure units.
 */
declare class Pressure {
    /**
     * @static
     * @method difference
     * @description Calculate pressure difference by units.
     * @param {Pressure} a
     * @param {Pressure} b
     * @returns {PressureDifference}
     */
    static difference(a: Pressure, b: Pressure): PressureDifference;
    static diff: typeof Pressure.difference;
    /**
     * @constructor
     * @param {number} value Value.
     * @param {string} [unit="Pa"] Unit.
     */
    constructor(value: number, unit?: string);
    pascal: number;
    bar: number;
    poundPerSquareInch: number;
    standardAtmosphere: number;
    technicalAtmosphere: number;
    torr: number;
    get Pa(): number;
    get Pascal(): number;
    get Bar(): number;
    get PoundPerSquareInch(): number;
    get psi(): number;
    get atm(): number;
    get Atmosphere(): number;
    get atmosphere(): number;
    get StandardAtmosphere(): number;
    get at(): number;
    get TechnicalAtmosphere(): number;
    get Torr(): number;
}
/**
 * @class PressureDifference
 * @description Calculate pressure difference by units.
 */
declare class PressureDifference extends Pressure {
    /**
     * @constructor
     * @param {Pressure} a
     * @param {Pressure} b
     */
    constructor(a: Pressure, b: Pressure);
}
//# sourceMappingURL=main.d.ts.map