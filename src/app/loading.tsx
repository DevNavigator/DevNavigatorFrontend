'use client';
import * as framerMotion from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75 z-50">
      <framerMotion.motion.div
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="mr-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-bounce" />
          <div className="w-6 h-6 bg-gray-300 rounded-full mt-2 animate-bounce" />
        </div>
        <div className="flex flex-col">
          <div className="text-white text-lg font-semibold">Cargando...</div>
          <div className="text-primary text-lg font-semibold">
            {' '}
            Dev {'</>'} Navigator
          </div>
        </div>
      </framerMotion.motion.div>
    </div>
  );
};

export default Loading;
