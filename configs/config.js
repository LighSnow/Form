import clear from 'esbuild-plugin-clear';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      console.log(`Build starting: ${new Date().toLocaleString()}`);
    });
    build.onEnd(result => {
      if (result.errors.length > 0) {
        console.log(`Build finished, with errors: ${new Date().toLocaleString()}`);
      } else {
        console.log(`Build finished successfully: ${new Date().toLocaleString()}`);
      }
    });
  },
};

const config = {
  entryPoints: ['./assets/js/test/index.ts'],
  assetNames: '/[dir]/[name]-[hash]',
  bundle: true,
  tsconfig: 'tsconfig.json',
  outdir: 'build',
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.woff': 'file',
    '.woff2': 'file',
  },
  supported: {
    destructuring: true,
  },
  plugins: [
    sassPlugin(),
    clear('./build'),
    copy({
      assets: [
        {
          from: './assets/images/**/*',
          to: './images',
        },
        {
          from: './assets/fonts/**/*',
          to: './fonts',
        },
      ],
    }),
    watchPlugin,
  ],
  logLevel: 'info',
};

export default config;
