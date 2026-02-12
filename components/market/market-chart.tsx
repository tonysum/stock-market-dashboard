"use client"

import { useEffect, useRef, useMemo } from "react"
import { createChart, type IChartApi, ColorType } from "lightweight-charts"
import { cn } from "@/lib/utils"

interface MarketChartProps {
  name: string
  value: string
  change: string
  changePercent: string
  isUp: boolean
}

function generateIntradayData(baseValue: number, isUp: boolean) {
  const data: { time: string; value: number }[] = []
  const volumeData: { time: string; value: number; color: string }[] = []
  let current = baseValue * (isUp ? 0.997 : 1.003)
  const today = new Date()
  const dateStr = today.toISOString().split("T")[0]

  // Generate intraday data using sequential seconds as time
  for (let i = 0; i < 240; i++) {
    const hour = 9 + Math.floor((i + 30) / 60)
    const minute = (i + 30) % 60
    const timeStr = `${dateStr} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`

    current += (Math.random() - (isUp ? 0.45 : 0.55)) * baseValue * 0.0008
    const vol = Math.random() * 50000 + 5000

    data.push({
      time: timeStr,
      value: parseFloat(current.toFixed(2)),
    })

    volumeData.push({
      time: timeStr,
      value: Math.round(vol),
      color: Math.random() > 0.5 ? "rgba(234, 57, 67, 0.4)" : "rgba(38, 166, 91, 0.4)",
    })
  }

  return { lineData: data, volumeData }
}

export function MarketChart({ name, value, change, changePercent, isUp }: MarketChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  const baseValue = useMemo(() => parseFloat(value.replace(/,/g, "")), [value])
  const { lineData, volumeData } = useMemo(
    () => generateIntradayData(baseValue, isUp),
    [baseValue, isUp]
  )

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "hsl(210, 10%, 45%)",
        fontSize: 9,
      },
      grid: {
        vertLines: { color: "hsl(220, 15%, 13%)" },
        horzLines: { color: "hsl(220, 15%, 13%)" },
      },
      crosshair: {
        mode: 0,
        vertLine: { color: "hsl(210, 10%, 30%)", labelBackgroundColor: "hsl(220, 15%, 20%)" },
        horzLine: { color: "hsl(210, 10%, 30%)", labelBackgroundColor: "hsl(220, 15%, 20%)" },
      },
      rightPriceScale: {
        borderColor: "hsl(220, 15%, 18%)",
        scaleMargins: { top: 0.05, bottom: 0.25 },
      },
      timeScale: {
        borderColor: "hsl(220, 15%, 18%)",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    })

    chartRef.current = chart

    // Area series for the index line
    const areaSeries = chart.addAreaSeries({
      lineColor: isUp ? "#ea3943" : "#26a65b",
      topColor: isUp ? "rgba(234, 57, 67, 0.25)" : "rgba(38, 166, 91, 0.25)",
      bottomColor: isUp ? "rgba(234, 57, 67, 0.02)" : "rgba(38, 166, 91, 0.02)",
      lineWidth: 1,
      priceLineVisible: true,
      priceLineColor: isUp ? "rgba(234, 57, 67, 0.5)" : "rgba(38, 166, 91, 0.5)",
    })
    areaSeries.setData(lineData)

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
  }, [lineData, volumeData, isUp])

  return (
    <div className="flex-1">
      <div className="flex items-baseline gap-2 mb-1 px-1">
        <span className="text-xs text-muted-foreground font-medium">{name}</span>
        <span className={cn("text-sm font-bold tabular-nums", isUp ? "text-stock-up" : "text-stock-down")}>
          {value}
        </span>
        <span className={cn("text-[11px] tabular-nums", isUp ? "text-stock-up" : "text-stock-down")}>
          {change}
        </span>
        <span className={cn("text-[11px] tabular-nums", isUp ? "text-stock-up" : "text-stock-down")}>
          {changePercent}
        </span>
      </div>
      <div ref={chartContainerRef} className="h-[160px]" />
    </div>
  )
}
