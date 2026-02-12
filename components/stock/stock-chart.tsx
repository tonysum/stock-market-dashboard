"use client"

import { useEffect, useRef, useMemo } from "react"
import { createChart, type IChartApi, ColorType } from "lightweight-charts"

interface StockChartProps {
  stock: {
    code: string
    name: string
    price: number
  }
}

function generateCandleData(basePrice: number) {
  const data: { time: string; open: number; high: number; low: number; close: number }[] = []
  const volumeData: { time: string; value: number; color: string }[] = []
  let price = basePrice * 0.7
  const startDate = new Date("2025-02-01")

  for (let i = 0; i < 200; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const dateStr = date.toISOString().split("T")[0]
    const volatility = basePrice * 0.03
    const change = (Math.random() - 0.48) * volatility
    price = Math.max(price + change, basePrice * 0.4)

    const open = price
    const close = price + (Math.random() - 0.5) * volatility * 1.5
    const high = Math.max(open, close) + Math.random() * volatility * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * 0.5
    const volume = Math.random() * 130000 + 20000
    const isUp = close >= open

    data.push({
      time: dateStr,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    })

    volumeData.push({
      time: dateStr,
      value: Math.round(volume),
      color: isUp ? "rgba(234, 57, 67, 0.6)" : "rgba(38, 166, 91, 0.6)",
    })
  }

  return { candleData: data, volumeData }
}

function calculateMA(data: { time: string; close: number }[], period: number) {
  const result: { time: string; value: number }[] = []
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close
    }
    result.push({ time: data[i].time, value: parseFloat((sum / period).toFixed(2)) })
  }
  return result
}

export function StockChart({ stock }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  const { candleData, volumeData } = useMemo(() => generateCandleData(stock.price), [stock.price])

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "hsl(210, 10%, 45%)",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "hsl(220, 15%, 15%)" },
        horzLines: { color: "hsl(220, 15%, 15%)" },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "hsl(210, 10%, 30%)",
          labelBackgroundColor: "hsl(220, 15%, 20%)",
        },
        horzLine: {
          color: "hsl(210, 10%, 30%)",
          labelBackgroundColor: "hsl(220, 15%, 20%)",
        },
      },
      rightPriceScale: {
        borderColor: "hsl(220, 15%, 20%)",
        scaleMargins: { top: 0.05, bottom: 0.25 },
      },
      timeScale: {
        borderColor: "hsl(220, 15%, 20%)",
        timeVisible: false,
      },
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    })

    chartRef.current = chart

    // Candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#ea3943",
      downColor: "#26a65b",
      borderUpColor: "#ea3943",
      borderDownColor: "#26a65b",
      wickUpColor: "#ea3943",
      wickDownColor: "#26a65b",
    })
    candleSeries.setData(candleData)

    // MA lines
    const ma5Data = calculateMA(candleData, 5)
    const ma10Data = calculateMA(candleData, 10)
    const ma20Data = calculateMA(candleData, 20)
    const ma60Data = calculateMA(candleData, 30)

    const ma5Series = chart.addLineSeries({
      color: "#e6c84c",
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })
    ma5Series.setData(ma5Data)

    const ma10Series = chart.addLineSeries({
      color: "#c084fc",
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })
    ma10Series.setData(ma10Data)

    const ma20Series = chart.addLineSeries({
      color: "#60a5fa",
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })
    ma20Series.setData(ma20Data)

    const ma60Series = chart.addLineSeries({
      color: "#f472b6",
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })
    ma60Series.setData(ma60Data)

    // Volume histogram
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    })
    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    })
    volumeSeries.setData(volumeData)

    chart.timeScale().fitContent()

    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        chart.applyOptions({ width, height })
      }
    })
    resizeObserver.observe(chartContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [candleData, volumeData])

  return (
    <div className="flex h-full flex-col">
      {/* MA legend */}
      <div className="flex items-center gap-3 px-2 py-1 text-[10px]">
        <span className="text-[#e6c84c]">MA5: {stock.price.toFixed(2)}</span>
        <span className="text-[#c084fc]">MA10: {stock.price.toFixed(2)}</span>
        <span className="text-[#60a5fa]">MA20: {stock.price.toFixed(2)}</span>
        <span className="text-[#f472b6]">MA60: {stock.price.toFixed(2)}</span>
      </div>
      {/* Chart container */}
      <div ref={chartContainerRef} className="flex-1 min-h-0" />
    </div>
  )
}
