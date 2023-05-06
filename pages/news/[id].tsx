import { sdk } from "@/lib/datocms"
import { GetOneNewsQuery, SiteLocale } from "@/graphql/generated/sdk"
import { GetStaticProps, GetStaticPaths } from "next"

export default  function Index(props: { notice: GetOneNewsQuery['notice'] }) {
  const { notice } = props
  if(!notice) { return null}

  return (
    <div>
      <h1> { notice.title}  </h1>
      <p> { notice.shortDescription } </p>
      <p> {notice.longDescription } </p>
    </div>
  )
}

export const getStaticProps : GetStaticProps = async ( context ) => {
  const { locale, params } = context
  if(typeof params?.id !== 'string') {
    return { notFound: true}
  }
  const id = params.id
  const lang = locale === 'en' ? SiteLocale.En : SiteLocale.Ja
  const { notice }  = await sdk.getOneNews({id: id, locale: lang})
  if(!notice) {
    return { notFound: true}
  }
  return { props: { notice } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { allNotices } = await sdk.getNews()
  const paths : Array<{params: any, locale: 'ja' | 'en'}> = []
  allNotices.forEach(notice => {
    paths.push({ params: { id: notice.id}, locale: 'ja'})
    paths.push({ params: { id: notice.id}, locale: 'en'})
  })
  return { paths , fallback: false}
}
