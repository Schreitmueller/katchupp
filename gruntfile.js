/**
 * Created by janschmutz on 24.03.17.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};