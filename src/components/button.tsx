"use client"
import { useRouter } from "next/navigation";

type props = {
  label: string;
  className?: string;
  onClick?: string;
}
export const Button = ({label, className, onClick}: props) => {
  const router = useRouter();

  function handleCheckRouter(){
    if(onClick){
      return router.push(onClick);
    } else {
      return;
    }
  }

  return (
    <button className={`btn relative font-bold uppercase px-7 py-3 bg-[var(--main-color)] w-fit cursor-pointer border-none
      overflow-hidden z-10 ${className}
    `}
      onClick={handleCheckRouter}
    >
      {label}
    </button>
  )
}