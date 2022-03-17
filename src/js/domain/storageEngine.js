import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_VIDEOS));
  }

  saveVideo(newVideoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const newVideo = { videoId: newVideoId, isViewed: false };

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify([...savedVideos, newVideo]));
  }

  removeVideo(newVideoId) {
    const savedVideos = this.getSavedVideos();

    const restSavedVideos = savedVideos.filter(({ videoId }) => videoId !== newVideoId);

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(restSavedVideos));
  }

  checkVideoViewed(specificVideoId) {
    const savedVideos = this.getSavedVideos();

    const specificVideo = savedVideos.find(({ videoId }) => videoId === specificVideoId);
    specificVideo.isViewed = true; // 여기서는 이미 복사한 object니까 이렇게 변경해도 다른 곳에 영향 안끼쳐서 괜찮아보임

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(savedVideos));
  }

  getSpecificVideo(specificVideoId) {
    const savedVideos = this.getSavedVideos() || [];

    return savedVideos.find(({ videoId }) => videoId === specificVideoId);
  }

  init() {
    localStorage.clear();
  }
}
