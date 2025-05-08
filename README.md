# Þjóðskrá Monorepo

Welcome to the Þjóðskrá Monorepo! This repository contains interconnected Þjóðskrá assets, managed using [yarn workspaces](https://yarnpkg.com/features/workspaces). Please ensure you have the latest version of `yarn` installed to manage dependencies in this project.

## Quick Start

Follow these steps to get started quickly:

1. Allow `direnv` to manage the environment:

   ```bash
   direnv allow
   ```

2. Enable `corepack` to install the correct version of `yarn`:

   ```bash
   corepack enable
   ```

3. Install the node modules:

   ```bash
   yarn
   ```

4. Run the project:
   ```bash
   yarn dev
   ```

To limit the apps that start, you can filter the dev command, for example:

```bash
yarn dev --filter="backend"
```

## Setup

Ensure you have the following tools installed on your local machine (this monorepo has only been tested on Mac OS):

- **direnv**: Install via `brew install direnv` or follow the [direnv installation guide](https://direnv.net/docs/installation.html)
- **nvm**: Follow the [nvm install guide](https://github.com/nvm-sh/nvm#installing-and-updating)
- **yarn**: Enable via `corepack enable`

### direnv

`direnv` is a tool to manage your project's environment. It initializes the required environment variables for your app and sets the node version to the value defined in the `.nvmrc` file.

When you enter the project folder for the first time, `direnv` will show an error:

```bash
direnv: error /Users/yournamehere/develop/þjóðskrá-app/.envrc is blocked. Run `direnv allow` to approve its content
```

Run `direnv allow` to allow `direnv` to manage the environment for your project.

### Environment Variables

To populate the environment variables on your local machine, make a copy of the `.env.local.example` file and rename it to `.env.local`.

The `.env.local.example` file comes pre-populated with most of the required environment variables, but you might need to fetch sensitive variables from external systems.

### Install Node Dependencies

To install all dependencies, run:

```bash
yarn install
```

## Dev Scripts

To start the system in dev mode, run the following command in the root of the repository:

```bash
yarn dev
```

To run a subset of applications, such as just the backend system, use a filter:

```bash
yarn dev --filter="backend"
```

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

To log in, enter the following commands (you need access to the Þjóðskrá project on Vercel):

```bash
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## Useful Links

Learn more about Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Individual App Setup

### Backend

Refer to the [backend README](apps/backend/README.md) for specific setup instructions.
