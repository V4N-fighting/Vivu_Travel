export default interface BannerHomeItem {
    id: number;
    textContent: string;
    firstImage: string;
    secondImage: string;
    isActive?: boolean;
    pageLocation?: string;
    sortOrder?: number;
}