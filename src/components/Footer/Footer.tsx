import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <div className="bg-primary text-secondary p-6 mt-16 border-t border-t-secondary ">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full mb-4">
          <div className="mb-4 md:mb-0 ">
            <h2 className="text-xl font-bold">Sobre Nosotros</h2>
            <a
              href="/about"
              className="hover:underline"
            >
              <p className="text-lg">Explora nuestra misión y valores.</p>
            </a>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Contacto</h2>
            <p className="text-lg">info@devnavigator.com</p>
            <p className="text-lg">+123 456 7890</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Redes Sociales</h2>
            <div className="flex space-x-4 items-center md:justify-center">
              <a
                href="#"
                className="text-3xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-3xl"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="text-3xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Dev Navigator. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;

// import style from './Footer.module.css';

// const Footer = () => {
//     return (
//       <footer className={style.footer}>
//         <div className='container '>FOOTER</div>
//       </footer>

//     );

// }

// export default Footer
