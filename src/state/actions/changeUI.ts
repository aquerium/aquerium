//import { cur_UI } from "../state.types";

/**This file is responsible for actions that are realated the state's cur_UI
 * Includes an action for submitting the PAT and changing to loginUI
 *
 */

/**
 * Upon correct validation, this action stores the user token and changes to loginUI
 * @param token
 */
export const submit = (token: string) => ({
  type: "SUBMIT",
  token
});
