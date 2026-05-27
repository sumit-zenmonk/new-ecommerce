export interface Product {
    uuid: string;
    name: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface SaleProduct {
    uuid: string;
    price: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface ProductResponse<T> {
    data: T[];
    limit: number;
    offset: number;
    totalDocuments: number;
    message: string;
}

export interface ProductState {
  catalogProducts: Product[];
  saleProducts: SaleProduct[];
  loading: boolean;
  error: string | null;
  status: "pending" | "succeed" | "rejected";
  limit: number;
  offset: number;
  totalDocuments: number;
}