"use client"
import "@/styles/login.css";
import "@/styles/modal.css";
import "@/styles/response.css";
import { useUser } from "@/utils/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpSchema = z.object({
   name: z.string().min(2, 'Mínimo 2 caracteres.').max(20, 'Mámixo 20 caracteres.'),
   lastname: z.string().min(2, 'Mínimo 2 caracteres.').max(20, 'Mámixo 20 caracteres.'),
})

const Login = () => {
   const router = useRouter()
   const { user, setUser } = useUser();
   const { register, handleSubmit, formState: { errors } } = useForm<any>({
      resolver: zodResolver(SignUpSchema)
   })

   function handleSubmitForm(data: { name: string, lastname: string }) {
      setUser({ name: data.name, lastname: data.lastname });
      handleFormModal()
   }

   function handleFormModal() {
      document.querySelector('.modal-container')?.classList.add('show-modal-container');

   }

   function handleGoUserPage() {
      if (typeof window !== 'undefined') {
         router.push('/userpage')
      }
   }

   return (
      <div className="login-container">
         <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Faça login</h1>
            <div className="input-div">
               <label htmlFor="name" className="label">Nome</label>
               <input {...register('name')} type="text" id="name" className="input" placeholder="seu nome" />
               {errors.name && <p className="input-error-msg">{errors.name.message as string}</p>}
            </div>
            <div className="input-div">
               <label htmlFor="lastname" className="label">Sobrenome</label>
               <input {...register('lastname')} type="text" id="lastname" className="input" placeholder="seu sobrenome" />
               {errors.lastname && <p className="input-error-msg">{errors.lastname.message as string}</p>}
            </div>
            <input type="submit" className="submit" value="Enviar" />
         </form>
         <div className="modal-container">
            <div className="modal">
               <p className="modal-title">Login Concluído</p>
               <p className="modal-text">Seu login foi realizado com sucesso. Agora você pode aproveitar todos os nossos filmes.</p>
               <button onClick={handleGoUserPage}>OK</button>
            </div>
         </div>
      </div>
   )
}
export default Login;