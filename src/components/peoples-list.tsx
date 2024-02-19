import { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { People } from '@/types/people';

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): ReactElement => {
  return (
    <>
      {peoples.map((x) => (
        <Typography key={x.name} variant="subtitle1">
          {x.name}
        </Typography>
      ))}
    </>
  );
};

export default PeoplesList;
