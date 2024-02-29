install:
	npm install

test:
	npm run lint
	npm run test
	npm run test:e2e

format:
	npm run format

build:
	npm run build


dev/start:
	npm run start:dev

start:
	npm run start
