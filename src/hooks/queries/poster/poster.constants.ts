export const POSTER_KEYWORD = {
  RANDOM: 'random',
  VIEWS: 'views',
};

export type PosterKeyword = (typeof POSTER_KEYWORD)[keyof typeof POSTER_KEYWORD];
