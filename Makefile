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
	mv ./coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz ./test/coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component && \
	./node_modules/.bin/coveops create:component TestComponent2 && \
	cd ../

test-vanilla: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz ./test/coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-$(shell git tag --sort=-committerdate | head -n 1).tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component --template vanilla && \
	./node_modules/.bin/coveops create:component TestComponent2 --template vanilla && \
	cd ../

releasePatch: releaseBranch npmPatch mergeRelease tag reconcileDevelop

releaseMinor: releaseBranch npmMinor mergeRelease tag reconcileDevelop

releaseMajor: releaseBranch npmMajor mergeRelease tag reconcileDevelop

npmPatch:
	npm version patch

npmMinor:
	npm version minor

npmMajor:
	npm version major

release: releaseBranch mergeRelease tag reconcileDevelop

latestTag:
	git fetch --prune --prune-tags && \
	git tag --sort=-committerdate | head -n 1

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
	git tag $(shell git tag --sort=-committerdate | head -n 1 | sed 's/v//g') && git push origin --tags;

.PHONY: default setup rebuild run dev enter clean pack releasePatch releaseMinor releaseMajor