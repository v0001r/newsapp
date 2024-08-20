import axios from 'axios'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { extractJSONFromMarkup } from 'src/utils'
import { GET_BREAKING_NEWS } from 'src/utils/api'
const BreakingNews = dynamic(() => import('src/components/newsType/BreakingNews/BreakingNews'), { ssr: false })

// This is seo api
const fetchDataFromSeo = async (id, language_id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_BREAKING_NEWS}?language_id=${language_id}&slug=${id}`
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const Index = ({ seoData, currentURL }) => {
  let schema = null

  if (seoData && seoData.data && seoData.data.length > 0 && seoData.data[0].schema_markup) {
    const schemaString = seoData.data[0].schema_markup
    schema = extractJSONFromMarkup(schemaString)
  }
  return (
    <>
      <Meta
        title={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_title}
        description={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_description}
        keywords={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_keyword}
        ogImage={seoData?.data && seoData.data.length > 0 && seoData.data[0].image}
        pathName={currentURL}
        schema={schema}
      />
      <BreakingNews />
    </>
  )
}


let serverSidePropsFunction = null;
if (process.env.NEXT_PUBLIC_SEO === "true") {
  serverSidePropsFunction = async (context) => {
    const { req } = context; // Extract query and request object from context
    // console.log(req)
    const { params } = req[Symbol.for('NextInternalRequestMeta')].match;
    // Accessing the slug property
    // const currentURL = req[Symbol.for('NextInternalRequestMeta')].__NEXT_INIT_URL;
    const slugValue = params.slug;
    const currentURL = process.env.NEXT_PUBLIC_WEB_URL + '/breaking-news/' + slugValue + '/';
    const seoData = await fetchDataFromSeo(slugValue);
    return {
      props: {
        seoData,
        currentURL,
      },
    };
  };
}

export const getServerSideProps = serverSidePropsFunction

export default Index
