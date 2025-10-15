
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const numColumns = 3; // Número de colunas na grade
const imageSize = width / numColumns; // Tamanho de cada imagem na grade

export default function GalleryGridScreen() {
  const { images } = useLocalSearchParams();
  const galleryImages: string[] = images ? JSON.parse(images as string) : [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex(prevIndex => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
    } else {
      setSelectedImageIndex(prevIndex => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => openImageModal(index)}>
      <Image source={typeof item === 'string' ? { uri: item } : item} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullContainer}>
      <FlatList
        data={galleryImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.gridContainer}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <FontAwesome name="times-circle" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButtonLeft} onPress={() => navigateImage('prev')}>
            <FontAwesome name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={typeof galleryImages[selectedImageIndex] === 'string' ? { uri: galleryImages[selectedImageIndex] } : galleryImages[selectedImageIndex]}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.navButtonRight} onPress={() => navigateImage('next')}>
            <FontAwesome name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  gridContainer: {
    padding: 5,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    padding: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width * 0.9,
    height: height * 0.7,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -15,
    zIndex: 1,
  },
  navButtonRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -15,
    zIndex: 1,
  },
});

