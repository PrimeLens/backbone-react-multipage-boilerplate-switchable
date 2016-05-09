/* 
    each grouping is order dependant !!!!
*/

var paths = {
    sass: [
        './src/views-special/**/structure.scss',
        './src/views-special/**/*.scss',
        './src/views-pages/**/*.scss',
        './src/jsx-special/**/*.scss',
        './src/jsx-pages/**/*.scss'
    ],
    partials: [
        './src/views-*/**/*.html'
    ],
    thirdParty: [
        './src/js/lib/react-min.js',   // React MUST be first or it empties <body>                
        './src/js/lib/jquery*.js',
        './src/js/lib/underscore-min.js',
        './src/js/lib/backbone-min.js',                
        './src/js/lib/TweenMax.min.js', // include it if its there
    ],
    jsx: [
        './srcbase/js/rc_header_v1.js',
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