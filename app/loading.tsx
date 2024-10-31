import Logo from "@/components/layouts/logo";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <Logo />
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
