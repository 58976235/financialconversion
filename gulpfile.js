const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const del = require('del')
const rename = require('gulp-rename');


const jsHandler = function () {
  return gulp
    .src(['./src/code/*.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('./dist'))
}

const otherHandler = function () {
  return gulp
    .src(['./src/package/*','./src/package/.npmrc','./src/package/.npmignore'])
    .pipe(
      gulp.dest('./dist')
    )
}
const delHandler = function () {
  return del(['./dist'])
}


const watchHandler = function () {
  gulp.watch('./src/package/*', otherHandler),
  gulp.watch('./src/code/*.js', jsHandler)
}

function build() {  
  let len = process.argv.length
  if(!process.argv && len <= 0) return
  if(process.argv[len-1] == 'pro'){
    return gulp.series(
      delHandler,
      gulp.parallel(jsHandler,otherHandler)
    )
  } else {
    return gulp.series(
      delHandler,
      gulp.parallel(jsHandler,otherHandler),
      watchHandler
    )
  }
}
exports.default = build()