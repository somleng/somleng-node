import { ClientOpts as IClientOpts } from "twilio";

export interface ClientOpts extends IClientOpts {
  apiBaseUrl?: string;
}
