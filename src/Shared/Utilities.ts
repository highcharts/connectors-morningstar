export const UTF_PIPE = '|';
export const UTF_COLON = ':';
export const STYLE_BOX_VALUES = {
    X: [0, 1, 2, 0, 1, 2, 0, 1, 2],
    Y: [2, 2, 2, 1, 1, 1, 0, 0, 0]
};

export function monthOffsetToDateString (startDate: string, monthOffset: number): string {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + (monthOffset - 1));

    // Manually recreate date to avoid UTC inconsistencies.
    return d.getFullYear() +
        '-' + String(d.getMonth() + 1).padStart(2, '0') +
        '-' + String(d.getDate()).padStart(2, '0') +
        'T' + String(d.getHours()).padStart(2, '0') +
        ':' + String(d.getMinutes()).padStart(2, '0') +
        ':' + String(d.getSeconds()).padStart(2, '0');
}
