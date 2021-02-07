import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Box, Typography, Link } from '@material-ui/core';
import { Loading } from '../components';

const Home: React.FC = (): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading currentState="Loading..." />;
  }

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
    >
      <Typography>{session ? `Signed in as ${session.user.email}` : 'Not signed in'}</Typography>
      {session ? (
        <>
          <Button color="primary" href="/main">
            Go to your map
          </Button>
          <Button color="secondary" onClick={signOut}>
            Sign out
          </Button>
          <Link color="textSecondary" href="/privacy">
            Privacy Policy
          </Link>
        </>
      ) : (
        <>
          <Button color="primary" onClick={signIn}>
            Sign in
          </Button>
          <Link href="/privacy">Privacy Policy</Link>
        </>
      )}
    </Box>
  );
};

export default Home;
