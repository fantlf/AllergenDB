To work on this package you will need the following:
nodejs
npm
bower
grunt

When you have these tools, run these three commands in the root of the cloned repo
npm install
bower install
npm install grunt

Now the bower_components folder and node_modules folder should be on your machine.
These folders are not put in the repo due to their size. The proper packages will be downloaded
to them, specified in the bower.json and package.json files.

The two grunt commands you will need are grunt watch and grunt build.
grunt watch will update the css files as you edit the scss files.
grunt build will minify the js.
