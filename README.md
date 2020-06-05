# CoveoPS Scripts

A CLI application that can house modular and reusable scripts for various Coveo Projects.

## Installation

`npm install --save-dev @coveops/cli`

## Documentation

* Usage
* Build
* Serve
* Create a Project
* Create a Component
* Create a Stylesheet
* Create a Sandbox
* Bundle Search Page

### Usage

Replace the COMMAND with the appropriate one from the table below with its corresponding arguments and options.

**Installed globally:**

`coveops COMMAND`

**Installed as a dev dependency (recommended to track versioning):**

`./node_modules/.bin/coveoops COMMAND`

Alternatively on Windows: `.\node_modules\.bin\coveops CountedTabs COMMAND`

**Installed via npx:**

`npx @coveops/cli COMMAND`

### Coveo Turbo Recipe

Turbocharge your development by leveraging community-made components and contributing to the community. To get started:

**Creating a new Project**

1. Install the library and create a project and sandbox:

```bash
npm init -y && \ 
npm i -D @coveops/cli && \
./node_modules/.bin/coveops create:project MyProject --create-component --with-styles && \
./node_modules/.bin/coveops create:sandbox
```

2. Modify the source MyProject.ts and MyProject.scss files to build your component, add your Coveo credentials in the `.env` file

3. Build and serve your project:

```bash
make build serve
```

**Modifying an existing Project**

1. For the first time after cloning, initialize your environment and add your Coveo credentials to the resulting `.env` file

```bash
make init
```

2. Set up and build the project:

```bash
make
```

3. Build and serve your project:

```bash
make build serve
```

### Build

Will use a standard Webpack configuration to build and bundle the project for distribution.

