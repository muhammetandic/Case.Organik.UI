import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { register } from './api/auth.js'

const registerSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı boş bırakılamaz'),
  password: z.string().min(1, 'Parola boş bırakılamaz'),
  email: z.string().min(1, 'Email boş bırakılamaz').email('Geçersiz email'),
  phone: z.string().min(1, 'Telefon numarası boş bırakılamaz'),
})

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)

  const { register: registerField, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const mutation = useMutation({
    mutationFn: register,
    onError: (error) => {
      setApiError(error.message)
    },
    onSuccess: () => {
      navigate('/')
    },
  })

  const onSubmit = (postData) => {
    setApiError(null)
    mutation.mutate(postData)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="text-center font-bold mb-4 text-2xl">Kullanıcı Kaydı</h2>
        </div>
        <div className="text-left">
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">Kullanıcı Adı</p>
            <input type="text" {...registerField('username')} />
            {errors.username ? <p className="text-red-500 text-xs pl-1">{errors.username.message}</p> : null}
          </div>
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">E-posta</p>
            <input type="text" {...registerField('email')} />
            {errors.email ? <p className="text-red-500 text-xs pl-1">{errors.email.message}</p> : null}
          </div>
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">Telefon</p>
            <input type="number" {...registerField('phone')} />
            {errors.phone ? <p className="text-red-500 text-xs pl-1">{errors.phone.message}</p> : null}
          </div>
          <div className="mb-4 h-20">
            <p className="pl-1 mb-1">Parola</p>
            <input type="password" {...registerField('password')} />
            {errors.password ? <p className="text-red-500 text-xs pl-1">{errors.password.message}</p> : null}
          </div>
          <div className="text-center">
            <button type='submit' disabled={mutation.isPending} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Kayıt Ol</button>
          </div>
        </div>
        <div className='text-center mt-4'>
          {apiError ? <p className="text-red-500 text-xs pl-1">{apiError}</p> : null}
        </div>

        <Link to="/">
          <p className="text-center mt-4 text-blue-300">Giriş</p>
        </Link>
      </form>
    </div>
  )
}
