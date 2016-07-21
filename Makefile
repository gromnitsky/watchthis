.PHONY: test
test:
	node_modules/.bin/mocha -u tdd test/test_*.js $(TEST_OPT)
