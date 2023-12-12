# Pressure (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/pressure-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/pressure-nodejs)

|  | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/pressure-nodejs) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/pressure-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/pressure-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/pressure) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to convert pressure units.

Units of pressure are from "[Wikipedia - Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units)".

|  | **Name ASCII** | **Name Standard** | **Symbol ASCII** | **Symbol Standard** | **... (\*: Exclusive)** |
|:-:|:-:|:-:|:-:|:-:|:-:|
|  ***\[SI\]*** **Pascal**  | `Pascal` | `Pascal` | `Pa` | `Pa` |  |
| **Bar** | `Bar` | `Bar` | `bar` | `bar` |  |
| **Pound Per Square Inch** | `PoundPerSquareInch` | `Pound Per Square Inch` | `psi` | `psi` |  |
| **Standard Atmosphere** | `StandardAtmosphere` | `Standard Atmosphere` | `atm` | `atm` |  |
| **Technical Atmosphere** | `TechnicalAtmosphere` | `Technical Atmosphere` | `at` | `at` |  |
| **Torr** | `Torr` | `Torr` | `Torr` | `Torr` |  |

## ⚠️ Important

This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:

```js
0.1 + 0.2;
//=> 0.30000000000000004
```

In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:

```js
(0.1 + 0.2).toPrecision(14);
//=> 0.3
```

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/pressure)
    ```sh
    bun add @hugoalh/pressure[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/pressure[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/pressure)
    ```sh
    npm install @hugoalh/pressure[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/pressure";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class Pressure{
    constructor(value: number, unit: PressureUnits = "Pa"): Pressure;
    toJSON(keyType: PressureToJSONKeyType = "symbolASCII"): { [x: string]: number; };// Get all of the units value.
    toStringASCII(unit: PressureUnits = "Pa"): string;// Get unit's value with ASCII symbol.
    toStringStandard(unit: PressureUnits = "Pa"): string;// Get unit's value with Standard symbol.
    toValue(unit: PressureUnits = "Pa"): number;// Get unit's value.
    static difference(a: Pressure, b: Pressure): PressureDifference;// Calculate pressure difference by units.
    static unit(unit: PressureUnits): PressureUnitMeta;// Get a pressure unit meta.
    static units(): PressureUnitMeta[];// Get all of the pressure units meta.
    static unitSI(): PressureUnitMeta;// Get pressure SI unit meta.
  }
  ```
- ```ts
  type PressureToJSONKeyType = "nameASCII" | "nameStandard" | "symbolASCII" | "symbolStandard";
  ```
- ```ts
  interface PressureUnitMeta {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file.

## ✍️ Example

- ```js
  import { Pressure } from "@hugoalh/pressure";

  new Pressure(1, "Bar").toValue("Pa");
  //=> 100000

  new Pressure(1, "Bar").toStringStandard("Pa");
  //=> "100000 Pa"

  new Pressure(100000).toValue("Bar");
  //=> 1

  new Pressure(100000).toStringStandard("Bar");
  //=> "1 bar"
  ```
