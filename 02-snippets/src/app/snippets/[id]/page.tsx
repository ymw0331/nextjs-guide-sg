import { notFound } from "next/navigation"
import { db } from "@/db"
import Link from "next/link"
import * as actions from "@/actions"

// interface structure of the props
interface SnippetShowPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {

    // await new Promise((r) => setTimeout(r, 2000))
    // const snippet = await db.snippet.findFirst({
    //     where: { id: parseInt(props.params.id) }
    // })

    const { id } = await props.params
    const snippetId = parseInt(id)
    const snippet = await db.snippet.findFirst({
        where: { id: snippetId }
    })

    if (!snippet) {
        return notFound()
    }

    console.log("Props passed in SnippetShowPage:", props)

    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id)

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="p-2 border rounded">Edit
                    </Link>

                    <form action={deleteSnippetAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>

                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>
                    {snippet.code}
                </code>
            </pre>
        </div>
    )
}


// Generate static paths for all snippets
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany()

    // next expect string, we need to convert it to string
    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString()
        }
    })
}