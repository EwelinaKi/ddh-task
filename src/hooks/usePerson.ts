import { QueryStatus, useQuery } from '@tanstack/react-query';

import { PeopleAPI } from '@/types/people';

import { PeopleService } from '@/services/people';

interface State {
  status: QueryStatus;
  data: PeopleAPI | undefined;
}

const PERSON_KEY = 'person';

const usePerson = (id: string): State => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [PERSON_KEY, id],
    queryFn: () => peopleService.getPerson(id),
  });

  return {
    status: status,
    data: data,
  };
};

export default usePerson;
