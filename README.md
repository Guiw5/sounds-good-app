SoundsGood

Link to the app: https://soundsgoodapp.herokuapp.com/me

First of all, I really enjoyed learning how to use the spotify API.

At the begining, I chose Authorization Code grant
trying to take advantage of my backend knowledge creating a minimal server.

I was expecting not much complexity and more safety

But I've started to have issues with CORS (cross-origin headers) with the SpotifyAuth Flow when I was developing,
it's means that frontend and backend are not in the same place for spotify. I tried to cheat it with a proxy and middlewares but it doesn't work

The optional workflow was start to work separately with a react frontend and node backend,
compiling react (js boundle to have it in public) and then put it together in the node server. With this all the code from same origin would be work fine with the Spotify Auth Flow
but this way add more complexity to debug and the developing tasks takes too long.

Therefore, I've started to use Implicit Grant

We never want to expose our application Client Secret to a user, with implicit grant you don't have to, it just need the apiKey.

With this option you can develop all the code from the client, it less secured but faster, and easy to deploy it.
Is a great way if you just want to consume an api to test it, show it, like demos or small apps. But it's not recommended for apps with long term users.

---

---
Last Update: 

06/11 - BRANCH: AUTHORIZATION-CODE 
Fix CORS issue implementing authorization-code grant flow. 

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
