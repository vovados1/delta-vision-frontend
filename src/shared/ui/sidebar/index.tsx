"use client"

import clsx from "clsx"
import { LucidePanelLeft, LucidePanelLeftClose } from "lucide-react"
import { useState } from "react"
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

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

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
        <Button className="mb-4" variant="outline" size="icon-sm" onClick={() => setIsOpen(false)}>
          <LucidePanelLeftClose />
        </Button>
        <H3>Configuration</H3>
        <div>
          <Accordion type="multiple" defaultValue={["main", "time"]}>
            <AccordionItem value="main">
              <AccordionTrigger>Main</AccordionTrigger>
              <AccordionContent className="grid gap-4">
                <Field>
                  <FieldLabel htmlFor="exchanges">Exchanges</FieldLabel>
                  <Combobox id="exchanges" multiple autoHighlight items={["binance", "okx", "bybit"]}>
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
                  <Combobox id="pairs" multiple autoHighlight items={["usdt/btc", "usdt/ltc"]}>
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
                  <Combobox id="strategies" multiple autoHighlight items={["triangular", "cross-exchange"]}>
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
                  <FieldLabel htmlFor="period">Period</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">last 1 minute</SelectItem>
                      <SelectItem value="5m">last 5 minutes</SelectItem>
                      <SelectItem value="10m">last 10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="refresh-rate">Refresh rate</FieldLabel>
                  <Select>
                    <SelectTrigger>
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
                  <Input id="node-color" value="0xffffff" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="line-color">Line color</FieldLabel>
                  <Input id="line-color" value="0xffffff" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="grid-color">Grid color</FieldLabel>
                  <Input id="grid-color" value="0xffffff" />
                </Field>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Button className="mt-auto w-full">Start</Button>
      </aside>
    </>
  )
}
