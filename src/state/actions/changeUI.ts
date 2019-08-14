import { IUserInfo }

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
export const login = (user ) => ({
  type: "LOGIN"
});

/**
 * Action creator to send the user from home UI to login UI.
 */
export const logout = () => ({
  type: "LOGOUT"
});
