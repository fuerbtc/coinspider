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
            tmp: '.tmp',
            static: 'cotizaciones'
        },
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/<%= yeoman.static %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.app %>/<%= yeoman.static %>/<%= yeoman.static %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.tmp %>/*.html',
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.tmp %>/<%= yeoman.static %>/styles/{,*/}*.css',
                    '{<%= yeoman.tmp %>,<%= yeoman.app %>}/<%= yeoman.static %>/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/<%= yeoman.static %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            //Transform Jade Templates into Html
            jade: {
                files: ['<%= yeoman.app %>/static_html/**/*.jade'],
                tasks: ['jade']
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
                        '<%= yeoman.tmp %>',
                        'test',
                        '<%= yeoman.app %>'
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
                '<%= yeoman.app %>/<%= yeoman.static %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/<%= yeoman.static %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/<%= yeoman.static %>/styles',
                cssDir: '<%= yeoman.tmp %>/<%= yeoman.static %>/styles',
                generatedImagesDir: '<%= yeoman.tmp %>/<%= yeoman.static %>/images/generated',
                imagesDir: '<%= yeoman.app %>/<%= yeoman.static %>/images',
                javascriptsDir: '<%= yeoman.app %>/<%= yeoman.static %>/scripts',
                fontsDir: '<%= yeoman.app %>/<%= yeoman.static %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/<%= yeoman.static %>/images',
                httpGeneratedImagesPath: '/<%= yeoman.static %>/images/generated',
                httpFontsPath: '/<%= yeoman.static %>/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                debugInfo: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/<%= yeoman.static %>/images/generated'
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
                        cwd: '<%= yeoman.tmp %>/<%= yeoman.static %>/styles/',
                        src: '{,*/}*.css',
                        dest: '<%= yeoman.tmp %>/<%= yeoman.static %>/styles/'
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
                    baseUrl: '<%= yeoman.app %>/<%= yeoman.static %>/scripts',
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
                        localStorage : 'vendor/backbone.localStorage-1.1.7.min',
                        text : 'vendor/require-text-2.0.10.min'
                    }
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/<%= yeoman.static %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/<%= yeoman.static %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/<%= yeoman.static %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/<%= yeoman.static %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            //html: '<%= yeoman.app %>/index.html'
            html: '<%= yeoman.tmp %>/table.html'
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
                        cwd: '<%= yeoman.app %>/<%= yeoman.static %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/<%= yeoman.static %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/<%= yeoman.static %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/<%= yeoman.static %>/images'
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
                        cwd: '<%= yeoman.app %>/<%= yeoman.static %>',
                        dest: '<%= yeoman.dist %>/<%= yeoman.static %>',
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
                cwd: '<%= yeoman.app %>/<%= yeoman.static %>/styles',
                dest: '.tmp/<%= yeoman.static %>/styles/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.dist %>/<%= yeoman.static %>/scripts/{,*/}*.js',
                '<%= yeoman.dist %>/<%= yeoman.static %>/styles/{,*/}*.css',
                '!<%= yeoman.dist %>/<%= yeoman.static %>/scripts/vendor/*'
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
//                rjsConfig: '<%= yeoman.app %>/<%= yeoman.static %>/scripts/main.js'
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
