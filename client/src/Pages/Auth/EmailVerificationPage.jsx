import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmailToken } from '../../services/authenticationServices'

export default function EmailVerificationPage() {
    const navigate = useNavigate()
    const {verificationtoken} = useParams()
    const [verificationStart,setVerificationStart] = useState(true)
    const [verificationSuccess,setVerificationSuccess] = useState(false)
    const [verificationFail,setVerificationFail] = useState(false)
    useEffect(()=>{
      (async()=>{
        try {
          setVerificationStart(true)
           await verifyEmailToken(verificationtoken)
           setVerificationStart(false)
           setVerificationSuccess(true)
        } catch (error) {
            setVerificationFail(error.message)
            setVerificationStart(false)
        }
        setTimeout(()=>navigate('/home'),3200)
      })()
        
    },[verificationtoken,navigate])
  return (
    <div className='email-verification-page'>
        <div className="status">
          {verificationStart && <span className='verifying'>Verifying...</span>} 
          {verificationSuccess && <span className='success'>Email has been verified</span>}
          {verificationFail && <span className='fail error-text'>{verificationFail}</span>}    
        </div>
    </div>
  )
}
