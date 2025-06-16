import { Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProducList } from '../../components/products/ProducList';


export const HomeScreen = () => {

  const { logout } = useAuthStore();
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 100 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title='TesloShop - Products'
      subTitle='Aplicación Administrativa'>

      {
        isLoading ? (<FullScreenLoader />) : (<ProducList products={products} />)
      }

    </MainLayout>
  );
};