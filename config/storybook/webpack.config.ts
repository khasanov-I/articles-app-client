
import {type BuildPaths} from '../../config/build/types/config';
import path from 'path';
import {type Configuration, type RuleSetRule} from 'webpack';

export default ({config}: {config: Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    const cssLoader = {
        test: /\.(scss|css|sass)$/i,
        use: [
            'style-loader',
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

    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');
    config.module?.rules?.push(cssLoader);

    // If (config.module?.rules) {
    //     config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    //         if (/svg/.test(rule.test as string)) {
    //             return {...rule, exclude: /\.svg$/i};
    //         }

    //         return rule;
    //     });
    // }

    // config.module?.rules?.push(
    //     {test: /\.svg$/,
    //         use: ['@svgr/webpack']},
    // );

    return config;
};
