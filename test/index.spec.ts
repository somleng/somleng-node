import { Somleng } from "../src";
import somleng from "../src";

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
});
