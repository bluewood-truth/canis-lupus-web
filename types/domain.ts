/* eslint-disable camelcase */

export interface BannerRecord {
  id: string;
  fields: BannerInfo;
  createdTime: string;
}

export interface BannerInfo {
  url: string;
  img_url: string;
}

export interface TosInfo {
  name: string;
  url: string;
  isRequired: boolean;
}

export interface CategoryInfo {
  _id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface FeedRecord {
  id: string;
  fields: FeedInfo;
  createdTime: string;
}

export interface FeedInfo {
  title: string;
  content: string;
  type: string;
  group_name: string;
  user_nickname: string;
  like: number;
  comment: number;
}

export interface ImageInfo {
  imageUrls: string[];
}
