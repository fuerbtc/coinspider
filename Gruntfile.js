// Generated on 2013-10-10 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist',
            tmp: '.tmp'
        },
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.tmp %>/*.html',
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.tmp %>/styles/{,*/}*.css',
                    '{<%= yeoman.tmp %>,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            //Transform Jade Templates into Html
            jade: {
                files: ['<%= yeoman.app %>/static_html/**/*.jade'],
                tasks: ['jade']
            },

            test : {
                files : [
                    '{<%= yeoman.app %>}/scripts/{,*/}*.js',
                    'test/{,*/}*.js'
                ],
                tasks : ['shell:test']
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '<%= yeoman.app %>',
                        'test'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.tmp %>',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '<%= yeoman.tmp %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run:  false,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html'],
                    log : true
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.tmp %>/styles',
                generatedImagesDir: '<%= yeoman.tmp %>/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.tmp %>/styles/',
                        src: '{,*/}*.css',
                        dest: '<%= yeoman.tmp %>/styles/'
                    }
                ]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%= yeoman.app %>/scripts',
                    optimize: 'none',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                    paths: {
                        jquery: 'vendor/jquery-1.10.2.min',
                        backbone: 'vendor/backbone-1.0.0.min',
                        underscore: 'vendor/underscore-1.5.2.min',
                        bootstrap : 'vendor/bootstrap-3.0.2.min',
                        localStorage : 'vendor/backbone.localStorage-1.1.7.min',
                        crossdomain : 'vendor/jquery-xdomainajax-0.11',
                        nouislider : 'vendor/jquery-nouislider-4.3.0.min',
                        text : 'vendor/require-text-2.0.10.min',
                        moment: 'vendor/moment-2.4.0.min',
                        moment_es : 'vendor/moment_es-2.4.0',
                        chosen : 'vendor/jquery-chosen-1.0.min'
                    }
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            //html: '<%= yeoman.app %>/index.html'
            html: '<%= yeoman.tmp %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.tmp %>',
                        src: '*.html',
                        dest: '<%= yeoman.dist %>'
                    },
//                    {
//                        expand: true,
//                        cwd: '<%= yeoman.app %>',
//                        src: '*.html',
//                        dest: '<%= yeoman.dist %>'
//                    }
                ]
            },
            deploy: {
                options: {
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: '{,*/}*.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/{,*/}*.*',
                            'bower_components/sass-bootstrap/fonts/*.*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin:dist'
            ]
        },
        //No me interesa esta tarea
        //Actualiza el config de RequireJS con las librerias que estan definidas en bower.json
//        bower: {
//            options: {
//                exclude: ['modernizr']
//            },
//            all: {
//                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
//            }
//        },
        jade: {
            dist: {
                options: {
                    pretty: true,
                    client: false,
                    data: require('./locals.json')
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/static_html',
                        dest: '.tmp',
                        src: '*.jade',
                        ext: '.html'
                    }
                ]
            }
        },

        shell: {
            test: {
                command: 'mocha-phantomjs http://localhost:9000/index.html',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'jade',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('livetest', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'shell:test',
        'watch:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jade',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'concat',
        'cssmin',
        'uglify',
        'modernizr',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin:deploy' //To minify html!
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
