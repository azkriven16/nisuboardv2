"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { Listing } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

interface AdminCardProps {
    listing: Listing;
    deleteListing: (listingId: string) => Promise<{ success: boolean }>;
    toggleApproval: (listingId: string) => Promise<{ success: boolean }>;
}

export default function AdminCard({
    listing,
    deleteListing,
    toggleApproval,
}: AdminCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const result = await deleteListing(listing.id);
            if (result.success) {
                toast.success("Listing deleted successfully");
                setIsDeleteDialogOpen(false);
                router.refresh();
            } else {
                toast.error("Failed to delete listing");
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error("Failed to delete listing");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleApproval = async () => {
        try {
            setIsLoading(true);
            const result = await toggleApproval(listing.id);
            if (result.success) {
                toast.success(
                    listing.approved
                        ? "Listing unapproved successfully"
                        : "Listing approved successfully"
                );
                router.refresh();
            } else {
                toast.error("Failed to toggle listing approval");
            }
        } catch (error) {
            console.error("Error toggling approval:", error);
            toast.error("Failed to toggle listing approval");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-2 mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Button
                onClick={handleToggleApproval}
                variant={listing.approved ? "destructive" : "default"}
                className="flex-1 items-center gap-2"
                disabled={isLoading}
            >
                {listing.approved ? (
                    <>
                        <IconX className="h-4 w-4" />
                        Unapprove
                    </>
                ) : (
                    <>
                        <IconCheck className="h-4 w-4" />
                        Approve
                    </>
                )}
            </Button>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogTrigger asChild>
                    <Button
                        disabled={isLoading}
                        className="flex-1 items-center gap-2"
                        variant="destructive"
                    >
                        <IconTrash className="h-4 w-4" />
                        Delete
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Listing</DialogTitle>
                    </DialogHeader>
                    <p className="py-4">
                        Are you sure you want to delete this listing? This
                        action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
