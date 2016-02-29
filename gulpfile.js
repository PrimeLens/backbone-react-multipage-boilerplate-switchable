


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
var del = require('del');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var strip = require('gulp-strip-comments');
var stripcss = require('gulp-strip-css-comments');
var insert = require('gulp-insert');
var removeEmptyLines = require('gulp-remove-empty-lines');
var babel = require('gulp-babel');
var fc2json = require('gulp-file-contents-to-json');
var jshint = require('gulp-jshint');
var addsrc = require('gulp-add-src');
var karma = require('karma').Server;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var paths = require('./config/gulpconfig.js');
var jshintConfig = require('./package').jshintConfig;
jshintConfig.lookup = false;


gulp.task('default', function(){   
	console.log('to use');
	console.log('npm run build');
	console.log('or');
	console.log('npm run buildwatch');			  
});

// build
gulp.task('build', function(callback){
  runSequence(['1:partials', '2:jsx', '3:cssBundle'], ['4:jsBundle'], callback);
});

gulp.task('1:partials', function(){   
  return gulp.src(paths.partials)
		.pipe(fc2json('htmlpartials.js', {extname:false, flat:true}))   // add  , {extname:false})) if they accept my pull request
		.pipe(insert.prepend('window.htmlpartials = '))
		.pipe(insert.append(';'))
		.pipe(gulp.dest('./src/htmlcompiled'));
});
gulp.task('2:jsx', function(){   
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

gulp.task('3:cssBundle', function(){   
  return gulp.src(paths.sass)
    .pipe(sass({
      // outputStyle: 'compressed',
      outputStyle: 'nested',
      sourceComments: 'map',
      includePaths: []
    }))
    .pipe(autoprefixer())
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
      var filename = file.path.replace(file.base,'').replace('.css','.scss');
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

gulp.task('4:jsBundle', function(){   
  return gulp.src(paths.js)
    // Remove 'use strict';
    .pipe(replace(/('|")use strict\1;/g, ''))
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))        
		// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))
        .pipe(removeEmptyLines())
        .pipe(addsrc.prepend(paths.thirdParty))
        .pipe(concat('start.js'))
        .pipe(gulp.dest('./public/prod')) ;   
});

/*
 *  Per request, platform unit tests are defined in this gulp js file.
 *  Global tests are written to a temporary spec file that the test runner's browser loads.
 *  The temporary spec file is deleted when Gulp is done watching for changes.
*/
gulp.task('writePlatformTests', function(done) {
  var tests = function() {
    it('Router base js should not be changed', function() {
      console.log('Router base js should not be changed.');
      var checksum = objectHash(routerSetupConfig);
      expect(checksum).toBe('0b01bfaaf5a56e818198731fc6fa85ff322fcfe0');
    });
    it('should run this example test', function() {
      console.log('This sample test should run.');
      expect(1).toBe(1);
    });
  };
  tests = 'describe(\'suite of tests for the platform\',' + tests + ');';
  return string_src('platform.spec.js', tests)
    .pipe(gulp.dest('./'))
});

gulp.task('test', function(done) {
  new karma({
    configFile: __dirname + '/karma.conf.js'
  }, function(){ gulp.run('clean'); done(); }).start();
});

gulp.task('clean', function(done) {
  del(['./platform.spec.js']);
});

gulp.task('buildwatch', function(done) {
  gulp.start('writePlatformTests');
  gulp.watch(paths.partials, ['1:partials']);
  gulp.watch(paths.jsx, ['2:jsx']);
  gulp.watch(paths.sass, ['3:cssBundle']);
  gulp.watch(paths.js, ['4:jsBundle']);
  gulp.watch(paths.unitTests, ['test']);
});

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}