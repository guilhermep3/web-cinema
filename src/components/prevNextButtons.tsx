import { flexCenter } from "@/utils/styles";
import { ArrowLeft, ArrowRight } from "lucide-react";

type props = {
  page: number;
  setPage: (newV: number) => void;
}
export const PrevNextButtons = ({page, setPage}: props) => {

  function handlePrevBtn() {
    setPage(page === 1 ? 1 : page - 1)
  }
  function handleNextBtn() {
    setPage(page + 1)
  }

  return (
    <div className={flexCenter + ' w-full'}>
      <button className="flex justify-center w-2/6 p-3 border-none text-[var(--main-color)] bg-zinc-800 transition-all
            duration-300 cursor-pointer m-2 hover:text-white hover:bg-[var(--main-color)]"
        onClick={handlePrevBtn}
      >
        <ArrowLeft className="w-7" />
      </button>
      <button className="flex justify-center w-2/6 p-3 border-none text-[var(--main-color)] bg-zinc-800 transition-all
            duration-300 cursor-pointer m-2 hover:text-white hover:bg-[var(--main-color)]"
        onClick={handleNextBtn}
      >
        <ArrowRight className="w-7" />
      </button>
    </div>
  )
}