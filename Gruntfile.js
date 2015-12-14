module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      all: {
        files: {
          'app/css/styles.css': ['client/css/styles.css']
        }
      }
    },
    uglify: {
      cobra: {
        files: {
          'app/bundle.js' : 'client/bundle.js',
        }
      }
    },
    pngquant: {
      dist: {
        options: {
          quality: 100
        },
        files: [{
          expand: true,
          cwd: '/Users/steveleec/personal-page/client',
          src: ['img2xOpt/*.png'],
          dest: 'app'
          }]
      }
    },
    copy: {
      main: {
        src: 'client/index.html',
        dest: 'app/index.html'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-pngquant');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['less']);
  grunt.registerTask('build', ['uglify', 'cssmin']);
}
