'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
          banner: '/**\n' +
          ' * <%= pkg.description %>\n' +
          ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' * @link <%= pkg.homepage %>\n' +
          ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
          ' * @license <%= pkg.licenses[0].type %>, <%= pkg.licenses[0].url %>\n' +
          ' */\n'
        },
        dirs: {
          src: 'src',
          dest: 'dist'
        },
        concat: {
          options: {
            banner: '<%= meta.banner %>'
          },
          dist: {
            src: ['<%= dirs.src %>/*.js'],
            dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
          }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= dirs.src %>/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'onevar': false,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single',
                globals: {
                  exports: true,
                  angular: false,
                  nokia: false,
                  $: false
                }
            }
        },
        changelog: {
          options: {
            dest: 'CHANGELOG.md'
          }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jshint',
    ]);

    // P
    grunt.registerTask('build', [
        'jshint',
        'concat',
        'uglify'
    ]);
};