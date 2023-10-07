import fs from 'fs';
import path, { resolve } from 'path';
import { directoryPlugin } from 'vite-plugin-list-directory-contents';
import injectHTML from 'vite-plugin-html-inject';
import liveReload from 'vite-plugin-live-reload';
import watchAndRun from 'vite-plugin-watch-and-run';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import postcssEasings from 'postcss-easings';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

const rootDir = resolve(__dirname, './src/');

export default {
	base: '',
	root: rootDir,
	publicDir: resolve(rootDir, './assets/'),
	server: {
		open: '/',
	},
	build: {
		outDir: resolve(__dirname, './build/'),
		emptyOutDir: true,
		reportCompressedSize: false,
		sourcemap: false,
		assetsInlineLimit: false,
		rollupOptions: {
			input: getHtmlFiles(),
		}
	},
	plugins: [
		// Lists all files in './src/' on server start
		directoryPlugin({
			baseDir: rootDir
		}),

		// Enables splitting of html files
		injectHTML(),

		// Fix HMR for New SCSS Files (needs tslib package)
		watchAndRun([{
			watch: '**/src/scss/**/*.scss',
			watchKind: 'add',
			run: 'touch ./src/scss/bundle.scss',
			delay: 100,
			quiet: true
		}]),

		// Add Reload for linked HTML Files
		liveReload(resolve(rootDir, './html/') + '/**/*.html', {
			alwaysReload: true
		}),

		// Enable glob '*' imports in SCSS - '@import 'components/*''
		sassGlobImports(),
	],
	css: {
		devSourcemap: true,
		postcss: {
			plugins: [
				postcssEasings(),
				postcssPresetEnv({ stage: 4 }),
				autoprefixer()
			]
		}
	}
};

function getHtmlFiles() {
	return fs
		.readdirSync(rootDir) // get all files
		.filter(file => file.endsWith('.html')) // remove all non-html files
		.filter(file => !file.includes('index.html')) // remove the index.html file that is used for the server start page
		.map(file => path.join(rootDir, file).replace(/\\/g, '/')); // append the directory to the file name
}
