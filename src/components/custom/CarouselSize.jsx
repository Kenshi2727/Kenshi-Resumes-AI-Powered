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
                            <Card className="h-[420px] sm:h-[400px] md:h-[450px] xl:h-[400px] max-w-[300px] box-border">
                                <CardHeader>
                                    <CardTitle className="text-xl">{item.headline}</CardTitle>
                                    <CardDescription className="text-sm font-medium">{item.subheadline}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    <p>{item.description}</p>
                                </CardContent>
                                <CardFooter className="h-[150px] w-full flex justify-center items-center">
                                    <img src={item.image} className="h-[140px] rounded-xl" alt={item.alt} width="230px" />
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
