import {
    DefinePlugin,
    HotModuleReplacementPlugin,
    ProgressPlugin,
    type WebpackPluginInstance,
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {type BuildOptions} from './types/config';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import CircularDependencyPlugin from 'circular-dependency-plugin';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    return [
        new ProgressPlugin(),
        new HtmlWebpackPlugin({template: paths.html}),
        ...(isDev ? [] : [new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        })]),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project)}),
        ...(isDev ? [new HotModuleReplacementPlugin()] : []),
        ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
        ...(isDev ? [new BundleAnalyzerPlugin({
            openAnalyzer: false,
        })] : []),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
    ];
}
