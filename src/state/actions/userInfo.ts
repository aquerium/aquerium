/**
 * The action type for setting PAT validity.
 */
export type setValidPATAction = { type: string; isInvalid: boolean };

/**
 * Action creator to set the validity of a user's PAT in the Login UI.
 * NOTE: We check for invalidity, therefore bad input sets isInvalid to (true).
 */
export const setIsInvalidPAT = (isInvalid: boolean) => ({
  type: "SET_VALID_PAT",
  isInvalid
});