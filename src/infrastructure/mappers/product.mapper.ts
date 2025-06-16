import { API_URL } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../interfaces/teslo-porducts.response";

export class ProductMapper {
    static tesloProductToEntity(tesloProduct: TesloProduct): Product {
        return {
            id: tesloProduct.id,
            title: tesloProduct.title,
            price: tesloProduct.price,
            description: tesloProduct.description,
            slug: tesloProduct.slug,
            stock: tesloProduct.stock,
            sizes: tesloProduct.sizes,
            gender: tesloProduct.gender,
            tags: tesloProduct.tags,
            images: tesloProduct.images.map(imge => `${API_URL}/files/product/${imge}`),
        }
    }
}