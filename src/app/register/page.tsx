import Button from "@/components/Button/Button";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const page = () => {
  return (
    <div className={`container !mt-20  `}>
      <div className=" w-[400px] mx-auto p-10 rounded-3xl shadow-lg shadow-gray-700/40">
        <h1 className="text-center">Crea una cuenta</h1>
        <h4 className="text-center">Es rápido y fácil.</h4>
        <RegisterForm />
        <div className="mx-auto text-center mt-7">          
          <a href="/login">¿Ya tienes una cuenta?</a>
        </div>
      </div>
    </div>
  );
};

export default page;
