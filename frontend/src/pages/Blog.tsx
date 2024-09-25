import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";

export default function Blog(){
    const {id} = useParams() || {id:"1"};
    const {loading , blog} = useBlog({id: id || ""});

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }
    return(
        <div>
            <div>

                {blog?.title}
            </div>
            <div>
                {blog?.content}
            </div>
            <div>
                {blog?.author.name || "Anonymous"}
            </div>
        </div>
    )
}
