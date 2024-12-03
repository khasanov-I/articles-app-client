export function createFormdataFromObject(obj: Record<string, any>) {
    const formData = new FormData();

    Object.entries(obj).forEach(p => {
        if (p[1] instanceof Blob || typeof p[1] === 'string') {
            formData.append(p[0], p[1]);
        } else {
            formData.append(p[0], JSON.stringify(p[1]));
        }
    });

    return formData;
}
