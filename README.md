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

### Project Setup
1. Import this repository on github.
2. `git clone` the new repo onto your computer.
3. Edit package.json to set project name etc. 
4. `yarn install` to install dependencies. 


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
