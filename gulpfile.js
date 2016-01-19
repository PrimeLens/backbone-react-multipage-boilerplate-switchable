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
var fc2json = require('gulp-file-contents-to-json');


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
	console.log('1: gather htmlpartials');
	return gulp.src(['./src/views-*/**/*.html'])
//	return gulp.src(['./src/views-pages/**/*.html', './src/views-special/**/*.html'])
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
        // .pipe(strip({ safe : false }))  stip comments crashes and runs really slow
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '// ' + filename + '\n';
			console.log('- ', filename);
			return comment + contents;
		}))
		.pipe(babel({
		 	presets: ['es2015']
		}))		
        //.pipe(concat('start.js'))
        .pipe(concat('jsxcompiled.js'))
        .pipe(removeEmptyLines())
        //.pipe(gulp.dest('./public/prod'));
        .pipe(gulp.dest('./src/jsxcompiled'));	
});
gulp.task('three', function(){   
	console.log('3 compile js and css');  
});

//gulp.start.apply(gulp, ['default']);