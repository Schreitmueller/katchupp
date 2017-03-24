/**
 * Created by janschmutz on 24.03.17.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['public/components/**/*.scss'],
                tasks: ['sass','cssmin']
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['components/**/*.scss'],
                    dest: 'public/build/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            combine: {
                files: {
                    'public/build/css/main.min.css': [
                        'public/build/css/components/**/*.css',
                        '!public/build/css/components/!**!/!*.min.css'
                    ]
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['watch']);
};