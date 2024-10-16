import Button from "@/components/Button/Button";
import LoginForm from "@/components/LoginForm/LoginForm";

const page = () => {
  return (
    <div className={`container !mt-24`}>
      <div className="border w-[400px] mx-auto p-10 rounded-3xl border-secondary shadow-lg shadow-secondary">
        <h1 className="text-center">Inicia sesión</h1>
        <LoginForm />
        <div className="mx-auto text-center mt-7">
          <p className="mb-3">¿No tienes cuenta?</p>
          <Button href="/register">Registrate</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
