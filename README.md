# CoveoPS Scripts

A CLI application that can house modular and reusable scripts for various Coveo Projects.

## Installation

`npm install --save-dev <NEEDS AN NPM ORG FOR PS>`

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

### Bundle a Coveo Search Page

The Coveo Search Page currently does not support static assets, nor versioning so a bridge is needed between development with Webpack and uploading the search page to the platform with `coveo-platform-client` version 2.11.0 or higher.

| Argument | Command Type | Type | Default | Required | Comments |
| --- | --- | --- | --- | --- | --- |
| pageName | argument | string | none | yes | The name of the page as found in the Search Pages section in the Coveo Platform |
| cssPath | option | string | none | yes | The path to the built css that is output from your build tools |
| cssExclusions | option | string[] | ```[]``` | no | A space separated string of file names in the cssPath to ignore |
| jsPath | option | string | none | yes | The path to the built js that is output from your build tools |
| jsExclusions | option | string[] | ```[]``` | no | A space separated string of file names in the jsPath to ignore |
| htmlFilePath | option | string | none | yes | The path to the html file that contains the markup for the page associated with the pageName |
| pagesFilePath | option | string | none | yes | The path to the JSON configuration file for the pages backed up with the `coveo-platform-client` |
| startDelimeter | option | string | `<html>` | no | The start comment to look for to extract the markup for the search page |
| endDelimeter | option | string | `</html>` | no | The end comment to look for to extract the markup for the search page |

Example usage:

```bash
./node_modules/.bin/coveops searchpage:update Coveo_PageName \
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