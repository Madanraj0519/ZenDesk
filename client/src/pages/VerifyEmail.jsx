import React, { useEffect, useState } from 'react'
import {useSearchParams} from "react-router-dom"
import {signInStart, signInSuccess, signInFailure} from "../redux/auth/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const VerifyEmail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, loading, error} = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const emailToken = searchParams.get("emailToken")
  
  console.log(currentUser);
  console.log("emailToken:", emailToken);

  useEffect(() => {
    ( async () => {
      if(currentUser?.isVerified) {
        setTimeout(() => {
          return navigate('/');
        }, 3000);
      }else{
        if(emailToken){
          setIsLoading(true);
          dispatch(signInStart());
          const res = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({emailToken : emailToken}),
          });

          const data = await res.json()
          setIsLoading(false);

          if(data.success === false){
            dispatch(signInFailure(data.message));
          }

          localStorage.setItem("User", JSON.stringify(data));
          dispatch(signInSuccess(data));
        }
      }
    })();
  }, [emailToken, currentUser]);

  return (
    <div>
      {
        isLoading ? (
          <div>
             Loading
          </div>
        ) : (
          <div>
            {
              currentUser.isVerified ? (
                <div>
                  Email successfully verified, redirecting....
                </div>
              ) : (
                <div>
                  {error ? error : "Something is have to display but it is null not"}
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail