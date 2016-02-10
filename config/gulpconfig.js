var paths = {
  partials: [
    './src/views-*/**/*.html'
  ],
  sass: [
    './src/views-special/**/structure.scss',
    './src/views-special/**/*.scss',
    './src/views-pages/**/*.scss',
    './src/jsx-special/**/*.scss',
    './src/jsx-pages/**/*.scss'
  ],
  thirdParty: [
    './src/js/lib/react.js',   // React MUST be first or it empties <body>                
    './src/js/lib/jquery*.js',
    './src/js/lib/underscore-min.js',
    './src/js/lib/backbone-min.js',                
    './src/js/lib/TweenMax.min.js',
  ],
  jsx: [
    './src/js/router/rc_header_v1.js',
    './src/jsx-pages/**/*.jsx',
    './src/jsx-special/**/*.jsx'
  ],
  js: [
    './src/js/router/prefix*.js',                    
    './src/js/config/config.js',
    './src/js/config/*.js',
    './src/js/lib_developer/**/*.js',
    './src/js/components/**/*.js',
    './src/htmlcompiled/*.js',
    './src/views-special/**/*.js',
    './src/views-pages/**/*.js',
    './src/jsxcompiled/jsxcompiled.js',            
    './src/js/router/grandcentral.js',
    './src/js/router/router_base*.js',
    './src/js/router/router_developer.js',
    './src/js/router/appstarter*.js'
  ],
  unitTests: [
    './!(node_modules)/**/*.spec.js'
  ]
};

module.exports = paths;