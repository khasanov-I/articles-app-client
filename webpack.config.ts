import path from 'path';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';
import {type BuildMode, type BuildEnv} from './config/build/types/config';

export default (env: BuildEnv) => {
    const mode: BuildMode = env.mode || 'development';
    const PORT = env.port || 3000;
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };
    const isDev = mode === 'development';

    const options = {
        mode,
        paths,
        isDev,
        port: PORT,
    };

    return buildWebpackConfig(options);
};
