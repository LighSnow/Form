import esbuild from 'esbuild';

import config from './config.js';

const ctx = await esbuild.context({ ...config });
await ctx.watch();

