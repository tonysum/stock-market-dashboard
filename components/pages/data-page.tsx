"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const mainTabs = ["港股经纪商持股", "公告精选", "筹码分析", "机构持仓", "新股平台", "分红派息"]
const subTabs = ["港股", "美股", "A股"]

interface IPOItem {
  code: string
  name: string
  ipoPrice: string
  lotSize: string
  entryFee: string
  subscriptionRatio: string
  status: string
}

const upcomingIPOs: IPOItem[] = [
  { code: "09981", name: "沃尔核材", ipoPrice: "≤20.090", lotSize: "200", entryFee: "4,058.53", subscriptionRatio: "", status: "今日暗盘" },
  { code: "02706", name: "海致科技集团", ipoPrice: "25,400~28,000", lotSize: "", entryFee: "5,656.48", subscriptionRatio: "", status: "今日暗盘" },
]

interface IPOListItem {
  seq: number
  code: string
  name: string
  currentPrice: string
  changePct: string
  volume: string
  turnover: string
  marketCap: string
  fiveMinPct: string
  yearChange: string
  isUp: boolean
}

const ipoList: IPOListItem[] = [
  { seq: 1, code: "02539", name: "乐摩科技", currentPrice: "22.140", changePct: "+23.00%", volume: "179.8K", turnover: "3,424M", marketCap: "12.25亿", fiveMinPct: "-44.85%", yearChange: "-11.58%", isUp: true },
  { seq: 2, code: "07747", name: "南方两倍做多三星...", currentPrice: "69.260", changePct: "+12.48%", volume: "1,353M", turnover: "11.23M", marketCap: "28,743亿", fiveMinPct: "-0.35%", yearChange: "183.89%", isUp: true },
  { seq: 3, code: "07947", name: "南方两倍做多三星...", currentPrice: "8.825", changePct: "+12.12%", volume: "68K", turnover: "586.5K", marketCap: "3.4665亿", fiveMinPct: "-0.39%", yearChange: "182.63%", isUp: true },
  { seq: 4, code: "09903", name: "天数智芯", currentPrice: "214.000", changePct: "+10.86%", volume: "1.353M", turnover: "284.1M", marketCap: "544.24亿", fiveMinPct: "-0.83%", yearChange: "47.99%", isUp: true },
  { seq: 5, code: "02513", name: "智谱", currentPrice: "345.000", changePct: "+10.44%", volume: "1.27M", turnover: "426.5M", marketCap: "1538.2亿", fiveMinPct: "0.00%", yearChange: "196.90%", isUp: true },
  { seq: 6, code: "00100", name: "MINIMAX-WP", currentPrice: "556.000", changePct: "+8.38%", volume: "757.5K", turnover: "414.4M", marketCap: "1743.8亿", fiveMinPct: "1.65%", yearChange: "236.97%", isUp: true },
  { seq: 7, code: "02658", name: "天璇半导", currentPrice: "33.300", changePct: "+7.81%", volume: "198.4K", turnover: "10.34M", marketCap: "29.61亿", fiveMinPct: "-8.10%", yearChange: "11.04%", isUp: true },
]

const calendarDays = ["02/12 周三", "02/13 周四", "02/14 周五", "02/15 周六", "02/16 周一", "02/17 周二", "02/18 周三"]

