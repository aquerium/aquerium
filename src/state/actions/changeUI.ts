/**
 * The action type for a login action.
 */
export type changeUILoginAction = { type: string };

/**
 * The action type for a logout action.
 */
export type changeUILogoutAction = { type: string };

/**
 * Action creator to send the user from login UI to home UI.
 */
export const login = () => ({
  type: "LOGIN"
});

/**
 * Action creator to send the user from home UI to login UI.
 */
export const logout = () => ({
  type: "LOGOUT"
});

/**
 * Action creator to send the user to the Edit Query UI.
 */
export const toEditQuery = () => ({
  type: "EDIT"
});

/**
 * Action creator to send the user to the QueryList UI.
 */
export const toQueryList = () => ({
  type: "QUERY"
});

/**
 * Action creator to send the user to the home UI
 */
export const toHome = () => ({
  type: "HOME"
});
