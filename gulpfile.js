


/*
			to use
			npm run build
			or
			npm run buildwatch
*/

// this gulp is set up so you do NOT need to install gulp globally
// http://stackoverflow.com/questions/33018779/using-gulp-without-global-gulp-edit-and-without-linking-to-the-bin-js-file
// http://stackoverflow.com/questions/22115400/why-do-we-need-to-install-gulp-globally-and-locally

// this gulp is set up to NOT use gulp serve. We want to use the express server provided instead as 
// there will be proxy endpoints.
// so in effect gulp, is no different to grunt in the task it performs here

// final note:  .babelrc is required as well as two babel preset modules listed in package.json


var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var strip = require('gulp-strip-comments');
var stripcss = require('gulp-strip-css-comments');
var insert = require('gulp-insert');
var removeEmptyLines = require('gulp-remove-empty-lines');
var babel = require('gulp-babel');
var fc2json = require('gulp-file-contents-to-json');


gulp.task('default', function(){   
	console.log('to use');
	console.log('npm run build');
	console.log('or');
	console.log('npm run buildwatch');			  
});

// build
gulp.task('build', function(callback){
    runSequence('one', 'two', 'three', 'four', callback);
});

gulp.task('one', function(){   
	console.log('1: gather htmlpartials');
	return gulp.src(['./src/views-*/**/*.html'])
		.pipe(fc2json('htmlpartials.js', {extname:false, flat:true}))   // add  , {extname:false})) if they accept my pull request
		.pipe(insert.prepend('window.htmlpartials = '))
		.pipe(insert.append(';'))
		.pipe(gulp.dest('./src/htmlcompiled'));
});
gulp.task('two', function(){   
	console.log('2: translate jsx');
	return gulp.src([
            './src/js/router/rc_header_v1.js',
            './src/jsx-pages/**/*.jsx',
            './src/jsx-special/**/*.jsx'
        ])
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			console.log('- ', filename);
			return comment + contents;
		}))
		// translate jsx
		.pipe(babel({
		 	presets: ['es2015']
		}))
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))		
        .pipe(removeEmptyLines())
        .pipe(concat('jsxcompiled.js'))
        .pipe(gulp.dest('./src/jsxcompiled'));	
});
gulp.task('three', function(){   
	console.log('3 compile js'); 
	return gulp.src([
                    './src/js/lib/react.js',   // React MUST be first or it empties <body>                
                    './src/js/router/prefix*.js',
                    './src/js/lib/jquery*.js',
                    './src/js/lib/underscore-min.js',
                    './src/js/lib/backbone-min.js',                
                    './src/js/lib/**/*.js',
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
        ])
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))
        .pipe(removeEmptyLines())
        .pipe(concat('start.js'))
        .pipe(gulp.dest('./public/prod'));	         
});

gulp.task('four', function(){   
	console.log('4 compile css'); 
	return gulp.src([
                    './src/css/bootstrap.min.css',
                    './src/views-special/**/structure.css',
                    './src/views-special/**/*.css',
                    './src/views-pages/**/*.css',
                    './src/jsx-special/**/*.css',
                    './src/jsx-pages/**/*.css'
        ])
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(stripcss())
        .pipe(removeEmptyLines())
        .pipe(concat('start.css'))
        .pipe(gulp.dest('./public/prod'));	         
});
