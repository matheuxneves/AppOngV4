import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '@/contexts/AuthContext';

function RootLayoutNav() {
  return (
    <Stack>
      {/* Rota principal que agrupa as abas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Telas que abrem por cima (Modais) */}
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Acesso de Membros', 
          presentation: 'modal',
          headerTitleAlign: 'center', // Garante que o título do modal também seja centralizado
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Meu Perfil', 
          presentation: 'modal',
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="admin-project-details" 
        options={{ 
          title: 'Gerenciar Voluntários', 
          presentation: 'modal', 
          headerTitleAlign: 'center',
        }} 
      />
      
      {/* Telas de Navegação Padrão (Empilhadas) */}
      <Stack.Screen 
        name="project-details" 
        options={{ 
          title: 'Detalhes do Projeto',
          headerTitleAlign: 'center', 
        }} 
      />
      <Stack.Screen 
        name="gallery-grid" 
        options={{ 
          title: 'Galeria',
          headerTitleAlign: 'center',
        }} 
      />
  
      {/* --- ADICIONE ESTA TELA --- */}
      <Stack.Screen
        name="create-project"
        options={{
          title: 'Criar Projeto',
          presentation: 'modal',
          headerTitleAlign: 'center',
        }}
      />

      {/* --- ADICIONE ESTA TELA --- */}
      <Stack.Screen
        name="edit-project"
        options={{
          title: 'Editar Projeto',
          presentation: 'modal',
          headerTitleAlign: 'center',
        }}
      />

      

    </Stack>
  );
}




export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}