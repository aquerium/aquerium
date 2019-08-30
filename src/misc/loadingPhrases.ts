const loginLoadingPhrases = [
  "Hold on, we're logging you in...",
  "Hold your horses, logging in shortly...",
  "Extracting confidential data...",
  "Hacking into the mainframe...",
  "Checking for missed semicolons...",
  "Verifying your ssn...",
  "Making multiple calls to gets()..."
];

const homeLoadingPhrases = [
  "Getting queries...",
  "Purchasing Github. Please be patient...",
  "Talking the talk, walking the walk...",
  "Just a sec...",
  "Obtaining this grain...",
  "Querying Github (for a friend)...",
  "Getting this bread...",
  "Trying this rhye",
  "Clicking refresh won't make me think any faster..."
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
