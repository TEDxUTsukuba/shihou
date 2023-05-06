import { sdk } from "@/lib/datocms"
import { GetNewsQuery, SiteLocale } from "@/graphql/generated/sdk"
import { GetStaticProps } from "next"
import { Image } from 'react-datocms'
import Link from 'next/link'

export default  function Index(props: { notices: GetNewsQuery['allNotices'] }) {
  const { notices } = props
  return (
    <div>
      <h1> ニュース一覧  </h1>
      { notices.map(news => { return (
        <div key={news.id}>
          <h2>{news.title}</h2>
          <p> { news.shortDescription }</p>
            { news?.image?.responsiveImage && 
                (<Image data={news.image.responsiveImage}  / >)} 
          <Link href={`/news/${news.id}`} > 詳細 </Link>
        </div>
      )
      })
      }
    </div>
  )
}

export const getStaticProps : GetStaticProps = async ( context ) => {
  const { locale, params } = context
  const lang = locale === 'en' ? SiteLocale.En : SiteLocale.Ja
  const { allNotices }  = await sdk.getNews({locale: lang})
  if(!allNotices) {
    return { notFound: true}
  }
  return { props: { notices: allNotices } }
}
