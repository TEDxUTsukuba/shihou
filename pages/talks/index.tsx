import { GetStaticProps } from 'next'
import { GetTalksQuery, SiteLocale } from '@/graphql/generated/sdk'
import { sdk } from '@/lib/datocms'

export default function Index (props: { talks: GetTalksQuery['allSpeakers'] }) {
    const { talks } = props
    if(!talks) return null
    return (
    <>
        <h1> talks </h1>
        { talks.map(talk => { return (
            <div key={talk.youtubeId}>
                <h3>{talk.talkTitle}</h3>
            </div>
        )}) }
    </>
    )
}

export const getStaticProps : GetStaticProps = async ( context ) => {
  const { locale } = context
  const lang = locale === 'en' ? SiteLocale.En : SiteLocale.Ja
  const { allSpeakers }  = await sdk.getTalks({locale: lang})
  if(!allSpeakers) {
    return { notFound: true}
  }
  return { props: { talks: allSpeakers } }
}