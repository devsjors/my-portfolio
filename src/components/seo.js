import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({ seo_title, seo_description }) => {
  const router = useRouter();
  const seo_url = `${process.env.SITE_URL}${router.route}`;

  return (
    <Head>
      <title>{seo_title}</title>
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:title" content={seo_title} />
      <meta property="description" content={seo_description} />
      <meta property="og:url" content={seo_url} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
