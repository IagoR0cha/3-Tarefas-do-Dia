import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../global/styles/theme';

interface Props {
  showModal: boolean;
  uri: string | undefined;
  onCancel: () => void;
  onSave: () => void;
  isSaveLoading: boolean;
}

export default function PreviewModal({ showModal, uri, onCancel, onSave, isSaveLoading }: Props) {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            {isSaveLoading ?
              <View style={styles.indicatorContainer}>
                <ActivityIndicator size="large" color={theme.primaryColor} />
                <Text style={styles.indicatorText}>Salvando</Text>
              </View>
              :
              <View>
                <View style={styles.body}>
                  {uri ?
                    <Image style={styles.image} source={{ uri }} resizeMode="contain" />
                    :
                    <Text>Ops... Erro ao abrir a imagem! Tente Novamente</Text>
                  }
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', borderBottomLeftRadius: 20 }]}
                    onPress={onCancel}
                  >
                    <Text style={styles.textButton}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green', borderBottomRightRadius: 20, }]}
                    onPress={onSave}
                  >
                    <Text style={styles.textButton}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: theme.cardColorLight,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {
    paddingHorizontal: 35,
    paddingTop: 35,
  },
  image: {
    width: Dimensions.get('screen').width - 111,
    height: Dimensions.get('screen').height - 424,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textLightColor,
  },
  indicatorContainer: {
    width: Dimensions.get('screen').width - 50,
    paddingVertical: 30
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
});