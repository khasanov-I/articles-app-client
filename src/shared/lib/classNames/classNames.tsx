interface classNamesProps {}
export function classNames(
  main: string,
  mods: Record<string, boolean>,
  additional?: string[]
): string {
  return [
    main,
    ...Object.entries(mods)
      .filter(([c, v]) => v)
      .map(([c]) => c),
    ...additional.filter((e) => Boolean(e)),
  ].join(' ');
}
