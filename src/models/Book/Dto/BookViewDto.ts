export interface BookViewDto {
  bookId: number;
  title: string;
  genre: string;
  author: string;
  stockQuantity: number;
  price: number;
  imagePath?: string;
}
