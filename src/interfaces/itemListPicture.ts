import * as MediaLibrary from 'expo-media-library';

export interface ItemListPicture {
  data: MediaLibrary.Asset;
  issueId: number;
  inCloud: boolean;
  userId: string | undefined;
}