export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface Auction {
  id: string;
  title: string;
  imageUrl: string;
  bidPoints: number;
  endsAt: string;
  shipsFree: boolean;
  localPickup: boolean;
  digitalDelivery: boolean;
  category: string;
}
