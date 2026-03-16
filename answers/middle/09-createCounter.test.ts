import { describe, expect, it } from "@jest/globals";
import { createCounter } from "../../src/middle/09-createCounter";

describe("createCounter", () => {
  it("incrementで1増える", () => {
    const counter = createCounter();
    counter.increment();
    expect(counter.value).toBe(1);
  });

  it("decrementで1減る", () => {
    const counter = createCounter(5);
    counter.decrement();
    expect(counter.value).toBe(4);
  });

  it("resetで初期値に戻る", () => {
    const counter = createCounter(3);
    counter.increment();
    counter.increment();
    counter.reset();
    expect(counter.value).toBe(3);
  });
});
