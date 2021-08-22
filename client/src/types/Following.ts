export interface Following {
  artists: Artists;
}

export interface Artists {
  items: any[];
  next: null;
  total: number;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: null;
}
