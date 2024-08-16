export interface CreateBookDto {
  title: string;
  author: string;
  genre: string;
  quantity: number;
  price: number;
  imagePath?: string;
}
