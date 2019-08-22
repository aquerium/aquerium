/**
 * Generate a unque id for the query.
 */
export const createUid = (): string => {
  return Math.random()
    .toString(36)
    .substring(2, 15);
};
