module.exports = function(grunt){
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-coffeelint');
	grunt.loadNpmTasks('grunt-notify');


	grunt.initConfig({
		

		coffeelint: {
		
			app: [
				'app/components/coffee/**/{,*/}*.coffee'
			]
		
		},
		

		compass:{
			dev:{
				options:{
					config:'config.rb'
				}
			}
		},

		//convert CoffeeScript to JavaScript
		coffee:{
		
			frontDest: {
				files: [{
					expand: true,
					cwd: 'app/components/coffee/frontEnd',
					src: ['{,*/}*.coffee'],
					dest: 'app/public/js',
					rename: function(dest, src) {

						return dest + '/' + src.replace(/\.coffee$/, '.js');
					}
				}]
			},

			backDest:{
				files: [{
					expand: true,
					cwd: 'app/components/coffee/backEnd',
					src: ['{,*/}{,*/}*.coffee'],
					dest: 'app',
					rename: function(dest, src) {
						return dest + '/' + src.replace(/\.coffee$/, '.js');
					}
				}]
			}
		},

		protractor: {
			options: {
				configFile: "test/protractor.conf.js", // Default config file
				keepAlive: true, // If false, the grunt process stops when the test fails.
				noColor: false, // If true, protractor will not use colors in its output.
			},
			run:{}
		    
		},

		karma: {
			unit: {
				configFile: 'test/karma.conf.js'
			}
		},


		//require js optimizer
		requirejs : {
          	compile : {
             	options : {
                	mainConfigFile: './app/public/js/main.js',
                	baseUrl: './app/public/js',

                	//you have to turn off mangle for Angular
                	uglify2: {
			            mangle: false
			        },
			        optimize: 'uglify2',
				    name:'main',
				    out: "./app/public/js/main-built.js",
				    fileExclusionRegExp: /^(r|build)\.js$/,
				    optimizeCss: "none",
				    paths: {
				        'angular'     : '../vendors/angular/angular',
				        'angularMocks': '../vendors/angular-mocks/angular-mocks',
				        'domReady'    : '../vendors/requirejs-domready/domready',
				        'angularRoute': '../vendors/angular-route/angular-route'
				    },
				    shim: {
				        'angular' :{'exports':'angular'},
				        'angularRoute' :['angular'],
				        'angularMocks':{
				            deps: ['angular'],
				            'exports':'angular.mock'
				        }
				    },
                	
                	normalizeDirDefines: 'all',
                	
                	onBuildRead: function (moduleName, path, contents) {
                    	var ngmin = require('ngmin');
                    	console.log(ngmin);
                    	return ngmin.annotate(contents);
                	}
             }
           }
        },

        

		// watch any changes in files
		watch:{
			
			
			coffeescript:{
				
				files:[
					
					//for frontEnd
					'app/components/coffee/frontEnd/{,*/}*.coffee',
					
					
				
				],

				tasks:[
					
					'coffee:frontDest',
					'coffeelint'
					
				],

				options:{
					livereload:true
				}
				
			},

			scripts:{
				files:[
				
					// for backEnd
					'app/components/coffee/backEnd/{,*/}{,*/}*.coffee'

				],

				tasks:[

					'coffee:backDest',
					'coffeelint'
					
				],

				options:{
					livereload:true
				}
			},

			e2eTest:{
				
				files: [
					
					'app/public/js/{,*/}*.js',
					'app/components/coffee/**/{,*/}*.coffee'
				
				],

				tasks: ['protractor:run']    // The tasks to run when watched files changed
				
			},

			sass:{
				files:['app/components/sass/*.scss'],
				tasks:['compass:dev'],
				options:{
					livereload:true
				}
			},

			html:{
				files:[
					"app/views/*.jade",
					"app/views/**/*.jade",
					"app/public/partials/{,*/}*.html"
				],
				options:{
					livereload:true
				}
			}
		}
	})

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('test:unit', ['karma:unit']);
	grunt.registerTask('test:e2e', ['protractor']);
    grunt.registerTask('build', ['requirejs:compile']);
}