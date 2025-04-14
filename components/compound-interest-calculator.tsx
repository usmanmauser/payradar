"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Calculator, BarChart4, ListFilter } from "lucide-react"
import { ResultsChart } from "@/components/results-chart"
import { ResultsTable } from "@/components/results-table"
import { ResultsSummary } from "@/components/results-summary"
import { calculateCompoundInterest } from "@/lib/calculate-compound-interest"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
]

const compoundingFrequencies = [
  { value: "daily", label: "Daily (365/year)", times: 365 },
  { value: "weekly", label: "Weekly (52/year)", times: 52 },
  { value: "biweekly", label: "Bi-weekly (26/year)", times: 26 },
  { value: "monthly", label: "Monthly (12/year)", times: 12 },
  { value: "quarterly", label: "Quarterly (4/year)", times: 4 },
  { value: "semiannually", label: "Half-yearly (2/year)", times: 2 },
  { value: "annually", label: "Yearly (1/year)", times: 1 },
]

const additionalContributionFrequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semiannually", label: "Half-yearly" },
  { value: "annually", label: "Yearly" },
]

export default function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState("USD")
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [interestRate, setInterestRate] = useState(8)
  const [compoundFrequency, setCompoundFrequency] = useState("annually")
  const [years, setYears] = useState(10)
  const [months, setMonths] = useState(0)
  const [isInterestToggleEnabled, setIsInterestToggleEnabled] = useState(true)

  // Additional contributions
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false)
  const [additionalOptionType, setAdditionalOptionType] = useState("none")
  const [depositAmount, setDepositAmount] = useState(1000)
  const [depositFrequency, setDepositFrequency] = useState("monthly")
  const [withdrawalAmount, setWithdrawalAmount] = useState(500)
  const [withdrawalFrequency, setWithdrawalFrequency] = useState("monthly")

  // Results
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState("chart")

  // Calculate results when inputs change
  useEffect(() => {
    if (isInterestToggleEnabled) {
      const totalMonths = years * 12 + Number.parseInt(months.toString())

      const calculationParams = {
        principal: initialInvestment,
        annualRate: interestRate,
        compoundFrequency: compoundingFrequencies.find((f) => f.value === compoundFrequency)?.times || 1,
        totalMonths,
        additionalOptionType,
        depositAmount: additionalOptionType === "deposits" || additionalOptionType === "both" ? depositAmount : 0,
        depositFrequency,
        withdrawalAmount:
          additionalOptionType === "withdrawals" || additionalOptionType === "both" ? withdrawalAmount : 0,
        withdrawalFrequency,
      }

      const calculationResults = calculateCompoundInterest(calculationParams)
      setResults(calculationResults)
    } else {
      setResults(null)
    }
  }, [
    initialInvestment,
    interestRate,
    compoundFrequency,
    years,
    months,
    isInterestToggleEnabled,
    additionalOptionType,
    depositAmount,
    depositFrequency,
    withdrawalAmount,
    withdrawalFrequency,
  ])

  const handleCalculate = () => {
    // Calculation is already handled by the useEffect
    // This is just for the button click experience
    const element = document.getElementById("results-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const selectedCurrency = currencies.find((c) => c.code === currency) || currencies[0]

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <Card className="md:col-span-5 lg:col-span-4">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Currency Selection */}
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name} ({curr.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Initial Investment */}
            <div className="space-y-2">
              <Label htmlFor="initial-investment">
                Initial Investment
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  The starting amount you plan to invest. This is your principal amount.
                </span>
              </Label>
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">{selectedCurrency.symbol}</span>
                <Input
                  id="initial-investment"
                  type="number"
                  min="0"
                  step="100"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="interest-rate">
                  Interest Rate
                  <span className="block text-sm font-normal text-muted-foreground mt-1">
                    Annual interest rate, like fixed deposit rates (3-5%), savings (1-2%), or stocks (7-10%).
                  </span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="interest-toggle"
                    checked={isInterestToggleEnabled}
                    onCheckedChange={setIsInterestToggleEnabled}
                  />
                  <Label htmlFor="interest-toggle" className="text-sm">
                    {isInterestToggleEnabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  id="interest-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  disabled={!isInterestToggleEnabled}
                />
                <span className="ml-2 text-muted-foreground">%</span>
              </div>
              <Slider
                value={[interestRate]}
                min={0}
                max={30}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
                disabled={!isInterestToggleEnabled}
                className="mt-2"
              />
            </div>

            {/* Compound Frequency */}
            <div className="space-y-2">
              <Label htmlFor="compound-frequency">
                Compound Frequency
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  How often interest is calculated and added to your principal. More frequent compounding yields higher
                  returns.
                </span>
              </Label>
              <Select
                value={compoundFrequency}
                onValueChange={setCompoundFrequency}
                disabled={!isInterestToggleEnabled}
              >
                <SelectTrigger id="compound-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {compoundingFrequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label>
                Timeline
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  For how long the money is being invested in the market.
                </span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    min="0"
                    max="100"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="months">Months</Label>
                  <Input
                    id="months"
                    type="number"
                    min="0"
                    max="11"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <Collapsible
              open={showAdditionalOptions}
              onOpenChange={setShowAdditionalOptions}
              className="border rounded-md p-4"
            >
              <CollapsibleTrigger className="flex w-full justify-between items-center">
                <div className="flex items-center">
                  <ListFilter className="h-4 w-4 mr-2" />
                  <span className="font-medium">Additional Considerable Situations</span>
                </div>
                {showAdditionalOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-muted-foreground">
                    Useful if you plan on depositing or withdrawing money during the investment period.
                  </Label>
                  <RadioGroup
                    value={additionalOptionType}
                    onValueChange={setAdditionalOptionType}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <RadioGroupItem value="none" id="option-none" />
                      <Label htmlFor="option-none" className="cursor-pointer">
                        None
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <RadioGroupItem value="deposits" id="option-deposits" />
                      <Label htmlFor="option-deposits" className="cursor-pointer">
                        Deposits
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <RadioGroupItem value="withdrawals" id="option-withdrawals" />
                      <Label htmlFor="option-withdrawals" className="cursor-pointer">
                        Withdrawals
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <RadioGroupItem value="both" id="option-both" />
                      <Label htmlFor="option-both" className="cursor-pointer">
                        Both
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Deposits */}
                {(additionalOptionType === "deposits" || additionalOptionType === "both") && (
                  <div className="space-y-2 border-t pt-4">
                    <Label htmlFor="deposit-amount">
                      Deposit Amount
                      <span className="block text-sm font-normal text-muted-foreground mt-1">
                        Additional amount you'll regularly add to your investment.
                      </span>
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">{selectedCurrency.symbol}</span>
                      <Input
                        id="deposit-amount"
                        type="number"
                        min="0"
                        step="100"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                      />
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="deposit-frequency">Frequency</Label>
                      <Select value={depositFrequency} onValueChange={setDepositFrequency}>
                        <SelectTrigger id="deposit-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {additionalContributionFrequencies.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Withdrawals */}
                {(additionalOptionType === "withdrawals" || additionalOptionType === "both") && (
                  <div className="space-y-2 border-t pt-4">
                    <Label htmlFor="withdrawal-amount">
                      Withdrawal Amount
                      <span className="block text-sm font-normal text-muted-foreground mt-1">
                        Amount you'll regularly withdraw from your investment.
                      </span>
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">{selectedCurrency.symbol}</span>
                      <Input
                        id="withdrawal-amount"
                        type="number"
                        min="0"
                        step="100"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                      />
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="withdrawal-frequency">Frequency</Label>
                      <Select value={withdrawalFrequency} onValueChange={setWithdrawalFrequency}>
                        <SelectTrigger id="withdrawal-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {additionalContributionFrequencies.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>

            <Button onClick={handleCalculate} className="w-full" size="lg" disabled={!isInterestToggleEnabled}>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-7 lg:col-span-8" id="results-section">
        {results ? (
          <div className="space-y-6">
            <ResultsSummary
              results={results}
              initialInvestment={initialInvestment}
              currency={selectedCurrency}
              years={years}
              months={months}
              interestRate={interestRate}
              compoundFrequency={compoundFrequency}
              additionalOptionType={additionalOptionType}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="table">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Yearly Breakdown
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <ResultsChart results={results} currency={selectedCurrency} />
              </TabsContent>
              <TabsContent value="table" className="mt-4">
                <ResultsTable results={results} currency={selectedCurrency} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] border rounded-lg p-8 text-center">
            <BarChart4 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Results to Display</h3>
            <p className="text-muted-foreground max-w-md">
              {isInterestToggleEnabled
                ? "Fill in the calculator fields and click 'Calculate' to see how your investment will grow over time."
                : "Please enable the interest rate toggle to calculate compound interest."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
