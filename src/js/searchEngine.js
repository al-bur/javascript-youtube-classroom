import fetch from 'node-fetch';

export default class SearchEngine {
  async searchKeyword(keyword) {
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?maxResults=1&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet`;

    const response = await fetch(BASE_URL);

    if (response.ok) {
      const json = await response.json();
      return json.items;
    }

    throw Error('유튜브 검색 기능이 정상 작동되지 않았습니다.');
  }
}