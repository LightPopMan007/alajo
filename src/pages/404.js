import Error from "../components/error";
import Navbar from "../components/navbar";

export default function Custom404(){
    return (
        <div>
            <Navbar />

            <Error message="Page not found." code="404" />
        </div>
    );
}