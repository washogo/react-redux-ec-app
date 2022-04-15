import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reduks/users/operations";
import { getIsSignedIn } from "./reduks/users/selectors";

const Auth = ({children}) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
}

export default Auth;