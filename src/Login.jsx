import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { login } from './api/auth.js'
import { session } from './lib/session.js'

const schema = z.object({
  username: z.string().min(1, 'Bu alanın doldurulması zorunludur'),
  password: z.string().min(1, 'Bu alanın doldurulması zorunludur'),
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      setApiError(error.message)
    },
    onSuccess: (data) => {
      session.save(data)
      navigate('/check-code')
    },
  })

  const handleLogin = (postData) => {
    setApiError(null)
    mutation.mutate(postData)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <h2 className="text-center font-bold mb-4 text-2xl">Kullanıcı Girişi</h2>
        </div>
        <div className='text-left'>
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">Kullanıcı Adı</p>
            <input type="text" {...register('username')} />
            {errors.username ? <p className="text-red-500 text-xs pl-1">{errors.username.message}</p> : null}
          </div>
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">Parola</p>
            <input type="password" {...register('password')} />
            {errors.password ? <p className="text-red-500 text-xs pl-1">{errors.password.message}</p> : null}
          </div>
          <div className="text-center">
            <button type='submit' disabled={mutation.isPending} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Giriş Yap</button>
          </div>
        </div>
        <div className='text-center mt-4'>
          {apiError ? <p className="text-red-500 text-xs pl-1">{apiError}</p> : null}
        </div>

        <Link to="/register">
          <p className="text-center mt-4 text-blue-300">Kayıt Ol</p>
        </Link>
      </form>
    </div>
  )
}
