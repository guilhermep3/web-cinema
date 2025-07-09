import { ReactNode } from "react";

type props = {
  title: string;
  icon: ReactNode;
  label: string;
}
export const InfoBox = ({ title, icon, label }: props) => {

  return (
    <div className="flex flex-col gap-5 sm:min-w-56 bg-zinc-900 p-3 sm:p-4 rounded-md">
      <div className="flex items-center gap-2">
        <div>{icon}</div>
        <p className="sm:text-lg font-bold">{title}</p>
      </div>
      <p className="text-sm sm:text-base">{label}</p>
    </div>
  )
}