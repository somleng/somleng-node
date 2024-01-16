import { Twilio } from "twilio";
import { ClientOpts } from "../base/BaseSomleng";

class Somleng extends Twilio {
  constructor(username?: string, password?: string, opts?: ClientOpts) {
    username ||=
      process.env.SOMLENG_ACCOUNT_SID ||
      (() => {
        throw new Error("username is required");
      })();
    password ||=
      process.env.SOMLENG_AUTH_TOKEN ||
      (() => {
        throw new Error("password is required");
      })();

    super(`AC${username}`, password, opts);

    this.username = username;
    this.accountSid = username;
    this.password = password;
    this.api.baseUrl = opts?.apiBaseUrl || "https://api.somleng.org";
    this.verify.baseUrl = opts?.verifyBaseUrl || "https://verify.somleng.org";
  }
}

export = Somleng;
