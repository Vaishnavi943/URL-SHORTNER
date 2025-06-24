
import { createRootRoute } from '@tanstack/react-router'
import RootLayout from '../RootLayout'
import { authRoute } from './auth.route'
import { homePageRoute } from './homePage'
import {dashboardRoute} from './dashboard'

export const rootRoute = createRootRoute({
  component: RootLayout
})

export const routeTree = rootRoute.addChildren([
  homePageRoute, 
  authRoute, 
  dashboardRoute
])
