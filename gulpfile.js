var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    jade         = require('gulp-jade'),
    svgmin       = require('gulp-svgmin'),
    svgStore     = require('gulp-svgstore'),
    rename       = require('gulp-rename'),
    cheerio      = require('gulp-cheerio'),
    consolidate  = require('gulp-consolidate');

// sass
gulp.task('sass', function() {
    return gulp
        .src('src/sass/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested', // nested, expanded, compact, compressed
            precision: 5
        })).on('error', errorHandler)
        .pipe(postcss([
            autoprefixer({browsers: ['> 1%', 'IE 9']})
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}));
});

// sprite
gulp.task('sprites', function() {
    return gulp
        .src('src/icons/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore({ inlineSvg: false }))
        .pipe(cheerio({
            run: extractDataFromIcons,
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest('app/img'));
});

function extractDataFromIcons($, file) {
    // get data about each icon
    var symbols = $('svg > symbol');
    var data = $('svg > symbol').map(function() {
        var $this = $(this);
        var size = $this.attr('viewBox').split(' ').splice(2);
        return {
            name: $this.attr('id'),
            ratio: Math.ceil((size[0] / size[1]) * 10) / 10
        };
    }).get();

    // remove attributes to make possible applying these styles via css
    symbols.each(function() {
        $(this)
            .children()
            .removeAttr('stroke')
            .removeAttr('stroke-width')
            .not('[fill="currentColor"]')
            .removeAttr('fill')
    });

    // create scss file with icon dimensions
    gulp.src('src/assets/sprite/_sprite.scss')
        .pipe(consolidate('lodash', {
            icons: data
        }))
        .pipe(gulp.dest('src/sass'));

    // create preview
    gulp.src('src/assets/sprite/sprite.html')
        .pipe(consolidate('lodash', {
            icons: data
        }))
        .pipe(gulp.dest('app'));
}

// jade
gulp.task('jade', function(){
    gulp.src('src/jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('app/'))
});

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'app'
        }
    });
});

// bs-reload
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// default
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch('src/icons/*.svg', ['sprites']);
    gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
    gulp.watch('app/*.html', ['bs-reload']);
    gulp.watch('app/js/*.js', ['bs-reload']);
});

// error handle
function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}




