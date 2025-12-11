// CardLogin.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../../schema/auth.schema";
import type { AuthType } from "../../types/auth.type";

type CardLoginProps = {
  onToogle: (v: boolean) => void;
  isLogin: boolean;
  onFormSubmit: (data: AuthType) => void;
  loading?: boolean;
};

const CardLogin = ({
  isLogin,
  onToogle,
  onFormSubmit,
  loading,
}: CardLoginProps) => {
  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    resolver: zodResolver(schema),
    defaultValues: { userName: "ANH", password: "123456" },
  });

  const submit = (data: AuthType) => {
    console.log(data);

    onFormSubmit(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-gray-100 p-10 w-96 rounded-2xl flex-col justify-center items-center"
    >
      <h3 className="text-center mb-4 font-bold text-xl">
        {isLogin ? "Login" : "Register"}
      </h3>

      <div className="mb-3">
        <label>User Name</label>
        <input {...register("userName")} className="w-full border p-2" />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="w-full border p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Loading..." : isLogin ? "Login" : "Register"}
      </button>

      <p className="mt-3 text-sm">
        {isLogin ? "Don't have account?" : "Already have account?"}{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => onToogle(!isLogin)}
        >
          {isLogin ? "Register here." : "Login here."}
        </span>
      </p>
    </form>
  );
};

export default CardLogin;
