import { useRouter } from 'next/router';

const RedirectPage: React.FC = (): JSX.Element => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push('/');
  }

  return <></>;
};

export default RedirectPage;
