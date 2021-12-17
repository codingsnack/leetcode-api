import fetch from 'node-fetch';
import { Constants } from './constants';

export class HttpHelper {
  async getPublicList(listId: string) {
    const res = await fetch(`${Constants.ENDPOINT}/list/api/get_list/${listId}/`);
    return await res.json();
  }
}
