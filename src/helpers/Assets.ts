import Firebase from 'firebase';

import { ItemListPicture } from '../interfaces/itemListPicture';
import { getPicturesByIssueId, updateStatusPicturesInDevice } from './Storage';

async function uploadPicture(uri: string, pictureName: string): Promise<Firebase.storage.UploadTask> {
  const response = await fetch(uri);
  const blob = await response.blob();

  const ref = Firebase.storage().ref().child(`picture/${pictureName}`);
  return ref.put(blob);
}

async function saveDatabase(pictureObject: ItemListPicture): Promise<Firebase.firestore.DocumentReference<Firebase.firestore.DocumentData>> {
  const bd = Firebase.firestore();

  const picturesRef = bd.collection('pictures');
  return await picturesRef.add(pictureObject);
}

async function savePictureInCloud(pictureObject: ItemListPicture) {
  const { uri, filename } = pictureObject.data;

  return Promise.all([uploadPicture(uri, filename), saveDatabase(pictureObject)]);
}

async function getPicturesOfCloudByIssueId(issueId: number, userId: string | undefined) {
  let picturesList: Array<ItemListPicture> = [] as Array<ItemListPicture>;
  const bd = Firebase.firestore();
  const picturesRef = bd.collection('pictures');

  const response = await picturesRef.where('userId', '==', userId).where('issueId', '==', issueId).get();
  response.forEach((doc) => {
    const picture: ItemListPicture = doc.data() as ItemListPicture;
    picturesList = [...picturesList, picture]
  });

  return picturesList;
}

async function syncPictures(issueId: number) {
  const picturesList = await getPicturesByIssueId(issueId);
  let promises: Array<Promise<[Firebase.storage.UploadTask, Firebase.firestore.DocumentReference<Firebase.firestore.DocumentData>]>> = [];
  let picturesUpdated = [];

  for (let i = 0; i < picturesList.length; i++) {
    if (!picturesList[i].inCloud) {
      promises.push(savePictureInCloud(picturesList[i]));
      picturesUpdated.push(picturesList[i].data.id);
    }
  }

  await updateStatusPicturesInDevice(picturesUpdated);

  return Promise.all(promises);
}

export { savePictureInCloud, getPicturesOfCloudByIssueId, syncPictures }