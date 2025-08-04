import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import SignInPage from './auth/sign-in'
import SignUpPage from './auth/sign-up'
import Home from './home'
import Dashboard from './dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[documentId]/edit'
import ViewResume from './my-resume/[documentId]/view'
import { ThemeContext } from './context/ThemeContext'
import { CustomThemeProvider } from './context/ThemeContext'
import { useState } from 'react'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { dark, shadesOfPurple } from '@clerk/themes'
import { useEffect } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import ATS_Score from './ats_score/[documentId]'
import { ScoreProvider } from './context/ScoreContext'
import { registerSW } from 'virtual:pwa-register'
import { DefferedPromptProvider } from './context/DefferedPromptContext.jsx'
import Feedback from './sidebar-components/Feedback'
import About from './sidebar-components/About'

registerSW({ immediate: true })

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
//creating a router
const router = createBrowserRouter([
  //default route
  {
    path: '/',
    element: <Home />//now we have to make sure to render the home component inside the app component
  },
  {
    // path: '/',
    element: <App />,
    //sub routes
    children: [
      // {
      //   path: '/',
      //   element: <Home />//now we have to make sure to render the home component inside the app component
      // },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:documentId/edit',//dyanmic route
        element: <EditResume />
      },
      {
        path: '/ats_score/:documentId',
        element: <ATS_Score />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/feedback',
        element: <Feedback />
      }
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUpPage />,
  },
  {
    path: 'my-resume/:documentId/view',
    element: <ViewResume />
  }
])

//wrapper component
function Root() {
  const { theme, setTheme } = useContext(ThemeContext);
  // const { score, setScore } = useContext(ScoreContext);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    console.log(theme);
    ;
  }, []);


  // PINGING BACKEND
  useEffect(() => {
    console.log("useEffect in App is running");
    const interval = setInterval(() => {
      fetch(import.meta.env.VITE_BASE_URL)
        .then(() => console.log("%c✅Backend Pinged!", 'color: green; font-weight: bold;'))
        .catch(error => console.error('Error pinging backend:', error));
    }, 840000); //ping every 14 minutes
    // }, 3000); //ping every 3 seconds(for development only)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <CustomThemeProvider value={{ theme, setTheme }}>
      <DefferedPromptProvider>
        <ScoreProvider>
          <SidebarProvider open={open} onOpenChange={setOpen}>
            <AppSidebar />
            <SidebarInset>
              <ClerkProvider
                publishableKey={PUBLISHABLE_KEY}
                signUpFallbackRedirectUrl='/'
                signInFallbackRedirectUrl='/'
                afterSignOutUrl="/"
              >
                <RouterProvider router={router} />
              </ClerkProvider>
            </SidebarInset>
          </SidebarProvider>
        </ScoreProvider>
      </DefferedPromptProvider>
    </CustomThemeProvider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <App /> */}
      <Root />
    </ThemeProvider>
  </StrictMode >
)
