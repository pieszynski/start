
'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                force: true,
                src: [
                    '../www/js/*.min.js',
                    '../www/js/vendor/vendor.min.js',
                    '../www/css/*.min.css',
                    '../www/css/vendor/vendor.min.css',
                    '../www/index.html'
                ]
            }
        },
        less: {
            dev: {
                options: {
                    compress: true
                },
                files: {
                    '../www/css/index.min.css': '../www/css/index.less'
                }
            }
        },
        concat: {
            vendorCss: {
               src: ['../www/css/vendor/material-design-iconic-font.min.css'],
               dest: '../www/css/vendor/vendor.min.css'
            },
            vendorJs: {
                src: [
                    '../www/js/vendor/jquery.min.js',
                    '../www/js/vendor/angular.min.js',
                    '../www/js/vendor/angular-touch.min.js',
                    '../www/js/vendor/angular-sanitize.min.js'
                ],
                dest: '../www/js/vendor/vendor.min.js'
            },
            startupJs: {
                src: '../www/js/startup.js',
                dest: '../www/js/startup.min.js'
            },
            indexJs: {
                src: '../www/js/index.js',
                dest: '../www/js/index.min.js'
            }
        },
        copy: {
            devHtml: {
                files: [
                    {src: '../www/index.src.html', dest: '../www/index.html'}
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
                    '../www/js/startup.min.js': '../www/js/startup.min.js',
                    '../www/js/index.min.js': '../www/js/index.min.js'
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
                    '../www/index.html': '../www/index.html'
                }
            }
        },
        watch: {
            devLess: {
                files: ['../www/css/*.less'],
                tasks: ['less:dev']
            },
            devJs: {
                files: ['../www/js/*.js', '!../www/js/*.min.js'],
                tasks: ['concat:indexJs']
            },
            devHtml: {
                files: ['../www/*.src.html'],
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
        'concat:startupJs',
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
