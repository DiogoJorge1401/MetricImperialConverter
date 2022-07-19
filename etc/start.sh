cd dist

yarn install --production

export NODE_ENV=test

node src/server.js