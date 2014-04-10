module.exports = function(grunt){
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-karma');


	grunt.initConfig({
		
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
			
			options:{
				livereload:true
			},
			
			coffeescript:{
				
				files:[
					
					//for frontEnd
					'app/components/coffee/frontEnd/{,*/}*.coffee',
					
					
				
				],

				tasks:[
					
					'coffee:frontDest'
				]
				
			},

			scripts:{
				files:[
				
					// for backEnd
					'app/components/coffee/backEnd/{,*/}{,*/}*.coffee'

				],

				tasks:[

					'coffee:backDest'

				]
			},

			sass:{
				files:['app/components/sass/*.scss'],
				tasks:['compass:dev']
			},

			html:{
				files:[
					"app/views/*.jade",
					"app/views/**/*.jade",
					"app/public/partials/{,*/}*.html"
				]
			}
		}
	})

	grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['requirejs:compile']);
}