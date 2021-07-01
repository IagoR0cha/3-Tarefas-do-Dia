import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemListPicture } from '../interfaces/itemListPicture';

async function getPicturesStorage(): Promise<Array<ItemListPicture>> {
  const response = await AsyncStorage.getItem('@picture_device');
  if (response) {
    return JSON.parse(response);
  }

  return [];
}

async function setPicturesStorage(currentList: Array<ItemListPicture>): Promise<void> {
  let listForSave: Array<ItemListPicture> = []

  const listAllPictures = await getPicturesStorage();
  currentList.forEach((picture) => {
    const response = listAllPictures.some((currentPicture) => picture.data.id === currentPicture.data.id);
    if (!response) {
      listForSave = [...listForSave, picture]
    }
  });

  return await AsyncStorage.setItem('@picture_device', JSON.stringify([...listAllPictures, ...listForSave]))
}

async function push(picture: ItemListPicture): Promise<void> {
  const listAllPictures = await getPicturesStorage();
  return await AsyncStorage.setItem('@picture_device', JSON.stringify([...listAllPictures, picture]));
}

async function getPicturesByIssueId(issueId: number) {
  const allPictures = await getPicturesStorage();
  return filterById(allPictures, issueId);
}

function filterById(listAllPictures: Array<ItemListPicture>, issueId: number): Array<ItemListPicture> {
  return listAllPictures.filter((picture) => picture.issueId === issueId);
}

async function updateStatusPicturesInDevice(picturesUpdated: Array<string>) {
  const listAllPictures = await getPicturesStorage();
  const newListAllPictures = listAllPictures.map((picture) => {
    const currentPicture = picture;
    picturesUpdated.forEach((pictureId) => {
      if (currentPicture.data.id === pictureId) {
        currentPicture.inCloud = true;
      }
    });
    return currentPicture;
  });

  return await AsyncStorage.setItem('@picture_device', JSON.stringify(newListAllPictures));
}

export {
  getPicturesStorage,
  setPicturesStorage,
  push,
  getPicturesByIssueId,
  updateStatusPicturesInDevice,
};