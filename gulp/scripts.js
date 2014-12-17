/* 
 * gulp task for processing scripts
 * - source map (must happen first)
 * - concat
 *   note: app.js has to come first before other ng files
 * - use ng-annotate so DI works with minification (must be before uglify)
 * - uglify
 * - lint (using jshint)
 *
 * - todo
 *   - setup live reload server and watch task to reload the live reload 
 *   - setup ng-template thingy that concats them all into one req and js wraps it
 * // 6473
 */

var gulp = require('gulp'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    baseDir = __dirname + '../public/',
    buildFile = 'scripts.min.js',
    buildDir = 'public/build/',
    vendorSourceFiles = [
        'public/vendor/angular/angular.js',
        'public/vendor/angular-strap/dist/angular-strap.js',
        'public/vendor/angular-strap/dist/angular-strap.tpl.js',
        'public/vendor/angular-messages/angular-messages.js',
        'public/vendor/angular-resource/angular-resource.js',
        'public/vendor/angular-route/angular-route.js',
        'public/vendor/angular-animate/angular-animate.js',
        'public/vendor/moment/moment.js',
    ],
    sourceFiles = [
        'public/javascripts/app.js',
        'public/javascripts/**/**.js',
        'public/controllers/**/**.js',
        'public/services/**/**.js',
    ];

gulp.task('lint', function(){
    gulp.src(sourceFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb){
    del([buildDir], cb);
});

gulp.task('stamp', ['js'], function(){
    gulp.src(['public/j0shua.txt', buildDir + buildFile])
        .pipe(concat(buildFile))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', ['clean'], function(){
    var stream = gulp.src(vendorSourceFiles.concat(sourceFiles))
        .pipe(sourcemaps.init())
            .pipe(concat(buildFile))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir));

    return stream;
});

gulp.task('build', ['js', 'stamp']);

// watch task - on js change re-run the min
gulp.task('watch', function(){
    gulp.watch(sourceFiles, ['lint', 'js']);
});
