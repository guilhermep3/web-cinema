import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
type props = {
   rating: number
}
export const StarsRating = (props: props) => {
   const numStars = Math.round(props.rating / 2 * 2) / 2;

   let fullStarsArray = [];
   let halfStarsArray = [];
   let voidStarsArray = [];

   for(let i = 1; i <= 5; i++){
      if(i <= numStars){
         if(i === Math.floor(numStars) && numStars % 1 !== 0){
            halfStarsArray.push(i)
         } else {
            fullStarsArray.push(i)
         }
      } else {
         voidStarsArray.push(i)
      }
   }

   return(
      <div>
         {fullStarsArray.map(i => <FaStar key={i} className="icon-star"/>)}
         {halfStarsArray.map(i => <FaStarHalfAlt key={i} className="icon-star"/>)}
         {voidStarsArray.map(i => <FaRegStar key={i} className="icon-star"/>)}
      </div>
   )
}