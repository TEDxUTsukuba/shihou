import { useRouter } from "next/router"

export default  function Index() {
    const router = useRouter()
    const id = router.query.id
    // 2022, 2023などを想定
    return (<h1> event page { id } </h1>)
}