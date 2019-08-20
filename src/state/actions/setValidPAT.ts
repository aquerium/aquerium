/**
 * @type { type: boolean }
 */
export type setValidPATAction = { type: string; isValid: boolean };

/**
 * Action creator to set the validity of a user's PAT in the Login UI
 */
export const setValidPAT = (isValid: boolean) => ({
  type: "SET_VALID_PAT",
  isValid
});
