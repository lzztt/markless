SRC = src/* src/test/*

TESTS = build/test

test-cov:
	NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		-x build/markless.js -x build/babel_helpers.js \
		./node_modules/.bin/_mocha \
		-- \
		--require build/babel_helpers.js \
		--bail \
		$(TESTS)

test-travis:
	NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		-x build/markless.js -x build/babel_helpers.js \
		--report lcovonly \
		./node_modules/.bin/_mocha \
		-- \
		--bail \
		$(TESTS)

test-browser:
	node bin/browser_test.js

dist:
	mkdir -p dist && \
		cp build/markless.js dist && \
		node_modules/.bin/uglifyjs dist/markless.js \
		-m -c --source-map \
		-o dist/markless.min.js

clean:
	rm -rf build dist coverage

.PHONY: lint test
