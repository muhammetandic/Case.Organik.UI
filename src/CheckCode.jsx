import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { checkCode, sendCode } from './api/auth.js'
import { session } from './lib/session.js'

const sendCodeSchema = z.object({
  sendMethod: z.string(),
})

const checkCodeSchema = z.object({
  code: z.string().min(6, 'Kod en az 6 haneli olmalı').max(6, 'Kod en fazla 6 haneli olmalı'),
})

export const CheckCodePage = () => {
  const navigate = useNavigate()
  const [sendCodeApiError, setSendCodeApiError] = useState(null)
  const [checkCodeApiError, setCheckCodeApiError] = useState(null)

  const sendCodeForm = useForm({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      sendMethod: 'email',
    },
  })

  const checkCodeForm = useForm({
    resolver: zodResolver(checkCodeSchema),
  })

  const sendCodeMutation = useMutation({
    mutationFn: sendCode,
    onError: (error) => {
      setSendCodeApiError(error.message)
    },
    onSuccess: (data) => {
      session.save({ token: data.token })
    },
  })

  const checkCodeMutation = useMutation({
    mutationFn: checkCode,
    onError: (error) => {
      setCheckCodeApiError(error.message)
    },
    onSuccess: () => {
      navigate('/profile')
    },
  })

  const handleSendCode = ({ sendMethod }) => {
    setSendCodeApiError(null)
    sendCodeMutation.mutate({
      sendMethod,
      userId: session.getUserId(),
      token: session.getToken(),
    })
  }

  const handleCheckCode = ({ code }) => {
    setCheckCodeApiError(null)
    checkCodeMutation.mutate({
      code,
      userId: session.getUserId(),
      token: session.getToken(),
    })
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className='text-left'>
        <form onSubmit={sendCodeForm.handleSubmit(handleSendCode)}>
          <div className='mb-2'>
            <h2 className='text-xl font-bold text-center'>Kod gönderim şekli</h2>
          </div>
          <div className='mb-2 text-center'>
            <div className='mb-2'>
              <label htmlFor="field-email">
                <input
                  {...sendCodeForm.register("sendMethod")}
                  type="radio"
                  value="email"
                  id="field-email"
                />
                Email
              </label>
            </div>
            <div>
            <label htmlFor="field-sms">
              <input
                {...sendCodeForm.register("sendMethod")}
                type="radio"
                value="sms"
                id="field-sms"
              />
              SMS
            </label>
            </div>
          </div>
          <div className='text-center mb-8'>
            <button type="submit" disabled={sendCodeMutation.isPending} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Gönder</button>
          </div>
          <div>
            {sendCodeForm.formState.errors.sendMethod && <p className='text-red-500 text-xs pl-1'>{sendCodeForm.formState.errors.sendMethod.message}</p>}
          </div>
        </form>

        <form onSubmit={checkCodeForm.handleSubmit(handleCheckCode)}>
          <div className='mb-2'>
            <h2 className='pl-1'>Kod onayla</h2>
          </div>
          <div className='mb-2 h-16'>
            <input type="number" {...checkCodeForm.register('code')} />
            {checkCodeForm.formState.errors.code && <p className='text-red-500 text-xs pl-1'>{checkCodeForm.formState.errors.code.message}</p>}
          </div>
          <div className='text-center'>
            <button type="submit" disabled={checkCodeMutation.isPending} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Onayla</button>
          </div>
        </form>
        <div>
          <div>
            {sendCodeApiError && <p className='text-red-500 text-xs pl-1'>{sendCodeApiError}</p>}
          </div>
          <div>
            {checkCodeApiError && <p className='text-red-500 text-xs pl-1'>{checkCodeApiError}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
