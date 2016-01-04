# Makefile only needed for generating website

.PHONY: build watch

build:
	browserify -s pass-scene -t coffeeify -o client.js pass-scene.coffee

watch:
	watchify -s pass-scene -t coffeeify -o client.js pass-scene.coffee
