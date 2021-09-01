export interface PlaylistRes {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  owner: AddedByOrOwner;
  public?: null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Followers {
  href?: null;
  total: number;
}
export interface ImagesEntity {
  url: string;
}
export interface AddedByOrOwner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}
export interface Tracks {
  href: string;
  items?: ItemsEntity[] | null;
  limit: number;
  next: string;
  offset: number;
  previous?: null;
  total: number;
}
export interface ItemsEntity {
  added_at: string;
  added_by: AddedByOrOwner;
  is_local: boolean;
  track: Track;
}
export interface Track {
  album: Album;
  artists?: ArtistsEntity[] | null;
  available_markets?: string[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface Album {
  album_type: string;
  available_markets?: string[] | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: ImagesEntity1[] | null;
  name: string;
  type: string;
  uri: string;
}
export interface ImagesEntity1 {
  height: number;
  url: string;
  width: number;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalIds {
  isrc: string;
}
