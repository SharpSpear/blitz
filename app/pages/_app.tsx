/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import "./index.css"

import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Router,
  Script,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import ProgressBar from "@badrap/bar-of-progress"
import TwitterContext from "../contexts/twitter.context"
import "app/core/styles/index.css"
import "styles/global.scss"

import { IdProvider } from "@radix-ui/react-id"

const progress = new ProgressBar({
  size: 2,
  color: "#10B981",
  className: "bar-of-progress",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Suspense fallback="Loading...">
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {/* <TwitterContext> */}
        <IdProvider>
          {getLayout(<Component {...pageProps} />)}

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
            }}
          />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PRWVF98SE6"></Script>
          <Script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PRWVF98SE6');
            `}
          </Script>
          {/* <!-- Facebook Pixel Code --> */}

          {/* <!-- End Facebook Pixel Code --> */}
        </IdProvider>
        {/* </TwitterContext> */}
      </ErrorBoundary>
    </Suspense>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
