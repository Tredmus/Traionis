import { defineConfig } from 'astro/config';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import watchAndRun from 'vite-plugin-watch-and-run';
import postcssEasings from 'postcss-easings';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
// import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
	// adapter: netlify(),
	vite: {
		plugins: [
			watchAndRun([{
				watch: '**/src/scss/**/*.scss',
				watchKind: 'add',
				run: 'touch ./src/scss/bundle.scss',
				delay: 100,
				quiet: true
			}]),
			sassGlobImports()
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
	}
});
