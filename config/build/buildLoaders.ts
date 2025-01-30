import {type RuleSetRule} from 'webpack';
import {type BuildOptions} from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {buildBabelLoader} from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});

    const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true});

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
            },
        ],
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.(sa|sc|c)ss$/i,
        use: [
            options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    };

    return [fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader];
}
