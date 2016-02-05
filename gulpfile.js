


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
var jshint = require('gulp-jshint');
var addsrc = require('gulp-add-src');
var paths = require('./config/gulpconfig.js');


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
  return gulp.src(paths.partials)
		.pipe(fc2json('htmlpartials.js', {extname:false, flat:true}))   // add  , {extname:false})) if they accept my pull request
		.pipe(insert.prepend('window.htmlpartials = '))
		.pipe(insert.append(';'))
		.pipe(gulp.dest('./src/htmlcompiled'));
});
gulp.task('two', function(){   
	console.log('2: translate jsx');
  return gulp.src(paths.jsx)
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
  return gulp.src(paths.js)
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))
        .pipe(removeEmptyLines())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))        
        .pipe(addsrc.prepend(paths.thirdParty))
        .pipe(concat('start.js'))
        .pipe(gulp.dest('./public/prod')) ;   
});

gulp.task('four', function(){   
	console.log('4 compile css'); 
  return gulp.src(paths.css)
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(stripcss())
        .pipe(removeEmptyLines())
        .pipe(addsrc.prepend('./src/css/bootstrap.min.css'))
        .pipe(concat('start.css'))
        .pipe(gulp.dest('./public/prod'));	         
});

gulp.task('buildwatch', function(done) {
  gulp.watch(paths.partials, ['one']);
  gulp.watch(paths.jsx, ['two']);
  gulp.watch(paths.js, ['three']);
  gulp.watch(paths.css, ['four']);
});