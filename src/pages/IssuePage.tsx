import React, { useLayoutEffect, useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { FontAwesome5 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Network from 'expo-network';
import { ReactElement } from 'react-native/node_modules/@types/react';

import Tabs from '../components/Tabs';
import Background from '../components/Background';
import ListPictures from '../components/ListPicturesComponents/ListPictures';
import { setPicturesStorage, getPicturesByIssueId } from '../helpers/Storage';
import { savePictureInCloud, getPicturesOfCloudByIssueId, syncPictures } from '../helpers/Assets';

import { DataAccess } from '../interfaces/dataAccess';
import { theme } from '../global/styles/theme';
import { ItemListPicture } from '../interfaces/itemListPicture';
import { useAuth } from '../hooks/auth';

type ParamList = {
  Detail: {
    data: DataAccess;
  };
};

type item = 'DEVICE' | 'CLOUD'

export default function IssuePage() {
  const { params } = useRoute<RouteProp<ParamList, 'Detail'>>();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [picturesInDevice, setPicturesInDevice] = useState<Array<ItemListPicture>>([]);
  const [picturesInCloud, setPicturesInCloud] = useState<Array<ItemListPicture>>([]);
  const [currentContentSelected, setCurrentContentSelected] = useState<item>();
  const [isLoadingSync, setIsLoadingSync] = useState(false);

  async function getPicture(pictureData: MediaLibrary.Asset) {
    let pictureObject: ItemListPicture = {} as ItemListPicture;

    const { isInternetReachable } = await Network.getNetworkStateAsync();
    if (isInternetReachable) {
    // if (false) {                                                                                                  //simular offline
      pictureObject = { data: pictureData, issueId: params.data.id, inCloud: true, userId: user.userId };
      const currentList = [...picturesInDevice, pictureObject]
      setPicturesInDevice(currentList);
      return Promise.all([saveOnePictureInCloud(pictureObject), setPicturesStorage(currentList)]);
    } else {
      pictureObject = { data: pictureData, issueId: params.data.id, inCloud: false, userId: user.userId };
      const currentList = [...picturesInDevice, pictureObject]
      setPicturesInDevice(currentList);
      return await setPicturesStorage(currentList);
    }
  }

  async function saveOnePictureInCloud(pictureObject: ItemListPicture) {
    return savePictureInCloud(pictureObject).then(() => {
      setPicturesInCloud([...picturesInCloud, pictureObject]);
    });
  }

  async function setPicturesOfDeviceAndCloud() {
    const picturesDeviceList = await getPicturesByIssueId(params.data.id);
    setPicturesInDevice(picturesDeviceList);

    const { isInternetReachable } = await Network.getNetworkStateAsync();
    if (isInternetReachable) {
      setPicturesWhenComeApi();
    }
  }

  async function setPicturesWhenComeApi() {
    const picturesCloudList = await getPicturesOfCloudByIssueId(params.data.id, user.userId);
    setPicturesInCloud(picturesCloudList);
}

  function toggleCam() {
    navigation.navigate('Cam', { getPicture })
  }

  async function startSyncApi() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    if (isInternetReachable) {
      setIsLoadingSync(true);
      syncPictures(params.data.id).then(() => {
        setIsLoadingSync(false);
        setPicturesWhenComeApi();
      }).catch(() => {
        alert('Ops... Ocorreu algum erro inesperado...')
        setIsLoadingSync(false);
      })
    }
  }

  function syncButton(): ReactElement {
    return (
      <TouchableOpacity
        style={styles.syncButton}
        onPress={() => startSyncApi()}
      >
        {isLoadingSync ?
          <ActivityIndicator size="small" color={theme.textLightColor} />
          :
          <Text style={styles.syncText}>Sincronizar</Text>
        }
      </TouchableOpacity>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.data.title
    });
  }, []);

  useEffect(() => {
    setPicturesOfDeviceAndCloud();
  }, []);

  return(
    <Background
      styleBody={styles.container}
      header={<Tabs itemCurrent={setCurrentContentSelected} />}
    >
      <ListPictures
        data={currentContentSelected === 'DEVICE' ? picturesInDevice : picturesInCloud}
        syncButton={currentContentSelected === 'CLOUD' ? syncButton() : null}
        />
      <TouchableOpacity
        style={styles.fabCam}
        onPress={toggleCam}
        disabled={(picturesInCloud.length >= 3 || picturesInDevice.length >= 3)}
      >
        <FontAwesome5 name="camera" size={30} color={theme.textLightColor} />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  fabCam: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: theme.secondaryColor,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    elevation: 5,
  },
  syncButton: {
    backgroundColor: theme.primaryColor,
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  syncText: {
    color: theme.textLightColor,
    fontSize: 16,
    fontWeight: 'bold'
  }
})