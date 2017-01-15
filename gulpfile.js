var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),
	browserSync = require("browser-sync"),
	del = require("del"),
	useref = require("gulp-useref"),
	uglify = require("gulp-uglify"),
	gulpif = require("gulp-if");



//kompilacja sass do css + autoprefixy
gulp.task('css', function(){
	gulp.src("sass/style.scss")
	.pipe(plumber())
	.pipe(sass.sync())
	.pipe(autoprefixer({
		browsers: ["last 5 version", "IE 9"]
	}))
	.pipe(gulp.dest("css"))
	.pipe(browserSync.stream());
});

gulp.task('server', function(){
	browserSync.init({
		server: "./"
	});
});

gulp.task('watch', function(){
	gulp.watch("sass/**/*.scss", ["css"]);
	gulp.watch(["*.html","js/*.js"], browserSync.reload);
});

gulp.task("clean", function() {
	del("dist/");
});

gulp.task("html", function() {
	gulp.src("*.html")
		.pipe(useref())
		.pipe( gulpif("*.js",uglify() ) )
		.pipe(gulp.dest("dist/"));
});

gulp.task( 'default', ["css", "server", "watch"] );
