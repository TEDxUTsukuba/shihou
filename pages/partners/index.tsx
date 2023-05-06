import { sdk } from "@/lib/datocms"
import { GetPartnersQuery, SiteLocale } from "@/graphql/generated/sdk"
import { GetStaticProps } from "next"
import { Image } from 'react-datocms'

export default  function Index(props: { partners: GetPartnersQuery['allPartners'] }) {
  const { partners } = props
  return (
    <div>
      <h1> パートナー一覧  </h1>
      { partners.map(partner => { return (
        <div key={partner.id}>
          <h2>{partner.name}</h2>
            { partner?.logo?.responsiveImage && 
                (<Image data={partner.logo.responsiveImage}  / >)} 
        </div>
      )
      })
      }
    </div>
  )
}

export const getStaticProps : GetStaticProps = async ( context ) => {
  const { locale } = context
  const lang = locale === 'en' ? SiteLocale.En : SiteLocale.Ja
  const { allPartners }  = await sdk.getPartners({locale: lang})
  if(!allPartners) {
    return { notFound: true}
  }
  return { props: { partners: allPartners } }
}
