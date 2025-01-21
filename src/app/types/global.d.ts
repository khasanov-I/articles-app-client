declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';
declare const __CLIENT_URL__: string;

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.jpeg';
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
