# Dashboard Search Metadata (demo)

**A demo plugin.** It exists to show the new `grafana/commandpalette/result-item/v1` UI extension
point in action; it isn't meant for production use.

It adds dashboard metadata to Grafana's search (the command palette: the search box in the top
bar, `Cmd/Ctrl+K`). Each dashboard row gets:

- the dashboard's **tags** (up to three, then "+ N")
- an **"Owner: Hello World"** badge

Grafana itself shows neither; without this plugin the search looks unchanged.

The extension point isn't part of a Grafana release yet. It lives on the
`andygrunwald/command-palette-result-item-extension-point` branch of
[andygrunwald/grafana](https://github.com/andygrunwald/grafana).

The plugin receives the dashboard's `uid`, `title`, `url`, `tags` and `folderTitle` as props
(see `src/components/DashboardSearchMetadata/DashboardSearchMetadata.tsx`). The owner is
hard-coded; a real plugin would look it up from wherever ownership is stored.

## Run it against the fork

1. Build the plugin: `npm install && npm run dev`
2. In a checkout of the fork on the extension point branch, link the plugin's `dist` folder into
   Grafana's plugins folder and start Grafana with unsigned loading allowed for this plugin:

   ```bash
   mkdir -p data/plugins
   ln -s /path/to/grafana-dashboard-search-metadata-app-demo/dist data/plugins/andygrunwald-dashboardsearchmetadatademo-app
   GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=andygrunwald-dashboardsearchmetadatademo-app make run
   ```

   and `yarn start` for the frontend. Don't point `GF_PATHS_PLUGINS` at `dist` itself: Grafana
   looks for plugins in subfolders of that path and also installs its preinstalled plugins there.

3. Enable the app under **Administration → Plugins and data → Plugins**. Changes to `plugin.json`
   need a Grafana restart.
4. Open the command palette and search for a dashboard. Each dashboard row shows its tags and the
   owner badge.

---

The rest of this README is the scaffolded template documentation.

## What are Grafana app plugins?

App plugins can let you create a custom out-of-the-box monitoring experience by custom pages, nested data sources and panel plugins.

## Get started

### Frontend

1. Install dependencies

   ```bash
   npm install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   npm run dev
   ```

3. Build plugin in production mode

   ```bash
   npm run build
   ```

4. Run the tests (using Jest)

   ```bash
   # Runs the tests and watches for changes, requires git init first
   npm run test

   # Exits after running all the tests
   npm run test:ci
   ```

5. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   npm run server
   ```

6. Run the E2E tests (using Playwright)

   ```bash
   # Spins up a Grafana instance first that we tests against
   npm run server

   # If you wish to start a certain Grafana version. If not specified will use latest by default
   GRAFANA_VERSION=11.3.0 npm run server

   # Starts the tests
   npm run e2e
   ```

7. Run the linter

   ```bash
   npm run lint

   # or

   npm run lint:fix
   ```

# Distributing your plugin

When distributing a Grafana plugin either within the community or privately the plugin must be signed so the Grafana application can verify its authenticity. This can be done with the `@grafana/sign-plugin` package.

_Note: It's not necessary to sign a plugin during development. The docker development environment that is scaffolded with `@grafana/create-plugin` caters for running the plugin without a signature._

## Initial steps

Before signing a plugin please read the Grafana [plugin publishing and signing criteria](https://grafana.com/legal/plugins/#plugin-publishing-and-signing-criteria) documentation carefully.

`@grafana/create-plugin` has added the necessary commands and workflows to make signing and distributing a plugin via the grafana plugins catalog as straightforward as possible.

Before signing a plugin for the first time please consult the Grafana [plugin signature levels](https://grafana.com/legal/plugins/#what-are-the-different-classifications-of-plugins) documentation to understand the differences between the types of signature level.

1. Create a [Grafana Cloud account](https://grafana.com/signup).
2. Make sure that the first part of the plugin ID matches the slug of your Grafana Cloud account.
   - _You can find the plugin ID in the `plugin.json` file inside your plugin directory. For example, if your account slug is `acmecorp`, you need to prefix the plugin ID with `acmecorp-`._
3. Create a Grafana Cloud API key with the `PluginPublisher` role.
4. Keep a record of this API key as it will be required for signing a plugin

## Signing a plugin

### Using Github actions release workflow

If the plugin is using the github actions supplied with `@grafana/create-plugin` signing a plugin is included out of the box. The [release workflow](./.github/workflows/release.yml) can prepare everything to make submitting your plugin to Grafana as easy as possible. Before being able to sign the plugin however a secret needs adding to the Github repository.

1. Please navigate to "settings > secrets > actions" within your repo to create secrets.
2. Click "New repository secret"
3. Name the secret "GRAFANA_API_KEY"
4. Paste your Grafana Cloud API key in the Secret field
5. Click "Add secret"

#### Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`

## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic app plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/app-basic#readme)
- [`plugin.json` documentation](https://grafana.com/developers/plugin-tools/reference/plugin-json)
- [Sign a plugin](https://grafana.com/developers/plugin-tools/publish-a-plugin/sign-a-plugin)
