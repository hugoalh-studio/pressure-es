# Pressure (NodeJS)

[`Pressure.NodeJS`](https://github.com/hugoalh-studio/pressure-nodejs)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/pressure-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/pressuredejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/pressure-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/pressure-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/pressure-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/pressure-nodejs?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/pressure-nodejs/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh-studio/pressure-nodejs?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/pressure-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/pressure-nodejs)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/pressure-nodejs?label=%20&style=flat-square)) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/pressure-nodejs?label=%20&style=flat-square)) |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh-studio/pressure-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/pressure-nodejs/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?sort=semver&label=%20&style=flat-square) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/pressure-nodejs?include_prereleases&sort=semver&label=%20&style=flat-square) |
| [**NPM**](https://www.npmjs.com/package/@hugoalh/pressure) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/pressure?label=%20&style=flat-square) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/latest?label=%20&style=flat-square) | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/pressure/pre?label=%20&style=flat-square) |

## 📝 Description

A NodeJS module to convert pressure units.

Units of pressure are from [Wikipedia - Pressure measurement - Units](https://en.wikipedia.org/wiki/Pressure_measurement#Units).

| **Unit** | **Symbol (\*: Exclusive)** | **Camel Case Name** | **Formula of Convert to SI Unit** | **Formula of Convert from SI Unit** |
|:-:|:-:|:-:|:--|:--|
| Pascal ***\[SI\]*** | `Pa` | `Pascal` / `pascal` |  |  |
| Bar | `bar` | `Bar` / `bar` | $P_{Pa} = P_{bar} \times 10^{5}$ | $P_{bar} = P_{Pa} \div 10^{5}$ |
| Pound per square inch | `psi` | `PoundPerSquareInch` / `poundPerSquareInch` | $P_{Pa} = P_{psi} \times {0.45359237 \times 9.80665 \over 0.0254^{2}}$ | $P_{psi} = P_{Pa} \div {0.45359237 \times 9.80665 \over 0.0254^{2}}$ |
| Standard atmosphere | `atm` | `Atmosphere` / `atmosphere` / `StandardAtmosphere` / `standardAtmosphere` | $P_{Pa} = P_{atm} \times 101325$ | $P_{atm} = P_{Pa} \div 101325$ |
| Technical atmosphere | `at` | `TechnicalAtmosphere` / `technicalAtmosphere` | $P_{Pa} = P_{at} \times 98066.5$ | $P_{at} = P_{Pa} \div 98066.5$ |
| Torr | `Torr` | `Torr` / `torr` | $P_{Pa} = P_{Torr} \times {101325 \over 760}$ | $P_{Torr} = P_{Pa} \div {101325 \over 760}$ |

### 📋 Note

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
- NPM >= v3.10.8

```sh
npm install @hugoalh/pressure
```

#### Use In CommonJS

```js
const Pressure = require("@hugoalh/pressure");
```

#### Use In ModuleJS

```js
import Pressure from "@hugoalh/pressure";
```

### API

#### Class

```ts
new Pressure(value: number, unit?: string = "Pa"): Pressure
Pressure.difference(a: Pressure, b: Pressure): PressureDifference
```

### Example

```js
new Pressure(1, "Bar").Pa
//=> 100000

new Pressure(100000).Bar
//=> 1
```
