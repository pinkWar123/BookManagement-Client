export interface IBook {
  id?: number;
  title: string;
  genre: string;
  author: string;
  stockQuantity: number;
  price?: number;
  cover?: string;
}
