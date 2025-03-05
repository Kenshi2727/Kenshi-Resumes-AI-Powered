import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ui/theme-provider"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

export function ModeToggle() {
    const { setTheme } = useTheme()
    const { theme, setTheme: setCustomTheme } = useContext(ThemeContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={(theme === 'dark') ? 'hover:border-[rgba(0,191,255,0.8)]' : 'hover:border-primary'}>
                    <Sun className="text-indigo-600 -[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="text-[rgba(0,191,255,0.8)] absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                    setTheme("light")
                    setCustomTheme("light")
                    /*if not removed shadcn will remain in dark mode as it treats it as a tailwindcss class instead of a custom class*/
                    document.body.classList.remove("dark");
                }
                }>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    setTheme("dark")
                    setCustomTheme("dark")
                    document.body.classList.add("dark")
                }}>
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
