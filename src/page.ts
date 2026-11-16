/**
 * One page of a list, newest first. `for await (const item of page)` goes through every
 * page, fetched as you go; `page.data` is this page only.
 */
export class Page<T> implements AsyncIterable<T> {
  constructor(
    readonly data: T[],
    readonly hasMore: boolean,
    readonly nextCursor: string | null,
    private readonly fetchPage: (params: Record<string, unknown>) => Promise<Page<T>>,
    private readonly params: Record<string, unknown> = {},
  ) {}

  async nextPage(): Promise<Page<T> | null> {
    if (!this.hasMore || this.nextCursor === null) return null;
    const { ending_before: _ignored, ...params } = this.params;
    return this.fetchPage({ ...params, starting_after: this.nextCursor });
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    let page: Page<T> | null = this;
    while (page !== null) {
      yield* page.data;
      page = await page.nextPage();
    }
  }
}
