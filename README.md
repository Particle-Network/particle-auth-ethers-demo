<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
 @particle-network/auth-core Demo Application 
  </h3>
</div>

# Particle Auth Next.js & ethers V6

⚡️ Basic demo application using `@particle-network/auth-core` to initiate social login and send transactions. This is a lower-level library and powers `@particle-network/auth-core-modal` - most additional functionality beyond the aforementioned (login and transaction execution) will need to be built by the developer implementing this library.

This app allows you to log in using social logins and interact with the Ethereum Sepolia and Base Sepolia testnets by displaying account information and sending a transfer transaction to an address you can input in the UI. 

> The Next application is within the `particle-next-starter` directory.

> 🛠️ Try the demo: [Particle Auth Next.js demo](https://particle-next-starter.vercel.app/)

Built using:

- **Next.js**
- **Particle Auth Core**
- **ethers.js V6.x.x**
- **TypeScript**
- **`src/` directory**
- **App router**
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
git clone https://github.com/soos3d/particle-auth-nextjs-ethers.git
```

### Move into the app directory

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

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## Development

Particle Auth config is in `src/app/layout.tsx`. 

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
