import { Configuration as DevServerConf } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConf {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
