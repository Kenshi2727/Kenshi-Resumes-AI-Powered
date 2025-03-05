import * as React from "react"

import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"
import data from "@/data/CarouselData"

export function CarouselSize() {
    const { theme } = useContext(ThemeContext);
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className={(theme === 'light') ? "w-[60%] md:w-[60%] xs:w-full max-w-sm md:max-w-full h-50" : "w-[60%] sm:w-[40%] md:w-[60%] xs:w-full max-w-sm md:max-w-full h-50 shadow-2xl shadow-[rgba(0,191,255,0.8)]"}
        >
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index} className={(theme === 'light') ? "pl-1 md:basis-1/2 lg:basis-[40%] shadow-md" : "pl-1 md:basis-1/2 lg:basis-[40%] shadow-xl shadow-[rgba(0,191,255,0.8)]"}>
                        <div className="p-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{item.headline}</CardTitle>
                                    <CardDescription>{item.subheadline}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <img src={item.image} className="rounded-xl" alt={item.alt} height="150px" width="230px" />
                                </CardFooter>
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
