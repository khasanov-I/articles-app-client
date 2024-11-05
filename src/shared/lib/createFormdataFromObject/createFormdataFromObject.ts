export function createFormdataFromObject(obj: Record<string, any>) {
    const formData = new FormData();

    Object.entries(obj).forEach(p => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append(p[0], p[1]);
    });

    return formData;
}
