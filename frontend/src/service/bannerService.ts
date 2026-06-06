// bannerService.ts - banners table has been removed
// Returning empty stubs to avoid breaking existing imports

export const useBanner = () => ({
  banner: [],
  isLoading: false,
  isError: false,
});

export const useBannerByLocation = (_location: string) => ({
  banner: [],
  isLoading: false,
  isError: false,
});
