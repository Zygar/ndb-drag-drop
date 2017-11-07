# Hazard Matcher

This is a blank boilerplate for beginning development of new learning modules. It features a lot of automation for common tasks, like prefixing your CSS or bundling assets. It also contains, or will contain, common, reusable bits and pieces like brand fonts and colours. 

By default, it's set up with a few packages: 

- jQuery 3.2.1
- Normalize.css
- Modernizr

It also includes:

- Lato webfont with @font-face rules. 
- Some sensible styling defaults courtesy of html5-boilerplate. 

The development setup for this includes 

- Yarn - package manager
- webpack - compiles and bundles your assets 
- postcss - with cssNext. Write 100% modern CSS and let the machine do your fallbacks! And yes, this includes CSS variables. 

### New in 0.3
- OPT brand colors accessible as CSS4 variables. `color: var(--light-green);` Definitions are in colors.css.
- Import the weights of Lato that you need. Have them accessible in your CSS with zero configuration, and zero bloat in production. Just go to app.js and `"import lato-[weight] from 'Fonts/lato-[weight]'`
- `yarn start` server is now accessible over LAN for easier testing on mobile devices.
- Separate development and production configurations. 
- `yarn build:prod` generates a named, minified, polyfilled, zipped bundle ready for iQualify.
- Adds babel, which will make your modern javascript backwards compatible. 
- Sourcemaps are enabled in production server for easy debugging of your stuff.
- Fixes bug where static assets wouldn't load correctly on production server



#### New and notable in previous versions
- Modernizr + Modernizr-loader implemented, pick your modules in .modernizrrc.json and they will be made available to all your jQuery plugins
- jQuery accessible on a global variable to support legacy plugins. 


## Setup
### Global Setup
You should only need to do this stuff once. 

1. If on Mac, you will need [Homebrew](https://brew.sh/) if you do not already have it. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 
   1. Homebrew may fail to install if your Ruby is an old version. Get Ruby Version Manager (RVM) by running `rvm get stable` or `curl -L https://get.rvm.io | bash -s stable` 
   2. You should then be able to go `rvm install ruby-[version]` e.g. `rvm install ruby-2.4.2` 
   3. Use latest version of Ruby by default `rvm use --default ruby-[version]` e.g. `rvm use --default ruby-2.4.2`
2. Now let's install Yarn, our package manager. You could also use npm as they're basically identical.
   1. Check if you have NVM (Node Version Manager) installed `nvm --version`
   2. If you are using NVM, get the latest node `nvm install node` then install yarn without node. `brew install yarn --without-node`
   3. If you are not using NVM, just install yarn `brew install yarn` and you will get node automatically.

### Project Setup
1. Import this repository on github.
2. `git clone` the new repo onto your computer.
3. Edit package.json to set project name etc. 
4. `yarn install` to install dependencies. 
5. `yarn start` will compile your assets, start a server on localhost:8080 and live-reload any changes. Pass argument `--port [NUM]` to run on port of your choice. e.g. `yarn start --port 3200` 
6. `yarn build:dev` will create a compiled version of your website in ./dist/. Test this as you will. It will  automatically delete your old dist folder so you don't have to worry about outdated files causing issues. 
7. `yarn build:prod` will compile, auto-prefix and minify your build into ./prod/. You will also get a bundled zip file, ready for iQualify, in the same folder. 

To add packages `yarn add [name]` or `yarn add --dev [name]` for dev tools like Webpack. 

#### Other Commands
- `yarn deploy:testing` (not currently implemented) will run a deploy script to package and deploy to Azure at creative-design-testing.azurewebsites.net.
- `yarn deploy:portfolio` (not currently implemented) will run a deploy script to package and deploy to Azure at creative-design.azurewebsites.net 


### What is this sorcery? (how it works)
Webpack is a bundler that works by detecting dependencies between parts of your codebase and merging them into single files. It is configured using `webpack.config.js`. 

The first place it will look is src/app.js. 

#### Packages
We are using yarn for package management, which is almost identical to NPM. Therefore, if something is on the npm repository, you should use that rather than downloading zip files. You can install packages with `yarn add [package]` or `yarn add --dev [package]` for dev tools, like Webpack or PostCSS plugins. 

#### Javascript
./src/js/main.js is our first port of call. 

You can use require() to include packages in your scripts. For example, if you need to use the jQuery package in a component you can go `var $ = require('jquery')` at the top. If you want to import a file that isn't a package—like a page flipper you have built—you can just use a relative path like this: `var PageFlipper = require(./page-flipper)` 

Note: as of 0.2.2 jQuery should now be available in all files by default via webpack.ProvidePlugin. 

Legacy jQuery plugins can be used via shims. 


#### CSS 
./src/css/main.css is our main source of truth. Your CSS can be modular too now!

The CSS build chain looks like this:

1. When a CSS file is encountered as a dependency (because it has been called with import, require or @import), a rule tells it to use postcss-import to parse and transform the CSS. 
2. postcss-import will trace any @import rules you have defined and copy the file in. Any other postCSS transforms, like auto-prefixing, are done at this stage too.
3. The merged, postcss'd data gets sent to css-loader, which will minify your assets (on production) as well as resolving url() definitions.
4. css-loader passes the data onto ExtractTextPlugin, which is configured to output to ./dist/css/bundle.css. 

Inline source maps are enabled on CSS, so even though Webpack merges all of your files, you can track back which file is responsible for setting each rule. (e.g. tracking h1 back to normalize.css)

You can use @import to access packages as well! So to use normalize.css, you just `yarn add normalize.css` to install the package and then `@import "normalize.css";` in main.css. Easy, huh? 

#### HTML
./src/index.html is our main source of truth here. 

We are using html-webpack-plugin to automatically generate the HTML for the site. It reads in a template— by default src/index.html—and modifies it, injecting your bundled styles and scripts. It keeps mostly everything else identical, so feel free to put whatever you want in index.html. DON'T link scripts or CSS in index.html though. Use @import rules in your CSS and require() in your JS. 

We will probably swap this out with Handlebars or another templating language in the future to enable the use of partials. 

The main limitation, for now, is that we are limited to single-page websites, which should be sufficient for most of our needs. If you need multiple html files in a project, let me know on Slack and I'll sit with you to configure it. 

#### Static Assets (Fonts, Images, Etc)
When you request a static asset in a CSS file `url()` or your HTML template `src=`, Webpack (via css-loader or html-loader, respectively) will resolve the url e.g. `url(../fonts/Lato-Bold.woff)` and use file-loader to Do Stuff with it, based on rules set in webpack.config.js. 

It is configured to drop images into ./dist/public/images and fonts into ./dist/public/fonts by default. 

Some part of Webpack (I think file-loader, extract-text-plugin or html-webpack-plugin) will update the asset URLs in the bundled CSS/HTML file by magic. I'm a little unclear on how this works right now. Ask me again in a week. 


## Open Questions
- Is there a better folder structure we can use for non-npm stuff? (Especially w/r/t vendor modules) 
- Is there a better way to handle url() calls in the CSS? Currently PostCSS inlines everything into main.css, which sets css-loader's context to src/ and causes assets to not resolve. Best solution at present is defining aliases.
- How could this package be updateable downstream? 

### Wishlist
- Deployment scripts to staging and dev. 
- Initialization script for spinning up new project.
- Some kind of templating language. 
- Better asset pipeline
