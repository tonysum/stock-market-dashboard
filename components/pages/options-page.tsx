"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const mainTabs = ["期权链", "期权异动", "期权排行", "期权分析"]
const expiryDates = ["02/11*", "02/13*", "02/16*", "02/20", "02/22*", "02/25*", "03/06*", "03/13*", "03/20*", "03/27*"]

interface OptionRow {
  theta: string
  gamma: string
  delta: string
  impliedVol: string
  openInt: string
  volume: string
  changePct: string
  lastPrice: string
  midPrice: string
  askPrice: string
  bidPrice: string
  strike: string
  bidPrice2: string
  askPrice2: string
  midPrice2: string
  lastPrice2: string
  changePct2: string
  volume2: string
  openInt2: string
  impliedVol2: string
  delta2: string
  gamma2: string
  theta2: string
}

const optionData: OptionRow[] = [
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "1307", volume: "325", changePct: "+12.31%", lastPrice: "28.30", midPrice: "28.150", askPrice: "28.30", bidPrice: "28.00", strike: "400", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-92.57%", volume2: "6504", openInt2: "5011", impliedVol2: "1689.75%", delta2: "-0.0030", gamma2: "0.0009", theta2: "-52.1488" },
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "327", volume: "104", changePct: "+15.02%", lastPrice: "24.37", midPrice: "25.650", askPrice: "25.80", bidPrice: "25.50", strike: "402.5", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-94.59%", volume2: "2713", openInt2: "1381", impliedVol2: "1550.87%", delta2: "-0.0033", gamma2: "0.0010", theta2: "-51.5863" },
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "527", volume: "358", changePct: "+14.90%", lastPrice: "23.55", midPrice: "23.150", askPrice: "23.30", bidPrice: "23.00", strike: "405", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-97.22%", volume2: "5826", openInt2: "1880", impliedVol2: "1272.31%", delta2: "-0.0040", gamma2: "0.0012", theta2: "-50.9438" },
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "648", volume: "273", changePct: "+13.62%", lastPrice: "20.650", midPrice: "20.650", askPrice: "20.80", bidPrice: "20.50", strike: "407.5", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-98.06%", volume2: "19297", openInt2: "4985", impliedVol2: "1132.31%", delta2: "-0.0064", gamma2: "0.0018", theta2: "-49.4785" },
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "1961", volume: "2621", changePct: "+18.23%", lastPrice: "18.63", midPrice: "18.150", askPrice: "18.30", bidPrice: "18.00", strike: "410", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-98.64%", volume2: "11539", openInt2: "2477", impliedVol2: "917.53%", delta2: "-0.0050", gamma2: "0.0023", theta2: "-48.5619" },
  { theta: "--", gamma: "--", delta: "--", impliedVol: "--", openInt: "905", volume: "905", changePct: "+11.08%", lastPrice: "14.97", midPrice: "15.650", askPrice: "15.00", bidPrice: "15.50", strike: "412.5", bidPrice2: "--", askPrice2: "--", midPrice2: "--", lastPrice2: "0.01", changePct2: "-99.04%", volume2: "34030", openInt2: "4151", impliedVol2: "849.67%", delta2: "-0.0057", gamma2: "0.0030", theta2: "-47.4972" },
]

