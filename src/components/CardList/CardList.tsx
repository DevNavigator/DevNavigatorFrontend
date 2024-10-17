interface CardListProps {
  children?: React.ReactNode;
  className?: string;
}
const CardList = ({children, className=""}: CardListProps) => {
    
  return (
    <div className={`container text-center !mt-5 grid gap-4 grid-cols-1  md:grid-cols-2  lg:grid-cols-3  ${className}`}
    >
      {children}
      
    </div>
  );
}

export default CardList

