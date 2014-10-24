module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    express: {
      server: {
        options: {
          port: 3001,
          bases: ['public', 'dist']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['express']);
  grunt.registerTask('server', ['express', 'express-keepalive']);

};