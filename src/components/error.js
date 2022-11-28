export default function Error({code, message}){
    return (
        <>

            <div className="h-screen w-screen bg-yellow-600 flex justify-center content-center flex-wrap">
                <p className="text-white text-9xl font-bold">{code}</p>

            </div>

            <div className="absolute w-screen bottom-0 bg-gray-800 text-white text-center py-2">
                <p className="text-md pb-2">{message}</p>
                <span className="opacity-50 text-sm">Take me back to&nbsp;</span>
                <a className="text-yellow-400 text-sm" href="https://dauntless.trade"> Dauntless Homepage</a>
            </div>
        </>
    )
}