"use client";

import { useState } from "react";
import { Listing } from "@prisma/client";
import { Button } from "@/components/ui/button";
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
import CreateForm from "../forms/create-listing";

interface LandlordEditCardProps {
    listing: Listing;
    deleteListing: (listingId: string) => Promise<{ success: boolean }>;
}

export default function LandlordEditCard({
    listing,
    deleteListing,
}: LandlordEditCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

    return (
        <div className="flex gap-2 mt-4">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        disabled={isLoading}
                        className="flex-1"
                        variant="default"
                    >
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Listing</DialogTitle>
                    </DialogHeader>
                    <CreateForm
                        initialData={listing}
                        onSuccess={() => {
                            setIsEditDialogOpen(false);
                            router.refresh();
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogTrigger asChild>
                    <Button
                        disabled={isLoading}
                        className="flex-1"
                        variant="destructive"
                    >
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
