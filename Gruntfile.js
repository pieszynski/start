
'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                force: true,
                src: [
                    'js/*.min.js',
                    'css/*.min.css',
                    'index.html',

                    '!js/jquery.min.js',
                    '!js/angular.min.js',
                    '!js/angular-touch.min.js',
                    '!js/angular-sanitize.min.js',
                    '!css/material-design-iconic-font.min.css'
                ]
            }
        },
        less: {
            dev: {
                options: {
                    compress: true
                },
                files: {
                    'css/index.min.css': 'css/index.less'
                }
            }
        },
        concat: {
            vendorCss: {
               src: ['css/material-design-iconic-font.min.css'],
               dest: 'css/vendor.min.css'
            },
            vendorJs: {
                src: [
                    'js/jquery.min.js',
                    'js/angular.min.js',
                    'js/angular-touch.min.js',
                    'js/angular-sanitize.min.js'
                ],
                dest: 'js/vendor.min.js'
            },
            indexJs: {
                src: 'js/index.js',
                dest: 'js/index.min.js'
            }
        },
        copy: {
            devHtml: {
                files: [
                    {src: 'index.src.html', dest: 'index.html'}
                ]
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: [/*'jQuery','angular'*/]
                }
            },
            release: {
                files: {
                    'js/index.min.js': 'js/index.min.js'
                }
            }
        },
        htmlmin: {
            release: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index.html'
                }
            }
        },
        watch: {
            devLess: {
                files: ['css/*.less'],
                tasks: ['less:dev']
            },
            devJs: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['concat:indexJs']
            },
            devHtml: {
                files: ['*.src.html'],
                tasks: ['copy:devHtml']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('nodeserver', 'Start NodeJs server. "node app.js"', function () {

        var ref = grunt.util.spawn({
            cmd: 'node',
            args: ['app.js']
        }, function (err, res, code) {
            grunt.log.writeln('NodeJs server exited with code: ' + code);
        });

        grunt.log.writeln('NodeJs server started (PID:' + ref.pid + ')...');

        ref.stdout.on('data', function(data) {
            grunt.log.writeln(data);
        });
        ref.stderr.on('data', function(data) {
            grunt.log.writeln(data);
        });
    });

    grunt.registerTask('devel', [
        'clean:dev',
        'less:dev',
        'concat:vendorCss',
        'concat:vendorJs',
        'concat:indexJs',
        'copy:devHtml'
    ]);

    grunt.registerTask('release', [
        'devel',
        'uglify:release',
        'htmlmin:release'
    ]);

    grunt.registerTask('devwatch', ['devel', 'nodeserver', 'watch']);
};
