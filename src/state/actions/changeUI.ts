/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string };

/**
 * The action type for a logout action.
 */
export type changeUILogoutAction = { type: string };

/**
 * Action creator to send the user from login UI to Home UI.
 */
export const login = () => ({
  type: "LOGIN"
});

/**
 * Action creator to send the user from home UI to Login UI.
 */
export const logout = () => ({
  type: "LOGOUT"
});

/**
 * Action creator to send the user to Edit Query UI.
 */
export const toEditQuery = () => ({
  type: "EDIT"
});

/**
 * Action creator to send the user to QueryList UI.
 */
export const toQueryList = () => ({
  type: "QUERY"
});

/**
 * Action creator to send the user to Home UI
 */
export const toHome = () => ({
  type: "HOME"
});
