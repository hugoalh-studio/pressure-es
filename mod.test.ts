import { assertEquals } from "STD/assert/assert_equals.ts";
import { Pressure } from "./mod.ts";
Deno.test("Conversion 1", { permissions: "none" }, async (t) => {
	const pressureFromBar = new Pressure(1, "Bar");
	await t.step("To Object", () => {
		console.log(pressureFromBar.toObject());
	});
	await t.step("To String", () => {
		assertEquals(pressureFromBar.toString(), "100000 Pa");
	});
	await t.step("To Value", () => {
		assertEquals(pressureFromBar.toValue(), 100000);
	});
});
Deno.test("Conversion 2", { permissions: "none" }, async (t) => {
	const pressureFromPa = new Pressure(100000);
	await t.step("To Object", () => {
		console.log(pressureFromPa.toObject());
	});
	await t.step("To String", () => {
		assertEquals(pressureFromPa.toString("Bar"), "1 bar");
	});
	await t.step("To Value", () => {
		assertEquals(pressureFromPa.toValue("Bar"), 1);
	});
});
Deno.test("Units Meta", { permissions: "none" }, () => {
	console.log(Pressure.units());
});
