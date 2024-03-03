import React, { useEffect, useState } from 'react'
import {useSearchParams} from "react-router-dom"
import {signInStart, signInSuccess, signInFailure} from "../redux/auth/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VerifyEmail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, loading, error} = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const emailToken = searchParams.get("emailToken")
  
  // console.log(currentUser);
  // console.log("emailToken:", emailToken);

  useEffect(() => {
    ( async () => {
      if(currentUser?.isVerified) {
        setTimeout(() => {
          return navigate('/login');
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
            toast.error(data.message);
          }else{
            dispatch(signInSuccess(data));
            toast.success(data.message);
          }
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
          <div className='flex justify-center items-center min-h-screen bg-black bg-transparent opacity-75'>
            {
              currentUser.isVerified ? (
                <div>
                  <h1 className='text-green-500 text-2xl'>Email successfully verified, redirecting....</h1>
                </div>
              ) : (
                <div>
                  <h1 className='text-white text-2xl'>{error ? error : "Something is have to display but it is null now"}</h1>
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