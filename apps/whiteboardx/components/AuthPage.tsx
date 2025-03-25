"use client";
import { InputBox } from "@repo/ui/inputBox";
import { Button } from "@repo/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  //   const navigate = useNavigate();

  const signin = async () => {
    // e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    // try {
    //   const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
    //     username,
    //     password,
    //   });
    //   if (response.status === 200) {
    //     localStorage.setItem("token", response.data.token);
    //     navigate("/dashboard");
    //   }
    //   console.log("res", response);
    // } catch (err) {
    //   console.log("err", err);
    // }
    console.log("username", usernameRef.current?.value);
    console.log("password", passwordRef.current?.value);
  };
  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg  w-[500px] max-w-[90%] flex flex-col gap-4'>
        <InputBox
          reference={usernameRef}
          type='text'
          labelText='Username'
          placeholder='John Doe'
        />
        <InputBox
          reference={passwordRef}
          type='password'
          labelText='Password'
          placeholder='********'
        />
        <div className='flex justify-center'>
          <Button
            variant='primary'
            title='Sign In'
            fullWidth
            loading={false}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
};
