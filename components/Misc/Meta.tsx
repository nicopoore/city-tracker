import Head from 'next/head';
import React from 'react';

const Meta: React.FC<{ userName?: string }> = (props): JSX.Element => {
  const metaTitle = props.userName ? `Wander Tracker - ${props.userName}'s map` : 'Wander Tracker';
  const metaDesc = props.userName
    ? `Check out the cities ${props.userName} has visited, wants to visit as well as their favourite ones`
    : "Keep track of your favourite cities, as well as all those you've visited or want to visit.";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta content={metaTitle} name="title" />
      <meta content={metaDesc} name="description" />

      <meta content="website" property="og:type" />
      <meta content="https://city-tracker.vercel.app/" property="og:url" />
      <meta content={metaTitle} property="og:title" />
      <meta content={metaDesc} property="og:description" />
      <meta content="/ogImage.png" property="og:image" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content="https://city-tracker.vercel.app/" property="twitter:url" />
      <meta content={metaTitle} property="twitter:title" />
      <meta content={metaDesc} property="twitter:description" />
      <meta content="https://i.imgur.com/Ywa8arA.png" property="twitter:image" />
    </Head>
  );
};

export default Meta;
