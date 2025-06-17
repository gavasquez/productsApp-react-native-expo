import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../infrastructure/interfaces/teslo-porducts.response';
import { MyIcon } from '../../components/ui/MyIcon';

const sizes: Size[] = [
  Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl
];

const genders: Gender[] = [
  Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex
];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ( { route }: Props ) => {

  const productIdRef = useRef( route.params.productId );
  const theme = useTheme();

  const { isLoading, data: product } = useQuery( {
    queryKey: [ 'product', productIdRef.current ],
    queryFn: () => getProductById( productIdRef.current ),
  } );

  if ( !product ) {
    return <MainLayout title="Cargando..."></MainLayout>;
  }

  return (
    <MainLayout title={ product.title } subTitle={ `Precio: ${ product.price }` }>
      <ScrollView style={ { flex: 1 } }>
        {/* Imagenes del producto */ }
        <Layout>
          {/* Todo: Tener en consideracion cuando no hay imagenes */ }
          <FlatList
            data={ product.images }
            horizontal
            keyExtractor={ ( item ) => item }
            showsHorizontalScrollIndicator={ false }
            renderItem={ ( { item } ) => (
              <FadeInImage uri={ item } style={ { width: 300, height: 300, marginHorizontal: 7 } } />
            ) }
          />
        </Layout>
        {/* Formulario */ }
        <Layout style={ { marginHorizontal: 10 } }>
          <Input
            label="Titulo"
            value={ product.title }
            style={ { marginVertical: 5 } }
          />

          <Input
            label="Slug"
            value={ product.slug }
            style={ { marginVertical: 5 } }
          />

          <Input
            label="Descripcion"
            value={ product.description }
            multiline
            numberOfLines={ 5 }
            style={ { marginVertical: 5 } }
          />
        </Layout>

        {/* Precio y Inventario */ }
        <Layout style={ { marginHorizontal: 15, flexDirection: 'row', gap: 10, marginVertical: 5 } }>
          <Input
            label="Precio"
            value={ product.price.toString() }
            style={ { flex: 1 } }
          />

          <Input
            label="Inventario"
            value={ product.stock.toString() }
            style={ { flex: 1 } }
          />
        </Layout>

        {/* Selectores */ }
        <ButtonGroup
          style={ { margin: 2, marginTop: 20, marginHorizontal: 10 } }
          size="small"
          appearance="outline"
        >
          {
            sizes.map( ( size ) => (
              <Button
                key={ size }
                style={ { flex: 1, backgroundColor: true ? theme[ 'color-primary-200' ] : undefined } }
              >
                { size }
              </Button>
            ) )
          }
        </ButtonGroup>

        <ButtonGroup
          style={ { margin: 2, marginTop: 20, marginHorizontal: 10 } }
          size="small"
          appearance="outline"
        >
          {
            genders.map( ( gender ) => (
              <Button
                key={ gender }
                style={ { flex: 1, backgroundColor: true ? theme[ 'color-primary-200' ] : undefined } }
              >
                { gender }
              </Button>
            ) )
          }
        </ButtonGroup>

        {/* Bóton de guardar */ }
        <Button
          accessoryLeft={ <MyIcon name="save-outline" white /> }
          onPress={ () => { } }
          style={ { margin: 15 } }>
          Guardar
        </Button>

        <Text>{ JSON.stringify( product, null, 2 ) }</Text>

        <Layout style={ { height: 200 } } />
      </ScrollView>
    </MainLayout>
  );
};