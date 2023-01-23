import gulp from "gulp";
import del from "del";
import browserSync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";

import uglify from "gulp-uglify";
import webpack from "webpack-stream";

// import merge from "merge-stream";


/**
 * @source https://stackoverflow.com/questions/40096470/get-webpack-not-to-bundle-files
 * Чтобы добавить новый выходной файл — пропиши его сюда
 * - [ ] Вынести в отдельный конфиг jsEntryPoints
 */
const jsEntryPoints = {
  index: "/src/js/index.js",
  phoneUtils: "/src/js/phoneUtils.js",
  // new: "/src/js/new.js"
}

export default function jsBuild() {
  del("./dist/js/**/*.js");
  return gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        entry: jsEntryPoints,
        output: {
          // filename: "bundle.min.js",
          filename: "[name].js",
          sourceMapFilename: './[name].js.map'
        },
      })
    )
    // .pipe(uglify())
    .pipe(gulp.dest(app.path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}
