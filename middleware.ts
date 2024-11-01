import { clerkMiddleware, clerkClient } from "@clerk/nextjs/server";

export default clerkMiddleware(
    async (auth, req) => {
        const clerkAuth = await auth();
        const clerk = await clerkClient();
        if (clerkAuth.userId && !clerkAuth.sessionClaims?.metadata.role) {
            await clerk.users.updateUser(clerkAuth.userId, {
                publicMetadata: {
                    role: "tenant",
                },
            });
        }
    },
    { debug: true }
);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
