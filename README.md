# Shisho

Chrome Extension for saving and recording metadata about hentai images.

Adds a single button command to download a hentai image from Hentai Foundry, Danboruu, or webmshare as well as performing any bookkeeping for that site.

It will upvote the image, save a favorite, and log some metadata about the image such as download date, author/artist, and source.

## Known Issues

`Download and Archive` will fail on Pixiv. It will record the necessary information but will fail to download the image. For now, manually save it at the same time.

## Usage

`yarn db:unpack` - Unpacks the image archive into the usual download directory.\
`yarn db:pack` - Packs the image archive back into storage\
`yarn prod` - Builds the Client app and Starts the server backend (in Prod mode)\
`yarn start` - Builds the Client app and Starts the server backend (in Dev mode)\
`cd server && yarn start --init` - Starts the server backend but will generate a fresh Database file.

## Actions

`yarn build` - Builds the package, emitting .js and .d.ts files\
`yarn lint` - Runs lint over the project source\
`yarn test` - Runs all tests under the src/ directory\
`yarn publish` - Bumps package version and publishes the package to Github Packages

## Toolchain

Uses [@brisberg/typescript-pkg](https://github.com/brisberg/typescript-pkg) as a template for Toolchain configuration.

See that repo for a list of tools, documentation, and upgrade steps.
