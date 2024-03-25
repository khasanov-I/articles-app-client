
import {type BuildPaths} from '../../config/build/types/config';
import path from 'path';
import {DefinePlugin, type Configuration, type RuleSetRule} from 'webpack';

export default ({config}: {config: Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
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

    if (config.resolve) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': paths.src,
        };
    }

    config.module?.rules?.push(cssLoader);

    if (config.module?.rules) {
        // @ts-expect-error next-line
        config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        // eslint-disable-next-line @typescript-eslint/prefer-includes
            if (/svg/.test(rule.test as string)) {
                return {...rule, exclude: /\.svg$/i};
            }

            return rule;
        });
    }

    config.module?.rules?.push(
        {test: /\.svg$/,
            use: ['@svgr/webpack']},
    );

    config.plugins?.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
