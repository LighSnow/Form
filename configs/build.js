import esbuild from 'esbuild';

// eslint-disable-next-line import/extensions
import config from './config.js';

esbuild.build({
  ...config,
  target: ['chrome62', 'firefox66', 'safari11', 'edge16'],
  minify: true,
});
