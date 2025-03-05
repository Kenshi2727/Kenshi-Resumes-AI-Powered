import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"

export function CarouselSize() {
    const { theme } = useContext(ThemeContext);
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="md:w-full sm:w-64 w-56"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className={(theme === 'light') ? "flex aspect-square items-center justify-center p-6 shadow-md" : "flex aspect-square items-center justify-center p-6 shadow-2xl shadow-[rgba(0,191,255,0.8)]"}>
                                    <span className="text-3xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={(theme === 'dark') ? 'hover:border-[rgba(0,191,255,0.8)]' : ''} />
            <CarouselNext className={(theme === 'dark') ? 'hover:border-[rgba(0,191,255,0.8)]' : ''} />
        </Carousel>
    )
}
