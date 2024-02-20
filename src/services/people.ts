import { APIList } from '@/types/api';
import { List } from '@/types/list';
import { People, PeopleAPI, Pilot } from '@/types/people';

import { fetcher } from '@/utils/fetcher';

const PEOPLE_RESOURCE = 'people';

export class PeopleService {
  private url = process.env.NEXT_PUBLIC_API_URL;
  private elementsPerPage = 10;

  private getApiUrl = () => {
    if (!this.url) {
      throw new Error('No exist env: NEXT_PUBLIC_API_URL');
    }
    return new URL(this.url + PEOPLE_RESOURCE);
  };

  private getURL(page?: number): string {
    const apiURL = this.getApiUrl();

    if (page) {
      apiURL.searchParams.append('page', page.toString());
    }

    return apiURL.href;
  }

  private getSearchURL(query: string): string {
    const apiURL = this.getApiUrl();

    if (query) {
      apiURL.searchParams.append('search', query);
    }

    return apiURL.href;
  }

  private getPersonURL(id: string): string {
    const apiURL = this.getApiUrl();

    return `${apiURL.href}/${id}`;
  }

  private getIdFromUrl = (url: string): number => {
    const id = url
      .replace(this.getApiUrl().toString(), '')
      .replaceAll('/', '');

    return parseInt(id);
  };

  async getPage(page: number = 1): Promise<List<People>> {
    const url = this.getURL(page);

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      const requiredFields: Partial<keyof Omit<People, 'id'>>[] = ['name'];

      if (!response.results) throw new Error('No data');

      requiredFields.forEach((field) => {
        if (!response.results.every((x) => x[field])) throw new Error(`No ${field} field`);
      });

      return {
        page: page,
        perPage: this.elementsPerPage,
        totalPage: Math.ceil(response.count / this.elementsPerPage),
        list: response.results.map((x) => ({
          name: x.name,
          id: this.getIdFromUrl(x.url),
        })),
      };
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getPerson(id: string): Promise<PeopleAPI> {
    const url = this.getPersonURL(id);

    try {
      const response = await fetcher<PeopleAPI>(url);

      if (!response) {
        throw new Error('No data');
      }

      return response;

    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async searchPilot(name: string): Promise<Pilot[]> {
    const url = this.getSearchURL(name);

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      if (!response || !response.results) {
        throw new Error('No data');
      }

      return response.results.map( el => ({name: el.name, url: el.url}));

    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
