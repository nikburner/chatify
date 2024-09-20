import { Link } from "react-router-dom"

export default function HomePage() {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Secure Messaging for Everyone</h1>
            <p className="text-muted-foreground md:text-xl">
              Connect with friends and family through our easy-to-use messaging app, featuring end-to-end encryption,
              group chat, and more.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link 
                to='/signin'
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign In
              </Link>
              <Link
                to='signup'
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }