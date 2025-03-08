import { Book, Calendar, Home, Layout, Search, Settings, Users } from "lucide-react"
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
        url: "/developers",
        icon: Users,
        category: "content"
    },
    {
        title: "Documentation",
        description: "API & guides",
        url: "/docs",
        icon: Book,
        category: "content"
    },
    {
        title: "Blog",
        description: "Latest articles",
        url: "/blog",
        icon: Calendar,
        category: "content"
    },
    {
        title: "Search",
        description: "Find content",
        url: "/search",
        icon: Search,
        category: "tools"
    },
    {
        title: "Settings",
        description: "Preferences",
        url: "/settings",
        icon: Settings,
        category: "system"
    },
]

export function AppSidebar() {
    const { theme } = useContext(ThemeContext);
    const [activeItem, setActiveItem] = useState("Home");
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
    const textColor = isDark ? 'text-slate-200' : 'text-slate-800';
    const accentColor = isDark ? 'text-cyan-400' : 'text-cyan-600';
    const bgHover = isDark ? 'bg-slate-800' : 'bg-slate-100';
    const bgActive = isDark ? 'bg-slate-700' : 'bg-slate-200';

    return (
        <Sidebar variant="sidebar" collapsible="offcanvas" side="left" className={`${isDark ? 'bg-slate-900' : 'bg-white'} border-r transition-all duration-300 ease-in-out min-w-64`}>
            <SidebarContent className="pt-4">
                <div className="flex items-center justify-center mb-6 px-4">
                    <div className={`text-xl font-bold ${accentColor} flex items-center gap-2`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white">
                            O
                        </div>
                        <span>Obsidian</span>
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
                                                    <div className="absolute left-0 top-1/2 w-1 h-6 -translate-y-1/2 bg-cyan-400 rounded-r-full transition-all duration-300 ease-in-out" />
                                                )}
                                                <item.icon className={`w-5 h-5 flex-shrink-0 ${activeItem === item.title ? accentColor : textColor} transition-all duration-200`} />
                                                <div className="flex flex-col w-full min-w-0">
                                                    <span className="font-medium truncate">{item.title}</span>
                                                    {hoveredItem === item.title && (
                                                        <span className="text-xs opacity-70 truncate block w-full">{item.description}</span>
                                                    )}
                                                </div>
                                                {item.badge && (
                                                    <div className="ml-auto bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                                        {item.badge}
                                                    </div>
                                                )}
                                                {item.external && (
                                                    <svg className="w-3 h-3 ml-auto opacity-60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                                        <path d="M15 3h6v6" />
                                                        <path d="M10 14L21 3" />
                                                    </svg>
                                                )}
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