"use client";

import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { IconCurrentLocation, IconPlus, IconMinus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import { Geometry } from "ol/geom";
import XYZ from "ol/source/XYZ";
import { Listing } from "@prisma/client";
import Cluster from "ol/source/Cluster";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";

interface TenantMapProps {
    center?: [number, number];
    zoom?: number;
    listings: Listing[];
}

export default function TenantMap({
    center = [123.14389088712784, 11.461424460015792], // Default to Estancia coordinates
    zoom = 13,
    listings,
}: TenantMapProps) {
    const router = useRouter();
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const userLocationLayerRef = useRef<VectorLayer<
        VectorSource<Feature<Geometry>>
    > | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [filteredListings, setFilteredListings] = useState(listings);

    const handleUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [
                        position.coords.longitude,
                        position.coords.latitude,
                    ];

                    if (mapInstanceRef.current) {
                        // Remove existing user location layer if it exists
                        if (userLocationLayerRef.current) {
                            mapInstanceRef.current.removeLayer(
                                userLocationLayerRef.current
                            );
                        }

                        // Create a feature for user location
                        const userLocationFeature = new Feature({
                            geometry: new Point(fromLonLat(userCoords)),
                        });

                        // Style for the user location marker
                        const userLocationStyle = new Style({
                            image: new Circle({
                                radius: 8,
                                fill: new Fill({
                                    color: "#007bff",
                                }),
                                stroke: new Stroke({
                                    color: "#ffffff",
                                    width: 2,
                                }),
                            }),
                        });

                        userLocationFeature.setStyle(userLocationStyle);

                        // Create a vector layer for user location
                        const vectorSource = new VectorSource<
                            Feature<Geometry>
                        >({
                            features: [userLocationFeature],
                        });

                        userLocationLayerRef.current = new VectorLayer({
                            source: vectorSource,
                        });

                        // Add the layer to the map
                        mapInstanceRef.current.addLayer(
                            userLocationLayerRef.current
                        );

                        // Animate to user location
                        mapInstanceRef.current.getView().animate({
                            center: fromLonLat(userCoords),
                            zoom: 15,
                            duration: 1000,
                        });
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert(
                        "Unable to get your location. Please check your browser permissions."
                    );
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleZoom = (delta: number) => {
        if (mapInstanceRef.current) {
            const view = mapInstanceRef.current.getView();
            const currentZoom = view.getZoom() || 0;
            view.animate({
                zoom: currentZoom + delta,
                duration: 250,
            });
        }
    };

    // Filter listings based on price range
    useEffect(() => {
        const filtered = listings.filter(
            (listing) =>
                listing.price >= priceRange[0] && listing.price <= priceRange[1]
        );
        setFilteredListings(filtered);
    }, [priceRange, listings]);

    useEffect(() => {
        if (!mapRef.current) return;

        // Create map instance if it doesn't exist
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = new Map({
                target: mapRef.current,
                layers: [
                    // Satellite layer
                    new TileLayer({
                        source: new XYZ({
                            url: `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
                            maxZoom: 20,
                        }),
                    }),
                    // Labels layer
                    new TileLayer({
                        source: new XYZ({
                            url: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
                            maxZoom: 20,
                            attributions:
                                '© <a href="https://www.maptiler.com">MapTiler</a>',
                        }),
                    }),
                ],
                view: new View({
                    center: fromLonLat(center),
                    zoom: zoom,
                }),
                controls: [], // Remove default controls including zoom buttons
            });

            // Add listings markers
            const listingFeatures = filteredListings.map((listing) => {
                const coords = [listing.longitude, listing.latitude];
                const feature = new Feature({
                    geometry: new Point(fromLonLat(coords)),
                    listing: listing, // Store listing data in feature
                });

                return feature;
            });

            const listingsSource = new VectorSource({
                features: listingFeatures,
            });

            // Create a cluster source
            const clusterSource = new Cluster({
                distance: 40,
                source: listingsSource,
            });

            const listingsLayer = new VectorLayer({
                source: clusterSource,
                style: function (feature) {
                    const size = feature.get("features").length;
                    const features = feature.get("features");

                    // If it's a single feature, show the price
                    if (size === 1) {
                        const listing = features[0].get("listing");
                        return new Style({
                            image: new Circle({
                                radius: 20,
                                fill: new Fill({
                                    color: "#ff6b6b",
                                }),
                                stroke: new Stroke({
                                    color: "#ffffff",
                                    width: 2,
                                }),
                            }),
                            text: new Text({
                                text: `₱${listing.price}`,
                                fill: new Fill({
                                    color: "#ffffff",
                                }),
                                font: "12px sans-serif",
                                offsetY: 1,
                            }),
                        });
                    }

                    // For clusters, show the count
                    return new Style({
                        image: new Circle({
                            radius: 25,
                            fill: new Fill({
                                color: "#ff6b6b",
                            }),
                            stroke: new Stroke({
                                color: "#ffffff",
                                width: 2,
                            }),
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: "#ffffff",
                            }),
                            font: "bold 14px sans-serif",
                            offsetY: 1,
                        }),
                    });
                },
            });

            mapInstanceRef.current.addLayer(listingsLayer);

            // Add click handler for listings
            mapInstanceRef.current.on("click", (event) => {
                const feature = mapInstanceRef.current?.forEachFeatureAtPixel(
                    event.pixel,
                    (feature) => feature
                );

                if (feature) {
                    const features = feature.get("features");
                    if (features?.length === 1) {
                        const listing = features[0].get("listing");
                        router.push(`/listing?id=${listing.id}`);
                    } else if (features?.length > 1) {
                        // Get the coordinates of the cluster
                        const geometry = feature.getGeometry();
                        if (geometry && "getCoordinates" in geometry) {
                            const coordinates = (
                                geometry.getCoordinates as () => number[]
                            )();
                            // Zoom in to the cluster
                            mapInstanceRef.current?.getView().animate({
                                center: coordinates,
                                zoom:
                                    (mapInstanceRef.current
                                        ?.getView()
                                        .getZoom() || 0) + 2,
                                duration: 1000,
                            });
                        }
                    }
                }
            });

            // Add pointer cursor when hovering over features
            mapInstanceRef.current.on("pointermove", (event) => {
                const pixel = mapInstanceRef.current?.getEventPixel(
                    event.originalEvent
                );
                const hit = mapInstanceRef.current?.hasFeatureAtPixel(pixel!);
                const target = mapInstanceRef.current?.getTarget();
                if (target instanceof HTMLElement) {
                    target.style.cursor = hit ? "pointer" : "";
                }
            });
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(undefined);
                mapInstanceRef.current = null;
            }
        };
    }, [center, zoom, filteredListings, router]);

    return (
        <div className="relative h-screen w-screen">
            <div
                ref={mapRef}
                className="h-full w-full rounded-lg overflow-hidden"
            />
            <div className="fixed left-4 bottom-24 md:bottom-4 z-50 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="w-64">
                        <Slider
                            defaultValue={[0, 10000]}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={(value) =>
                                setPriceRange(value as [number, number])
                            }
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>₱{priceRange[0].toLocaleString()}</span>
                            <span>₱{priceRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-2">
                <Button
                    onClick={() => handleZoom(1)}
                    className="p-6 rounded-full invert transition-colors cursor-pointer"
                    title="Zoom in"
                    size="icon"
                >
                    <IconPlus className="h-6 w-6" />
                </Button>
                <Button
                    onClick={() => handleZoom(-1)}
                    className="p-6 rounded-full invert transition-colors cursor-pointer"
                    title="Zoom out"
                    size="icon"
                >
                    <IconMinus className="h-6 w-6" />
                </Button>
                <Button
                    onClick={handleUserLocation}
                    className="p-6 rounded-full invert transition-colors cursor-pointer"
                    title="Go to my location"
                    size="icon"
                >
                    <IconCurrentLocation className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
