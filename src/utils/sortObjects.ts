export const sortObjects = (arrayOfObjects: Record<string, string | number>[], key: string) =>
    arrayOfObjects.sort((a, b) => (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0);