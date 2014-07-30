var gulp = require('gulp');
var qunit = require('gulp-qunit');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

var paths = {
  html: ['www/*.html'],
  styles: ['css/libs/*.css',
           'css/*.css'],
  tests: 'tests/',
  testScripts: ['!js.main.js',
                'js/libs/svg.js',
								'js/libs/*.js',
								'js/*/*.js',
								'js/*.js'],
  test:['tests/index.html']
};
paths.scripts = paths.testScripts.concat()
paths.scripts.push('js/main.js');

var allPaths = [];
for(var i in paths) {
  console.log("  paths[i]: ",paths[i]);
  allPaths = allPaths.concat(paths[i]);
}

gulp.task('styles', function() {
	return gulp.src(paths.styles)
    .pipe(concat('plotter.css'))
    .pipe(gulp.dest('www/css'));
});
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
    .pipe(concat('plotter.js'))
    .pipe(gulp.dest('www/js'));
});
gulp.task('testScripts', function() {
	return gulp.src(paths.testScripts)
    .pipe(concat('plotter.js'))
    .pipe(gulp.dest('tests/js'));
});
gulp.task('test', ['testScripts'], function() {
	return gulp.src(paths.test)
		.pipe(qunit());
});
// start reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "www"
        }
    });
});
gulp.task('browser-sync-testing', function() {
    browserSync({
        server: {
            baseDir: "tests"
        }
    });
});
gulp.task('reload', function () {
    browserSync.reload();
});
gulp.task('watch', function() {
	gulp.watch(allPaths, ['styles','scripts','reload']);
});

gulp.task('default', ['browser-sync','styles','scripts','watch']);
gulp.task('testing', ['browser-sync-testing','test','watch']);

