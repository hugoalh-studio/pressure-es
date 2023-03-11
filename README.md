# Pressure (NodeJS)

[`Pressure.NodeJS`](https://github.com/hugoalh-studio/pressure-nodejs)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/pressure-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/pressure-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/pressure-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/pressure-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/pressure-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/pressure-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/pressure-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/pressure-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/pressure-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/pressure-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/pressure-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/pressure-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/pressure-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/pressure-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/pressure-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/pressure-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/pressure) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/pressure?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to convert pressure units.

Units of pressure are from [Wikipedia - Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units).

| **Unit** | **Symbol (\*: Exclusive)** | **Camel Case Name** |
|:-:|:-:|:-:|
| Pascal ***\[SI\]*** | `Pa` | `Pascal` / `pascal` |
| Bar | `bar` | `Bar` / `bar` |
| Pound per square inch | `psi` | `PoundPerSquareInch` / `poundPerSquareInch` |
| Standard atmosphere | `atm` | `Atmosphere` / `atmosphere` / `StandardAtmosphere` / `standardAtmosphere` |
| Technical atmosphere | `at` | `TechnicalAtmosphere` / `technicalAtmosphere` |
| Torr | `Torr` | `Torr` / `torr` |

<details>
<summary><b>Conversion Formula</b></summary>

| **Unit** | **To SI Unit** | **From SI Unit** |
|:-:|:--|:--|
| Pascal ***\[SI\]*** |  |  |
| Bar | $P_{Pa} = P_{bar} \times 10^{5}$ | $P_{bar} = P_{Pa} \div 10^{5}$ |
| Pound per square inch | $P_{Pa} = P_{psi} \times {0.45359237 \times 9.80665 \over 0.0254^{2}}$ | $P_{psi} = P_{Pa} \div {0.45359237 \times 9.80665 \over 0.0254^{2}}$ |
| Standard atmosphere | $P_{Pa} = P_{atm} \times 101325$ | $P_{atm} = P_{Pa} \div 101325$ |
| Technical atmosphere | $P_{Pa} = P_{at} \times 98066.5$ | $P_{at} = P_{Pa} \div 98066.5$ |
| Torr | $P_{Pa} = P_{Torr} \times {101325 \over 760}$ | $P_{Torr} = P_{Pa} \div {101325 \over 760}$ |

</details>

### 📋 Notice

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

## 📚 Documentation

### Getting Started

#### Install

- NodeJS >= v6.9.0

```sh
npm install @hugoalh/pressure
```

#### Use

##### CommonJS

```js
const Pressure = require("@hugoalh/pressure");
```

##### ModuleJS

```js
import Pressure from "@hugoalh/pressure";// Default Import
```

### API

#### Class

```ts
new Pressure(value: number, unit: string = "Pa"): Pressure;
  .at: number;
  .atm: number;
  .bar: number;
  .Pa: number;
  .psi: number;
  .Torr: number;

Pressure.difference(a: Pressure, b: Pressure): PressureDifference;
```

### Example

```js
new Pressure(1, "Bar").Pa;
//=> 100000

new Pressure(100000).Bar;
//=> 1
```
