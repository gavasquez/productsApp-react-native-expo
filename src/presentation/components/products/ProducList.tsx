import { Layout, List, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product";
import { ProducCard } from "./ProducCard";
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';


interface Props {
  products: Product[];
  // Todo: fetch nextPage
  fetchNextPage: () => void;
}

export const ProducList = ( { products, fetchNextPage }: Props ) => {

  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState( false );

  const onPullToRefresh = async () => {
    setIsRefreshing( true );
    await new Promise( resolve => setTimeout( resolve, 200 ) );
    queryClient.invalidateQueries( { queryKey: [ 'products', 'infinite' ] } );
    setIsRefreshing( false );
  }

  return (
    <List
      data={ products }
      numColumns={ 2 }
      keyExtractor={ ( item, index ) => `${ item.id }-${ index }` }
      renderItem={ ( { item } ) => (
        <ProducCard product={ item } />
      ) }
      ListFooterComponent={ () => <Layout style={ { height: 150 } } /> }
      onEndReachedThreshold={ 0.8 }
      onEndReached={ fetchNextPage }
      refreshControl={
        <RefreshControl
          refreshing={ isRefreshing }
          onRefresh={ onPullToRefresh }
        />
      }
    />
  );
};
