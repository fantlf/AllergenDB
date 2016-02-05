module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          includePaths: ['node_modules/foundation-sites/scss'],
          outputStyle: 'compressed'
        },
        files: {
          'build/css/styles.min.css' : 'src/scss/*.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'src/js/bundle.js': ['src/js/index.js']
        },
        options: {
          watch: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'build/js/index.min.js': 'src/js/bundle.js',
        }
      }
    },
    watch: {
      css: {
        files: 'src/scss/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'src/js/bundle.js',
        tasks: ['uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build',['sass','browserify','uglify']);
  grunt.registerTask('default',['watch']);
}
