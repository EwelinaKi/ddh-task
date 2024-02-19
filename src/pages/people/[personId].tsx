import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, CircularProgress, Stack } from '@mui/material';

import usePerson from '@/hooks/usePerson';

import Layout from '@/components/layout';
import { PersonCard } from '@/components/person-card';


export default function PeopleName(): ReactElement {
  const router = useRouter();
  const [currentId, setCurrentId] = useState('');
  const { data, status } = usePerson(currentId);

  useEffect(() => {
    const id = router.query.personId?.toString();
    if (!id) {
      return;
    }
    const parsedId = id.split('-').shift() || '';
    setCurrentId(parsedId);
  }, [router.query.personId]);

  useEffect(() => {
    if (!data?.name) {
      return;
    }

    router.replace(
      {
        pathname: `/people/[personId]`,
      },
      `/people/${currentId}-${data?.name}`,
      { shallow: true },
    );

  }, [data]);

  return (
    <Layout>
      <Stack alignItems='center' justifyContent='center' my={4}>
      {(status !== 'success' || !data ) ?
        <Box p={4}>
          <CircularProgress />
        </Box>
        :
        <PersonCard data={data} />
      }
      </Stack>
    </Layout>
  );
}
