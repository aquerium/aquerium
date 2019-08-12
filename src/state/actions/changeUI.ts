/*This file is responsible for actions that are realated the state's current UI
 */

/**
 * @type { type: string} the action type for a login action
 */
export type changeUILoginAction = { type: string };

/**
 * @type { type: string} the action type for a logout action
 */
export type changeUILogoutAction = { type: string };

/*
 * Upon correct validation, creates an action to send the user from login UI to home UI
 */
export const login = () => ({
  type: "LOGIN"
});

/*
 * Upon correct validation, creates an action to send the user from home UI to login UI
 */
export const logout = () => ({
  type: "LOGOUT"
});
