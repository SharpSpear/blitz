import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import { LoginFeatureImage } from "app/assets"
import ContentBoxWithCover from "app/components/molecules/ContentBoxWithCover"
import PublicLayout from "app/components/organs/layouts/Default"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <ContentBoxWithCover coverImage={{ src: LoginFeatureImage, alt: "Log in to WhyVote" }}>
        <LoginForm
          onSuccess={() => {
            if (router.query.next) {
              let url = ""

              /*
                Loop through the router.query object and build the url string.

                If there are more params other than "next", make sure the second entry in the array is prepended with ? and everything else with &
              */

              for (const [index, [key, value]] of Object.entries(Object.entries(router.query))) {
                url += `${Number(index) === 1 ? "?" : "&"}${key}=${value}`
              }

              // Then we push the newly built url, while remove the next param with regex
              // router.push(url.replace(/&next=/g, ""))
              window.location.href = url.replace(/&next=/g, "")
            } else {
              // router.push("/")
              window.location.href = "/"
            }
          }}
        />
      </ContentBoxWithCover>
    </>
  )
}

LoginPage.getLayout = (page) => <PublicLayout>{page}</PublicLayout>

export default LoginPage
