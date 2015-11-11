module.exports = function(grunt){


    grunt.initConfig({
        babel: {/*
            options: {
                sourceMap: true
                //process: function(){ console.log('processing'); }
            },*/
            dist: {
                //https://github.com/babel/grunt-babel/issues/5
                files: [{
                    //expand: true,
                    //cwd: 'jsxcompiled',
                    src: 'public/jsxcompiled/jsxcompiled.jsx',
                    dest: 'public/jsxcompiled/jsxcompiled.js'
                    //ext: '.js'
                }]
            }
        },
        htmlConvert: {
            options: {
                base: 'public/html',
                rename : function (moduleName) {
                    moduleName = moduleName.split('/');
                    moduleName = moduleName[moduleName.length-1];
                    return moduleName.replace('.html', '');
                }
            },
            htmlpartials: {
                src: [
                    'public/views-special/**/*.html',
                    'public/views-pages/**/*.html'
                ],
                dest: 'public/htmlcompiled/partials.js'
            }
        },
		concat : {
            options: {
                banner: '\n/**** COMPILED <%= grunt.template.today("yyyy-mm-dd") %> ****/\n\n',
                process: function(src, filepath) {
                    //console.log('===> ', src);
                    //console.log('===> ', filepath);

                    // bypass if jsx, to abort we return src with the date prepended
                    if (filepath.indexOf('jsx') > -1) {    
                        return '/* ' + filepath + ' */\n' + src;
                    }

                    // bypass if bootstrap, to abort we return src with the date prepended
                    if (filepath.indexOf('bootstrap') > -1) {    
                        return '/* ' + filepath + ' */\n' + src;
                    }

                    // the following is a partial minification. The goal is to have a human readable 
                    // script for debugging in the browser yet small so that all
                    // extra comments, newlines and indents are removed

                    var uid = '_' + +new Date(),
                        primatives = [],
                        primIndex = 0;
                    var answer = src;
                    //  avoid lib folder, its already minified
                    if (filepath.indexOf('public/js/lib/') == -1) {
                        // http://james.padolsey.com/javascript/javascript-comment-removal-revisted/
                        // remove strings
                        answer = answer.replace(/(['"])(\\\1|.)+?\1/g, function(match){
                            primatives[primIndex] = match;
                            return (uid + '') + primIndex++;
                        });
                        // remove regexs
                        answer = answer.replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function(match, $1, $2){
                            primatives[primIndex] = $2;
                            return $1 + (uid + '') + primIndex++;
                        });

                        // Remove single-line comments that contain would-be multi-line delimiters
                        // Remove multi-line comments that contain would be single-line delimiters
                        //    i have found this to break on occasion
                        // answer = answer.replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '');

                        // Remove single and multi-line comments, no consideration of inner-contents
                        answer = answer.replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '');

                        // Remove multi-line comments that have a replaced ending (string/regex), so no inner strings/regexes will stop it.
                        answer = answer.replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '');

                        answer = answer.replace(/\t/g, ' ');  //  removes tabs
                        answer = answer.replace(/\n{2,}/g, '\n');  //  removes extra new lines
                        answer = answer.replace(/ {2,}/g, ' '); //  removes extra spaces
                        answer = answer.replace(/\n \n/g, '\n'); //  swap any newline-space-newlines combos for a newline
                        answer = answer.replace(/\n /g, '\n'); //  swap any newline-space combos for a newline
                        if (answer[0] == '\n') answer = answer.substr(1); // remove first character if its a newline
                        if (answer[answer.length - 1] == '\n') answer = answer.substr(0, answer.length - 1); // remove last character if its a newline
                        // bring back the strings
                        answer = answer.replace(RegExp(uid + '(\\d+)', 'g'), function(match, n){
                            return primatives[n];
                        });
                    }
                    // for htmlpartials remove html comments
                    if (filepath.indexOf('htmlcompiled/partials.js') > -1) {
                        answer = answer.replace(/<!--[\s\S]*?-->/g, '');
                    }

                    return '/* ' + filepath + ' */\n' + answer;
                }
            },
            jsx : {
                src : [
                    'public/js/router/rc_header_v1.js',
                    'public/jsx-pages/**/*.jsx',
                    'public/jsx-special/**/*.jsx'
                ],
                dest : 'public/jsxcompiled/jsxcompiled.jsx'
            },
			js : {
				src : [
                    'public/js/lib/react.js',   // React MUST be first or it empties <body>                
                    'public/js/router/prefix*.js',
                    'public/js/lib/jquery*.js',
                    'public/js/lib/underscore-min.js',
                    'public/js/lib/backbone-min.js',                
                    'public/js/lib/**/*.js',
                    'public/js/config/config.js',
                    'public/js/config/*.js',
                    'public/js/lib_developer/**/*.js',
                    'public/js/components/**/*.js',
                    'public/htmlcompiled/*.js',
                    'public/views-special/**/*.js',
                    'public/views-pages/**/*.js',
                    'public/jsxcompiled/jsxcompiled.js',            
                    'public/js/router/grandcentral.js',
                    'public/js/router/router_base*.js',
                    'public/js/router/router_developer.js',
                    'public/js/router/appstarter*.js'
				],
				dest : 'public/prod/start.js'
			},
			css : {
				src : [
                    'public/css/bootstrap.min.css',    //
                    'public/views-special/**/structure.css',    //
                    'public/views-special/**/*.css',    //
                    'public/views-pages/**/*.css',    //   
                    'public/jsx-special/**/*.css',    //
                    'public/jsx-pages/**/*.css'    //
				],
				dest : 'public/prod/start.css'
			}
		},
		watch : {
			js : {
				files : [
                    'public/js/**/*.js',
                    'public/views-special/**/*.js',    //
                    'public/views-pages/**/*.js',    //                    
                    'public/jsx-special/**/*.jsx',    //
                    'public/jsx-pages/**/*.jsx'    //
                ],
				tasks : ['clean:jsonly', 'concat:jsx', 'babel', 'concat:js']
			},
			css : {
				files : [
                    'public/views-special/**/*.css',    //
                    'public/views-pages/**/*.css',    //                 
                    'public/jsx-special/**/*.css',    //
                    'public/jsx-pages/**/*.css'    //
                ],
				tasks : ['clean:cssonly', 'concat:css']
			},
            html : {
                files : [
                    'public/views-special/**/*.html',    //
                    'public/views-pages/**/*.html'    //
                ],
                tasks : ['clean:jsonly', 'htmlConvert', 'concat:jsx', 'babel', 'concat:js']
            }
		},
		clean : {
            build : ['public/prod/**', 'public/jsxcompiled/**'],
            cssonly : ['public/prod/*.css'],
            jsonly : ['public/prod/*.js', 'public/jsxcompiled/**']
		}
			
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');    
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html-convert');
    grunt.loadNpmTasks('grunt-babel');

	
	grunt.registerTask('build', ['clean:build', 'htmlConvert', 'concat:jsx', 'babel', 'concat:js', 'concat:css']);
	grunt.registerTask('buildwatch', ['clean:build', 'htmlConvert', 'concat:jsx', 'babel', 'concat:js', 'concat:css', 'watch']);
	// usage grunt babel

	



};