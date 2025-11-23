// Global type declarations for SQL query results
declare global {
  interface QueryResult<T = any> {
    rows: T[];
    rowCount: number;
    length: number;
    [index: number]: T;
    forEach(callback: (row: T, index: number, array: T[]) => void): void;
    map<U>(callback: (row: T, index: number, array: T[]) => U): U[];
    filter(callback: (row: T, index: number, array: T[]) => boolean): T[];
  }
  
  // Extend Neon SQL result types
  interface NeonQueryResult extends Array<any>, QueryResult {}
}

export {};