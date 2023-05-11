import axios from './axios';

export class TitleService {
  public async getAllTitles() {
    const response = await axios.get('/titles/all');
    return response.data;
  }
}
