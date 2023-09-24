export type BuildMode = 'development' | 'production';

export type BuildEnv = {
    port: number;
    mode: BuildMode;
    a: string;
};

export type BuildPaths = {
    entry: string;
    build: string;
    html: string;
    src: string;
};

export type BuildOptions = {
    mode: BuildMode;
    paths: BuildPaths;
    port: number;
    isDev: boolean;
};
