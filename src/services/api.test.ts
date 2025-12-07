import { submitApplication } from "./api";

describe("submitApplication", () => {
  it("should return status 200 on successful submission", async () => {
    const mockData = {
      personal: { name: "Test User" },
      family: {},
      situation: {},
      documents: {},
    } as any;

    const result = await submitApplication(mockData);

    expect(result.status).toBe(200);
    expect(result.data.ok).toBe(true);
  });

  it("should simulate async delay", async () => {
    const mockData = {} as any;

    const start = Date.now();
    await submitApplication(mockData);
    const elapsed = Date.now() - start;

    // Should take at least 800ms (allowing some tolerance)
    expect(elapsed).toBeGreaterThanOrEqual(800);
  });
});
