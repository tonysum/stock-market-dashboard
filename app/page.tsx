"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { HeaderBar } from "@/components/layout/header-bar"
import { StatusBar } from "@/components/layout/status-bar"
import { MarketPage } from "@/components/pages/market-page"
import { StockDetailPage } from "@/components/pages/stock-detail-page"
import { NewsPage } from "@/components/pages/news-page"
import { PortfolioPage } from "@/components/pages/portfolio-page"
import { AccountPage } from "@/components/pages/account-page"
import { DataPage } from "@/components/pages/data-page"
import { OptionsPage } from "@/components/pages/options-page"
import { ScreenerPage } from "@/components/pages/screener-page"
import { WatchlistPage } from "@/components/pages/watchlist-page"

function PageContent({ activeTab }: { activeTab: string }) {
  switch (activeTab) {
    case "account":
      return <AccountPage />
    case "watchlist":
      return <WatchlistPage />
    case "market":
      return <MarketPage />
    case "options":
      return <OptionsPage />
    case "strategy":
      return <ScreenerPage />
    case "portfolio":
      return <PortfolioPage />
    case "data":
      return <DataPage />
    case "trade":
      return <StockDetailPage />
    case "news":
      return <NewsPage />
    default:
      return <MarketPage />
  }
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("market")

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top header */}
      <HeaderBar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          <PageContent activeTab={activeTab} />
        </main>
      </div>

      {/* Bottom status bar */}
      <StatusBar />
    </div>
  )
}
