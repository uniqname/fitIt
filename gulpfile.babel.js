import gulp from 'gulp';
import marked from 'marked';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import data from 'gulp-data';
import browserSync from 'browser-sync';
import streamify from 'gulp-streamify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import babel from 'gulp-babel';
import browserify from 'browserify';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

gulp.task('build', function () {
    let bundler = browserify({ debug: true }),
        b;

    bundler.transform(babelify);
    bundler.add('./fitit.js');

    b = bundler.bundle()
        .on('error', gutil.log)
        .pipe(source('./fitit.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(streamify(uglify()))
        .pipe(rename('fitit.min.js'))
        .pipe(gulp.dest('./dist'));

    return gulp.src('./index.html.template')
        .pipe(data( () => ({
            content: marked(fs.readFileSync('README.md', 'utf8'))
        })))
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
