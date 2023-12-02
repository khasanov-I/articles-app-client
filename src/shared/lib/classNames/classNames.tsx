export type Mods = Record<string, boolean | undefined>;

export function classNames(
    main: string,
    mods: Mods,
    additional: string[],
): string {
    return [
        main,
        ...Object.entries(mods)
            .filter(([c, v]) => v)
            .map(([c]) => c),
        ...additional,
    ].join(' ');
}
