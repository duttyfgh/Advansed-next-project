import Link from "next/link";

interface IButtonProps {
    text: string,
    url: string,
    title?: string
}

const Button = ({ text, url, title }: IButtonProps) => {
    return (
        <Link
            href={url}
            className="
            px-[30px] py-[10px] cursor-pointer bg-[#62a21f] hover:bg-[#52871a]
             rounded-[5px] max-w-[max-content] text-white text-[20px] text-weight-[300]
             transition-all
             "
            title={title}>
            {text}
        </Link>
    )
}

export default Button;
