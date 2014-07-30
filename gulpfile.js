var gulp = require('gulp');
var qunit = require('gulp-qunit');
var concat = require('gulp-concat');

var paths = {
  tests: 'tests/',
  styles: ['css/libs/*.css',
           'css/*.css'],
  testScripts: ['js/libs/svg.js',
								'js/libs/*.js',
								'js/*/*.js',
								'js/*.js']	
};
paths.scripts = paths.testScripts.concat()
paths.scripts.push('js/main.js');

console.log("paths.testScripts: ",paths.testScripts);
console.log("paths.scripts: ",paths.scripts);

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
    .pipe(concat('plotter.min.js'))
    .pipe(gulp.dest('tests/js'));
});
gulp.task('test', ['testScripts'], function() {
	return gulp.src('tests/index.html')
		.pipe(qunit());
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch([paths.scripts,paths.styles], ['styles','scripts']);
});


gulp.task('default', ['styles','scripts','watch']);

