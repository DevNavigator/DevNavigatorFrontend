import Button from "@/components/Button/Button";
import ButtonGoogle from "@/components/ButtonGoogle/ButtonGoogle";
import LoginForm from "@/components/LoginForm/LoginForm";

const page = () => {
  return (
    <div className={`container !mt-24`}>
      <div className=" w-[400px] mx-auto p-10 rounded-3xl shadow-lg shadow-gray-700/40">
        <h1 className="text-center">Inicia sesión</h1>
        <LoginForm />
        <div className="mx-auto text-center mt-7">
          <p className="mb-3">¿No tienes cuenta?</p>
          <Button href="/register">Registrate</Button>
        </div>
        <div className="mx-auto text-center mt-3 flex flex-col items-center">
          <h3 className="text-center">--------- ó ---------</h3>
          <ButtonGoogle />
        </div>
      </div>
    </div>
  );
};

export default page;
