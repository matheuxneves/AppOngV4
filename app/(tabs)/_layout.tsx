import { FontAwesome } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();
  const router = useRouter();

  const handleProfilePress = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#314659',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#314659',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={handleProfilePress} style={{ marginRight: 15 }}>
            <FontAwesome name="user-circle" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="briefcase" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contato',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="envelope" color={color} />,
        }}
      />
      {user?.role === 'admin' && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="shield" color={color} />,
          }}
        />
      )}
    </Tabs>
  );
}