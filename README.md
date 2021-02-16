# CoveoPS Scripts

A CLI application that can house modular and reusable scripts for various Coveo Projects.

## Table of contents:
* [Installation](#installation)
* [Prerequisites](#prerequisites)
* [Usage](#usage)
    - [Build](#build)
    - [Serve](#serve)
    - [Create a Project](#create-a-project)
    - [Create a Component](#create-a-component)
    - [Create a Stylesheet](#create-a-stylesheet)
    - [Adding images](#adding-images)
    - [Create a Page](#create-a-page)
    - [Deploy a Page](#deploy-a-page-to-the-coveo-platform)
    - [Create Locales](#create-locales)
    - [Create a Translation](#create-a-translation)
    - [Update a Translation](#update-a-translation)
    - [Create a Readme](#create-a-readme-file)
    - [Create a Docker Environment](#create-a-docker-environment)
    - [Create a Query Pipeline](#create-a-query-pipeline)

## Prerequisites

NodeJS version 12 or later is required to install and use Coveo Turbo
## Installation

To install the CLI, use the following command:

`npm install --save-dev @coveops/cli`

## Usage

Replace the COMMAND with the appropriate one from the table below with its corresponding arguments and options.

**Installed globally:**

`coveops COMMAND`

**Installed as a dev dependency (recommended to track versioning):**

`./node_modules/.bin/coveoops COMMAND`

Alternatively on Windows: `.\node_modules\.bin\coveops CountedTabs COMMAND`

**Executed via npx:**

`npx @coveops/cli COMMAND`

### Coveo Turbo Recipe

Turbocharge your development by leveraging community-made components and contributing to the community. To get started:

**Creating a new Project**

> It is recommended to use a bash terminal that supports Make. If this does not apply to your environment, please replace the following steps with suitable commands using the documentation.

1. Create a new directory for your new project.

2. Create a project and page:

```bash
npx @coveops/cli create:project MyProject --create-component --with-styles --with-page --description "Briefly describe what the component does"
```

3. Modify the source MyProject.ts and MyProject.scss files to build your component, add your Coveo credentials in the `.env` file

4. Build and serve your project:

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

**Installing a component in a project**

1. Install the component via its `npm` package

2. Import the component into your environment by either:

    * Bundling it: Export the component in the corresponding index file as outlined in the component's README. This will create one Javascript and one CSS file to host for the entire project.

    * Load it via markup: The `serve` command provides a CDN-like experience to serve built and installed components independently but it will be necessary to host the component before adding it to your final project's HTML markup. It is recommended to host the component yourself but [`unpkg`](https://unpkg.com/) can be used for prototyping with an already-published component.

3. Add the component to your markup as indicated in the component's README.


## Build

This command uses a standard Webpack configuration to build and bundle the project for distribution.

You can also add the command to your `package.json` scripts to continue using familiar hooks like `npm run build`

| Argument | Command Type | Type | Default | Required | Comments |
| -------- | ------------ | ---- | ------- | -------- | -------- |
| name | argument | string | none | yes | The name of your component to be used as the library name and added to the browser global namespace. Note that `Coveo` will be prepended at build-time. |
| template | option | string | `typescript` | no | The template of the component to generate. The available options are: [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code is generated. |
| destination | option | string | `dist` | no | The path where the distributable code is generated. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |
| styles-path | option | string | `src/stylesheets` | no | The path where the stylesheets are located. |
| styles-type | option | string | `sass` | no | The stylesheet language that is used in the project. The available options are: [`sass`, `vanilla`] |
| styles-destination | option | string | `dist/css` | no | The path where the distributable code is generated. |
| dry | option | boolean | none | no | Whether to perform a dry run build and output the generated webpack configuration to the console. |
| disable-swapvar | option | boolean | none | no | Whether to remove the Webpack loader that injects the `SwapVar` utility to the root `index` file before building. By default, the build command injects `SwapVar` to add components to the root of the `Coveo` object at runtime. |
| watch | option | boolean | none | no | Whether to watch for changes and build after the `watch-timeout`. |
| watch-timeout | option | number | 1000 | no | The amount of time (in milliseconds) to watch for changes. Increase this value if you change multiple files at a time. |


#### Examples:

> 
> 
> Basic use case:
> 
> ```bash
> ./node_modules/.bin/coveops build TestComponent
>```
> 
> To watch:
> 
> ```bash
> ./node_modules/.bin/coveops build TestComponent --watch
> ```
> 
> To use vanilla JavaScript:
> 
> ```bash
> ./node_modules/.bin/coveops build TestComponent --template vanilla
> ```
>
> To specify an alternative directory containing a index.scss located at `src/stylesheets`:
>
> ```bash
> ./node_modules/.bin/coveops build TestComponent --styles-path src/stylesheets
> ```



#### SwapVar

Coveo injects custom components into its root object by using a custom utility called `SwapVar`. With Coveo Turbo, this utility is injected into the root index of the code during build time, so no additional effort or integration is necessary in a project.

Thanks to the `SwapVar` utility, the exported component is referenced in implementation JavaScript code as such:

```javascript
Coveo.TestComponent
```

Without the `SwapVar` utility, achieved by using the `disable-swapvar` option in the build, the exported component library is referenced in implementation JavaScript code such:

```javascript
CoveoTestComponent
```


### Serve

This command starts a Node server designed to:

- Serve the compiled distributable as a static resource that can be loaded onto the page.
- Serve installed components in the `node_modules` folder under the @coveops scope as static resources that can be loaded onto the page.
- Serve all HTML pages in the pages folder.
- Pass parameters from the environment or CLI arguments to the running instance to be used in the application via the `demoConfig` variable declared in `/config.js` when the server starts.

> If no org-id or token are used, then a sample Coveo organization with some already indexed content is used.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| port | option | number | 8080 | no | The port number where the site is generated. |
| path | option | string | `pages` | no | The path to the dedicated pages folder used for testing. |
| org-id | option | string | none | no | The id of the Coveo Cloud organization to use. |
| token | option | string | none | no | The token used to authenticate to the organization. |
| rest-uri | option | string | `https://platform.cloud.coveo.com/rest/search` | no | The uri used by the Coveo JavaScript Search Framework to access the REST API. |
| search-hub | option | string | none | no | The search hub used for the requests. To understand what the purpose of a search hub is, see [Setting the Search Hub](https://docs.coveo.com/en/3107). |
| search-url | option | string | none | no | The URL of a search page for the standalone search box. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |

> Examples:
>
> Basic use case:
>
> ```bash
> ./node_modules/.bin/coveops serve --org-id <ID HERE> --token "<TOKEN HERE>"
> ```
>
> To use a different port:
>
> ```bash
> ./node_modules/.bin/coveops serve --port 3000 --org-id <ID HERE> --token "<TOKEN HERE>"
> ```

Some of the arguments have a corresponding environment variable that can also be used by the server:

| Argument | Environment Variable |
| --- | --- |
| port | SERVER_PORT |
| path | COVEO_PAGE_PATH |
| org-id | COVEO_ORG_ID |
| token | COVEO_TOKEN |
| rest-uri | COVEO_REST_URI |
| search-hub | COVEO_SEARCH_HUB |
| search-url | COVEO_SEARCH_URL |
| name | COVEO_PAGE_NAME |


#### Compiled Component

The compiled component has its resources served at the following endpoints.

> In some cases, only JavaScript or CSS may be available.

- `./component.js`
- `./component.css`



#### Installed Components

The installed components have their resources served at the following endpoints.

> In some cases, only JavaScript or CSS may be available.

- `components/<name>.js`
- `components/<name>.css`

The `<name>` represents the name of the component within the `@coveops` scope. 

For example, importing a component installed from `@coveops/test-component` will have the following assets served:

- `components/test-component.js`
- `components/test-component.css`

> Alternatively, these installed components can be bundled into the library via the corresponding `index` file in the `src` before being built.


#### Injected Parameters

The serve command generates a JavaScript snippet that is injected into the page by importing the `/config.js` file, which contains some of the information that was passed through environment variables or CLI arguments in a global `demoConfig` variable. This allows a page to remain decoupled from the test settings to allow portability between environments where component-level dependencies permit.

The following information is passed in the `demoConfig` object and is available to use within the application at runtime:

| Property | Argument | Environment Variable | Default |
| --- | --- | --- | --- |
| orgId | org-id | COVEO_ORG_ID | `"null"` |
| token | token | COVEO_TOKEN | `"null"` |
| restUri | rest-uri | COVEO_REST_URI | `"https://platform.cloud.coveo.com/rest/search"` |
| searchHub | search-hub | COVEO_SEARCH_HUB | `"null"` |
| searchUrl | search-url | COVEO_SEARCH_URL | `localhost:8080/` |



### Create a Project

This command adds the necessary files to kick-start a project to create a shareable component and optionally the component itself.

> When ran using npx, the `create:project` utility initializes a `package.json` and installs itself as a dev dependency for you.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component. |
| template | option | string | `typescript` | no | The template of component to generate. The available options are: [`typescript`, `vanilla`] |
| create-component | option | boolean | `false` | no | Whether to create the component using the same name as the project |
| component-path | option | string | `src` | no | The path where the source code of the component is generated. |
| with-styles | option | boolean | `false` | no | Whether to create the stylesheet alongside the component. This option requires the `create-component` flag. |
| styles-path | option | string | `src/stylesheets` | no | The path where the source code of the stylesheet is generated. |
| styles-template | option | string | `sass` | no | The template of component to generate. The available options are: [`sass`, `vanilla`] |
| with-page | option | boolean | `false` | no | Whether to create a page in which to test your component. |
| page-path | option | string | `pages` | no | The path where the page is generated. |
| page-layout | option | string | `basic-search` | no | The layout to use when creating the page. Consult the `create:page` reference `layout` option for advanced usage. |
| description | option | string | none | no | The description of the component. This updates the description on the README, as well as set the description field in the `package.json` file. |
| package-name | option | string | none | no | The name of the package that houses the component. By default, the param-case version of the `name` will be added under the `@coveops` scope. For example, setting the name as `TestComponent` yields `@coveops/test-component`. This option is meant to override the default behavior. |
| with-docker | option | boolean | none | no | Adds a `docker-compose.yml` file containing a NodeJS v12 environment. For more details, see [`Create a Docker Environment`](#create-a-docker-environment) section. |
| setup-locales | option | array | none | no | Adds the specified locales used for translations and sets up localization in the project. |
| locale-type | option | string | `json` | no | The filetype to use when managing translations for the locale. The following formats are supported: `json|yaml|js` |
| default-locale | option | string | `en` | no | The default locale to use as the base for the dictionary. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during at run-time. |

> Example usage:
>
> To quick-start a new project:
>
> ```bash
> npx @coveops/cli create:project TestComponent --create-component --with-styles --with-page
> ```
>
> To use in a project where `@coveops/cli` is installed:
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent
> ```
>
> To use vanilla JavaScript:
>
> Note: Building a component requires the same template option to be passed to the build command.
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent --template vanilla
> ```
>
> To create a component at the same time as a new project:
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent --create-component
> ```
>
> To create a component with styling at the same time as a new project:
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent --create-component --with-styles
> ```
>
> To create a page at the same time:
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent --with-page
> ```
>
> To setup locales at the same time:
>
> ```bash
> ./node_modules/.bin/coveops create:project TestComponent --setup-locales fr es-es
> ```



### Create a Component

This command creates a blank component to be used to canvas for your needs. It is currently available as `vanilla` and `typescript` types.

- A Typescript template component creates a class and associate the build tools to use the TypeScript compiler.

- A Vanilla template component creates a simple module bridge to permit any JavaScript code to be bundled. It associates the build tools to use the JavaScript bundler.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component. |
| template | option | string | `typescript` | no | The template of component to generate. The available options are: [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code is generated. |
| init-strategy | option | string | `lazy` | no | The initialization strategy to use when initializing the component. The available options are: [`lazy`, `component`, `lazy-dependent`] |
| with-styles | option | boolean | `false` | no | Whether to create the stylesheet alongside the component. |
| styles-path | option | string | `src/stylesheets` | no | The path where the source code of the stylesheet is generated. |
| styles-template | option | string | `sass` | no | The template of component to generate. The available options are: [`sass`, `vanilla`] |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:component TestComponent
> ```
>
> To use vanilla Javascript:
>
> Note: Building a component requires the same template option to be passed to the build command.
>
> ```bash
> ./node_modules/.bin/coveops create:component TestComponent --template vanilla
> ```
>
> To create a component with styling at the same time as creating a new project:
>
> ```bash
> ./node_modules/.bin/coveops create:component TestComponent --with-styles
> ```



### Create a Stylesheet

This command creates a blank stylesheet to be used to canvas for your needs. It is currently available as `sass` and `vanilla` types.

- A Sass template stylesheet creates a file per class and bundles it in a shared index.

- **[Experimental]** A Vanilla template will create a file per class and bundle it in a shared index.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component. |
| template | option | string | `sass` | no | The template of component to generate. The available options are: [`sass`, `vanilla`] |
| path | option | string | `src/stylesheets` | no | The path where the source code is generated. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:stylesheet TestComponent
> ```
>
> To use vanilla CSS:
>
> Note: this feature isn't fully supported and may cause issues. For now, it is recommended to use the Sass template.
>
> ```bash
> ./node_modules/.bin/coveops create:stylesheet TestComponent --template vanilla
> ```



#### Component Initialization

The Coveo component registration allows for two main strategies to load a component once the scripts and markup are present on the page: [Eager and Lazy](https://docs.coveo.com/en/295).

The `@coveops/turbo-core` library contains useful decorators that make it simple to choose the initialization structure without requiring boilerplate code. All of the strategies fallback to `component` if the `LazyInitialization` class isn't present when importing `Coveo.Lazy.js`

> This feature is currently only available for TypeScript Components.

```bash
./node_modules/.bin/coveops create:component TestComponent --init-strategy component
```

### Adding images

Some implementations require custom icons or images to be displayed as part of their templates.

1. Add your images to the `images` folder in `src` (create the folder if it doesn't exist).
2. Build (not necessary if you're running the watcher) the project with `make build`. The images will be copied to the `dist` folder.
3. Refresh the page (or use `make serve` if your page isn't already running). Images will be exposed at `/images`

You can use the images in css or in the markup.

In css, use the relative path to the `images` folder in `src`.
In html markup, use the relative url path starting with `/images`.

The folder path will be respected one-to-one with the source. If an image is in `src/images/subfolder/image.png`, the output will be `dist/images/subfolder/image.png`. It's use in css will be `../images/subfolder/image.png` and in html will be `http://localhost:<PORT>/images/subfolder/image.png`.

### Create a Page

This command creates a folder with a generated search page to be used for basic debugging.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | `index` | no | The name of the page page to be generated. The page is available at the path of the local url. |
| layout | argument | string | `basic-search` | no | The name of the page layout to use when making the page. |
| path | option | string | `pages` | no | The path where the page code is generated. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:page
> ```
>
> Note: once served, the page is available at localhost:<PORT>/index.html
>
> To add another page
>
> ```bash
> ./node_modules/.bin/coveops create:page knowledge
> ```
>
> Note: once served, the page is available at localhost:<PORT>/knowledge.html
>
> To use a different path
>
> Note: changing the path of the page requires using the same path when serving it.
>
> ```bash
> ./node_modules/.bin/coveops create:page --path test
> ```
>
> To use a specific page layout
>
> Note: changing the path of the page requires using the same path when serving it.
>
> ```bash
> ./node_modules/.bin/coveops create:page --layout servicenow-agent-panel
> ```

#### Available Page Layouts

| Name | Platform | Description |
| --- | --- | --- |
| basic-search | Any | This is the default page layout when no `--layout` is specified. It creates a basic search page with the generic layout including tabs, facets and result templates. |
| servicenow-agent-panel | ServiceNow | Generates a search template tailored for ServiceNow's Agent Panel experience. |
| salesforce-community-search | Salesforce | Generates a variant of the basic-search that's intended to be copied into a VisualForce component in a Salesforce organization. |
| salesforce-agent-panel | Salesforce | Generates a template specific for the Salesforce Agent Panel in Lightning. |
| salesforce-attached-results | Salesforce | Generates a template specific for the Attached Results panel in Lightning. |

### Deploy a Page to the Coveo Platform

This command creates a new page and deploys the specified page and its minified JavaScript and CSS there.

> This feature requires the project to already be built. It only deploys the compiled code.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | `index` | no | The name of the page to be generated. The page is available at the path of the local URL. |
| page-name | argument | string | `index` | no | The name of the page to be created on the Coveo Platform. The page is available within the Search Pages section of the Coveo Platform. |
| path | option | string | `pages` | no | The path where the page code is generated. |
| org-id | option | string | none | yes | The ID of the Coveo Cloud organization. |
| token | option | string | none | yes | The token used to authenticate to the organization. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |
| bundle | option | boolean | false | no | Determines whether Javascript and CSS should be bundled into the page contents instead of uploaded as static resources. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops deploy
> ```
>
> To deploy a specific page to a specific Search page in Coveo:
>
> ```bash
> ./node_modules/.bin/coveops deploy index page
> ```

By default, creating a page creates an HTML page called `index`. The page in the Coveo Platform can be named arbitrarily and differently from the page.

Some of the arguments have a corresponding environment variable that can be used with the deploy command.

| Argument | Environment Variable |
| --- | --- |
| path | COVEO_PAGE_PATH |
| org-id | COVEO_ORG_ID |
| token | COVEO_TOKEN |
| name | COVEO_PAGE_NAME |



### Create Locales

This command creates and scaffolds standardized locale dictionaries for the project.

> After running this command, a build is necessary for changes to take effect.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| locales | argument | string[] | [] | no | An array of the list of locales to create to use for the translation dictionaries. |
| type | option | string | `json` | no | The filetype to use when managing translations for the locale. The following formats are supported: `json|yaml|js` |
| default | option | string | `en` | no | The default locale to use as the base for the dictionary. |
| setup | option | boolean |  | no | Will install the `@coveops/localization-manager` component and update each page's markup to include the necessary code snippets. |
| component-template | option | string | `typescript` | no | The template of component to generate. The available options are: [`typescript`, `vanilla`] |
| component-path | option | string | `src` | no | The path where the source code of the component is generated. |
| page-path | option | string | `pages` | no | The path where the page is generated. |


> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:locales fr es-es
> ```
>
> To also set up the `LocalizationManager`:
>
> ```bash
> ./node_modules/.bin/coveops create:locales fr es-es --setup
> ```
>
> To use a different default locale as a base, you can specify it as follows:
>
> ```bash
> ./node_modules/.bin/coveops create:locales en es-es --default fr
> ```
>
> To use a different filetype to manage the dictionary, you can specify it as follows:
>
> ```bash
> ./node_modules/.bin/coveops create:locales en fr --type yaml
> ```



### Create a Translation

This command creates all the necessary translation entries or empty placeholders for a given word.

This operation does not replace values that already exist. To update those, use the [`update:translation` command](#update-a-translation).

> For changes to take effect, a build will be necessary after running this command.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| word | argument | string |  | yes | The word or key to be replaced with the corresponding translation value. |
| target | option | string |  | no | The component name (e.g., `DynamicFacet`) or element id to target with the translation. |
| type | option | string | `json` | no | The filetype to use when managing translations for the locale. It should correspond to the filetype that was used to create the locale. The following formats are supported: `json|yaml|js` |
| <locale> | option | string | | no | An option to be generated for each locale created using the `create:locales` command. The value passed to the option is the translation of the word for that given locale. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:translation Word --en Word --fr Mot
> ```
>
> Note: In order to recognize English and French, the `create:locales` command was ran prior, as such.
> 
> Since, by default, English is the default language, only `fr` needed to be specified.
> ```bash 
> ./node_modules/.bin/coveops create:locales fr 
> ```
>
> To target a specific component:
>
> ```bash
> ./node_modules/.bin/coveops create:translation Word --en Word --fr Mot --target DynamicFacet
>```
>
> If you used a different filetype than json when creating the locale, you can specify it as follows:
>
> ```bash
> ./node_modules/.bin/coveops create:translation Word --type yaml --en Word --fr Mot
> ```

> To use translations:
> 1. Ensure `@coveops/localization-manager` is installed as a dependency and registered as per instructions on the component.
> 2. Expose the translation file as per the chosen locale for the page. This file will add a variable `LOCALES` to the global namespace which can then be used throughout the process. The `LOCALES` variable will have the additional locales and is upkept with these CLI commands.
>     ```html
>     <script src="locales/fr.js"></script>
>     ```
> 3. Run the `LocalizationManager` before `Coveo` initializes.
>     ```javascript
>     CoveoLocalizationManager(LOCALES);
>     ```



### Update a Translation

This command updates the translation entries for a given word, only for the locales specified in the options.

> For the changes to take effect, a build is necessary after running this command.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| word | argument | string |  | yes | The word or key to be replaced with the corresponding translation value. |
| target | option | string |  | no | The component name (e.g., `DynamicFacet`) or element id to target with the translation. |
| <locale> | option | string | | no | An option to be generated for each locale created using the `create:locales` command. The value passed to the option is the translation for the word for that given locale. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops update:translation Word --fr Mot
> ```
>
> Note: In order to recognize English and French, the `create:locales` command was ran prior.
> Since, by default, English is the default language, only `fr` needed to be specified.
>```bash 
>./node_modules/.bin/coveops create:locales fr 
>```
>
> To update a translation on a targeted component:
>
> ```bash
> ./node_modules/.bin/coveops update:translation Word --en Word --fr Mot --target DynamicFacet
> ```
>
> If you used a different filetype than JSON when creating the locale, you can specify it as follows:
>
> ```bash
> ./node_modules/.bin/coveops update:translation Word --type yaml --en Word --fr Mot
> ```



### Create a README file

This command creates or overwrites an existing README.md file with a standard template that uses contextual information provided to it.

> This command shouldn't be necessary when creating a new project, as this functionality is bundled by default.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | no | The name of the component being shared in this project. |
| description | option | string | none | no | The description of the component. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:readme TestComponent --description "This is a sample description"
> ```



### Create a Docker Environment

This command creates or overwrites an existing docker-compose.yml file with a basic compose setup that includes a server running NodeJS v12 and uses the bundled Makefile to install, build, and serve the project with the configured environment variables.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:docker
> ```
>
> To get started, run:
>
> ```bash
> docker-compose up -d
> ```
>
> To access a bash shell within the environment:
>
> ```bash
> docker-compose exec server bash
> ```


> To only run the server during the `up` phase, and handle the install and build commands manually, you can remove the `setup` and `build` directives from the `entrypoint` field in the `docker-compose.yml` file.


### Create a Query Pipeline
​
This command creates a query pipeline in the Coveo organization. This pipeline has a condition set to the search hub specified in the command.
​
| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of the pipeline to create in the organization. |
| search-hub | option | string | none | no | The searchHub to use when referring to the pipeline. By default, the `search-hub` uses the value of `name`. |
| description | option | string | none | no | Add a description to the pipeline, for reference within the Coveo Platform as the User Note. |
| without-search-hub | option | boolean | none | no | Opt out of the automatic creation of the searchHub condition on this pipeline. |
| org-id | option | string | none | yes | The id of the Coveo organization. |
| token | option | string | none | yes | The token used to authenticate to the organization. |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time. |
​
> Example usage:
>
> ```bash
> ./node_modules/.bin/coveops create:pipeline SearchPage
> ```
>
> To use a different searchHub:
>
> ```bash
> ./node_modules/.bin/coveops create:pipeline SearchPage --search-hub SearchPageSearchHub
> ```
>
> To not use a searchHub:
>
> ```bash
> ./node_modules/.bin/coveops create:pipeline SearchPage --without-search-hub
> ```

### Bundle a Coveo Search Page

> Deprecated: It is recommended to use the deploy command specified in the _Deploy a Page to the Coveo Platform_ section.

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

>Example usage:
>
>```bash
>./node_modules/.bin/coveops searchpage:update Coveo_PageName1 Coveo_PageName2 \
>                --cssExclusions coveo-page.css \
>                --jsExclusions coveo-page.js coveo-page.bundle.js page.min.js \
>                --cssPath ./dist/assets/css \
>                --jsPath ./dist/assets/js \
>                --htmlFilePath ./dist/search.html \
>                --pagesFilePath ./platform/page.json \
>                --startDelimeter "<!--Coveo Widget starts here-->" \
>                --endDelimeter "<!--Coveo Widget ends here-->"
>```

>A useful recipe for this would be to create a makefile with the composite recipe to build, bundle and deploy:
>
>```bash
>build:
>	docker exec -it engine npm run build
>bundle:
>	docker exec -it page-engine node ./node_modules/.bin/coveops searchpage:update Coveo_PageName \
>		--cssExclusions coveo-page.css \
>        --jsExclusions coveo-page.js coveo-page.bundle.js page.min.js \
>        --cssPath ./dist/assets/css \
>        --jsPath ./dist/assets/js \
>        --htmlFilePath ./dist/search.html \
>        --pagesFilePath ./platform/$COVEO_ORG_ID/page.json \
>        --startDelimeter "<!--Coveo Widget starts here-->" \
>        --endDelimeter "<!--Coveo Widget ends here-->"
>deploy: build bundle
>	docker exec -it teradata-engine node ./node_modules/.bin/platformclient upload-pages $COVEO_ORG_ID $COVEO_API_KEY ./platform/$COVEO_ORG_ID/>page.json
>```

>Then, running `make deploy` will run the build and bundle before deploying to the platform.

## Development

Use the docker image included to have Node 12. You can leverage Tramway CLI to make different pieces: https://github.com/tramwayjs/cli

The project uses dependency injection and the dependency injection configuration `src/config` is central to how the application works. Each other piece is a standalone class that is instantiated and managed by the `DependencyResolver` of the framework.

General application flow:

`./node_modules/.bin/coveops` executes the bin file specified which gets the dist version of `src/coveoops` which will initiate the framework and pass the arguments. The internal command resolver will map the command by key to the corresponding service in `src/config/parameters/global/commands.js`. This command is set up in `src/config/services/commands.js`. In general, the `src/commands` folder is the starting point of a command that will then reference injected services. 

Once a modification is made, run `npm run build` which will run Tramway's build tool.

To test locally in a project: `npm pack`, then copy the tgz file to the project you want to test in and run `npm install --save-dev coveoops-scripts-1.0.0.tgz` (Adjusting for the version set in the package.json).