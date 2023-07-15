# 90poe

## Description
This is an example React project created with React 18 that's server-side rendered (using streams). It's meant to provide a simple interface to list/search Github repositories. Frontend is using [Material UI](https://mui.com/) and communicates with Github using its GraphQL API (through Apollo client). Everything in TypeScript, covered with unit tests and fully dockerized. Uses webpack as a build tool and is configured with npm workspaces for future development.

<p align="center">
    <img src="https://user-images.githubusercontent.com/3832059/253770039-9e015799-85f3-4f8a-b5cf-77d88ce11a86.png" width="800" />
</p>


## Setup
While it should work with older versions of node, it's best to make sure you're using version 18+, which this app has been tested on. To run it locally:

1. Generate new Github token in your account settings and add it to app/env-local.env (`GITHUB_TOKEN`).
2. From the `app/` directory, run the following to build the app:
```sh
$ npm run build
```
3. Run the application with:
```sh
$ npm start
```

You can also build the docker image locally with:
```sh
$ npm run docker:build
```

## Troubleshooting
Something does not work right or you have a problem setting it up/configuring? Create a Github issue!
