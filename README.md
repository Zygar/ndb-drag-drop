# OPT Boilerplate
## Version 0.2.0 - Webpack

## New in this version
Now using Webpack / Yarn / PostCSS


## Setup
### Global Setup
You should only need to do this stuff once. 

1. If on Mac, you will need [Homebrew](https://brew.sh/) if you do not already have it. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 
   1. Homebrew may fail to install if your Ruby is an old version. Get Ruby Version Manager (RVM) by running `rvm get stable` or `curl -L https://get.rvm.io | bash -s stable` 
   2. You should then be able to go `rvm install ruby-[version]` e.g. `rvm install ruby-2.4.2` 
   3. Use latest version of Ruby by default `rvm use --default ruby-[version]` e.g. `rvm use --default ruby-2.4.2`
2. Now let's install Yarn, our package manager.
   1. Check if you have NVM (Node Version Manager) installed `nvm --version`
   2. If you are using NVM, get the latest node `nvm install node` then install yarn without node. `brew install yarn --without-node`
   3. If you are not using NVM, just install yarn `brew install yarn` and you will get node automatically.


### Usage
- development happens in /src/
- go to app.js and add the modules you need to load—e.g. main.css, main.js
- in those modules, import other modules that you need. 
- `yarn build`to compile to /dist/
- `yarn start:dev` to start server with livereload
- index.html is automatically generated with dependencies linked in.  

### how it works 
- src/app.js to define top level modules
- webpack bundles all the scripts into one file and all the css into another
- webpack has plugins
  - htmlwebpackplugin to generate our output HTML file. 
    - this takes index.html as its input
    - and magically adds links to styles and scripts in the right places
  - css-loader to load css and follow dependencies
  - extracttext to write css into output directory as styles.css

### TODO
- read and write other types of assets e.g. images, fonts
- some subfolders in build directory
- replace hardwired css vendor modules with yarn modules and @import
- replace javascript modules with yarn modules and imports

### Project Setup
1. Import this repository on github.
2. `git clone` the new repo onto your computer.
3. Edit package.json to set project name etc. 
4. `yarn install` to install dependencies. 

To add packages `yarn add` or `yarn add --dev` for dev tools. 


### Limitations
- Using html-webpack-plugin to generate our HTML, this means we're limited to single pages for now (index.html). It's easy enough to generate multiple HTML files but if this is a regular use-case maybe there's a better way to implement this.

## Description

This is a blank boilerplate for beginning development of new learning modules. Currently we are using:

- HTML5 Boilerplate with Normalize.css and Modernizr.
- jQuery 3.2.1, served locally.
- Lato webfont, served locally.

Future features may include:

- NPM/bower/similar for package management if necessary
- Gulp or Webpack for 
  - Livereload
  - Autoprefixer 
  - Deployment to ZIP or staging server.
  - SASS 
  - Partials and template compilation
- Some scripts to allow us to more rapidly fork this repo
