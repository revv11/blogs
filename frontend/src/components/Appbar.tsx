
import { Avatar } from "./Blogcard"



export default function Appbar(){
    return(
        <div className="border-b flex justify-between p-10">
            <div className="text-3xl font-semibold h">
                Medium
            </div>
            <div>
                <Avatar name="Utkarsh" size="big"/>
            </div>
        </div>
    )
}