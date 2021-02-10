import Head from 'next/head';
import React from 'react';

const Meta: React.FC = (): JSX.Element => {
  return (
    <Head>
      <title>Wander Tracker</title>
      <meta content="Wander Tracker" name="title" />
      <meta
        content="Keep track of your favourite cities, as well as all those you've visited or want to visit."
        name="description"
      />

      <meta content="website" property="og:type" />
      <meta content="https://city-tracker.vercel.app/" property="og:url" />
      <meta content="Wander Tracker" property="og:title" />
      <meta
        content="Keep track of your favourite cities, as well as all those you've visited or want to visit."
        property="og:description"
      />
      <meta content="/ogImage.png" property="og:image" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content="https://city-tracker.vercel.app/" property="twitter:url" />
      <meta content="Wander Tracker" property="twitter:title" />
      <meta
        content="Keep track of your favourite cities, as well as all those you've visited or want to visit."
        property="twitter:description"
      />
      <meta content="https://i.imgur.com/Ywa8arA.png" property="twitter:image" />
    </Head>
  );
};

export default Meta;
