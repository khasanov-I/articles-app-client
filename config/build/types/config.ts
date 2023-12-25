export type BuildMode = 'development' | 'production';

export type BuildEnv = {
    port: number;
    mode: BuildMode;
    apiUrl: string;
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
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
};
