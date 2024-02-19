import { ReactElement, ReactNode } from 'react';

import { Container, Stack } from '@mui/material';

type PropsWithChildren = { children?: ReactNode };

const Layout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <Container maxWidth="lg">
      <Stack component="main">{children}</Stack>
    </Container>
  );
};

export default Layout;
