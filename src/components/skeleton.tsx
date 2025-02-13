export const Skeleton = () => {

   return (
      <>
         {Array.from({length: 10}).map((_, index) => (
            <div key={index} className="skeleton" style={{margin: '10px'}}></div>
         ))}
      </>
   )
}