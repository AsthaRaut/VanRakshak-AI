import { describe, it, expect } from "vitest";
import { computeRisk, priorityOf, communitySignalFromReports } from "./risk";

describe("risk scoring", () => {
  it("weights indicators 35/25/20/20", () => {
    expect(computeRisk({ vegetationLoss: 100, fireImpact: 0, habitatDisturbance: 0, communitySignal: 0 })).toBe(35);
    expect(computeRisk({ vegetationLoss: 80, fireImpact: 60, habitatDisturbance: 50, communitySignal: 40 })).toBe(61);
  });
  it("maps scores to priority bands", () => {
    expect(priorityOf(70)).toBe("critical");
    expect(priorityOf(69)).toBe("high");
    expect(priorityOf(50)).toBe("high");
    expect(priorityOf(30)).toBe("moderate");
    expect(priorityOf(29)).toBe("low");
  });
  it("caps community signal at 100", () => {
    expect(communitySignalFromReports(3)).toBe(36);
    expect(communitySignalFromReports(20)).toBe(100);
  });
});
