"use client"

import { clsx } from "clsx"
import { useEffect, useState } from "react"
import { LucidePanelLeft, LucidePanelLeftClose, LucideTimer } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/shared/ui/accordion"
import { Button } from "~/shared/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "~/shared/ui/combobox"
import { Field, FieldLabel } from "~/shared/ui/field"
import { Input } from "~/shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/shared/ui/select"
import { H3 } from "~/shared/ui/typography"
import { ColorPicker } from "~/shared/ui/color-picker"
import { ModeToggle } from "~/shared/ui/theme-provider/mode-toggle"
import type { Config, MetadataResponse, RefreshRate, Strategy } from "~/app/types"

interface SidebarProps {
  config: Config
  onUpdate: (updates: Partial<Config>) => void
}

export function Sidebar({ config, onUpdate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exchanges, setExchanges] = useState<string[]>([])
  const [pairs, setPairs] = useState<string[]>([])

  useEffect(() => {
    if (!isOpen || !!exchanges.length || !!pairs.length) return

    const fetchMetadata = async () => {
      try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/meta`, {
          cache: "no-cache",
        })
        const metadata = (await request.json()) as Awaited<MetadataResponse>

        setExchanges(metadata.exchanges)
        setPairs(metadata.pairs)
      } catch (e) {
        console.error(e)
      }
    }

    fetchMetadata()
  }, [isOpen, exchanges.length, pairs.length])

  return (
    <>
      <Button
        className={clsx("fixed top-4 right-4 mb-4 opacity-100 transition-opacity", isOpen && "opacity-0")}
        variant="outline"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
      >
        <LucidePanelLeft />
      </Button>
      <aside
        className={clsx(
          "fixed top-0 right-0 flex h-dvh w-[300px] translate-x-full flex-col overflow-y-auto border-l bg-transparent px-3 py-4 backdrop-blur-xl transition-transform",
          isOpen && "translate-none"
        )}
      >
        <header className="mb-4 flex items-center justify-between gap-4">
          <Button variant="outline" size="icon-sm" onClick={() => setIsOpen(false)}>
            <LucidePanelLeftClose />
          </Button>
          <ModeToggle />
        </header>
        <H3>Configuration</H3>
        <div className="flex-1">
          <Accordion type="multiple" defaultValue={["main", "time"]}>
            <AccordionItem value="main">
              <AccordionTrigger>Main</AccordionTrigger>
              <AccordionContent className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="exchanges">Exchanges</FieldLabel>
                  <Combobox
                    id="exchanges"
                    multiple
                    autoHighlight
                    disabled={config.state === "on"}
                    value={config.exchanges}
                    items={exchanges}
                    onValueChange={(values) => onUpdate({ exchanges: values })}
                  >
                    <ComboboxChips>
                      <ComboboxValue>
                        {(values) => values.map((value: string) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
                      </ComboboxValue>
                      <ComboboxChipsInput placeholder="Add exchange" />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field>
                  <FieldLabel htmlFor="pairs">Pairs</FieldLabel>
                  <Combobox
                    id="pairs"
                    multiple
                    autoHighlight
                    disabled={config.state === "on"}
                    value={config.pairs}
                    items={pairs}
                    onValueChange={(values) => onUpdate({ pairs: values })}
                  >
                    <ComboboxChips>
                      <ComboboxValue>
                        {(values) => values.map((value: string) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
                      </ComboboxValue>
                      <ComboboxChipsInput placeholder="Add pair" />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field>
                  <FieldLabel htmlFor="strategies">Arbitrage Strategies</FieldLabel>
                  <Combobox
                    id="strategies"
                    multiple
                    autoHighlight
                    disabled={config.state === "on"}
                    value={config.strategies}
                    items={["triangular", "cross-exchange"] satisfies Strategy[]}
                    onValueChange={(values) => onUpdate({ strategies: values as Strategy[] })}
                  >
                    <ComboboxChips>
                      <ComboboxValue>
                        {(values) => values.map((value: string) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
                      </ComboboxValue>
                      <ComboboxChipsInput placeholder="Add strategy" />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="time">
              <AccordionTrigger>Time</AccordionTrigger>
              <AccordionContent className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="refresh-rate">Refresh rate</FieldLabel>
                  <Select
                    disabled={config.state === "on"}
                    value={config.refreshRate}
                    onValueChange={(value) => onUpdate({ refreshRate: value as RefreshRate })}
                  >
                    <SelectTrigger>
                      <LucideTimer />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="1s">1 second</SelectItem>
                      <SelectItem value="2s">2 seconds</SelectItem>
                      <SelectItem value="5s">5 seconds</SelectItem>
                      <SelectItem value="10s">10 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="peripherals">
              <AccordionTrigger>Peripherals</AccordionTrigger>
              <AccordionContent className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="node-color">Node color</FieldLabel>
                  <div className="relative z-100">
                    <ColorPicker
                      containerClassName="absolute top-1/2 -translate-y-1/2 left-2"
                      color={config.nodeColor}
                      onChange={(color) => onUpdate({ nodeColor: color })}
                    />
                    <Input
                      className="pl-10"
                      id="node-color"
                      value={config.nodeColor}
                      onChange={(e) => onUpdate({ nodeColor: e.target.value })}
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="line-color">Line color</FieldLabel>
                  <div className="relative z-50">
                    <ColorPicker
                      containerClassName="absolute top-1/2 -translate-y-1/2 left-2"
                      color={config.lineColor}
                      onChange={(color) => onUpdate({ lineColor: color })}
                    />
                    <Input
                      className="pl-10"
                      id="line-color"
                      value={config.lineColor}
                      onChange={(e) => onUpdate({ lineColor: e.target.value })}
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="grid-color">Grid color</FieldLabel>
                  <div className="relative z-10">
                    <ColorPicker
                      containerClassName="absolute top-1/2 -translate-y-1/2 left-2"
                      color={config.gridColor}
                      onChange={(color) => onUpdate({ gridColor: color })}
                    />
                    <Input
                      className="pl-10"
                      id="grid-color"
                      value={config.gridColor}
                      onChange={(e) => onUpdate({ gridColor: e.target.value })}
                    />
                  </div>
                </Field>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="border-t pt-3">
          <Button
            className="w-full"
            variant={config.state === "off" ? "default" : "destructive"}
            onClick={() => onUpdate({ state: config.state === "off" ? "on" : "off" })}
          >
            {config.state === "off" ? "Start" : "Stop"}
          </Button>
        </div>
      </aside>
    </>
  )
}
