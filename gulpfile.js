


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
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var replace = require('gulp-batch-replace');
var strip = require('gulp-strip-comments');
var stripcss = require('gulp-strip-css-comments');
var insert = require('gulp-insert');
var removeEmptyLines = require('gulp-remove-empty-lines');
var babel = require('gulp-babel');
var fc2json = require('gulp-file-contents-to-json');
var addsrc = require('gulp-add-src');
var karma = require('karma').Server;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var paths = require('./gulpconfig/gulpconfig.js');
var del = require('del');


gulp.task('default', function(){
    console.log('to use');
    console.log('npm run build');
    console.log('or');
    console.log('npm run buildwatch');
});

// build
gulp.task('build', function(done){
    runSequence(['1:partials', '2:jsx', '3:cssBundle'], ['4:jsBundle'], done);
});

gulp.task('1:partials', function(){
    return gulp.src(paths.partials)
    	.pipe(fc2json('htmlpartials.js', {extname:false, flat:true}))   // add  , {extname:false})) if they accept my pull request
    	.pipe(insert.prepend('window.htmlpartials = '))
    	.pipe(insert.append(';'))
    	.pipe(gulp.dest('./srcbase/htmlcompiled'));
});

gulp.task('2:jsx', function(){
    return gulp.src(paths.jsx)
		// insert header comment showing filename and tag it so its not deleted
		.pipe(insert.transform(function(contents, file) {
			var filename = file.path.replace(file.base,'');
			var comment = '/*! ' + filename + ' */ \n';
			return comment + contents;
		}))
        /*
        ** Plumber provides custom error-handling.
        ** 'Found an error' text is printed in red to make it easier to pinpoint errors in the output.
        ** Also, there is no need to restart Gulp after finding an error.
        */
        .pipe(plumber({
            errorHandler: function(error) {
                gutil.log(
                    gutil.colors.cyan('Plumber') + gutil.colors.red(' found an error:\n'),
                    error.toString()
                );
                this.emit('end');
            }
        }))
    	// translate jsx
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(plumber.stop())
    	// remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))
        .pipe(removeEmptyLines())
        .pipe(concat('jsxcompiled.js'))
        .pipe(gulp.dest('./srcbase/jsxcompiled'));
});

gulp.task('3:cssBundle', function(){
    return gulp.src(paths.sass)
        .pipe(plumber({
          errorHandler: function(error) {
            gutil.log(
              gutil.colors.cyan('Plumber') + gutil.colors.red(' found an error:\n'),
              error.toString()
            );
            this.emit('end');
          }
        }))

        .pipe(plumber.stop())
        .pipe(autoprefixer())
            // insert header comment showing filename and tag it so its not deleted
            .pipe(insert.transform(function(contents, file) {
                var filename = file.path.replace(file.base,'');
                var comment = '/*! ' + filename + ' */ \n';
                return comment + contents;
            }))
            // remove comments, cannot strip comments from jsx file as it crashes
        .pipe(concat('start.scss'))
        .pipe(sass({
            // outputStyle: 'compressed',
            outputStyle: 'nested',
            sourceComments: 'map',
            includePaths: []
        }))
        .pipe(stripcss())
        .pipe(removeEmptyLines())
        .pipe(addsrc.prepend('./src/css/bootstrap.min.css'))
        .pipe(concat('start.css'))
        .pipe(gulp.dest('./public/prod'));
});

gulp.task('4:jsBundle', function(){
    return gulp.src(paths.js)
        // Remove 'use strict';
        .pipe(replace([ [ /('|")use strict\1;/g, '' ] ]))
        // insert header comment showing filename and tag it so its not deleted
        .pipe(insert.transform(function(contents, file) {
            var filename = file.path.replace(file.base,'');
            var comment = '/*! ' + filename + ' */ \n';
            return comment + contents;
        }))
        // remove comments, cannot strip comments from jsx file as it crashes
        .pipe(strip({ safe : true }))
        .pipe(removeEmptyLines())
        .pipe(addsrc.prepend(paths.thirdParty))
        .pipe(concat('start.js'))
        .pipe(gulp.dest('./public/prod')) ;
});

gulp.task('test', function(done) {
    var karmaServer = new karma({
        singleRun: true,
        configFile: __dirname + '/karma.conf.js'
    });
    karmaServer.on('run_complete', function(browsers, results) {
        done(results.error ? 'There are test failures' : null);
    });
    karmaServer.start();
});

gulp.task('testwatch', function(done) {
    new karma({
        singleRun: false,
        configFile: __dirname + '/karma.conf.js'
    }, function(){ done(); }).start();
});

gulp.task('buildtest', function(done) {
    runSequence(['build'], ['test']);
});

gulp.task('buildwatch', function(done) {
    runSequence(['build']);
    gulp.watch(paths.partials, ['1:partials']);
    gulp.watch(paths.jsx, ['2:jsx']);
    gulp.watch(paths.sass, ['3:cssBundle']);
    gulp.watch(paths.js, ['4:jsBundle']);
    gulp.watch(paths.unitTests, ['testwatch']);
});

gulp.task('clean', function() {
    return del([
        // Delete everything inside of folder
        './srcbase/htmlcompiled/**/*',
        './srcbase/jsxcompiled/**/*'
    ]);
});

var killdemofilepaths = require('./gulpconfig/killdemofilepaths');
gulp.task('killdemofiles', function() {   return del( killdemofilepaths );  });
gulp.task('killdemocode', function() {
    gulp.src(
        [
            'src/js/router/router_developer.js',
            'src/jsx-special/nav/nav.jsx',
            'src/jsx-special/mainmodal/mainmodal.jsx'
        ],
        {base: './'}
    )
    .pipe(replace([
        // the following four change the switch in mainmodal
    	[ /rc\.attackontitanModal/g, 'rc.demoModal1' ],
        [ /rc\.deathnoteModal/g, 'rc.demoModal2' ],
    	[ /case\s'attackontitanModal''/g, '// case \'demoModal1\'' ],
    	[ /case\s'deathnoteModal''/g, '// case \'demoModal2\'' },
        // for router_developer.js
        // this pattern matches all of the developer routes (including Ex Machina Backbone/jQuery view)
        // the way it does NOT delete home,  exception is it doesnt match a word, it has ?path which doesn't match
        // the way it does NOT delete badroute,  is the * causes it to not match
        [ /'\w+\(\/\*path\)'\:\s+function\(f,\s+q\){\s+\w+.routeTunnel\('\w+',\s+'\w+',\s+\w+.\w+,\s+f,\s+q\)\;\s+},\n/g, '' ],
        // Remove links form nav
        [ /\<a\s+className=\{this.getClassNameWithActive\('\w+'\)}\s+href="\#(.*)?"\>(.*)\<\/a\>\n/g, '']
    ]))
    .pipe(gulp.dest('.'));

    // TO DO  the use strict has come back (This is removed by using gulp-batch-replace)
    // TO DO  need regex to clean out the buttons in nav.jsx (this is covered by the last regex in the previous task)
    // TO DO   line to kill the instantiation of the exmachina view in router_developer (this is covered by the updated regex for router)
});
gulp.task('killdemo', function() {   runSequence(['killdemofiles', 'killdemocode']);   });
gulp.task('killdemos', function() {   runSequence(['killdemofiles', 'killdemocode']);   });


/*
    // Not sure if string_src is still needed.  Added by tk on 2/5 for platform testing
    // marked for deletion

    function string_src(filename, string) {
        var src = require('stream').Readable({ objectMode: true })
        src._read = function () {
            this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
            this.push(null);
        }
        return src
}
*/
