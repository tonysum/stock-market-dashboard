"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface StockRow {
  code: string
  name: string
  price: string
  change: string
  changePercent: string
  volume: string
  turnover: string
}

const gainers: StockRow[] = [
  { code: "300277", name: "海联讯", price: "20.310", change: "+3.060", changePercent: "+15.39%", volume: "301231", turnover: "荣信文化" },
  { code: "688158", name: "优刻得-W", price: "41.830", change: "+4.490", changePercent: "+11.47%", volume: "300344", turnover: "*ST立方" },
  { code: "002323", name: "雅博股份", price: "2.620", change: "+0.240", changePercent: "+10.08%", volume: "301025", turnover: "康泰文化" },
  { code: "605006", name: "山东翔科", price: "10.200", change: "+0.930", changePercent: "+10.03%", volume: "688816", turnover: "C思思" },
  { code: "300394", name: "天宇通信", price: "317.400", change: "+28.860", changePercent: "+10.02%", volume: "300251", turnover: "光线传媒" },
]

const losers: StockRow[] = [
  { code: "300091", name: "*ST金贝", price: "3.16", change: "-0.38", changePercent: "-10.73%", volume: "132M", turnover: "89,809亿" },
  { code: "688033", name: "天宇新材", price: "8.93", change: "-0.57", changePercent: "-6.01%", volume: "188K", turnover: "50,204亿" },
  { code: "300107", name: "建新股份", price: "9.75", change: "-1.09", changePercent: "-13.69%", volume: "404K", turnover: "128M" },
]

const volumeRanking: StockRow[] = [
  { code: "300394", name: "天宇通信", price: "317,400", change: "81.89亿", changePercent: "002510", volume: "山东翔科", turnover: "" },
  { code: "300308", name: "中际旭创", price: "528,970", change: "66.34亿", changePercent: "605006", volume: "山东翔科", turnover: "" },
  { code: "002131", name: "利欧股份", price: "8,640", change: "60.09亿", changePercent: "600292", volume: "电投水电", turnover: "" },
  { code: "300502", name: "新易盛", price: "370,970", change: "59.97亿", changePercent: "688035", volume: "赛腾科技", turnover: "" },
  { code: "002837", name: "英维克", price: "109,450", change: "56.31亿", changePercent: "002323", volume: "雅博股份", turnover: "" },
]

const watchlist: StockRow[] = [
  { code: "300620", name: "光库科技", price: "180.130", change: "+11.250", changePercent: "+4.34%", volume: "154.1K", turnover: "4.236%" },
  { code: "600288", name: "大恒科技", price: "15.450", change: "-0.090", changePercent: "-0.58%", volume: "17.02K", turnover: "0.390%" },
  { code: "603729", name: "龙韵股份", price: "21.380", change: "-2.380", changePercent: "-10.02%", volume: "82.96K", turnover: "8.890%" },
  { code: "002723", name: "小崧股份", price: "10.440", change: "-1.160", changePercent: "-9.98%", volume: "192.8K", turnover: "6.081%" },
  { code: "002429", name: "兆驰股份", price: "11.220", change: "-0.110", changePercent: "-0.97%", volume: "1.051M", turnover: "2.323%" },
  { code: "002830", name: "名雕股份", price: "25.060", change: "-2.660", changePercent: "-9.60%", volume: "82.04K", turnover: "12.272%" },
  { code: "605287", name: "德才股份", price: "58.800", change: "-2.460", changePercent: "-3.98%", volume: "128.4K", turnover: "9.146%" },
  { code: "301262", name: "海看股份", price: "29.530", change: "-1.860", changePercent: "-5.93%", volume: "128.3K", turnover: "10.508%" },
]

export function StockRanking() {
  const [activeTab, setActiveTab] = useState<"hot" | "composite">("hot")

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab header */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <button
          onClick={() => setActiveTab("hot")}
          className={cn(
            "text-xs px-2 py-0.5 rounded transition-colors",
            activeTab === "hot"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          热度排名
        </button>
        <button
          onClick={() => setActiveTab("composite")}
          className={cn(
            "text-xs px-2 py-0.5 rounded transition-colors",
            activeTab === "composite"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          综合排名
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Today's Gainers */}
        <div className="px-2 py-1.5">
          <div className="flex gap-2 mb-1">
            <span className="text-[11px] text-stock-up font-medium">今日涨幅排行</span>
            <span className="text-[11px] text-stock-down font-medium ml-auto">今日跌幅排行</span>
          </div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left py-0.5 font-normal">代码</th>
                <th className="text-left py-0.5 font-normal">名称</th>
                <th className="text-right py-0.5 font-normal">最新价</th>
                <th className="text-right py-0.5 font-normal">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {gainers.slice(0, 5).map((stock) => (
                <tr key={stock.code} className="hover:bg-accent/50 cursor-pointer">
                  <td className="py-0.5 text-muted-foreground">{stock.code}</td>
                  <td className="py-0.5 text-foreground">{stock.name}</td>
                  <td className="py-0.5 text-right text-stock-up">{stock.price}</td>
                  <td className="py-0.5 text-right text-stock-up">{stock.changePercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Volume ranking */}
        <div className="px-2 py-1.5 border-t border-border">
          <div className="flex gap-2 mb-1">
            <span className="text-[11px] text-foreground font-medium">今日成交额排行</span>
            <span className="text-[11px] text-foreground font-medium ml-auto">今日量比排行</span>
          </div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left py-0.5 font-normal">代码</th>
                <th className="text-left py-0.5 font-normal">名称</th>
                <th className="text-right py-0.5 font-normal">成交额</th>
                <th className="text-right py-0.5 font-normal">换手率</th>
              </tr>
            </thead>
            <tbody>
              {volumeRanking.map((stock) => (
                <tr key={stock.code} className="hover:bg-accent/50 cursor-pointer">
                  <td className="py-0.5 text-muted-foreground">{stock.code}</td>
                  <td className="py-0.5 text-foreground">{stock.name}</td>
                  <td className="py-0.5 text-right text-foreground">{stock.change}</td>
                  <td className="py-0.5 text-right text-muted-foreground">{stock.changePercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Watchlist */}
        <div className="px-2 py-1.5 border-t border-border">
          <span className="text-[11px] text-foreground font-medium">自选股</span>
          <table className="w-full text-[10px] mt-1">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left py-0.5 font-normal">代码</th>
                <th className="text-left py-0.5 font-normal">名称</th>
                <th className="text-right py-0.5 font-normal">最新价</th>
                <th className="text-right py-0.5 font-normal">涨跌幅</th>
                <th className="text-right py-0.5 font-normal">成交量</th>
                <th className="text-right py-0.5 font-normal">换手率</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((stock) => {
                const isUp = !stock.changePercent.startsWith("-")
                return (
                  <tr key={stock.code} className="hover:bg-accent/50 cursor-pointer">
                    <td className="py-0.5 text-muted-foreground">{stock.code}</td>
                    <td className={cn("py-0.5", isUp ? "text-stock-up" : "text-stock-down")}>{stock.name}</td>
                    <td className={cn("py-0.5 text-right", isUp ? "text-stock-up" : "text-stock-down")}>{stock.price}</td>
                    <td className={cn("py-0.5 text-right", isUp ? "text-stock-up" : "text-stock-down")}>{stock.changePercent}</td>
                    <td className="py-0.5 text-right text-muted-foreground">{stock.volume}</td>
                    <td className="py-0.5 text-right text-muted-foreground">{stock.turnover}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
