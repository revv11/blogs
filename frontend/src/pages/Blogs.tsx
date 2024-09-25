import BlogCard from "../components/Blogcard"
import Appbar from "../components/Appbar"
import { useBlogs } from "../hooks"
import { Blog } from "../hooks";


export default function Blogs(){
    const {loading, blogs}:{loading: boolean, blogs:Blog[]} = useBlogs();
    if(loading){
        return <div>
            <Appbar/>
                <div className="flex justify-center items-center">
                    loading...
                </div>
            </div>
    }
    console.log(blogs);
    return(
        <div>
            <Appbar/>
            <div className="flex flex-col items-center w-[40rem] mx-auto">
                
                <BlogCard
                    authorName = {"Utkarsh Anand"}
                    title = {"Sebastian vettel is a 4 time world champion"}
                    content = {"Sebastian vettel you are the world champion a 4 time world champion with the most most wins in the singapore gp. charles leclerc 2025 f1 world champion"}
                    publishedDate="10/9/2024"
                />
                <BlogCard
                    authorName = {"Utkarsh Anand"}
                    title = {"Sebastian vettel is a 4 time world champion"}
                    content = {"Sebastian vettel you are the world champion a 4 time world champion with the most most wins in the singapore gp. charles leclerc 2025 f1 world champion"}
                    publishedDate="10/9/2024"
                />
                {blogs.map(blog=>(
                 
                        <BlogCard
                        id={blog.id}
                        authorName = {blog.author.name || "Anonymous"} 
                        title = {blog.title}
                        content = {blog.content}
                        publishedDate="10/9/2024"
                        />

                    
                ))}
            </div>
        </div>
    )
}