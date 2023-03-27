import { ClientOpts as IClientOpts } from "./base/BaseSomleng";
import ISomleng from "./rest/Somleng";

// Shorthand to automatically create a RestClient
function SomlengSDK(
  accountSid?: string,
  authToken?: string,
  opts?: IClientOpts
): SomlengSDK.Somleng {
  return new SomlengSDK.Somleng(accountSid, authToken, opts);
}

namespace SomlengSDK {
  // Main functional components of the Twilio module
  export type Somleng = ISomleng;
  export const Somleng = ISomleng;
  export type ClientOpts = IClientOpts;
}

// Public module interface is a function, which passes through to RestClient constructor
export = SomlengSDK;
