export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    main: string,
    mods: Mods,
    additional: Array<string | undefined>,
): string {
    return [
        main,
        ...Object.entries(mods)
            .filter(([c, v]) => v)
            .map(([c]) => c),
        ...additional,
    ].join(' ');
}
