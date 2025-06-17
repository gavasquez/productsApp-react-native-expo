import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProducList } from '../../components/products/ProducList';


export const HomeScreen = () => {

  const { logout } = useAuthStore();
  /* const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 100 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  }); */

  const { isLoading, data, fetchNextPage } = useInfiniteQuery( {
    queryKey: [ 'products', 'infinite' ],
    staleTime: 100 * 60 * 60, // 1 hour
    initialPageParam: 0, // pagina inicial es la 0
    queryFn: async ( params ) => {
      const products = await getProductsByPage( params.pageParam );
      return products;
    },
    getNextPageParam: ( lastPage, allPages ) => allPages.length,
  } );

  return (
    <MainLayout
      title='TesloShop - Products'
      subTitle='Aplicación Administrativa'>

      {
        isLoading ? ( <FullScreenLoader /> ) : ( <ProducList products={ data?.pages.flat() ?? [] } fetchNextPage={ fetchNextPage } /> )
      }

    </MainLayout>
  );
};