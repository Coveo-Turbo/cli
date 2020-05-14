# CoveoPS Scripts

A CLI application that can house modular and reusable scripts for various Coveo Projects.

## Installation

`npm install --save-dev @coveops/cli`

## Documentation

* Usage
* Bundle Search Page

### Usage

Replace the COMMAND with the appropriate one from the table below with its corresponding arguments and options.

Installed globally:

`coveops COMMAND`

Installed as a dev dependency (recommended to track versioning):

`./node_modules/.bin/coveoops COMMAND`

Alternatively on Windows: `node_modules\coveops-scripts\dist\coveoops.js COMMAND`

It is recommended to use the commands in a docker container to avoid environment issues.

### Build

Will use a standard Webpack configuration to build and bundle the project for distribution.

You can also add the command to your `package.json` scripts to continue using familiar hooks like `npm run build`.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component that will be used as the library name and added to the browser's global namespace. Note, `Coveo` will be prepended at build-time |
| type | option | string | `typescript` | no | The type of component to generate. [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code will be generated |
| destination | option | string | `dist` | no | The path where the distributable code will be generated |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example:

```bash
./node_modules/.bin/coveops build TestComponent
```

To use vanilla Javascript

```bash
./node_modules/.bin/coveops build TestComponent --type vanilla
```

### Create a Component

Will create a blank component to be used to canvas for your needs. Is currently available as vanilla and typescript types.

- A Typescript type component will create a class and associate the build tools to use the typescript compiler

- A Vanilla type component will create a simple module bridge to permit any Javascript code to be bundled. It will associate the build tools to use the Javascript bundler.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| name | argument | string | none | yes | The name of your component |
| type | option | string | `typescript` | no | The type of component to generate. [`typescript`, `vanilla`] |
| path | option | string | `src` | no | The path where the source code will be generated |
| verbosity | option | string | none | no | Adjusts the verbosity of error logging during the run-time |

Example usage:

```bash
./node_modules/.bin/coveops component:create TestComponent
```

To use vanilla Javascript

```bash
./node_modules/.bin/coveops component:create TestComponent --type vanilla
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