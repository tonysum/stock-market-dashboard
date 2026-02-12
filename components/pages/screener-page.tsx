"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const mainTabs = ["条件选股", "智能牛期", "我的策略"]
const markets = ["沪深", "港股", "美股"]

interface ScreenerStock {
  code: string
  name: string
  price: string
  changePct: string
  changeAmt: string
  volume: string
  turnover: string
  pe: string
  pb: string
  marketCap: string
  high: string
  low: string
  amplitude: string
  isUp: boolean
}

const screenerData: ScreenerStock[] = [
  { code: "300091", name: "*ST金贝", price: "3.16", changePct: "-10.73%", changeAmt: "-0.38", volume: "132.4M", turnover: "404K", pe: "128M", pb: "89,809亿", marketCap: "5,368", high: "3.357", low: "3.347", amplitude: "0.222%", isUp: false },
  { code: "688033", name: "天宇新材", price: "8.93", changePct: "-6.01%", changeAmt: "-0.57", volume: "6,525", turnover: "188K", pe: "165M", pb: "50,204亿", marketCap: "5,368", high: "-36.68%", low: "7.655%", amplitude: "-3.357", isUp: false },
  { code: "300107", name: "建新股份", price: "9.75", changePct: "-1.09%", changeAmt: "-13.69%", volume: "404K", turnover: "128M", pe: "50,932亿", pb: "9,040", marketCap: "12,280", high: "-40.96%", low: "12.311%", amplitude: "266.174", isUp: false },
  { code: "301526", name: "国际碳材", price: "12.87", changePct: "+1.07%", changeAmt: "+0.97%", volume: "2.53M", turnover: "3.168", pe: "485,312亿", pb: "17,880", marketCap: "8,149", high: "-12.86%", low: "15.762%", amplitude: "-134.915", isUp: true },
  { code: "300166", name: "东方国信", price: "14.79", changePct: "+0.89%", changeAmt: "-0.67%", volume: "1.27M", turnover: "1.9B", pe: "148,426亿", pb: "14,790", marketCap: "4,576", high: "61.98%", low: "8.633%", amplitude: "568.864", isUp: true },
  { code: "300258", name: "精锻科技", price: "14.43", changePct: "+1.23%", changeAmt: "+0.49%", volume: "577M", turnover: "87.348亿", pe: "14,930", pb: "18,626", marketCap: "-40.09%", high: "9.927%", low: "54.687", amplitude: "6.911%", isUp: true },
  { code: "300249", name: "依米康", price: "17.68", changePct: "+0.30%", changeAmt: "+10.64%", volume: "997K", turnover: "1.458", pe: "77,878亿", pb: "17,670", marketCap: "26,093", high: "30.138%", low: "14.330%", amplitude: "-89.293", isUp: true },
  { code: "300277", name: "海联讯", price: "21.34", changePct: "+1.26%", changeAmt: "+1.27%", volume: "32.8K", turnover: "68.1M", pe: "38,453亿", pb: "21,350", marketCap: "6,363", high: "24.542%", low: "6.972%", amplitude: "-12.264", isUp: true },
]

const filterCategories = [
  { label: "行情指标(1)", items: ["市值", "价格", "市盈率(静)", "市盈率(TTM)", "市净率", "量比", "成交量", "振幅", "换手率", "每手价格", "委比"] },
  { label: "财务指标", items: ["净利润", "净利润增长率", "营业收入", "营收增长率", "毛利率", "净利率", "资产负债率", "净资产收益率"] },
  { label: "技术指标", items: ["MA", "EMA", "KDJ", "RSI", "MACD", "BOLL"] },
]

export function ScreenerPage() {
  const [activeTab, setActiveTab] = useState("条件选股")
  const [activeMarket, setActiveMarket] = useState("沪深")

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Filters */}
      <div className="w-[180px] flex flex-col border-r border-border overflow-y-auto">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-0.5 text-[11px] rounded transition-colors",
                activeTab === tab
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter groups */}
        <div className="px-2 py-2 space-y-3">
          {/* Market selection */}
          <div>
            <div className="text-[10px] text-muted-foreground mb-1">所属市场</div>
            <div className="flex gap-1">
              {markets.map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMarket(m)}
                  className={cn(
                    "px-2 py-0.5 text-[10px] rounded transition-colors",
                    activeMarket === m
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {filterCategories.map((cat) => (
            <div key={cat.label}>
              <div className="text-[10px] text-muted-foreground mb-1">{cat.label}</div>
              <div className="flex flex-wrap gap-1">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    className="px-2 py-0.5 text-[10px] rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-2 px-2 py-3 border-t border-border">
          <button className="flex-1 py-1.5 rounded bg-secondary text-secondary-foreground text-[11px] hover:bg-secondary/80 transition-colors">
            重置
          </button>
          <button className="flex-1 py-1.5 rounded bg-primary text-primary-foreground text-[11px] hover:bg-primary/90 transition-colors">
            保存为策略
          </button>
        </div>
      </div>

      {/* Right: Results */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
          <span className="text-[11px] text-muted-foreground">
            共有 <span className="text-foreground">43</span> 支股票符合本次选股条件
          </span>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-[10px]">
            <thead className="sticky top-0 bg-card z-10">
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-1 px-2 font-normal">代码</th>
                <th className="text-left py-1 px-2 font-normal">名称</th>
                <th className="text-right py-1 px-2 font-normal">最新价</th>
                <th className="text-right py-1 px-2 font-normal">涨跌幅</th>
                <th className="text-right py-1 px-2 font-normal">涨跌额</th>
                <th className="text-right py-1 px-2 font-normal">成交量</th>
                <th className="text-right py-1 px-2 font-normal">成交额</th>
                <th className="text-right py-1 px-2 font-normal">市值</th>
                <th className="text-right py-1 px-2 font-normal">最高价</th>
                <th className="text-right py-1 px-2 font-normal">最低价</th>
                <th className="text-right py-1 px-2 font-normal">振幅</th>
              </tr>
            </thead>
            <tbody>
              {screenerData.map((stock) => (
                <tr key={stock.code} className="border-b border-border/30 hover:bg-accent/30 cursor-pointer">
                  <td className="py-1 px-2 text-foreground">{stock.code}</td>
                  <td className={cn("py-1 px-2", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.name}</td>
                  <td className={cn("py-1 px-2 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.price}</td>
                  <td className={cn("py-1 px-2 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.changePct}</td>
                  <td className={cn("py-1 px-2 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>{stock.changeAmt}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.volume}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.turnover}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.marketCap}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.high}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.low}</td>
                  <td className="py-1 px-2 text-right text-foreground">{stock.amplitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
