import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { Product } from '../../../domain/entities/product';
import { ProductImages } from '../../components/products/ProductImages';
import { getProductById, updateCreateProduct } from '../../../actions/products';
import { genders, sizes } from '../../../config/consts/constans';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ( { route }: Props ) => {

  const productIdRef = useRef( route.params.productId );
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { isLoading, data: product } = useQuery( {
    queryKey: [ 'product', productIdRef.current ],
    queryFn: () => getProductById( productIdRef.current ),
  } );

  const mutation = useMutation( {
    mutationFn: ( data: Product ) => updateCreateProduct( { ...data, id: productIdRef.current } ),
    onSuccess( data: Product ) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries( { queryKey: [ 'products', 'infinite' ] } );
      queryClient.invalidateQueries( { queryKey: [ 'product', data.id ] } );
    }
  } );

  if ( !product ) {
    return <MainLayout title="Cargando..."></MainLayout>;
  }

  return (
    <Formik
      initialValues={ product } // Valor inicial del formulario
      onSubmit={ mutation.mutate }
    >
      {
        ( { handleChange, handleSubmit, values, errors, setFieldError, setFieldValue } ) => (
          <MainLayout title={ values.title } subTitle={ `Precio: ${ values.price }` }>
            <ScrollView style={ { flex: 1 } }>
              {/* Imagenes del producto */ }
              <Layout style={ { marginVertical: 10, justifyContent: 'center', alignItems: 'center' } }>

                <ProductImages images={ values.images } />

              </Layout>
              {/* Formulario */ }
              <Layout style={ { marginHorizontal: 10 } }>
                <Input
                  label="Titulo"
                  style={ { marginVertical: 5 } }
                  value={ values.title }
                  onChangeText={ handleChange( 'title' ) }
                />

                <Input
                  label="Slug"
                  style={ { marginVertical: 5 } }
                  value={ values.slug }
                  onChangeText={ handleChange( 'slug' ) }
                />

                <Input
                  label="Descripcion"
                  multiline
                  numberOfLines={ 5 }
                  style={ { marginVertical: 5 } }
                  value={ values.description }
                  onChangeText={ handleChange( 'description' ) }
                />
              </Layout>

              {/* Precio y Inventario */ }
              <Layout style={ { marginHorizontal: 15, flexDirection: 'row', gap: 10, marginVertical: 5 } }>
                <Input
                  label="Precio"
                  style={ { flex: 1 } }
                  value={ values.price.toString() }
                  onChangeText={ handleChange( 'price' ) }
                  keyboardType="numeric"
                />

                <Input
                  label="Inventario"
                  style={ { flex: 1 } }
                  value={ values.stock.toString() }
                  onChangeText={ handleChange( 'stock' ) }
                  keyboardType="numeric"
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
                      onPress={ () => setFieldValue( 'sizes', values.sizes.includes( size ) ? values.sizes.filter( s => s !== size ) : [ ...values.sizes, size ] ) }
                      key={ size }
                      style={ { flex: 1, backgroundColor: values.sizes.includes( size ) ? theme[ 'color-primary-200' ] : undefined } }
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
                      onPress={ () => setFieldValue( 'gender', gender ) }
                      key={ gender }
                      style={ { flex: 1, backgroundColor: values.gender.startsWith( gender ) ? theme[ 'color-primary-200' ] : undefined } }
                    >
                      { gender }
                    </Button>
                  ) )
                }
              </ButtonGroup>

              {/* Bóton de guardar */ }
              <Button
                disabled={ mutation.isPending }
                accessoryLeft={ <MyIcon name="save-outline" white /> }
                onPress={ () => handleSubmit() }
                style={ { margin: 15 } }>
                Guardar
              </Button>

              {/* <Text>{ JSON.stringify( values, null, 2 ) }</Text> */ }

              <Layout style={ { height: 200 } } />
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>
  );
};