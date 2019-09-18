# Aquerium

**Aquerium is a Chrome extension for GitHub query management.** Developers can access the tool in a single click,​ keep track of desired queries at a glance and​ be notified when deadlines approach and pass.

# Getting aquerium
Aquerium is not on the Chrome web store yet, so to get it, you will need to clone the repository:

1. In a suitable working space, `git clone` the repo URL.
2. Enter that directory and npm install (or use your preffered package manager).
3. Build the background with `npm run build:background`.
4. Build the extension with `npm run build background`.
5. Go to Google Chrome (or a chromium-based browser), and navigate to the 'manage extensions' page.
6. Toggle the 'Developer Mode' switch, and click 'Load Unpacked' in the right corner. Select the 'build' folder in the aquerium directory.
7. Voila! Your extension should now appear, ready to use!

# Getting a PAT

Aquerium will ask new users to get a personal access token (PAT). To do so, go to Github.com, click on your profile icon, and go to Settings. From there, go to Developer Settings on the left side of the screen, and then select Personal Access Tokens. Generate a new token called (under 'note') 'aquerium,' and ONLY check the box marked gist (leave all others blank). Generate the token, and use it to log into aquerium! 

## Building background.js

Start the inner loop development here:

```
npm run start:background
```

Build the `background.js` this way:

```
npm run build
```

The resultant `background.js` is placed inside `/public/dist`
