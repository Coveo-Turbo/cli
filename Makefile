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

test: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-0.3.0.tgz ./test/coveops-cli-0.3.0.tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-0.3.0.tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component && \
	./node_modules/.bin/coveops create:component TestComponent2 && \
	cd ../

test-vanilla: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./coveops-cli-0.3.0.tgz ./test/coveops-cli-0.3.0.tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D coveops-cli-0.3.0.tgz && \
	./node_modules/.bin/coveops create:project TestComponent --create-component --template vanilla && \
	./node_modules/.bin/coveops create:component TestComponent2 --template vanilla && \
	cd ../

release: validateTag releaseBranch updateVssExtensionVersion mergeRelease tag reconcileDevelop
latestTag:
	git fetch --prune --prune-tags && \
	git tag --sort=-committerdate | head -n 1
validateTag: latestTag
ifeq ($(TAG),$(shell git tag --sort=-committerdate | head -n 1))
	$(error "TAG is a version that already exists");
endif
releaseBranch:
ifeq ($(TAG),)
	$(error "TAG must be specified");
endif
	git checkout develop && \
	git pull && \
	git checkout -tb release/$(TAG) && \
	git push origin HEAD
updateVssExtensionVersion:
ifeq ($(TAG),)
	$(error "TAG must be specified");
endif
	sed -i "" 's/$(shell git tag --sort=-committerdate | head -n 1)/$(TAG)/g' vss-extension.json && \
	git add vss-extension.json && \
	git commit -m "Updated vss-extension.json version to $(TAG)" && \
	git push origin HEAD
mergeRelease:
ifeq ($(TAG),)
	$(error "TAG must be specified");
endif
	git fetch origin && \
	git checkout master && \
	git merge release/$(TAG) && \
	git branch -D release/$(TAG) && \
	git push origin --delete release/$(TAG) && \
	git push origin master;
reconcileDevelop:
	git fetch origin && \
	git checkout develop && \
	git merge master && \
	git push origin develop;
tag:
ifeq ($(TAG),)
	$(error "TAG must be specified");
endif
	git tag $(TAG) && git push origin --tags;

.PHONY: default setup rebuild run dev enter clean pack