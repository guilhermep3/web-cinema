export const formateDate = (movieDate: string) => {
  const date = new Date(movieDate);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}