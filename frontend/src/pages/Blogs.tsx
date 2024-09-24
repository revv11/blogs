import BlogCard from "../components/Blogcard"




export default function Blogs(){
    return(
        <div className="flex flex-col items-center">
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
        </div>
    )
}