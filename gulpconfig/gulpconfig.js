/* 
    each grouping is order dependant !!!!
*/

var paths = {
    sass: [
        './src/views-special/**/structure.scss',
        './src/views-special/**/structure.css',
        './src/views-special/**/*.scss',
        './src/views-special/**/*.css',
        './src/views-pages/**/*.scss',
        './src/views-pages/**/*.css',
        './src/jsx-special/**/*.scss',
        './src/jsx-special/**/*.css',
        './src/jsx-pages/**/*.scss',
        './src/jsx-pages/**/*.css'
    ],
    partials: [
        './src/views-*/**/*.html',
        '!./src/views-ignored/**/*.html',
    ],
    thirdParty: [
        './src/js/lib/react.min.js',   // React MUST be first
        './src/js/lib/react-dom.min.js',   // React MUST be first 
        './src/js/lib/jquery*.js',
        './src/js/lib/underscore-min.js',
        './src/js/lib/backbone-min.js',                
        './src/js/lib/TweenMax.min.js', // include it if its there
    ],
    jsx: [
        './srcbase/js/rc_header_v1.js',
        './srcbase/js/dc_header_v1.js',       
        './src/jsx-pages/**/*.jsx',
        './src/jsx-special/**/*.jsx'
    ],
    js: [
        './srcbase/js/prefix*.js',                    
        './src/js/config/config.js',
        './src/js/config/*.js',
        './src/js/lib_developer/**/*.js',
        './srcbase/htmlcompiled/htmlpartials.js',
        './src/views-special/**/*.js',
        './src/views-pages/**/*.js',
        './src/jsx-pages/**/*.js',  // looks for dev's logic libs here as well
        '!./src/jsx-pages/**/*.spec.js',   //exclude unit test
        './src/jsx-special/**/*.js',  // looks for dev's logic libs here as well
        '!./src/jsx-special/**/*.spec.js', //exclude unit tests
        './srcbase/jsxcompiled/jsxcompiled.js',            
        './srcbase/js/grandcentral.js',
        './srcbase/js/router_base*.js',
        './src/js/router/router_developer.js',
        './srcbase/js/appstarter*.js'
    ],
    unitTests: [
        './platform.spec.js',
        './!(node_modules)/**/*.spec.js'
    ]
};

module.exports = paths;