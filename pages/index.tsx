import { useTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export default function Home() {
  const { t } = useTranslation()
  return (
    <>
    <h1>top page</h1>
    {t("common.hello")}
    <h1>hello</h1>
    </>
  )
}


export async function getStaticProps({ locale }: { locale: 'en' | 'ja' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}