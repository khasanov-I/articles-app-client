export const formatDate = (str: string) => {
    const arr = str.split('T');
    const day = arr[0];
    const time = arr[1];
    return `${day} в ${time.substring(0, 5)}`;
};