export function DataPage() {
  const [activeMainTab, setActiveMainTab] = useState("新股平台")
  const [activeSubTab, setActiveSubTab] = useState("港股")

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main tabs */}
        <div className="flex items-center gap-0.5 border-b border-border px-3 py-1.5">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={cn(
                "px-3 py-1 text-xs rounded transition-colors",
                activeMainTab === tab
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-0.5 border-b border-border px-3 py-1">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={cn(
                "px-2 py-0.5 text-[11px] rounded transition-colors",
                activeSubTab === tab
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Calendar section */}
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-foreground">新股日历</span>
            <span className="text-xs text-muted-foreground">即将上市新股</span>
          </div>

          {/* Calendar header */}
          <div className="flex items-center border-b border-border text-[10px] text-muted-foreground mb-1">
            <div className="flex items-center gap-3 ml-auto">
              {calendarDays.map((day) => (
                <span key={day} className="w-16 text-center py-0.5">{day}</span>
              ))}
            </div>
          </div>

          {/* Timeline markers */}
          <div className="flex items-center gap-3 text-[9px] text-muted-foreground mb-2 ml-auto justify-end">
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-stock-up" /><span>认购时间</span></div>
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-primary" /><span>公布中签及暗盘</span></div>
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-yellow-500" /><span>上市时间</span></div>
          </div>

          {/* IPO rows */}
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-0.5 font-normal">代码</th>
                <th className="text-left py-0.5 font-normal">名称</th>
                <th className="text-right py-0.5 font-normal">招股价</th>
                <th className="text-right py-0.5 font-normal">每手股数</th>
                <th className="text-right py-0.5 font-normal">入场费</th>
                <th className="text-right py-0.5 font-normal">状态</th>
              </tr>
            </thead>
            <tbody>
              {upcomingIPOs.map((ipo) => (
                <tr key={ipo.code} className="hover:bg-accent/30 border-b border-border/30">
                  <td className="py-1 text-foreground">{ipo.code}</td>
                  <td className="py-1 text-primary">{ipo.name}</td>
                  <td className="py-1 text-right text-foreground">{ipo.ipoPrice}</td>
                  <td className="py-1 text-right text-foreground">{ipo.lotSize}</td>
                  <td className="py-1 text-right text-foreground">{ipo.entryFee}</td>
                  <td className="py-1 text-right">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-stock-down/20 text-stock-down">{ipo.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Already listed */}
        <div className="flex-1 overflow-auto px-3 py-2">
          <span className="text-xs text-primary mb-1 inline-block">已上市新股 &gt;</span>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-1 font-normal">序号</th>
                <th className="text-left py-1 font-normal">代码</th>
                <th className="text-left py-1 font-normal">名称</th>
                <th className="text-right py-1 font-normal">最新价</th>
                <th className="text-right py-1 font-normal">涨跌幅</th>
                <th className="text-right py-1 font-normal">成交量</th>
                <th className="text-right py-1 font-normal">成交额</th>
                <th className="text-right py-1 font-normal">市盈率TTM</th>
                <th className="text-right py-1 font-normal">5分钟涨跌幅</th>
                <th className="text-right py-1 font-normal">年初至今涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {ipoList.map((stock) => (
                <tr key={stock.code} className="hover:bg-accent/30 border-b border-border/30">
                  <td className="py-1 text-muted-foreground">{stock.seq}</td>
                  <td className="py-1 text-foreground">{stock.code}</td>
                  <td className="py-1 text-foreground">{stock.name}</td>
                  <td className={cn("py-1 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.currentPrice}</td>
                  <td className={cn("py-1 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.changePct}</td>
                  <td className="py-1 text-right text-foreground">{stock.volume}</td>
                  <td className="py-1 text-right text-foreground">{stock.turnover}</td>
                  <td className="py-1 text-right text-foreground">{stock.marketCap}</td>
                  <td className={cn("py-1 text-right", stock.fiveMinPct.startsWith("-") ? "text-stock-down" : "text-stock-up")}>{stock.fiveMinPct}</td>
                  <td className={cn("py-1 text-right", stock.yearChange.startsWith("-") ? "text-stock-down" : "text-stock-up")}>{stock.yearChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right panel: stock detail */}
      <div className="w-[260px] border-l border-border overflow-y-auto">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          <button className="px-2 py-0.5 text-[11px] bg-accent text-accent-foreground rounded">报价</button>
          <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded">资讯</button>
          <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded">评论</button>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">02539</span>
            <span className="text-sm font-medium text-foreground">乐摩科技</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold text-stock-up">22.140</span>
            <span className="text-xs text-stock-up">+4.140</span>
            <span className="text-xs text-stock-up">+23.00%</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-3 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">最高价</span>
              <span className="text-stock-up">22.500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">开盘价</span>
              <span className="text-stock-up">18.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">最低价</span>
              <span className="text-stock-down">18.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">成交量</span>
              <span className="text-foreground">18万</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">振幅</span>
              <span className="text-foreground">25.00%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">市盈率(T)</span>
              <span className="text-foreground">13.27</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总市值</span>
              <span className="text-foreground">5.14亿</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">流通市值</span>
              <span className="text-foreground">1233万</span>
            </div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="px-3 py-2 border-t border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-foreground">迷你走势图</span>
            <div className="flex gap-1">
              <span className="text-[9px] text-muted-foreground">分时</span>
              <span className="text-[9px] text-muted-foreground">多日</span>
              <span className="text-[9px] text-primary">日K</span>
            </div>
          </div>
          <div className="h-20 bg-secondary/30 rounded flex items-center justify-center">
            <div className="w-full h-full flex items-end px-1 gap-0.5">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-sm", Math.random() > 0.4 ? "bg-stock-up/60" : "bg-stock-down/60")}
                  style={{ height: `${20 + Math.random() * 60}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent trades */}
        <div className="px-3 py-2 border-t border-border">
          <span className="text-[10px] text-foreground">逐笔成交</span>
          <table className="w-full text-[9px] mt-1">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left font-normal">时间</th>
                <th className="text-right font-normal">价格</th>
                <th className="text-right font-normal">数量</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: "10:15:00", p: "22.300", q: "1.1K", up: true },
                { t: "10:15:00", p: "22.300", q: "300", up: false },
                { t: "10:15:00", p: "22.300", q: "1.2K", up: true },
                { t: "10:15:00", p: "22.300", q: "1.2K", up: true },
                { t: "10:15:06", p: "22.300", q: "500", up: false },
              ].map((tick, i) => (
                <tr key={i}>
                  <td className="py-0.5 text-muted-foreground">{tick.t}</td>
                  <td className={cn("py-0.5 text-right", tick.up ? "text-stock-up" : "text-stock-down")}>{tick.p}</td>
                  <td className={cn("py-0.5 text-right", tick.up ? "text-stock-up" : "text-stock-down")}>{tick.q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
