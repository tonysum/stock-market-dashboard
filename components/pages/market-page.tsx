"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { MarketChart } from "@/components/market/market-chart"
import { HeatMap } from "@/components/market/heat-map"
import { StockRanking } from "@/components/market/stock-ranking"
import { MarketTabs } from "@/components/market/market-tabs"
import { AllStocksTable } from "@/components/market/all-stocks-table"

const mainTabs = ["自选", "港股", "美股", "沪深", "新加坡", "日股", "马来西亚", "加拿大", "澳大利亚", "沪深港通", "外汇", "基金", "数币"]
const subTabs = ["A股热点", "全部股票", "上证B股", "上主板", "深主板", "科创板", "可转债", "已上市新股", "可融资股票", "基金", "明星基金", "所有板块"]

export function MarketPage() {
  const [activeMainTab, setActiveMainTab] = useState("沪深")
  const [activeSubTab, setActiveSubTab] = useState("A股热点")

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Main market tabs */}
      <div className="flex items-center gap-0.5 border-b border-border bg-card px-2 py-1 overflow-x-auto">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMainTab(tab)}
            className={cn(
              "px-2.5 py-1 text-xs whitespace-nowrap rounded transition-colors",
              activeMainTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-0.5 border-b border-border bg-card px-2 py-1 overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              "px-2 py-0.5 text-[11px] whitespace-nowrap rounded transition-colors",
              activeSubTab === tab
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content */}
      {activeSubTab === "全部股票" ? (
        <div className="flex-1 overflow-hidden">
          <AllStocksTable />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Charts and heatmap */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Index charts section */}
            <div className="border-b border-border p-2">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-muted-foreground">大盘指数</span>
              </div>
              <div className="flex gap-3">
                <MarketChart
                  name="上证指数"
                  value="4134.38"
                  change="+2.40"
                  changePercent="+0.06%"
                  isUp={true}
                />
                <MarketChart
                  name="深证成指"
                  value="14207.52"
                  change="+44.59"
                  changePercent="+0.33%"
                  isUp={true}
                />
              </div>
            </div>

            {/* Heatmap section */}
            <div className="flex-1 overflow-hidden p-2">
              <MarketTabs />
              <HeatMap />
            </div>
          </div>

          {/* Right: Rankings */}
          <div className="w-[520px] border-l border-border overflow-hidden">
            <StockRanking />
          </div>
        </div>
      )}
    </div>
  )
}
