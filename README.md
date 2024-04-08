# Pressure (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/pressure-es](https://img.shields.io/github/v/release/hugoalh-studio/pressure-es?label=hugoalh-studio/pressure-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/pressure-es")](https://github.com/hugoalh-studio/pressure-es)
[![JSR: @hugoalh/pressure](https://img.shields.io/jsr/v/@hugoalh/pressure?label=JSR%20@hugoalh/pressure&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/pressure")](https://jsr.io/@hugoalh/pressure)
[![NPM: @hugoalh/pressure](https://img.shields.io/npm/v/@hugoalh/pressure?label=@hugoalh/pressure&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/pressure")](https://www.npmjs.com/package/@hugoalh/pressure)

An ES (JavaScript & TypeScript) module to convert between units of the pressure.

Units of the pressure are from "[Wikipedia - Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units)".

|  | **Names** | **Symbols** |
|:-:|:-:|:-:|
| ***\[SI\]*** **Pascal** | `Pascal` | `Pa` |
| **Bar** | `Bar` | `bar` |
| **Pound Per Square Inch** | `Pound Per Square Inch` | `psi` |
| **Standard Atmosphere** | `Standard Atmosphere` | `atm` |
| **Technical Atmosphere** | `Technical Atmosphere` | `at` |
| **Torr** | `Torr` | `Torr` |

> **ℹ️ Note**
>
> This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:
>
> ```ts
> 0.1 + 0.2;
> //=> 0.30000000000000004
> ```
>
> In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:
>
> ```ts
> (0.1 + 0.2).toPrecision(14);
> //=> 0.3
> ```

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/pressure[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/pressure[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/pressure[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/pressure[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/pressure";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/pressure[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/pressure[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/pressure[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/pressure[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/pressure";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/pressure[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/pressure-es/${Tag}/mod.ts";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

## 🧩 API

- ```ts
  class Pressure {
    constructor(fromValue: number, fromUnit: PressureUnitsInput = "Pa"): Pressure;
    toObject(): Record<PressureUnitsSymbolASCII, number>;
    toString(toUnit: PressureUnitsInput = "Pa"): string;
    toValue(toUnit: PressureUnitsInput = "Pa"): number;
    static unit(unit: PressureUnitsInput = "Pa"): PressureUnitMeta;
    static units(): PressureUnitMeta[];
  }
  ```
- ```ts
  function convertPressure(fromValue: number, fromUnit: PressureUnitsInput = "Pa", toUnit: PressureUnitsInput = "Pa"): number;
  ```
- ```ts
  interface PressureUnitMeta {
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
  ```
- ```ts
  type PressureUnitsInput = PressureUnitsNames | PressureUnitsSymbolASCII | PressureUnitsSymbols;
  ```
- ```ts
  type PressureUnitsNames = typeof unitsNames[PressureUnitsSymbolASCII][number];
  ```
- ```ts
  type PressureUnitsSymbolASCII = keyof typeof unitsSymbols;
  ```
- ```ts
  type PressureUnitsSymbols = typeof unitsSymbols[PressureUnitsSymbolASCII][number];
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/pressure)

## ✍️ Example

- ```ts
  new Pressure(1, "Bar").toValue();
  //=> 100000
  ```
- ```ts
  new Pressure(1, "Bar").toString();
  //=> "100000 Pa"
  ```
- ```ts
  new Pressure(100000).toValue("Bar");
  //=> 1
  ```
- ```ts
  new Pressure(100000).toString("Bar");
  //=> "1 bar"
  ```
