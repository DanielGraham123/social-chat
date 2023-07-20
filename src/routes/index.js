import { Auth, Chat, Home, Profile } from "../pages/index.js";

export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/chat",
        element: <Chat />,
    }
]