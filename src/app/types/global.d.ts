declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare const __IS_DEV__: boolean;

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.jpeg';
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
