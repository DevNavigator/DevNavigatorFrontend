import Link from 'next/link';
import img from '../assets/homer 404.jpg'
import Image from 'next/image'
export default function NotFound() {
  return (
    <div
      className="container"
      style={{ marginTop: '4.8rem' }}
    >
      <div
        className={
          'container relative flex h-[calc(100vh-70px)] w-screen flex-col justify-center items-center'
        }
      >
        <div className="absolute w-full h-full">
          <Image
            className=" w-full h-full object-cover object-center"
            sizes="100vw"
            fill
            alt="Image"
            src={img}
          />
          <div className="absolute bottom-32 rounded-lg left-auto translate-x-10 text-base md:text-xl md:translate-x-16 lg:translate-x-56">
            <p>Prueba mejor suerte con estos links:</p>
            <p>
              <Link
                href="/"
                className="underline  hover:no-underline"
              >
                Inicio
              </Link>
            </p>
            <p>
              <Link
                href="/courses"
                className="underline hover:no-underline"
              >
                Ver Cursos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
