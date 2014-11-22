var gulp = require('gulp'),
	marked = require('marked'),
	rename = require('gulp-rename'),
	template = require('gulp-template'),
	fs = require('fs'),
	q = require('q'),
	data = require('gulp-data'),
	browserSync = require('browser-sync');


gulp.task('build', function () {
	gulp.src('./index.html.template')
		.pipe(data(function () {

			var dfd = q.defer();

			fs.readFile('README.md', function (err, data) {
				if (err) {
					dfd.reject(err);
				} else {
					dfd.resolve({
						content: marked(data.toString())
					});
				}
			});

			return dfd.promise;
		}))
		.pipe(template())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'));
});

gulp.task('start-server', function () {

	browserSync({
		server: {
            baseDir: "./"
        }
	});
});

gulp.task('default', ['build', 'start-server']);

gulp.watch('*.*', ['build']);