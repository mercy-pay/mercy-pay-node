/** Encodes nested parameters the way the API reads them: created[gte]=…, expand[]=… */
export function toQuery(params: Record<string, unknown>): string {
  const pairs: string[] = [];

  const add = (key: string, value: unknown): void => {
    if (value === undefined) return;
    if (value === null) {
      pairs.push(`${encodeURIComponent(key)}=`);
    } else if (Array.isArray(value)) {
      value.forEach((item) => add(`${key}[]`, item));
    } else if (value instanceof Date) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`);
    } else if (typeof value === 'object') {
      for (const [child, nested] of Object.entries(value as Record<string, unknown>)) add(`${key}[${child}]`, nested);
    } else {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  };

  for (const [key, value] of Object.entries(params)) add(key, value);
  return pairs.join('&');
}
