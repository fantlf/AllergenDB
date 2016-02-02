module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/foundation/scss']
        },
        files: {
          'src/css/styles.css' : 'src/scss/styles.scss'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'build/css/styles.min.css': ['src/css/*.css']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'build/js/index.min.js': ['src/js/index.js']
        }
      }
    },
    watch: {
      css: {
        files: 'src/scss/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build',['cssmin','uglify']);
  grunt.registerTask('default',['watch']);
}
