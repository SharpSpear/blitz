import React, { createContext, useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import {useMutation} from 'blitz'
import { AxiosResponse } from "axios"
import { TWITTER_AUTH_SERVER } from "./constant"
import signupTwitter from "app/auth/mutations/signupTwitter"

export const myContext = createContext({})

export default function Context(props: any) {
  const [signupTwitterMutation] = useMutation(signupTwitter)

  const [userObject, setUserObject] = useState({
    twitterId: "",
    username: "",
    name: "",
    avatar: ""
  })
  const config: AxiosRequestConfig = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // 'Access-Control-Allow-Credentials':true,
      // 'Content-Type': 'application/json',
    },
    withCredentials: true,
  }
  useEffect(() => {
    axios
      .get(`${TWITTER_AUTH_SERVER}/getuser`, config)
      .then((res: AxiosResponse) => {
        // console.log("context", res)
        if (res.data) {
          const newUser = {
              twitterId: res.data.twitterId,
              username: res.data.username,
              name: res.data.name,
              avatar: res.data.profileImage
            }
          setUserObject(newUser)
        }
        else{
          setUserObject({
              twitterId: "",
              username: "",
              name: "",
              avatar: ""
          })
        }
      })
      .catch((err) => console.error)
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     console.log(userObject)
  //     const result = await signupTwitterMutation({
  //       username: userObject.username,
  //       name: userObject.name,
  //       avatar: userObject.avatar,
  //     })
  //   })()
  // }, [userObject])
  return <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
}
