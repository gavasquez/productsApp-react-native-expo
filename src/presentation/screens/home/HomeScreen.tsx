import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';


export const HomeScreen = () => {

  const { logout } = useAuthStore();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">H1</Text>

      <Button
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={logout}
      >
        Cerrar sesión
      </Button>
    </Layout>
  );
};