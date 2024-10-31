import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="font-bold text-lg md:text-xl tracking-tight hover:opacity-80 transition-opacity duration-200 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        >
            Nisuboard
        </Link>
    );
}
