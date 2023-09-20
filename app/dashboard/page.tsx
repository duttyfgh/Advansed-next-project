import React from 'react'
import { generateMetadata } from '../layout'
import Dashboard from './Dashboard'

export const metadata = generateMetadata('Dashboard')

const DashboardContainer = () => <Dashboard />

export default DashboardContainer