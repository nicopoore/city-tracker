import Head from 'next/head'
import styles from '../styles/Main.module.css'
import { Map, Sidebar } from '../components'
import { Box } from '@material-ui/core'
import { signIn, useSession } from 'next-auth/client'
import useSWR from 'swr'

const fetcher = async url => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'default'
}).then(res => res.json())

const Home: React.FC = () => {
  const [session, loading] = useSession()
  
  if (loading) {
    return <p>Loading map...</p>
  }

  const { data, error } = useSWR('/api/cities', fetcher)

  if (error) return <div>An error has occured.</div>;
  if (!data) return <div>Loading...</div>


  return (
    <Box className={styles.container}>
      <>
      {session ? (
        <>
          <Head>
            <title>Wander Tracker</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <Sidebar categories={data} />
            <Map />
          </main>
        </>
      ) : (
        <>
          <p>Please sign in to access your map.</p>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      </>
    </Box>
  )
}

export default Home;