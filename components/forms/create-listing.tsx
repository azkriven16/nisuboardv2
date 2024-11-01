"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import UserLocationButton from "@/components/forms/user-location-button";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Listing } from "@prisma/client";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    price: z.number().min(0, {
        message: "Price must be a positive number.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    latitude: z.number().min(-90).max(90, {
        message: "Latitude must be between -90 and 90 degrees",
    }),
    longitude: z.number().min(-180).max(180, {
        message: "Longitude must be between -180 and 180 degrees",
    }),
    bedroom_no: z.number().min(1),
    bathroom_no: z.number().min(1),
    wifi_available: z.boolean(),
    watersupply_available: z.boolean(),
    close_to: z.enum(["west", "main", "both"]),
    owner_name: z.string().min(2),
    owner_contact: z.string().min(11),
    owner_image: z.string(),
    images: z.array(z.string()).min(1, {
        message: "At least one image is required.",
    }),
    approved: z.boolean().default(false),
    userId: z.string(),
});

interface CreateFormProps {
    initialData?: Listing;
    onSuccess?: () => void;
}

export default function CreateForm({
    initialData,
    onSuccess,
}: CreateFormProps) {
    const { user } = useUser();

    if (!user) {
        redirect("/sign-in");
    }

    const router = useRouter();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>(
        initialData?.images || []
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: initialData?.id,
            title: initialData?.title || "",
            price: initialData?.price || 0,
            address: initialData?.address || "",
            latitude: initialData?.latitude || 0,
            longitude: initialData?.longitude || 0,
            bedroom_no: initialData?.bedroom_no || 1,
            bathroom_no: initialData?.bathroom_no || 1,
            wifi_available: initialData?.wifi_available || false,
            watersupply_available: initialData?.watersupply_available || false,
            close_to: initialData?.close_to || "west",
            owner_name: initialData?.owner_name || "",
            owner_contact: initialData?.owner_contact || "",
            images: initialData?.images || [],
            owner_image: initialData?.owner_image || user.imageUrl!,
            userId: initialData?.userId || user.id!,
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 4) {
            toast.error("You can only upload up to 4 images");
            return;
        }
        setSelectedImages(files);

        // Create preview URLs for the selected images
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);

        // Set the images field value to trigger validation
        form.setValue("images", urls);
    };

    const handleLocationSelect = (latitude: number, longitude: number) => {
        form.setValue("latitude", latitude);
        form.setValue("longitude", longitude);
        toast.success("Location selected successfully");
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Form validation
            if (values.latitude === 0 || values.longitude === 0) {
                toast.error(
                    "Please select a location or enter valid coordinates"
                );
                return;
            }

            if (selectedImages.length === 0 && !initialData) {
                toast.error("Please upload at least one image");
                return;
            }

            // Upload images first if there are new ones
            let imageUrls = initialData?.images || [];
            if (selectedImages.length > 0) {
                imageUrls = await Promise.all(
                    selectedImages.map(async (file) => {
                        const formData = new FormData();
                        formData.append("file", file);

                        const uploadResponse = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                        });

                        if (!uploadResponse.ok) {
                            throw new Error("Failed to upload image");
                        }

                        const uploadData = await uploadResponse.json();
                        return `/images/${uploadData.filename}`;
                    })
                );
            }

            // Create or update listing with uploaded image URLs
            const listingData = {
                ...values,
                id: initialData?.id || "",
                images: imageUrls,
            };

            const listingResponse = await fetch("/api/listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(listingData),
            });

            if (!listingResponse.ok) {
                const errorData = await listingResponse.json();
                if (listingResponse.status === 401) {
                    toast.error("Unauthorized - Please sign in");
                } else {
                    toast.error(errorData.error || "Failed to save listing");
                }
                return;
            }

            toast.success(
                initialData
                    ? "Listing updated successfully!"
                    : "Listing created successfully!"
            );

            // Reset form and states
            form.reset();
            setSelectedImages([]);
            setPreviewUrls([]);

            if (onSuccess) {
                onSuccess();
            } else {
                router.push("/landlord/manage");
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error("Failed to save listing. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Show form errors as toasts
    const formErrors = form.formState.errors;
    if (Object.keys(formErrors).length > 0) {
        Object.entries(formErrors).forEach(([field, error]) => {
            if (error?.message) {
                toast.error(`${field}: ${error.message}`);
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                {initialData ? "Edit Listing" : "Create New Listing"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter listing title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monthly Price (₱)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter monthly price"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter complete address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="close_to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Close To</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select campus" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="west">
                                                West Campus
                                            </SelectItem>
                                            <SelectItem value="main">
                                                Main Campus
                                            </SelectItem>
                                            <SelectItem value="both">
                                                Both Campuses
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <UserLocationButton
                                onLocationSelect={handleLocationSelect}
                            />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="latitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Latitude"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="longitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Longitude"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormDescription className="mt-2">
                                Please select a location or enter coordinates
                                manually. Both latitude and longitude are
                                required.
                            </FormDescription>
                        </FormItem>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="bedroom_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bathroom_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Bathrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="wifi_available"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            WiFi Available
                                        </FormLabel>
                                        <FormDescription>
                                            Does this property have WiFi
                                            connectivity?
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="watersupply_available"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Water Supply
                                        </FormLabel>
                                        <FormDescription>
                                            Is water supply available?
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="owner_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter owner's name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="owner_contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter contact number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Images</FormLabel>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 transition-colors hover:border-gray-400 dark:hover:border-gray-600">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                        </FormControl>
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center gap-2 cursor-pointer"
                                        >
                                            <span className="font-medium text-sm">
                                                Drop your images here, or click
                                                to select
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Upload up to 4 images (PNG, JPG)
                                            </span>
                                        </label>
                                    </div>

                                    {previewUrls.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                            {previewUrls.map((url, index) => (
                                                <div
                                                    key={index}
                                                    className="relative aspect-square group"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const newUrls = [
                                                                ...previewUrls,
                                                            ];
                                                            const newImages = [
                                                                ...selectedImages,
                                                            ];
                                                            newUrls.splice(
                                                                index,
                                                                1
                                                            );
                                                            newImages.splice(
                                                                index,
                                                                1
                                                            );
                                                            setPreviewUrls(
                                                                newUrls
                                                            );
                                                            setSelectedImages(
                                                                newImages
                                                            );
                                                            form.setValue(
                                                                "images",
                                                                newUrls
                                                            );
                                                        }}
                                                        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {!field.value?.length && (
                                    <FormDescription className="text-red-500">
                                        At least one image is required
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? initialData
                                ? "Updating..."
                                : "Creating..."
                            : initialData
                            ? "Update Listing"
                            : "Create Listing"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
