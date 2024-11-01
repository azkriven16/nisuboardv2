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
import { Style, Circle, Fill, Stroke } from "ol/style";
import { Geometry } from "ol/geom";
import XYZ from "ol/source/XYZ";

interface TenantMapProps {
    center?: [number, number];
    zoom?: number;
}

export default function TenantMap({
    center = [123.14389088712784, 11.461424460015792], // Default to Estancia coordinates
    zoom = 13,
}: TenantMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const userLocationLayerRef = useRef<VectorLayer<
        VectorSource<Feature<Geometry>>
    > | null>(null);

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
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(undefined);
                mapInstanceRef.current = null;
            }
        };
    }, [center, zoom]);

    return (
        <div className="relative h-screen w-screen">
            <div
                ref={mapRef}
                className="h-full w-full rounded-lg overflow-hidden"
            />
            <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-2">
                <Button
                    onClick={() => handleZoom(1)}
                    className="p-6 rounded-full invert transition-colors"
                    title="Zoom in"
                    size="icon"
                >
                    <IconPlus className="h-6 w-6" />
                </Button>
                <Button
                    onClick={() => handleZoom(-1)}
                    className="p-6 rounded-full invert transition-colors"
                    title="Zoom out"
                    size="icon"
                >
                    <IconMinus className="h-6 w-6" />
                </Button>
                <Button
                    onClick={handleUserLocation}
                    className="p-6 rounded-full invert transition-colors"
                    title="Go to my location"
                    size="icon"
                >
                    <IconCurrentLocation className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
