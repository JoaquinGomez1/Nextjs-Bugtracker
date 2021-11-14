/// <reference types="next" />
/// <reference types="next/types/global" />

import Request from "./interfaces/extentions";
import JwtUser from "./interfaces/user";

declare module "next" {
  export interface NextApiRequest {
    user?: JwtUser;
  }
}
