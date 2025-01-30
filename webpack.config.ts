import path from 'path';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';
import {type BuildMode, type BuildEnv, type BuildOptions} from './config/build/types/config';

export default (env: BuildEnv) => {
    const mode: BuildMode = env.mode || 'development';
    const apiUrl = env.apiUrl || 'https://articlesplatform.ru/api';
    const PORT = env.port || 3000;
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };
    const isDev = mode === 'development';

    const options: BuildOptions = {
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    };

    return buildWebpackConfig(options);
};
