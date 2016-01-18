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
var insert = require('gulp-insert');
var removeEmptyLines = require('gulp-remove-empty-lines');
var babel = require('gulp-babel');

gulp.task('default', function(){   
	console.log('to use');
	console.log('npm run build');
	console.log('or');
	console.log('npm run buildwatch');			  
});

// build
gulp.task('build', function(callback){
    runSequence('one', 'two', 'three', callback);
});

// gulp.task('build', ['one', 'two', 'three']);
gulp.task('one', function(){   
	console.log('one');  
	//return gulp.src('./src/js/router/**/*.js').pipe(gulp.dest('./public/testing'));
//	return gulp.src(['./src/js/router/appstarter_v1.js', './src/js/router/**/*.js'])
//	return gulp.src('./src/jsx-pages/**/*.jsx')
	return gulp.src('./src/jsx-pages/firefly/firefly.jsx')
                    //src: 'public/jsxcompiled/jsxcompiled.jsx',
                    //dest: 'public/jsxcompiled/jsxcompiled.js'	
		.pipe(babel({
		 	presets: ['es2015']
		}))
        .pipe(strip())
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '// ' + filename + '\n';
			return comment + contents;
		}))
        .pipe(concat('start_test.js'))
        .pipe(removeEmptyLines())
        .pipe(gulp.dest('./public/prod'));

});
gulp.task('two', function(){   
	console.log('two');  
});
gulp.task('three', function(){   
	console.log('three');  
});

gulp.start.apply(gulp, ['default']);