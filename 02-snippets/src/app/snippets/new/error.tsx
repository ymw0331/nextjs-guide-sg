'use client'

// Hard requirement, error page must be client side rendering

interface ErrorPageProps {
    error: Error,
    reset: () => void
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return (<div>
        {error.message}
    </div>)
}