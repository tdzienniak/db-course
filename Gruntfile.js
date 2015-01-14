module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    react: {
      combined_file_output: {
        files: {
          'public/js/components.js': [
            'components/*.jsx'
          ]
        }
      }
    },
    watch: {
      react: {
          files: 'components/**/*.jsx',
          tasks: ['react']
      }
    },
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['react', 'watch']);
};