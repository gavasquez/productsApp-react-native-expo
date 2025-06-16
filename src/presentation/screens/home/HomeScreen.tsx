import { Button, Icon, Layout, Text } from '@ui-kitten/components';


export const HomeScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">H1</Text>
      
      <Button
        accessoryLeft={<Icon name="arrow-back" />}
      >
        Cerrar sesión
      </Button>
    </Layout>
  );
};