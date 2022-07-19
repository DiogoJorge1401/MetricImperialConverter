rimraf dist

export NODE_ENV=production

tsc -p ./tsconfig.json --pretty

cp -R src/public dist/public

cp -R src/views dist/views

cp package.json dist/