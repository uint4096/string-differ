import randomString from "random-string-generator";
import { describe, it, expect } from "vitest";
import { createDiff } from "./diff-creator";
import { getStepsForTransformation, transformString } from "../src";

describe("Char operations", () => {
  it("should transform string a to b - small strings", () => {
    const a = randomString(50);
    const b = createDiff(a, { characters: 10 });

    console.log("[A] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    expect(steps).not.toBeUndefined();
    expect(Array.isArray(steps)).toBe(true);
    expect(
      steps.every((step) => ["insert", "retain", "delete"].includes(step.type)),
    ).toBe(true);

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - small strings + large diff", () => {
    const a = randomString(50);
    const b = createDiff(a, { characters: 90 });

    console.log("[B] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    expect(
      steps.every((step) => ["insert", "retain", "delete"].includes(step.type)),
    ).toBe(true);

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - small string -> empty string", () => {
    const a = randomString(50);
    const b = "";

    console.log("[C] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    expect(steps.every((step) => step.type === "delete")).toBe(true);

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - empty string ->  small string", () => {
    const a = "";
    const b = randomString(50);

    console.log("[D] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    expect(steps.every((step) => step.type === "insert")).toBe(true);

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - small strings + varying length", () => {
    const a = randomString(100);
    const b = createDiff(a, { characters: 50, size: 60 });

    console.log("[E] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - large strings", () => {
    const a = randomString(20000);
    const b = createDiff(a, { characters: 20 });

    const steps = getStepsForTransformation("Char", { s1: a, s2: b });

    const transformedString = transformString("Char", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - large strings + varying length", () => {
    const a = randomString(10000);
    const b = createDiff(a, { characters: 20, size: 30 });

    const steps = getStepsForTransformation("Range", { s1: a, s2: b });

    const transformedString = transformString("Range", a, steps);
    expect(transformedString).toEqual(b);
  });
});

describe("Range operations", () => {
  it("should transform string a to b - small strings", () => {
    const a = randomString(50);
    const b = createDiff(a, { characters: 10 });

    console.log("[A] Strings to transform:", a, b);

    const steps = getStepsForTransformation("Range", { s1: a, s2: b });

    expect(steps).not.toBeUndefined();
    expect(Array.isArray(steps)).toBe(true);
    expect(
      steps.every((step) => ["insert", "retain", "delete"].includes(step.type)),
    ).toBe(true);

    const transformedString = transformString("Range", a, steps);
    expect(transformedString).toEqual(b);
  });

  it("should transform string a to b - large strings", () => {
    const a = randomString(20000);
    const b = createDiff(a, { characters: 20 });

    const steps = getStepsForTransformation("Range", { s1: a, s2: b });

    const transformedString = transformString("Range", a, steps);
    expect(transformedString).toEqual(b);
  });
});
