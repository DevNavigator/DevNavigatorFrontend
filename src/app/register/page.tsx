import RegisterForm from "@/components/RegisterForm/RegisterForm";

const page = () => {
  return (
    <div className={`container !mt-20  `}>
      <div className="border w-[400px] mx-auto p-10 rounded-3xl shadow-lg">
      <h1 className="text-center">Registrate</h1>
      <RegisterForm />
      </div>
    </div>
  );
};

export default page;
