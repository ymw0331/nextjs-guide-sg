'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"

// Edit Snippet
export async function editSnippet(id: number, code: string) {
    console.log("ID:", id)
    console.log("Code:", code)
    await db.snippet.update({
        where: { id },
        data: { code }
    })

    revalidatePath(`/snippets/${id}`) //when a snippet is edited, we need to revalidate the path (rerender it)
    redirect(`/snippets/${id}`)
}


// Delete Snippet
export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    })

    revalidatePath('/') //when a snippet is deleted, we need to revalidate the path (rerender it)
    redirect('/')
}

// Create Snippet
export async function createSnippet(formState: { message: string }, formData: FormData) {

    // This need to be an server action (executed on next server)
    // Check the user's input and make sure they're valid

    try {
        const title = formData.get("title")
        const code = formData.get("code")

        if (typeof title !== "string" || title.length < 3) {
            return {
                message: "Title must be longer"
            }
        }

        if (typeof code != "string" || code.length < 10) {
            return {
                message: "Code must be longer"
            }
        }

        // Create a new record in the database
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        })
        console.log("Create Snippet:", snippet)
        // throw new Error("Failed to save to database")
        // example on error page

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: "Something went wrong"
            }
        }
    }
    

    revalidatePath('/')
    // Redirect the user back to the root route
    redirect('/')
}