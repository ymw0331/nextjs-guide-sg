import { redirect } from 'next/navigation'
import { db } from "@/db"
export default function SnippetCreatePage() {

    async function createSnippet(formData: FormData) {
        // This need to be an server action (executed on next server)
        'use server' // specifically used by nextjs

        // Check the user's input s and make sure they're valid
        const title = formData.get("title") as string
        const code = formData.get("code") as string

        // Create a new record in the database
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        })
        console.log(snippet)

        // Redirect the user back to the root route
        redirect('/')
    }


    return (
        // server action called
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title" />
                </div>

                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code" />
                </div>

                <button type="submit" className="border rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>

        </form>
    )
}


// Restrictions around RSC
// 1. Cannot use any kind of hooks
// 2. Cannot assign any event  handlers