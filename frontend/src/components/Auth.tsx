
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { SignupInput } from "utkarsh-zod";
import axios from "axios";
import { BACKEND_URL } from "../config";



export default function Auth({type}: {type:"signup" | "signin"}){
    const [postInputs , setInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest(){
        try{
            const response = await axios.post(type==="signup"?`${BACKEND_URL}/user/signup`:`${BACKEND_URL}/user/signin`, postInputs)
            const jwt = await response.data;
            localStorage.setItem("token", jwt.jwt)
            navigate("/blogs");

        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="justify-center flex">
                <div className="max-w-lg">
                    <div className="text-4xl font-bold w-full text-center px-10">
                        Create an account 
                    </div>
                    <div className="w-full text-slate-400 text-center">
                        Already have an account? <Link to={type==="signin"?"/signup":"/signin"} className="underline">{type==="signin"?"Sign up":"Sign in"}</Link>
                    </div>
                    <div>
                        <div className={type==="signup"?"block":"hidden"}>

                            <LabelledInput label="Name" placeholder="Sebastian Vettel..." onChange={(e)=>{
                                setInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }}/>
                        </div>
                        <LabelledInput label="Username" placeholder="Sebvet123..." onChange={(e)=>{
                            setInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }}/>
                        <LabelledInput label="Password" placeholder="password123..." onChange={(e)=>{
                            setInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }}/>
                        <button onClick={sendRequest} type="button" className="text-white w-full bg-[#050708] mt-5 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/70 me-2 mb-2">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
}

function LabelledInput({label, placeholder, onChange}: LabelledInputType){
    return(
        <div className="mt-5">
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-black">{label}</label>
                <input onChange={onChange} type={label} id={"id"+label} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            </div>
        </div>
    )
}