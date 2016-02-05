To work on this package you will need the following:
nodejs
npm
grunt

When you have these tools, run these three commands in the root of the cloned repo
npm install
npm install grunt

Now the bower_components folder and node_modules folder should be on your machine.
These folders are not put in the repo due to their size. The proper packages will be downloaded
to them, specified in the bower.json and package.json files.

The two grunt commands you will need are grunt watch and grunt build.
grunt browserify watch will update the css files as you edit the scss files as well as the js files.
grunt build update everything, bundling and minifying the js and css
