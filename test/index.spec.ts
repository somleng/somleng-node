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
  });

  it("should be able to instantiate Somleng client with credentials from env", () => {
    process.env.SOMLENG_ACCOUNT_SID = "account-sid";
    process.env.SOMLENG_AUTH_TOKEN = "auth-token";
    process.env.SOMLENG_API_BASE_URL = "https://api.example.com"

    const somleng = new Somleng();

    expect(somleng.username).toEqual("account-sid");
    expect(somleng.accountSid).toEqual("account-sid");
    expect(somleng.password).toEqual("auth-token");
    expect(somleng.api.baseUrl).toEqual("https://api.example.com");
  });

  it("should be able to instantiate Somleng client with the function", () => {
    const client = somleng("account-sid", "auth-token");

    expect(client.username).toEqual("account-sid");
    expect(client.accountSid).toEqual("account-sid");
    expect(client.password).toEqual("auth-token");
  });

  it("should be able to fetch a record", async () => {
    const scope = nock("https://api.somleng.org")
      .get("/2010-04-01/Accounts/account-sid/Calls/phone-call-id-123.json")
      .basicAuth({ user: "account-sid", pass: "auth-token" })
      .reply(200, { sid: "phone-call-id-123" });

    const somleng = new Somleng("account-sid", "auth-token");

    const response = await somleng.calls("phone-call-id-123").fetch();
    scope.done();

    expect(response.sid).toEqual("phone-call-id-123");
  });
});
