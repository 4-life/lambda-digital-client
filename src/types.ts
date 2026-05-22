export interface Author {
  id?: string;
  name: string;
  avatar?: string;
}

export interface Item {
  id?: string;
  pic?: string;
  author: Author;
  views: number;
  title: string;
  price: string;
  likes: number;
  comments: number;
  publishDate: string;
}

export interface ItemsData {
  items: Item[];
}

export interface ItemsVars {
  range: number;
  limit: number;
  offset: number;
}
