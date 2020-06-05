#!make
include .env
export

default:	| clean setup rebuild
init:
	cp .env.dist .env
setup:
	docker volume create nodemodules_coveopsscripts
	docker-compose -f docker-compose.installer.yaml run --rm install
rebuild:
	docker-compose down
	docker-compose build
	docker-compose up -d --remove-orphans
run:
	docker-compose up -d --remove-orphans
clean:
	docker-compose down

build:
	docker-compose exec engine npm run build

watch:
	docker-compose exec engine npm run watch

follow-logs:
	docker-compose exec engine npm run logs

pack:
	npm pack

deploy:
	npm publish --access public

test: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz ./test/coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component --with-styles && \
	cat ../.env > .env && \
	./node_modules/.bin/coveops create:component TestComponent2 --init-strategy component --with-styles && \
	./node_modules/.bin/coveops create:sandbox && \
	cd ../

test-npx: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz ./test/coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	cd ./test && \
	npx coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz create:project TestComponent --create-component --with-styles && \
	cat ../.env > .env && \
	npx coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz create:component TestComponent2 --init-strategy component --with-styles && \
	npx coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz create:sandbox && \
	make build && \
	cd ../

test-npx-project: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz ./test/coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	cd ./test && \
	npx coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz create:project TestComponent --create-component --with-styles --with-sandbox && \
	cat ../.env > .env && \
	make build && \
	cd ../

build-test:
	cd ./test && \
	./node_modules/.bin/coveops build TestComponent

test-vanilla: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz ./test/coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component --template vanilla && \
	cat ../.env > .env && \
	./node_modules/.bin/coveops create:component TestComponent2 --template vanilla && \
	./node_modules/.bin/coveops create:sandbox TestComponent2 --template vanilla && \
	./node_modules/.bin/coveops create:sandbox && \
	cd ../

run-sandbox:
	cd test && \
	./node_modules/.bin/coveops serve \
		--org-id $(ORG_ID) \
		--token $(TOKEN) \
		--port $(SERVER_PORT)

releasePatch: releaseBranch npmPatch mergeRelease tag deploy reconcileDevelop

releaseMinor: releaseBranch npmMinor mergeRelease tag deploy reconcileDevelop

releaseMajor: releaseBranch npmMajor mergeRelease tag deploy reconcileDevelop

npmPatch:
	npm version patch

npmMinor:
	npm version minor

npmMajor:
	npm version major

latestTag:
	git fetch --prune --prune-tags && \
	git tag --sort=-v:refname | head -n 1

releaseBranch:
	git checkout develop && \
	git pull && \
	git checkout -tb release/latest && \
	git push origin HEAD

mergeRelease:
	git fetch origin && \
	git checkout master && \
	git merge release/latest && \
	git branch -D release/latest && \
	git push origin --delete release/latest && \
	git push origin master;

reconcileDevelop:
	git fetch origin && \
	git checkout develop && \
	git merge master && \
	git push origin develop;

tag:
	git tag $(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g') && git push origin --tags;

.PHONY: default setup rebuild run dev enter clean pack releasePatch releaseMinor releaseMajor