import { sdk } from "@/lib/datocms"
import { SiteLocale } from "@/graphql/generated/sdk"
import { GetStaticProps, GetStaticPaths } from "next"
import { GetOneConferenceQuery } from "@/graphql/generated/sdk"

export default  function Index(props: { conference: GetOneConferenceQuery['conference'] }) {
  const { conference } = props
  if(!conference) { return null}

  return (
    <div>
      <h1> { conference.name}  </h1>
      <div> { conference.speakers.map(speaker => {return (
        <div key={speaker.lastName}>{speaker.lastName}</div>
      )}) }</div>
    </div>
  )
}

export const getStaticProps : GetStaticProps = async ( context ) => {
  const { locale, params } = context
  console.log(params)
  console.log(locale)
  if(typeof params?.id !== 'string') {
    return { notFound: true}
  }
  const id = params.id
  const lang = locale === 'en' ? SiteLocale.En : SiteLocale.Ja
  const { conference }  = await sdk.getOneConference({name: id, locale: lang})
  if(!conference) {
    return { notFound: true}
  }
  return { props: { conference } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [ { params: { id: '2022'}, locale: 'ja'}, { params: { id: '2022'}, locale: 'en'}]
  return { paths , fallback: false}
}
