import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type InfoModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
};

export default function InfoModal({
  visible,
  title,
  message,
  onClose,
  buttonText = 'OK',
}: InfoModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});