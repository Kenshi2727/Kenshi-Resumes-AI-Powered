import { Book, Calendar, Home, Layout, Info, Settings, Users } from "lucide-react"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext, useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Updated menu items with your requested sections
const items = [
    {
        title: "Home",
        description: "Main page",
        url: "/",
        icon: Home,
        category: "navigation"
    },
    {
        title: "Dashboard",
        description: "Analytics & overview",
        url: "/dashboard",
        icon: Layout,
        category: "navigation"
    },
    {
        title: "Developers",
        description: "Team profiles",
        url: "/",
        icon: Users,
        category: "content"
    },
    {
        title: "Documentation",
        description: "API & guides",
        url: "/",
        icon: Book,
        category: "content"
    },
    {
        title: "Blog",
        description: "Latest articles",
        url: "/",
        icon: Calendar,
        category: "content"
    },
    {
        title: "About Us",
        description: "Product information",
        url: "/",
        icon: Info,
        category: "Additional Information"
    },
    {
        title: "Settings",
        description: "Preferences",
        url: "/",
        icon: Settings,
        category: "system"
    },
]

export function AppSidebar() {
    const { theme } = useContext(ThemeContext);
    const [activeItem, setActiveItem] = useState("");
    const [hoveredItem, setHoveredItem] = useState(null);

    // Group items by category
    const categories = {};
    items.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });

    // Determine text and background colors based on theme
    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-slate-200' : 'text-[#747bff]';
    const accentColor = isDark ? 'text-cyan-400' : 'text-[#747bff]';
    const bgHover = isDark ? 'bg-slate-800' : 'bg-slate-100';
    const bgActive = isDark ? 'bg-slate-700' : 'bg-slate-200';

    return (
        <Sidebar variant="sidebar" collapsible="offcanvas" side="left">
            <SidebarContent className="pt-4">
                <div className="flex items-center justify-center mb-6 px-4">
                    <div className={`text-xl font-bold ${accentColor} flex items-center gap-2`}>
                        <div className={(isDark) ? "w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white" : "w-8 h-8 rounded-lg bg-gradient-to-r from-violet-400 to-indigo-600 flex items-center justify-center text-white"}>
                            K
                        </div>
                        <span>Kenshi Resumes</span>
                    </div>
                </div>

                {Object.keys(categories).map((category) => (
                    <SidebarGroup key={category} className="mb-3">
                        <SidebarGroupLabel className={`capitalize ${accentColor} text-sm font-medium px-3`}>
                            {category}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {categories[category].map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`
                                                ${activeItem === item.title ? `${bgActive} ${accentColor}` : textColor}
                                                group
                                                transition-all duration-200 ease-in-out
                                                hover:${bgHover}
                                                rounded-md
                                                px-3 py-2 my-1
                                                w-full
                                            `}
                                            onClick={() => setActiveItem(item.title)}
                                            onMouseEnter={() => setHoveredItem(item.title)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <a
                                                href={item.url}
                                                className="flex items-center gap-3 w-full relative"
                                                target={item.external ? "_blank" : "_self"}
                                                rel={item.external ? "noopener noreferrer" : ""}
                                            >
                                                {activeItem === item.title && (
                                                    <div className={(isDark) ? "absolute left-0 top-1/2 w-1 h-6 -translate-y-1/2 bg-cyan-400 rounded-r-full transition-all duration-300 ease-in-out" : "absolute left-0 top-1/2 w-1 h-6 -translate-y-1/2 bg-[#747bff] rounded-r-full transition-all duration-300 ease-in-out"} />
                                                )}
                                                <item.icon className={`w-5 h-5 flex-shrink-0 ${activeItem === item.title ? accentColor : textColor} transition-all duration-200`} />
                                                <div className="flex flex-col w-full min-w-0">
                                                    <span className="font-medium truncate">{item.title}</span>
                                                    {hoveredItem === item.title && (
                                                        <span className="text-xs opacity-70 truncate block w-full">{item.description}</span>
                                                    )}
                                                </div>

                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className={`rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} p-3 text-sm transition-all duration-300`}>
                        <p className={`${textColor} font-medium text-xs`}>Pro Tip</p>
                        <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-xs mt-1`}>
                            Press <kbd className="px-1 py-0.5 rounded bg-slate-700 text-slate-200 text-xs mx-1">⌘ K</kbd> to search
                        </p>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}