import React from 'react'
// import GoogleLogin from 'react-google-login'
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
// import { createOrGetUser } from './utils';
import { client } from '../client';
import jwt_decode from 'jwt-decode'

const Login = () => {

  const navigate = useNavigate();

  const responseGoogle = (response) => {
    // localStorage.setItem('user', JSON.stringify(response.profileObj))
    // console.log(response);
    // createOrGetUser(response);
    localStorage.setItem('user', JSON.stringify(response.credential))
    console.log("response.credential --->",response.credential)
    const {name, picture, sub} = jwt_decode(response.credential);

    const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }

    client.createIfNotExists(doc)
        .then(()=> {
            navigate('/', {replace: true})
        })    
    // isgooglelogin is successfull we should be redirected to local host:3000 i.e. Home

    console.log(name, picture, sub);
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          autoPlay
          muted
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt='logo' />
          </div>
          <div className='shadow-2xl'>
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN_2}`}
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={()=> console.log('Error')}
                // cookiePolicy='single_host_origin'
              />;
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login