import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom"


function ErrorPage() {
    const error=useRouteError()
    console.error(error)
    return (
        <main className="">
            <div className="flex flex-col items-center justify-center h-screen gap-5">
            <h1 className="text-2xl font-poppins font-semibold text-center">One Health</h1>
            <img src="/assets/logo3.png" className="w-80"/>
            {/* <img src="/icons/error.svg" className="w-40 lg:w-80  aspect-square object-contain object-center'" /> */}
            <h1 className=" text-black font-bold text-lg lg:text-2xl">404 not found!</h1>
            <p className="text-black text-center">The page you are looking for does not exist or has been moved.</p>
            <Link to={"/redirect"}>
                <button color="primary" className="bg-blue-300 rounded-xl py-4 px-10 text-xl font-bold">Home</button>
            </Link>
            </div>
        </main>
    );
}

export default ErrorPage