export function OptionsPage() {
  const [activeTab, setActiveTab] = useState("期权链")
  const [selectedExpiry, setSelectedExpiry] = useState("02/11*")

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Main tabs */}
      <div className="flex items-center gap-0.5 border-b border-border px-3 py-1.5">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1 text-xs rounded transition-colors",
              activeTab === tab
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stock selector */}
      <div className="flex items-center gap-3 border-b border-border px-3 py-1.5">
        <span className="text-xs text-foreground">TSLA 特斯拉</span>
        <div className="flex items-center gap-1 text-[11px]">
          <button className="px-2 py-0.5 rounded bg-accent text-accent-foreground">单腿期权</button>
          <button className="px-2 py-0.5 rounded text-muted-foreground hover:text-foreground">全部</button>
          <button className="px-2 py-0.5 rounded text-muted-foreground hover:text-foreground">看涨</button>
          <button className="px-2 py-0.5 rounded text-muted-foreground hover:text-foreground">看跌</button>
        </div>
        <span className="text-[10px] text-muted-foreground ml-auto">Call 150.41万股</span>
        <span className="text-[10px] text-muted-foreground">58 : 42</span>
        <span className="text-[10px] text-muted-foreground">Put 107.01万股</span>
      </div>

      {/* Expiry dates */}
      <div className="flex items-center gap-1 border-b border-border px-3 py-1 overflow-x-auto">
        {expiryDates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedExpiry(date)}
            className={cn(
              "px-2 py-0.5 text-[10px] whitespace-nowrap rounded transition-colors",
              selectedExpiry === date
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-0.5 text-[9px] text-muted-foreground">
        <span>当前行情延迟15分钟</span>
      </div>

      {/* Options table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[9px]">
          <thead className="sticky top-0 bg-card z-10">
            <tr className="text-muted-foreground border-b border-border">
              <th className="py-1 px-1 font-normal text-right">Theta</th>
              <th className="py-1 px-1 font-normal text-right">Gamma</th>
              <th className="py-1 px-1 font-normal text-right">Delta</th>
              <th className="py-1 px-1 font-normal text-right">隐含波动率</th>
              <th className="py-1 px-1 font-normal text-right">未平仓</th>
              <th className="py-1 px-1 font-normal text-right">成交量</th>
              <th className="py-1 px-1 font-normal text-right">涨跌幅</th>
              <th className="py-1 px-1 font-normal text-right">最新价</th>
              <th className="py-1 px-1 font-normal text-right">中间价</th>
              <th className="py-1 px-1 font-normal text-right">卖价</th>
              <th className="py-1 px-1 font-normal text-right">买价</th>
              <th className="py-1 px-1 font-normal text-center bg-secondary">行权价</th>
              <th className="py-1 px-1 font-normal text-right">买价</th>
              <th className="py-1 px-1 font-normal text-right">卖价</th>
              <th className="py-1 px-1 font-normal text-right">中间价</th>
              <th className="py-1 px-1 font-normal text-right">最新价</th>
              <th className="py-1 px-1 font-normal text-right">涨跌幅</th>
              <th className="py-1 px-1 font-normal text-right">成交量</th>
              <th className="py-1 px-1 font-normal text-right">未平仓</th>
              <th className="py-1 px-1 font-normal text-right">Delta</th>
              <th className="py-1 px-1 font-normal text-right">Gamma</th>
              <th className="py-1 px-1 font-normal text-right">Theta</th>
            </tr>
          </thead>
          <tbody>
            {optionData.map((row, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-accent/30">
                <td className="py-1 px-1 text-right text-muted-foreground">{row.theta}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.gamma}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.delta}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.impliedVol}</td>
                <td className="py-1 px-1 text-right text-foreground">{row.openInt}</td>
                <td className="py-1 px-1 text-right text-foreground">{row.volume}</td>
                <td className="py-1 px-1 text-right text-stock-up">{row.changePct}</td>
                <td className="py-1 px-1 text-right text-stock-up">{row.lastPrice}</td>
                <td className="py-1 px-1 text-right text-foreground">{row.midPrice}</td>
                <td className="py-1 px-1 text-right text-stock-up">{row.askPrice}</td>
                <td className="py-1 px-1 text-right text-stock-up">{row.bidPrice}</td>
                <td className="py-1 px-1 text-center font-medium bg-secondary/50 text-foreground">{row.strike}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.bidPrice2}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.askPrice2}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.midPrice2}</td>
                <td className="py-1 px-1 text-right text-stock-down">{row.lastPrice2}</td>
                <td className="py-1 px-1 text-right text-stock-down">{row.changePct2}</td>
                <td className="py-1 px-1 text-right text-foreground">{row.volume2}</td>
                <td className="py-1 px-1 text-right text-foreground">{row.openInt2}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.delta2}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.gamma2}</td>
                <td className="py-1 px-1 text-right text-muted-foreground">{row.theta2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom order section */}
      <div className="border-t border-border px-3 py-2 text-[10px]">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">TSLA 特斯拉</span>
          <span className="text-stock-up">428.270</span>
          <span className="text-stock-up">+3.060</span>
          <span className="text-stock-up">+0.72%</span>
        </div>
      </div>
    </div>
  )
}
