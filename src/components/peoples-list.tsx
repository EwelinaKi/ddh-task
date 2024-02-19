import { ReactElement } from 'react';

import { Link,Typography } from '@mui/material';

import { People } from '@/types/people';


interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): ReactElement => {
  return (
    <>
      {peoples.map((x) => (
        <Typography key={x.name} variant="subtitle1">
          <Link href={`/people/${x.id}`}>
            {x.name}
          </Link>
        </Typography>
      ))}
    </>
  );
};

export default PeoplesList;
