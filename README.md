<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
 @particle-network/auth-core Demo Application 
  </h3>
</div>

# Particle Auth & ethers V6

⚡️ Basic demo application using `@particle-network/auth-core` to initiate social login and send transactions. This is a lower-level library and powers `@particle-network/auth-core-modal` - most additional functionality beyond the aforementioned (login and transaction execution) will need to be built by the developer implementing this library.

This app allows you to log in using social logins and interact with the Ethereum Sepolia and Base Sepolia testnets by displaying account information and sending a transfer transaction to an address you can input in the UI. 

This demo is available in Next JS and React.

> The Next application is within the `particle-next-starter` directory.
> The React application is within the `particle-auth-cra` directory.

> 🛠️ Try the Next JS demo: [Particle Auth Next.js demo](https://particle-next-starter.vercel.app/)

Built using:

- **Particle Auth Core**
- **ethers.js V6.x.x**
- **TypeScript**
- **Tailwind CSS**

## 🔑 Particle Auth Core

Particle Auth Core, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc. - as an alternative to Particle Auth, the Auth Core SDK comes with more control over the modal itself, application-embedded popups rather than redirects, and so on.

***

👉 Learn more about [Particle Network](https://particle.network).

## Deploy with Vercel

<p align="center">
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsoos3d%2Fparticle-next-starter%2Ftree%2Fmain%2Fparticle-next-starter&env=NEXT_PUBLIC_PROJECT_ID,NEXT_PUBLIC_CLIENT_KEY,NEXT_PUBLIC_APP_ID"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
</p>

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/soos3d/particle-auth-ethers-demo
```

### Move into the app directory (Next JS)

```sh
cd particle-next-starter
```

### Install dependencies

```sh
yarn install
```

Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

Use the following if you are setting up the React Native application

- `REACT_APP_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## Development Next JS

Particle Auth config is in `src/app/layout.tsx`. 

## Development React

Particle Auth config is in `src/app/index.tsx`. 

### Config social logins

List of available social logins:

```sh
{
  email: 'email',
  phone: 'phone',
  facebook: 'facebook',
  google: 'google',
  apple: 'apple',
  twitter: 'twitter',
  discord: 'discord',
  github: 'github',
  twitch: 'twitch',
  microsoft: 'microsoft',
  linkedin: 'linkedin',
  jwt: 'jwt'
}
```

## Create a React project from scratch

You can follow these instructions if you want to configure the React project from zero.

### Create a React project

```sh
npx create-react-app particle-network-project --template typescript 
```

```sh
cd particle-network-project
```

## Install Tailwind CSS

This step is optional; follow it only if you want to use Tailwind CSS for the styling.

Follow the instructions in the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/create-react-app).

## Fix Node JS polyfills issues

You will run into issues when building when using `create-react-app` versions 5 and above. This is because the latest versions of `create-react-app` do not include NodeJS polyfills.

Use `react-app-rewired` and install the missing modules to fix this.

If you are using Yarn

```sh
yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

If you are using NPM

```sh
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

Then Create a `config-overrides.js` in the root of your project directory and add the following:

```js
const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
    process: require.resolve('process/browser'),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [
        /\.(js|mjs|jsx|cjs|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
      ];
    }
    return rule;
  });

  return config;
};
```

In `package.json` replace the starting scripts with the following:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

Opional, add this to `config-overrides.js` if you want to hide the warnings created by the console:

```js
config.ignoreWarnings = [/Failed to parse source map/];
```
