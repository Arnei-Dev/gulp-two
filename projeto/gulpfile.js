

import gulp from 'gulp';
import image from 'gulp-image';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import browserSync, {create} from 'browser-sync';
const reload = create().reload

gulp.task('cssmini', async () => {
    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './vendor/owl/css/owl.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/jquery-ui/jquery-ui.css',
        './src/css/styles.css'
    ])
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('arquivojs', async () =>{
       gulp.src([
           './node_modules/jquery/dist/jquery.js',
           './node_modules/bootstrap/dist/js/bootstrap.js',
           './node_modules/@fortawesome/fontawesome-free/js/brands.js',
           './vendor/jquery-mask/jquery.mask.js',
           './vendor/jquery-ui/jquery-ui.js',
           './vendor/jquery-validation/jquery.validate.min.js',
           './vendor/owl/js/owl.js',
           './src/js/custom.js'
       ])
       .pipe(babel({
        comments: false,
        compact: false,
        presets: ['@babel/preset-env']
       }))
           .pipe(concat('script.js'))
           .pipe(uglify())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('./dist/js'))
})

gulp.task('imagem', async () =>{
    gulp.src('./src/images/*')
        .pipe(image())
        .pipe(gulp.dest('./dist/images'))
})

//Exemplo com callback
gulp.task('html-code', (callback) =>{
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
        return callback()
})

gulp.task('serve', () => {
    browserSync.init({
         server: {
             baseDir: './dist'
         }
    })
    gulp.watch('./src/**/*', gulp.series(['cssmini', 'arquivojs', 'html-code'])) // Processo dinâmico de atualizar info de autereção feita no codigo
    gulp.watch('./dist/**/*').on('change', browserSync.reload) // Processo dinâmico de recarregar a page no servidor local
})


gulp.task('default', gulp.series(['cssmini', 'arquivojs', 'html-code', 'imagem', 'serve' ])) 
