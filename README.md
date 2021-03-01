# ![nuxt-ts-vuetify-realworld (4)](https://user-images.githubusercontent.com/46892438/109449222-39945f80-7a8b-11eb-8c27-5927f8a58e5a.png)

> Nuxt.js codebase(typescript, class-component) containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API (without styles).

### Project demo is available at https://nuxt-ts-vuetify-real-world-app.vercel.app/

This codebase was created to demonstrate a fully fledged fullstack application built with **Nuxt(ts)** including CRUD operations, authentication, routing and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Getting started

Clone the app:

```bash
git clone https://github.com/juicyjusung/nuxt-ts-vuetify-real-world
```

Go to app's directory:
```bash
cd nuxt-ts-vuetify-real-world
```

Install dependencies:
``` bash
npm install
```

Run it:
```
# for dev
npm run dev

# build for production
npm run build
npm start

# generate static
npm run generate

```

## Functionality overview
The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://nuxt-ts-vuetify-real-world-app.vercel.app/

**General functionality:**

- **Responsive web**
- **Vuetify style**
- Authenticate users via JWT
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display lists of articles with **infinite scrolling**
- Favorite articles
- Follow other users
