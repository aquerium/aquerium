const loginLoadingPhrases = [
  "Just keep swimming..."
];

const homeLoadingPhrases = [
  "Just keep swimming..."
];

/** Returns a random string from loginLoadingPhrases.  */
export function getLoginLoadingPhrase() {
  return loginLoadingPhrases[getRandomInt(loginLoadingPhrases.length)];
}

/** Returns a random string from homeLoadingPhrases.  */
export function getHomeLoadingPhrase() {
  return homeLoadingPhrases[getRandomInt(homeLoadingPhrases.length)];
}

/** This function returns a random number from 0 to max-1. Cited from MDN docs. */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