You can also add the command to your `package.json` scripts to continue using familiar hooks like `npm run build`.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component that will be used as the library name and added to the browser's global namespace. Note, `Coveo` will be prepended at build-time |
| template | option | string | `typescript` | no | The template of component to generate. [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code will be generated |
| destination | option | string | `dist` | no | The path where the distributable code will be generated |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |
| styles-path | option | string | `src/stylesheets` | no | The path where the stylesheets are located |
| styles-type | option | string | `sass` | no | The stylesheet language that is used in the project [`sass`, `vanilla`] |
| styles-destination | option | string | `dist/css` | no | The path where the distributable code will be generated |
| dry | option | boolean | none | no | Will perform a dry run build and output generated webpack configuration to the console |

Example:

```bash
./node_modules/.bin/coveops build TestComponent
```

To use vanilla Javascript

```bash
./node_modules/.bin/coveops build TestComponent --template vanilla
```

To specify an alternative directory containing a index.scss located at `src/stylesheets`

```bash
./node_modules/.bin/coveops build TestComponent --styles-path src/stylesheets
```

### Serve

Will start a Node server designed to:

- Treat the compiled dist the way a CDN would
- Expose installed components under the @coveops namespace as hosted components
- Serve a static HTML page of choice

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| port | option | number | 8080 | no | The port number |
| path | option | string | `sandbox` | no | The path to the dedicated sandbox folder for testing |
| org-id | option | string | none | yes | The id of the organization |
| token | option | string | none | yes | The token used to authenticate to the organization |
| rest-uri | option | string | `https://platform.cloud.coveo.com/rest/search` | no | The uri used by JSUI to access the REST API |
| search-hub | option | string | none | no | The search hub |
| search-url | option | string | none | no | The url of a search page for a standalone searchbox |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops serve --org-id <ID HERE> --token "<TOKEN HERE>"
```

To use a different port

```bash
./node_modules/.bin/coveops serve --port 3000 --org-id <ID HERE> --token "<TOKEN HERE>"
```

Some of the arguments have a corresponding environment variable that can also be used by the server.

| Argument | Environment Variable |
| --- | --- |
| port | PORT |
| path | COVEO_SANDBOX_PATH |
| org-id | COVEO_ORG_ID |
| token | COVEO_TOKEN |
| rest-uri | COVEO_REST_URI |
| search-hub | COVEO_SEARCH_HUB |
| search-url | COVEO_SEARCH_URL |

### Create a Project

Will add the necessary files to kick-start a project to create a shareable component and optionally the component itself.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component |
| template | option | string | `typescript` | no | The template of component to generate. [`typescript`, `vanilla`] |
| create-component | option | boolean | `false` | no | Whether to create the component using the same name as the project |
| component-path | option | string | `src` | no | The path where the source code of the component will be generated |
| with-styles | option | boolean | `false` | no | Whether to create the stylesheet alongside the component. Requires `create-component` flag |
| styles-path | option | string | `src/stylesheets` | no | The path where the source code of the stylesheet will be generated |
| styles-template | option | string | `sass` | no | The template of component to generate. [`sass`, `vanilla`] |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops create:project TestComponent
```

To use vanilla Javascript

> Remark that building a component requires the same template option to be passed to the build command

```bash
./node_modules/.bin/coveops create:project TestComponent --template vanilla
```

To create a component at the same time as a new project

```bash
./node_modules/.bin/coveops create:project TestComponent --create-component
```

To create a component with styles at the same time as a new project

```bash
./node_modules/.bin/coveops create:project TestComponent --create-component --with-styles
```

### Create a Component

Will create a blank component to be used to canvas for your needs. Is currently available as vanilla and typescript types.

- A Typescript template component will create a class and associate the build tools to use the typescript compiler

- A Vanilla template component will create a simple module bridge to permit any Javascript code to be bundled. It will associate the build tools to use the Javascript bundler.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component |
| template | option | string | `typescript` | no | The template of component to generate. [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code will be generated |
| init-strategy | option | string | `lazy` | no | The initialization strategy to use when initializing the component. [`lazy`, `component`, `lazy-dependent`] |
| with-styles | option | boolean | `false` | no | Whether to create the stylesheet alongside the component |
| styles-path | option | string | `src/stylesheets` | no | The path where the source code of the stylesheet will be generated |
| styles-template | option | string | `sass` | no | The template of component to generate. [`sass`, `vanilla`] |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops create:component TestComponent
```

To use vanilla Javascript

> Remark that building a component requires the same template option to be passed to the build command

```bash
./node_modules/.bin/coveops create:component TestComponent --template vanilla
```

To create a component with styles at the same time as a new project

```bash
./node_modules/.bin/coveops create:component TestComponent --with-styles
```

### Create a Stylesheet

Will create a blank stylesheet to be used to canvas for your needs. Is currently available as sass and vanilla types.

- A Sass template stylesheet will create a file per class and bundle it in a shared index

- [Experimental] A Vanilla template will create a file per class and bundle it in a shared index

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component |
| template | option | string | `sass` | no | The template of component to generate. [`sass`, `vanilla`] |
| path | option | string | `src/stylesheets` | no | The path where the source code will be generated |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops create:stylesheet TestComponent
```

To use vanilla css

> Remark that this feature isn't fully supported and may break. It is recommended to use the Sass template for the time being

```bash
./node_modules/.bin/coveops create:stylesheet TestComponent --template vanilla
```

#### Component Initialization

Coveo's component registration allows for two main strategies to load a component once the scripts and markup are present on the page: [Eager and Lazy](https://docs.coveo.com/en/295/javascript-search-framework/lazy-versus-eager-component-loading).

The `@coveops/turbo-core` library contains useful decorators that make it simple to choose the initialization structure without requiring boilerplate code. All of the strategies fallback to `component` if the `LazyInitialization` class isn't present by importing `Coveo.Lazy.js`.

> Note: The feature is currently available for Typescript Components only.

```bash
./node_modules/.bin/coveops create:component TestComponent --init-strategy component
```

### Create a Sandbox

Will create a folder with a generated search page to be used for basic debugging.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| path | option | string | `sandbox` | no | The path where the sandbox code will be generated |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops create:sandbox
```

To use a different path

> Remark that changing the path of the sandbox requires using the same path when serving it

```bash
./node_modules/.bin/coveops create:sandbox --path test
```

### Bundle a Coveo Search Page

The Coveo Search Page currently does not support static assets, nor versioning so a bridge is needed between development with Webpack and uploading the search page to the platform with `coveo-platform-client` version 2.11.0 or higher.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| pageNames | argument | string[] | [] | yes | The names of the pages as found in the Search Pages section in the Coveo Platform |
| cssPath | option | string | none | yes | The path to the built css that is output from your build tools |
| cssInclusions | option | string[] | ```[]``` | no | A space separated string of file names in the cssPath to include |
| cssExclusions | option | string[] | ```[]``` | no | A space separated string of file names in the cssPath to ignore |
| jsPath | option | string | none | yes | The path to the built js that is output from your build tools |
| jsInclusions | option | string[] | ```[]``` | no | A space separated string of file names in the jsPath to include |
| jsExclusions | option | string[] | ```[]``` | no | A space separated string of file names in the jsPath to ignore |
| htmlFilePath | option | string | none | yes | The path to the html file that contains the markup for the page associated with the pageName |
| pagesFilePath | option | string | none | yes | The path to the JSON configuration file for the pages backed up with the `coveo-platform-client` |
| startDelimeter | option | string | `<html>` | no | The start comment to look for to extract the markup for the search page |
| endDelimeter | option | string | `</html>` | no | The end comment to look for to extract the markup for the search page |

Example usage:

```bash
./node_modules/.bin/coveops searchpage:update Coveo_PageName1 Coveo_PageName2 \
                --cssExclusions coveo-page.css \
                --jsExclusions coveo-page.js coveo-page.bundle.js page.min.js \
                --cssPath ./dist/assets/css \
                --jsPath ./dist/assets/js \
                --htmlFilePath ./dist/search.html \
                --pagesFilePath ./platform/page.json \
                --startDelimeter "<!--Coveo Widget starts here-->" \
                --endDelimeter "<!--Coveo Widget ends here-->"
```

A useful recipe for this would be to create a makefile with the composite recipe to build, bundle and deploy:

```bash
build:
	docker exec -it engine npm run build
bundle:
	docker exec -it page-engine node ./node_modules/.bin/coveops searchpage:update Coveo_PageName \
		--cssExclusions coveo-page.css \
        --jsExclusions coveo-page.js coveo-page.bundle.js page.min.js \
        --cssPath ./dist/assets/css \
        --jsPath ./dist/assets/js \
        --htmlFilePath ./dist/search.html \
        --pagesFilePath ./platform/$COVEO_ORG_ID/page.json \
        --startDelimeter "<!--Coveo Widget starts here-->" \
        --endDelimeter "<!--Coveo Widget ends here-->"
deploy: build bundle
	docker exec -it teradata-engine node ./node_modules/.bin/platformclient upload-pages $COVEO_ORG_ID $COVEO_API_KEY ./platform/$COVEO_ORG_ID/page.json
```

Then, running `make deploy` will run the build and bundle before deploying to the platform.

## Development

Use the docker image included to have Node 12. You can leverage Tramway CLI to make different pieces: https://github.com/tramwayjs/cli

The project uses dependency injection and the dependency injection configuration `src/config` is central to how the application works. Each other piece is a standalone class that is instantiated and managed by the `DependencyResolver` of the framework.

General application flow:

`./node_modules/.bin/coveops` executes the bin file specified which gets the dist version of `src/coveoops` which will initiate the framework and pass the arguments. The internal command resolver will map the command by key to the corresponding service in `src/config/parameters/global/commands.js`. This command is set up in `src/config/services/commands.js`. In general, the `src/commands` folder is the starting point of a command that will then reference injected services. 

Once a modification is made, run `npm run build` which will run Tramway's build tool.

To test locally in a project: `npm pack`, then copy the tgz file to the project you want to test in and run `npm install --save-dev coveoops-scripts-1.0.0.tgz` (Adjusting for the version set in the package.json).