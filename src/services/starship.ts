import { Starship } from '@/types/starship';

import { fetcher } from '@/utils/fetcher';

export class StarshipService {
  async postStarship(starshipData: Starship): Promise<object> {
    const url = 'http://localhost:3000/api/starship';
    try {
      return await fetcher<object>(url, { method: 'POST', body: starshipData });
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
