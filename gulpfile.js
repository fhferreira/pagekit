/**
 * Popular Tasks
 * -------------
 *
 * compile: compiles the .less files of the specified packages
 * lint: runs jshint on all .js files
 */

var fs      = require('fs'),
    merge   = require('merge-stream'),
    gulp    = require('gulp'),
    header  = require('gulp-header'),
    less    = require('gulp-less'),
    rename  = require('gulp-rename'),
    eslint  = require('gulp-eslint');

// paths of the packages for the compile-task
var pkgs = [
    'app/modules/installer/',
    'app/modules/theme/',
    'themes/alpha/'
];

// banner for the css files
var banner = "/*! <%= data.title %> <%= data.version %> | (c) 2014 Pagekit | MIT License */\n";

/**
 * Default gulp task
 */
gulp.task('default', ['compile', 'lint']);


/**
 * Compile all main .less files of the packages and banner them
 */
gulp.task('compile', function () {

    return merge.apply(null, pkgs.map(function (path) {

        var data = {};

        // search for the correct json file used for the banner
        if (fs.existsSync(path + 'theme.json')) {
            data = require('./' + path + 'theme.json');
        } else if (fs.existsSync(path + 'extension.json')) {
            data = require('./' + path + 'extension.json');
        } else if (fs.existsSync(path + '../../extension.json')) {
            data = require('./' + path + '../../extension.json');
        }

        return gulp.src(path + '**/less/*.less')
            .pipe(less({ compress: true }))
            .pipe(header(banner, { data: data }))
            .pipe(rename(function (file) {
                // the compiled less file should be stored in the css/ folder instead of the less/ folder
                file.dirname = file.dirname.replace('less', 'css');
            }))
            .pipe(gulp.dest(path));
    }));

});


/**
 * Watch for changes in all .less files
 */
gulp.task('watch', function () {
    gulp.watch('**/*.less', ['compile']);
});


/**
 * Runs jshint on all .js files
 */
gulp.task('lint', function () {
    return gulp.src(['app/modules/**/*.js', 'extensions/**/*.js', 'themes/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
