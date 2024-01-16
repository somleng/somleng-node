import { Somleng } from "../src";
import somleng from "../src";
import nock from "nock";

describe("Somleng", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should be able to instantiate Somleng client with credentials", () => {
    const somleng = new Somleng("account-sid", "auth-token");

    expect(somleng.username).toEqual("account-sid");
    expect(somleng.accountSid).toEqual("account-sid");
    expect(somleng.password).toEqual("auth-token");
    expect(somleng.api.baseUrl).toEqual("https://api.somleng.org");
    expect(somleng.verify.baseUrl).toEqual("https://verify.somleng.org");
  });

  it("should be able to instantiate Somleng client with credentials from env", () => {
    process.env.SOMLENG_ACCOUNT_SID = "account-sid";
    process.env.SOMLENG_AUTH_TOKEN = "auth-token";

    const somleng = new Somleng();

    expect(somleng.username).toEqual("account-sid");
    expect(somleng.accountSid).toEqual("account-sid");
    expect(somleng.password).toEqual("auth-token");
  });

  it("should be able to instantiate Somleng client with the function", () => {
    const client = somleng("account-sid", "auth-token");

    expect(client.username).toEqual("account-sid");
    expect(client.accountSid).toEqual("account-sid");
    expect(client.password).toEqual("auth-token");
  });

  it("should be able to instantiate Somleng client with client opts", () => {
    const client = somleng(
      "account-sid", "auth-token",
      {
        apiBaseUrl: "https://api.example.com",
        verifyBaseUrl: "https://verify.example.com"
      }
    );

    expect(client.username).toEqual("account-sid");
    expect(client.accountSid).toEqual("account-sid");
    expect(client.password).toEqual("auth-token");
    expect(client.api.baseUrl).toEqual("https://api.example.com");
    expect(client.verify.baseUrl).toEqual("https://verify.example.com");
  });

  it("should be able to fetch a phone call", async () => {
    const scope = nock("https://api.somleng.org")
      .get("/2010-04-01/Accounts/account-sid/Calls/phone-call-id-123.json")
      .basicAuth({ user: "account-sid", pass: "auth-token" })
      .reply(200, { sid: "phone-call-id-123" });

    const somleng = new Somleng("account-sid", "auth-token");

    const response = await somleng.calls("phone-call-id-123").fetch();
    scope.done();

    expect(response.sid).toEqual("phone-call-id-123");
  });

  it("should be able to fetch a verification", async () => {
    const scope = nock("https://verify.somleng.org")
      .get("/v2/Services/verification-service-sid/Verifications/verification-sid")
      .basicAuth({ user: "account-sid", pass: "auth-token" })
      .reply(200, { sid: "verification-sid" });

    const somleng = new Somleng("account-sid", "auth-token");

    const response = await somleng.verify.v2.services("verification-service-sid").verifications("verification-sid").fetch();
    scope.done();

    expect(response.sid).toEqual("verification-sid");
  });
});
