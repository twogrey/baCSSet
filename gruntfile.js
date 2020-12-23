module.exports = function (grunt) {
	const sass = require('node-sass');

	/**
     * [Just-in-time plugin loader: improve speed tasks]
     */
	require('jit-grunt')(grunt, {
		svgmin: 'grunt-svgmin'
	});

	/**
     * [Paths]
     */
	const buildPath = 'dest/';

	const imgBuildPath = `${buildPath}img/`;
	const svgBuildPath = `${imgBuildPath}svg/`;
	const imgMiscBuildPath = imgBuildPath;
	const fontBuildPath = `${buildPath}font/`;
	const jsBuildPath = `${buildPath}js/`;
	const jsBuildVendorsPath = `${jsBuildPath}vendors/`;
	const jsBuildComponentsPath = `${jsBuildPath}components/`;
	const jsBuildPagesPath = `${jsBuildPath}pages/`;
	const cssBuildPath = `${buildPath}css/`;
	const pagesBuildPath = `${buildPath}pages/`;

	const sourcesPath = 'src/';

	const imgPath = `${sourcesPath}img/`;
	const svgPath = `${imgPath}svg/`;
	const iconsPath = `${imgPath}icons/`;
	const imgMiscPath = `${imgPath}misc/`;
	const scssPath = `${sourcesPath}scss/`;
	const fontPath = `${sourcesPath}font/`;
	const jsPath = `${sourcesPath}js/`;
	const jsVendorsPath = `${jsPath}vendors/`;
	const jsComponentsPath = `${jsPath}components/`;
	const jsPagesPath = `${jsPath}pages/`;
	const templatesPath = `${sourcesPath}templates/`;

	/**
     * [PostCSS Plugins]
     */
	const cssnano = require('cssnano');
	const rucksack = require('rucksack-css');
	const autoprefixer = require('autoprefixer');
	const mqpacker = require('css-mqpacker');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/**
     * [Task for keeping multiple browsers & devices in sync when building websites]
     */
		browserSync: {
			bsFiles: {
				src: [
					`${cssBuildPath}**/*.css`,
					`${jsBuildPath}**/*.js`,
					`${pagesBuildPath}**/*.html`,
					'../../views/**/*.html',
				],
			},
			options: {
				watchTask: true,
				proxy: 'http://localhost/framework2/',
			},
		},
		/**
     * [Compiles .pug templates]
     */
		pug: {
			options: {
				pretty: true,
				data: {
					debug: false,
				},
			},
			dist: {
				files: [ {
					expand: true,
					src: [ '**/index.pug' ],
					cwd: `${templatesPath}pages/`,
					dest: `${templatesPath}compiled/`,
					ext: '.html',
				} ],
			},
		},
		/**
     * [Minify HTML]
     */
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: false,
			},
			dist: {
				files: [ {
					expand: true,
					src: [ '**/*.html' ],
					cwd: `${templatesPath}compiled/`,
					dest: pagesBuildPath,
					ext: '.html',
				} ],
			},
			emails: {
				files: [ {
					expand: true,
					src: [ '**/*.html' ],
					cwd: `../../views/emails`,
					dest: `../../views/emails`,
					ext: '.html',
				} ],
			},
		},
		/**
	   * [Sass compiler]
	   */
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
				sourceComments: true,
				outputStyle: 'expanded',
			},
			dist: {
				files: [ {
					expand: true,
					src: [ '**/*.scss', '!pages/**/*.scss' ],
					cwd: scssPath,
					dest: cssBuildPath,
					ext: '.css',
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ 'pages/**/*.scss' ],
					cwd: scssPath,
					dest: cssBuildPath,
					ext: '.css',
				} ],
			},
		},
		shell: {
			options: {
				failOnError: false,
			},
			/**
       * [Stylelint]
       */
			lint: {
				command: `stylelint "${scssPath}**/*.scss" --config ${scssPath}.stylelintrc --fix`,
			},
		},
		/**
     * [Apply several post-processors to CSS using PostCSS]
     */
		postcss: {
			options: {
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: `${cssBuildPath}/sourcemaps/`, // ...to the specified directory
				},
				processors: [
					/**
           * [A little bag of CSS superpowers]
           */
					rucksack({
						autoprefixer: false,
						fontPath: false,
						hexRGBA: false,
					}),
					/**
           * [Adds vendor prefixes, using data from Can I Use]
           */
					autoprefixer({
						browsers: [ 'IE 11', 'last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Edge versions', 'last 2 Safari versions', 'last 2 Opera versions', 'last 2 iOS versions', 'last 2 ChromeAndroid versions' ],
					}),
					/**
	         * [Pack same CSS media query rules]
	         */
					mqpacker({
						sort: true,
					}),
					/**
           * [Optimize CSS size]
           */
					cssnano({
						safe: true,
					}),
				],
			},
			dist: {
				files: [ {
					expand: true,
					cwd: cssBuildPath,
					src: [ '*.css', '!**/*.min.css' ],
					dest: cssBuildPath,
					ext: '.min.css',
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					cwd: cssBuildPath,
					src: [ 'pages/**/*.css', '!pages/**/*.min.css' ],
					dest: cssBuildPath,
					ext: '.min.css',
				} ],
			},
		},
		/**
     * [Generate SVG sprite]
     */
		svgstore: {
			options: {
				prefix: 'icon-',
				cleanup: [ 'fill', 'style' ],
				includeTitleElement: false,
				svg: {
					viewBox: '0 0 100 100',
					xmlns: 'http://www.w3.org/2000/svg',
				},
			},
			dist: {
				files: {
					[`${imgBuildPath}sprite.svg`]: [ `${iconsPath}*.svg` ],
				},
			},
		},
		/**
     * [Validate files with JSHint]
     */
		jshint: {
			options: {
				// '-W083': true,
				esversion: 6,
			},
			dist: [ `${jsPath}**/*.js`, `!${jsPath}vendors/**/*.js`, `!${jsPagesPath}prism.js` ],
		},
		/**
     * [Babel transpiler]
     */
		babel: {
			options: {
				presets: [ '@babel/preset-env' ],
			},
			dist: {
				files: [ {
					src: `${jsPath}scripts.js`,
					dest: `${jsBuildPath}scripts.transpiled.js`,
				} ],
			},
			components: {
				files: [ {
					expand: true,
					src: [ '**/*.js' ],
					cwd: jsComponentsPath,
					dest: jsBuildComponentsPath,
					ext: '.transpiled.js',
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ '**/*.js' ],
					cwd: jsPagesPath,
					dest: jsBuildPagesPath,
					ext: '.transpiled.js',
				} ],
			},
		},
		/**
     * [Minify JavaScript files]
     */
		uglify: {
			dist: {
				files: [ {
					src: `${jsBuildPath}scripts.transpiled.js`,
					dest: `${jsBuildPath}scripts.min.js`,
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ '**/*.transpiled.js' ],
					cwd: jsBuildPagesPath,
					dest: jsBuildPagesPath,
					ext: '.min.js',
				} ],
			},
			components: {
				files: [ {
					expand: true,
					src: [ '**/*.transpiled.js' ],
					cwd: jsBuildComponentsPath,
					dest: jsBuildComponentsPath,
					ext: '.min.js',
				} ],
			},
		},
		/**
     * [Optimize SVG file]
     */
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
					{ removeXMLNS: false },
				],
			},
			dist: {
				files: [ {
					expand: true,
					cwd: svgPath,
					src: [ '*.svg' ],
					dest: svgBuildPath,
					ext: '.svg',
				} ],
			},
		},
		/**
     * [Image optimization via tinypng service]
     */
		tinypng: {
			options: {
				apiKey: '1l9rX6nGJShw71jrXYWV7bNwrGs5PsCd',
				summarize: true,
				stopOnImageError: true,
			},
			misc: {
				expand: true,
				src: [ '*.jpg', '*.png' ],
				cwd: imgMiscPath,
				dest: imgMiscBuildPath,
			},
		},
		/**
     * [Clear files & folders]
     */
		clean: {
			options: {
				force: true,
			},
			svg: `${svgBuildPath}*.svg`,
			vendorsJs: `${jsBuildVendorsPath}*.js`,
			componentsJs: `${jsBuildComponentsPath}*.js`,
			pagesJs: `${jsBuildPagesPath}*.js`,
			font: [ `${fontBuildPath}/*` ]
		},
		/**
     * [Copy to the build folder the sources that are not generated/processed/compiled]
     */
		copy: {
			font: {
				expand: true,
				src: [ '**' ],
				cwd: fontPath,
				dest: fontBuildPath,
			},
			vendorsJs: {
				expand: true,
				src: [ '**' ],
				cwd: jsVendorsPath,
				dest: jsBuildVendorsPath,
			},
		},
    mjml: {
        dist: {
            files: [{
                expand: true,
                cwd: '../../views/emails',
                src: ['**/*.mjml'],
                dest: '../../views/emails',
                ext: '.html',
                extDot: 'first'
            }]
        }
    },
		/**
         * [Run tasks whenever watched files change]
         */
		watch: {
			options: {
				spawn: false,
			},
			restart: {
				files: 'gruntfile.js',
				tasks: [ 'watch' ],
			},
			pug: {
				files: `${templatesPath}**/*`,
				tasks: [ 'pug', 'htmlmin:dist' ],
			},
			mjml: {
				files: `../../views/emails/**/*.mjml`,
				tasks: [ 'mjml', 'htmlmin:emails' ],
			},
			// stylelint: {
			//     files: [scssPath + '**/*.scss'],
			//     tasks: ['shell:lint']
			// },
			style: {
				files: [ `${scssPath}**/*.scss`, `!${scssPath}pages/**/*.scss` ],
				tasks: [ 'sass:dist', 'postcss:dist' ],
			},
			stylePages: {
				files: [ `${scssPath}pages/**/*.scss` ],
				tasks: [ 'newer:sass:pages', 'newer:postcss:pages' ],
			},
			sprite: {
				files: `${iconsPath}*.svg`,
				tasks: [ 'svgstore', 'pug' ],
			},
			svg: {
				files: `${svgPath}*.svg`,
				tasks: [ 'clean:svg', 'svgmin' ],
			},
			imgMisc: {
				files: [ `${imgMiscPath}*` ],
				tasks: [ 'newer:tinypng:misc' ],
			},
			jshint: {
				files: [ `${jsPath}**/*.js` ],
				tasks: [ 'jshint' ],
			},
			uglifyMainJs: {
				files: [ `${jsPath}scripts.js` ],
				tasks: [ 'babel:dist', 'uglify:dist' ],
			},
			uglifyComponentsJs: {
				files: [ `${jsComponentsPath}**/*.js` ],
				tasks: [ 'newer:babel:components', 'newer:uglify:components' ],
			},
			uglifyPagesJs: {
				files: [ `${jsPagesPath}**/*.js` ],
				tasks: [ 'newer:babel:pages', 'newer:uglify:pages' ],
			},
			copyVendorsJs: {
				files: [ `${jsVendorsPath}*.js` ],
				tasks: [ 'clean:vendorsJs', 'copy:vendorsJs' ],
			},
			copyFont: {
				files: `${fontPath}**/*`,
				tasks: [ 'clean:font', 'copy:font' ],
			},
		},
	});

	grunt.registerTask('default', [ 'browserSync', 'watch' ]);

	grunt.registerTask('build:templates', [ 'pug', 'htmlmin:dist' ]);

	grunt.registerTask('build:emails', [ 'mjml', 'htmlmin:emails' ]);

	grunt.registerTask('lint:styles', [ 'shell:lint' ]);

	grunt.registerTask('build:styles', [ 'svgstore', 'clean:font', 'copy:font', 'sass', 'postcss' ]);

	grunt.registerTask('build:pagesJs', [ 'clean:pagesJs', 'babel:pages', 'uglify:pages' ]);

	grunt.registerTask('build:componentsJs', [ 'clean:componentsJs', 'babel:components', 'uglify:components' ]);

	grunt.registerTask('build:vendorsJs', [ 'clean:vendorsJs', 'copy:vendorsJs' ]);

	grunt.registerTask('build:mainJs', [ 'babel:dist', 'uglify:dist' ]);

	grunt.registerTask('build:js', [ 'build:pagesJs', 'build:vendorsJs', 'build:componentsJs', 'build:mainJs' ]);

	grunt.registerTask('build:img', [ 'clean:svg', 'svgmin', 'tinypng:misc' ]);

	grunt.registerTask('build', [ 'build:styles', 'build:js' ]);
};
