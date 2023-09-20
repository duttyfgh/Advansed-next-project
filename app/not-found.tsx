import Link from "next/link";
import { generateMetadata } from "./layout";

export const metadata = generateMetadata('404 Error')

export default function NotFound() {
    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className='font-bold text-red-700 text-[70px]'>404 ERROR</h1>
            <h1 className='text-[25px]'>Page not found</h1>
            <Link href='/' className="w-[420px] h-[40px] notFoundBorder flex justify-center items-center rounded mt-4 ">
                Back home &#8594;</Link>
        </div>
    )
}