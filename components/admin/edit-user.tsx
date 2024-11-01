import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Roles } from "@/types/globals";
import { User } from "@clerk/nextjs/server";

interface EditUserProps {
    user: User;
    onSetRole: (formData: FormData) => Promise<void>;
    onRemoveRole: (formData: FormData) => Promise<void>;
}

export default function EditUser({
    user,
    onSetRole,
    onRemoveRole,
}: EditUserProps) {
    return (
        <div className="flex items-center justify-between p-3 bg-card rounded-md border">
            <div className="flex-1">
                <div className="font-medium">
                    {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                    {
                        user.emailAddresses.find(
                            (email: any) =>
                                email.id === user.primaryEmailAddressId
                        )?.emailAddress
                    }
                </div>
                <div className="text-sm mt-1">
                    Role: {(user.publicMetadata.role as Roles) || "None"}
                </div>
            </div>

            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm">
                            Set Role
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <form action={onSetRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="admin" name="role" />
                            <DropdownMenuItem asChild>
                                <button className="w-full cursor-pointer">
                                    Admin
                                </button>
                            </DropdownMenuItem>
                        </form>
                        <form action={onSetRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="landlord" name="role" />
                            <DropdownMenuItem asChild>
                                <button className="w-full cursor-pointer">
                                    Landlord
                                </button>
                            </DropdownMenuItem>
                        </form>
                        <form action={onSetRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="tenant" name="role" />
                            <DropdownMenuItem asChild>
                                <button className="w-full cursor-pointer">
                                    Tenant
                                </button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>

                <form action={onRemoveRole}>
                    <input type="hidden" value={user.id} name="id" />
                    <Button type="submit" variant="destructive" size="sm">
                        Remove
                    </Button>
                </form>
            </div>
        </div>
    );
}
