# Welcome to Lama App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start metro bundler

   ```bash
   yarn start
   ```

3. Build the app

   ```bash
   yarn ios
   # or
   yarn android
   ```

4. The mocked backend is already running in the cloud. Anytime `./mockoon-export.json` or `./server/Dockerfile.yml` is edited, a new instance is built and run.

## Testing

To run tests locally you can run:

- `yarn test` - Runs the complete test suite (types + linting + Jest tests)
- `yarn test:types` - Type checking using TypeScript compiler
- `yarn test:lint` - Code linting with ESLint
- `yarn test:jest` - Unit tests with Jest
- `yarn test:e2e` - Run E2E tests in a running simulator. You'll need [maestro cli](https://docs.maestro.dev/getting-started/installing-maestro)

## Internationalization

This app supports multiple languages:

- English (en) - default
- French (fr)

It uses [lingui](https://lingui.dev/).

### I18n Commands

- `yarn i18n:extract` - Extract translatable strings from code
- `yarn i18n:compile` - Compile translation files
- `yarn i18n:update` - Extract and compile in one command

Translation files are located in `src/app/i18n/locales/`.

## UI Kit & Design System

The app includes a design system located in `src/shared/view/ui-kit/`. It's a copy of a WIP design system I had on hand. I did not put any effort in improving it and used it as it was.

### Demo

Access the UI Kit demo by long pressing the "Total amount to pay" component on the home page

## What can be added / improved

- Error Handling + Monitoring
- Type safety on navigation params with zod
- Accessibility
- Better usage of unistyles v3: too many useUnistyles that reduce perf optimization gains provided by the lib. I had to quickly migrate ui-kit from v2 to v3.
- BottomSheet integration tests
