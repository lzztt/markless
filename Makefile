SRC = src/* src/test/*

TESTS = build/test

lint: $(SRC)
	@./node_modules/.bin/eslint src bin

build: $(SRC)
	@mkdir -p build/test && node bin/build.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		$(TESTS) \
		--bail

test-browser:
	@node bin/browser_test.js

dist:
	@mkdir -p dist && \
		cp build/markless.js dist && \
		node_modules/.bin/uglifyjs dist/markless.js \
		-m -c -p relative \
		--source-map dist/markless.min.js.map \
		-o dist/markless.min.js

clean:
	rm -rf build dist coverage

.PHONY: lint test
