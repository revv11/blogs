import { useNavigate } from "react-router-dom";

interface BlogCardProps{
    id?: string;
    authorName: string;
    title:string;
    content: string;
    publishedDate: string;
}



export default function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps){

    const navigate = useNavigate();

    function handleClick(){
        navigate(`/blog/${id}`)
    }
    return(
        <div onClick={handleClick} className=" border border-slate-200 p-4 w-full cursor-pointer">
            <div className="flex">
                <div className="flex justify-center items-center flex-col">
                    <Avatar name={authorName} size="small"/>
                </div>
                <div className="font-extralight pl-2 flex items-center">
                    {authorName} 

                </div>
                <div className="pl-2 font-thin text-slate-500 flex items-center">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
            </div>
            <div className=" text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length/100)} minute(s)`}
            </div>
        </div>
    )
}


export function Avatar({name, size}: {name:string, size : "big"| "small"}){
    return(
        <div className={`relative inline-flex items-center justify-center ${size == "big"? "h-10 w-10": "h-8 w-8"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="text-2xl text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>


    )
}