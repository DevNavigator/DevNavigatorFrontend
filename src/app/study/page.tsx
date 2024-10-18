import Link from 'next/link';

const Study = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Página de Estudio</h1>
      <p className="mb-8">Aquí puedes comenzar a estudiar.</p>
      <a 
        href="https://www.youtube.com/watch?v=R-yPWuurehs" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Ver Video de Estudio
      </a>
      <p className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Volver a la Página Principal
        </Link>
      </p>
    </div>
  );
};

export default Study;
