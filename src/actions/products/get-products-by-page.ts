import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/teslo-porducts.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
    try {
        const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * limit}&limit=${limit}`);
        const products = data.map(ProductMapper.tesloProductToEntity);
        return products;
    } catch (error) {
        throw new Error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}