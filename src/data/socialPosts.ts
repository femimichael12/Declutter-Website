export interface SocialPost {
  id: string;
  image: string;
  caption?: string;
  instagramUrl: string;
  username?: string;
  handle?: string;
  tag?: string;
  likes?: string;
  date?: string;
}

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/buyandselloutlet/';
export const INSTAGRAM_HANDLE = '@buyandselloutlet';

/**
 * Social media posts for the "Follow Our Journey" Instagram carousel.
 * To add more posts in the future, simply add a new object to this array.
 * When multiple posts are present, the component will automatically enable
 * carousel navigation (swipe on mobile, next/previous buttons on desktop).
 */
export const initialSocialPosts: SocialPost[] = [
  {
    id: 'post-1',
    image: '/images/instagram/post-1.png',
    caption: 'Official BuyAndSellOutlets team — Delivering certified pre-owned and brand-new electronics nationwide with warranty you can trust! 🚀📦',
    instagramUrl: 'https://www.instagram.com/buyandselloutlet/',
    username: 'BuyAndSellOutlets',
    handle: '@buyandselloutlet',
    tag: 'Official Community',
    likes: '1.2k',
    date: 'Recent Post',
  },
];

export const socialPosts = initialSocialPosts;

