import { Layout, List, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product"
import { ProducCard } from "./ProducCard";


interface Props {
    products: Product[];
    // Todo: fetch nextPage
}

export const ProducList = ({ products }: Props) => {
    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <ProducCard product={item} />
            )}
            ListFooterComponent={() => <Layout style={{ height: 150 }} />}
        />
    )
}
