import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import { LogBox } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { theme } from '../global/styles/theme';
import { useNavigation } from '@react-navigation/native';
import PreviewModal from '../components/PreviewModal';

interface Prop {
  route: {
    params: {
      getPicture: (pictureData: CameraCapturedPicture) => Promise<void>;
      isSaveLoading: boolean;
    }
  }
}

export default function Cam({ route }: Prop) {
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  const camRef = useRef<Camera | null>(null);
  const { params } = route;
  const { getPicture } = params;
  const navigation = useNavigation();

  const [ hasPermissions, setHasPermissions] = useState(false);
  const [previewData, setPreviewData] = useState<CameraCapturedPicture>({} as CameraCapturedPicture)
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  async function takePicture() {
    if (camRef.current) {
      setIsLoading(true);
      await camRef.current.takePictureAsync().then(data => {
        setPreviewData(data);
        setShowModal(true);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      })
    }
  }

  async function savePicture(pictureData: CameraCapturedPicture) {
    setIsSaveLoading(true);
    await MediaLibrary.createAssetAsync(pictureData.uri).then((resp) => {
      getPicture(resp).then(() => {
        setIsSaveLoading(false);
        setShowModal(false);
      }).catch((err) => {
        alert(`Ops... Ocorreu algum erro ao salvar! - ${err}`);
      })
    }).catch((err) => {
      alert(`Ops... Ocorreu algum erro ao salvar! - ${err}`);
    });
  }

  async function requestPermissions() {
    const { status: statusCamera } = await Camera.requestPermissionsAsync();
    const { status: statusRoll } = await MediaLibrary.requestPermissionsAsync();
    setHasPermissions(statusCamera === 'granted' && statusRoll === 'granted');
  }

  function goBack() {
    navigation.goBack();
  }

  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <View style={styles.container}>
      <PreviewModal
        showModal={showModal}
        uri={previewData?.uri}
        onSave={() => savePicture(previewData)}
        onCancel={() => setShowModal(false)}
        isSaveLoading={isSaveLoading}
      />
      {hasPermissions ?
        <Camera style={styles.cameraContainer} ref={camRef}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={40} color={theme.textLightColor} />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.pictureButton} onPress={takePicture}>
              {isLoading ?
                <ActivityIndicator size="large" color={theme.textLightColor} />
                :
                <MaterialIcons name="camera" size={60} color={theme.textLightColor} />
              }
            </TouchableOpacity>
          </View>
        </Camera>
        :
        <View style={styles.permissionText}>
          <Text style={{ textAlign: 'center' }}>
            É necessário conceder permissão para utilizar a camera...
          </Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    opacity: 0.8
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom: 50,
    width: Dimensions.get('screen').width
  },
  pictureButton: {
    height: 80,
    width: 80,
    backgroundColor: theme.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  permissionText: {
    marginHorizontal: 20
  }
});