import {type Configuration} from 'webpack';
import {buildLoaders} from './buildLoaders';
import {buildResolvers} from './buildResolvers';
import {buildPlugins} from './buildPlugins';
import {type BuildOptions} from './types/config';
import {buildDevServer} from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const {paths, isDev, mode} = options;

    return {
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: '/',
        },
        mode,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
