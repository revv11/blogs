
import Quote from "../components/Quote"
import Auth from "../components/Auth"



export default function Signup(){
    return(
        <div className="grid lg:grid-cols-2 grid-cols-1">
            <div>
                <Auth type="signup"/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}