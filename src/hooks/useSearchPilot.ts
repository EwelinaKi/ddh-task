import { QueryStatus, useQuery } from '@tanstack/react-query';

import { Pilot } from '@/types/people';

import { PeopleService } from '@/services/people';

interface State {
  status: QueryStatus;
  pilots: Pilot[] | undefined;
}

const SEARCH_PERSON_KEY = 'search_person';

const useSearchPilot = (name: string): State => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [SEARCH_PERSON_KEY, name],
    queryFn: () => peopleService.searchPilot(name),
  });

  return {
    status: status,
    pilots: data,
  };
};

export default useSearchPilot;
