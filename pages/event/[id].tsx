import { useRouter } from "next/router"
import { useState } from "react"
import { sdk } from "@/lib/datocms"
import { SiteLocale } from "@/graphql/generated/sdk"
import { useEffect } from "react"

export default  function Index() {
    const router = useRouter()
    const id = router.query.id // 2022, 2023などを想定
    const [conferenceData, setConference] = useState<any>(null)
    useEffect(() => {
        if(typeof id !== "string") return
        sdk.getOneConference({name: id, locale: SiteLocale.Ja}).then((data) => {
            console.log(data.conference)
            if(data.conference) {
                setConference(data.conference)
            }
        })
    }, [id])
    return (
      <div>
        <h1> event page { id } </h1>
      </div>
    )
}
