import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Box, Typography } from '@material-ui/core';

const Home: React.FC = (): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
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
        </>
      ) : (
        <Button color="primary" onClick={signIn}>
          Sign in
        </Button>
      )}
    </Box>
  );
};

export default Home;
