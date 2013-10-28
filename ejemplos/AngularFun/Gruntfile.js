(function() {
  module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
      bower: {
        install: {
          options: {
            copy: false
          }
        },
        uninstall: {
          options: {
            cleanBowerDir: true,
            copy: false,
            install: false
          }
        }
      },
      clean: {
        working: ['./.temp/', './dist/'],
        jslove: ['**/*.coffee', '!**/bower_components/**', '!**/node_modules/**']
      },
      coffee: {
        app: {
          cwd: './.temp/',
          src: '**/*.coffee',
          dest: './.temp/',
          expand: true,
          ext: '.js',
          options: {
            sourceMap: true
          }
        },
        jslove: {
          files: [
            {
              cwd: './',
              src: ['**/*.coffee', '!**/bower_components/**', '!**/node_modules/**'],
              dest: './',
              expand: true,
              ext: '.js'
            }
          ]
        }
      },
      coffeelint: {
        files: './src/scripts/**/*.coffee',
        options: {
          indentation: {
            value: 1
          },
          max_line_length: {
            level: 'ignore'
          },
          no_tabs: {
            level: 'ignore'
          }
        }
      },
      connect: {
        app: {
          options: {
            base: './dist/',
            livereload: true,
            middleware: require('./middleware'),
            open: true,
            port: 0
          }
        }
      },
      copy: {
        app: {
          files: [
            {
              cwd: './src/',
              src: '**',
              dest: './.temp/',
              expand: true
            }, {
              cwd: './bower_components/angular/',
              src: 'angular.*',
              dest: './.temp/scripts/libs/',
              expand: true
            }, {
              cwd: './bower_components/angular-animate/',
              src: 'angular-animate.*',
              dest: './.temp/scripts/libs/',
              expand: true
            }, {
              cwd: './bower_components/angular-route/',
              src: 'angular-route.*',
              dest: './.temp/scripts/libs/',
              expand: true
            }, {
              cwd: './bower_components/bootstrap/less/',
              src: '*',
              dest: './.temp/styles/',
              expand: true
            }, {
              cwd: './bower_components/bootstrap/fonts/',
              src: '*',
              dest: './.temp/fonts/',
              expand: true
            }, {
              cwd: './bower_components/html5shiv/dist/',
              src: 'html5shiv-printshiv.js',
              dest: './.temp/scripts/libs/',
              expand: true
            }, {
              cwd: './bower_components/json3/lib/',
              src: 'json3.min.js',
              dest: './.temp/scripts/libs/',
              expand: true
            }, {
              cwd: './bower_components/requirejs/',
              src: 'require.js',
              dest: './.temp/scripts/libs/',
              expand: true
            }
          ]
        },
        dev: {
          cwd: './.temp/',
          src: '**',
          dest: './dist/',
          expand: true
        },
        prod: {
          files: [
            {
              cwd: './.temp/',
              src: 'fonts/**',
              dest: './dist/',
              expand: true
            }, {
              cwd: './.temp/',
              src: 'images/**',
              dest: './dist/',
              expand: true
            }, {
              cwd: './.temp/',
              src: ['scripts/ie.min.*.js', 'scripts/scripts.min.*.js'],
              dest: './dist/',
              expand: true
            }, {
              cwd: './.temp/',
              src: 'styles/styles.min.*.css',
              dest: './dist/',
              expand: true
            }, {
              './dist/index.html': './.temp/index.min.html'
            }
          ]
        }
      },
      hash: {
        images: './.temp/images/**/*',
        scripts: {
          cwd: './.temp/scripts/',
          src: ['ie.min.js', 'scripts.min.js'],
          expand: true
        },
        styles: './.temp/styles/styles.min.css'
      },
      imagemin: {
        images: {
          files: [
            {
              cwd: './.temp/',
              src: 'images/**/*.png',
              dest: './.temp/',
              expand: true
            }
          ],
          options: {
            optimizationLevel: 7
          }
        }
      },
      jade: {
        views: {
          cwd: './.temp/',
          src: '**/views/*.jade',
          dest: './.temp/',
          expand: true,
          ext: '.html',
          options: {
            pretty: true
          }
        },
        spa: {
          cwd: './.temp/',
          src: 'index.jade',
          dest: './.temp/',
          expand: true,
          ext: '.html',
          options: {
            pretty: true
          }
        }
      },
      karma: {
        unit: {
          options: {
            browsers: ['PhantomJS'],
            captureTimeout: 5000,
            colors: true,
            files: ['./dist/scripts/libs/angular.js', './dist/scripts/libs/angular-animate.js', './dist/scripts/libs/angular-route.js', './bower_components/angular-mocks/angular-mocks.js', './dist/scripts/**/*.js', './test/scripts/**/*.{coffee,js}'],
            frameworks: ['jasmine'],
            junitReporter: {
              outputFile: './test-results.xml'
            },
            keepalive: false,
            logLevel: 'INFO',
            port: 9876,
            preprocessors: {
              '**/*.coffee': 'coffee'
            },
            reporters: ['dots', 'junit', 'progress'],
            runnerPort: 9100,
            singleRun: true
          }
        }
      },
      less: {
        app: {
          files: {
            './.temp/styles/styles.css': './.temp/styles/styles.less'
          }
        }
      },
      minifyHtml: {
        prod: {
          src: './.temp/index.html',
          ext: '.min.html',
          expand: true
        }
      },
      ngTemplateCache: {
        views: {
          files: {
            './.temp/scripts/views.js': './.temp/views/**/*.html'
          },
          options: {
            trim: './.temp'
          }
        }
      },
      requirejs: {
        scripts: {
          options: {
            baseUrl: './.temp/scripts/',
            findNestedDependencies: true,
            logLevel: 0,
            mainConfigFile: './.temp/scripts/main.js',
            name: 'main',
            onBuildWrite: function(moduleName, path, contents) {
              var modulesToExclude, shouldExcludeModule;
              modulesToExclude = ['main'];
              shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;
              if (shouldExcludeModule) {
                return '';
              }
              return contents;
            },
            optimize: 'uglify2',
            out: './.temp/scripts/scripts.min.js',
            preserveLicenseComments: false,
            skipModuleInsertion: true,
            uglify: {
              no_mangle: false
            },
            useStrict: true,
            wrap: {
              start: '(function(){\'use strict\';',
              end: '}).call(this);'
            }
          }
        },
        styles: {
          options: {
            baseUrl: './.temp/styles/',
            cssIn: './.temp/styles/styles.css',
            logLevel: 0,
            optimizeCss: 'standard',
            out: './.temp/styles/styles.min.css'
          }
        }
      },
      shimmer: {
        scripts: {
          cwd: './.temp/scripts/',
          src: ['**/*.{coffee,js}', '!libs/angular.{coffee,js}', '!libs/angular-animate.{coffee,js}', '!libs/angular-route.{coffee,js}', '!libs/html5shiv-printshiv.{coffee,js}', '!libs/json3.min.{coffee,js}', '!libs/require.{coffee,js}'],
          order: [
            'libs/angular.min.js', {
              'NGAPP': {
                'ngAnimate': 'libs/angular-animate.min.js',
                'ngRoute': 'libs/angular-route.min.js'
              }
            }
          ],
          require: 'NGBOOTSTRAP'
        }
      },
      template: {
        indexDev: {
          files: {
            './.temp/index.html': './.temp/index.html',
            './.temp/index.jade': './.temp/index.jade'
          }
        },
        index: {
          files: '<%= template.indexDev.files %>',
          environment: 'prod'
        }
      },
      uglify: {
        scripts: {
          files: {
            './.temp/scripts/ie.min.js': ['./.temp/scripts/libs/json3.js', './.temp/scripts/libs/html5shiv-printshiv.js']
          }
        }
      },
      watch: {
        basic: {
          files: ['./src/fonts/**', './src/images/**', './src/scripts/**/*.js', './src/styles/**/*.css', './src/views/**/*.html'],
          tasks: ['copy:app', 'copy:dev', 'karma'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        coffee: {
          files: './src/scripts/**/*.coffee',
          tasks: ['coffeelint', 'copy:app', 'coffee:app', 'copy:dev', 'karma'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        jade: {
          files: './src/views/**/*.jade',
          tasks: ['copy:app', 'jade:views', 'copy:dev', 'karma'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        less: {
          files: './src/styles/**/*.less',
          tasks: ['copy:app', 'less', 'copy:dev'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        spaHtml: {
          files: './src/index.html',
          tasks: ['copy:app', 'template:indexDev', 'copy:dev', 'karma'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        spaJade: {
          files: './src/index.jade',
          tasks: ['copy:app', 'template:indexDev', 'jade:spa', 'copy:dev', 'karma'],
          options: {
            livereload: true,
            nospawn: true
          }
        },
        test: {
          files: './test/**/*.*',
          tasks: ['karma']
        },
        none: {
          files: 'none',
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.event.on('watch', function(action, filepath, key) {
      var basename, coffeeConfig, coffeeLintConfig, copyDevConfig, dirname, ext, file, jadeConfig, path;
      path = require('path');
      file = filepath.substr(4);
      dirname = path.dirname(file);
      ext = path.extname(file);
      basename = path.basename(file, ext);
      grunt.config(['copy', 'app'], {
        cwd: './src/',
        src: file,
        dest: './.temp/',
        expand: true
      });
      copyDevConfig = grunt.config(['copy', 'dev']);
      copyDevConfig.src = file;
      if (key === 'coffee') {
        copyDevConfig.src = path.join(dirname, "" + basename + ".{coffee,js,js.map}");
        coffeeConfig = grunt.config(['coffee', 'app']);
        coffeeConfig.src = file;
        coffeeLintConfig = grunt.config(['coffeelint', 'files']);
        coffeeLintConfig = filepath;
        grunt.config(['coffee', 'app'], coffeeConfig);
        grunt.config(['coffeelint', 'files'], coffeeLintConfig);
      }
      if (key === 'spaJade') {
        copyDevConfig.src = path.join(dirname, "" + basename + ".{jade,html}");
      }
      if (key === 'jade') {
        copyDevConfig.src = path.join(dirname, "" + basename + ".{jade,html}");
        jadeConfig = grunt.config(['jade', 'views']);
        jadeConfig.src = file;
        grunt.config(['jade', 'views'], jadeConfig);
      }
      if (key === 'less') {
        copyDevConfig.src = [path.join(dirname, "" + basename + ".{less,css}"), path.join(dirname, 'styles.css')];
      }
      return grunt.config(['copy', 'dev'], copyDevConfig);
    });
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-hustler');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('build', ['clean:working', 'coffeelint', 'copy:app', 'shimmer', 'coffee:app', 'less', 'template:indexDev', 'jade', 'copy:dev']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);
    grunt.registerTask('dev', ['default']);
    grunt.registerTask('prod', ['clean:working', 'coffeelint', 'copy:app', 'shimmer', 'coffee:app', 'imagemin', 'hash:images', 'less', 'jade:views', 'ngTemplateCache', 'requirejs', 'uglify', 'hash:scripts', 'hash:styles', 'template:index', 'jade:spa', 'minifyHtml', 'copy:prod']);
    grunt.registerTask('server', ['connect', 'watch:none']);
    grunt.registerTask('test', ['build', 'karma']);
    return grunt.registerTask('jslove', ['coffee:jslove', 'clean:jslove']);
  };

}).call(this);
