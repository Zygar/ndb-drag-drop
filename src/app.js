// App.js
// We specify our main modules here.
import "babel-polyfill";
var main = require("./js/main");

/* Load Fonts */
/* We load our webfonts using ES6 imports. PostCSS + CSS-loader messes up
   the resolution of their URL. It would be better to handle them natively
   using css-loader (so that you can simply require() fonts and have the asset pipeline
   configure itself) but this is an acceptable workaround for now. */

   /* Comment out fonts you don't want in the final bundle. */
   
// import LatoHairline from 'Fonts/lato-hairline/lato-hairline.css';  // 100
// import LatoThin from 'Fonts/lato-thin/lato-thin.css'; // 200
// import LatoLight from 'Fonts/lato-light/lato-light.css'; // 300
import LatoRegular from 'Fonts/lato-regular/lato-regular.css';  // 400 / REGULAR
// import LatoMedium from 'Fonts/lato-medium/lato-medium.css';  // 500
// import LatoSemibold from 'Fonts/lato-semibold/lato-semibold.css';   // 600
import LatoBold from 'Fonts/lato-bold/lato-bold.css'; // 700 / BOLD
// import LatoHeavy from 'Fonts/lato-heavy/lato-heavy.css';  // 800
// import LatoBlack from 'Fonts/lato-black/lato-black.css';  // 900 

/* Load Styles */ 
import styles from './css/main.css';
