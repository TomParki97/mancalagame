interface Entry {
  depth: number;
  value: number;
}

export class TT {
  private table = new Map<string, Entry>();
  get(key: string, depth: number): number | undefined {
    const e = this.table.get(key);
    if (!e) return undefined;
    if (e.depth >= depth) return e.value;
    return undefined;
  }
  set(key: string, depth: number, value: number) {
    this.table.set(key, { depth, value });
  }
  clear() {
    this.table.clear();
  }
}
