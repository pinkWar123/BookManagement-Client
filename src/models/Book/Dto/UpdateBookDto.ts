export interface UpdateBookDto {
  title: string;
  author: string;
  genre: string;
  stockQuantity: number;
  price: number;
  imagePath?: string;
}
