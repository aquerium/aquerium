/**
 * @type { type: string } the action type for a login action
 */
export type changeUILoginAction = { type: string; change: string };

/**
 * @type { type: string} the action type for a logout action
 */
export type changeUILogoutAction = { type: string; change: string };

/**
 * Action creator to send the user from login UI to home UI
 * @property { string } change the UI screen that will be changed to
 */
export const login = () => ({
  type: "LOGIN",
  change: "Home"
});

/**
 * Action creator to send the user from home UI to login UI
 * @property { string } change the UI screen that will be changed to
 */
export const logout = () => ({
  type: "LOGOUT",
  change: "Login"
});
