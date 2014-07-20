var gulp = require('gulp');
var qunit = require('gulp-qunit');
var concat = require('gulp-concat');

var paths = {
  tests: 'tests/',
	scripts: ['js/libs/*.js','js/*/*.js','js/*.js'],
	testScripts: ['!js/main.js','js/libs/*.js','js/*/*.js','js/*.js']
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
    .pipe(concat('plotter.min.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('testScripts', function() {
	return gulp.src(paths.testScripts)
    .pipe(concat('plotter.min.js'))
    .pipe(gulp.dest('tests/js'));
});
gulp.task('test', ['testScripts'], function() {
	return gulp.src('tests/index.html')
		.pipe(qunit());
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});


gulp.task('default', ['scripts','watch']);

