import style from './Grid.module.css'
const Grid = ({ children }: any) => {
  return <div className={style.grid}>{children}</div>;
};

export default Grid