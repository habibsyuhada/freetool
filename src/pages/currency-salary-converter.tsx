import { useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Container, Title, TextInput, Select, Table, Alert, SimpleGrid, Grid, Card, Button, Collapse, Text, Box } from "@mantine/core";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import { IconSquareRoundedChevronDown, IconSquareRoundedChevronUp } from '@tabler/icons-react';

interface Currency {
  code: string;
  name: string;
}

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [rateConversion, setRateConversion] = useState<{ [key: string]: number }>({});
  const [amountFrom, setAmountFrom] = useState("0");
  const [amountTo, setAmountTo] = useState("0");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [error, setError] = useState("");
  const [searchValueFrom, setSearchValueFrom] = useState("");
  const [searchValueTo, setSearchValueTo] = useState("");
  const [time, setTime] = useState("Per Hours");
  const [isCollapseFromOpen, { toggle: toggleCollapseFromOpen }] = useDisclosure(true);
  const [isCollapseToOpen, { toggle: toggleCollapseToOpen }] = useDisclosure(true);
  const [isAdvanceSettingOpen, { toggle: toggleAdvanceSettingOpen }] = useDisclosure(true);
  const [fromHoursTable, setFromHoursTable] = useState("0");
  const [fromMonthTable, setFromMonthTable] = useState("0");
  const [fromYearTable, setFromYearTable] = useState("0");
  const [toHoursTable, setToHoursTable] = useState("0");
  const [toMonthTable, setToMonthTable] = useState("0");
  const [toYearTable, setToYearTable] = useState("0");
  const [calcHours, setCalcHours] = useState(8);
  const [calcDay, setCalcDay] = useState(5);
  const [calcWeek, setCalcWeek] = useState(4);
  const [calcMonth, setCalcMonth] = useState(12);

  const formatNumber = useCallback((num: number) => {
    const res = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    return res;
  }, []);

  const handleTableInformation = useCallback((value: string, category: string) => {
    const rate = rateConversion[toCurrency];
    let sourceValue = value;
    let sourceTime = time;
    let sourceCategory = category;
    let sourceHours;
    let sourceMonth;
    let sourceYear;

    if (sourceCategory == "time") {
      sourceTime = value;
      sourceValue = amountFrom;
      sourceCategory = "from";
    }

    if (sourceTime == "Per Hours") {
      sourceHours = parseFloat(sourceValue) * rate;
      if (sourceCategory == "to") {
        sourceHours = parseFloat(sourceValue) / rate;
      }
      sourceMonth = sourceHours * calcHours * calcDay * calcWeek;
      sourceYear = sourceMonth * calcMonth;
    } else if (sourceTime == "Per Month") {
      sourceMonth = parseFloat(sourceValue) * rate;
      if (sourceCategory == "to") {
        sourceMonth = parseFloat(sourceValue) / rate;
      }
      sourceHours = sourceMonth / calcHours / calcDay / calcWeek;
      sourceYear = sourceMonth * calcMonth;
    } else if (sourceTime == "Per Year") {
      sourceYear = parseFloat(sourceValue) * rate;
      if (sourceCategory == "to") {
        sourceYear = parseFloat(sourceValue) / rate;
      }
      sourceMonth = sourceYear / calcMonth;
      sourceHours = sourceMonth / calcHours / calcDay / calcWeek;
    }

    if (sourceHours !== undefined && sourceMonth !== undefined && sourceYear !== undefined) {
      if (sourceCategory == "from") {
        setFromHoursTable(formatNumber(sourceHours));
        setFromMonthTable(formatNumber(sourceMonth));
        setFromYearTable(formatNumber(sourceYear));
        setToHoursTable(formatNumber(sourceHours / rate));
        setToMonthTable(formatNumber(sourceMonth / rate));
        setToYearTable(formatNumber(sourceYear / rate));
      } else if (sourceCategory == "to") {
        setToHoursTable(formatNumber(sourceHours));
        setToMonthTable(formatNumber(sourceMonth));
        setToYearTable(formatNumber(sourceYear));
        setFromHoursTable(formatNumber(sourceHours * rate));
        setFromMonthTable(formatNumber(sourceMonth * rate));
        setFromYearTable(formatNumber(sourceYear * rate));
      }
    }
  }, [rateConversion, toCurrency, time, amountFrom, calcHours, calcDay, calcWeek, calcMonth, formatNumber]);

  const handleAmountFromChange = useCallback((value: string) => {
    let numericValue = value;
    numericValue = numericValue.replace(/,/g, "");
    let parseValue = parseFloat(numericValue);
    if (isNaN(parseValue)) {
      parseValue = 0;
    }
    setAmountFrom(value);

    const rate = rateConversion[toCurrency];
    let conversion = parseValue * rate;
    if (isNaN(conversion)) {
      conversion = 0;
    }
    setAmountTo(formatNumber(conversion));
    handleTableInformation(numericValue, "from");
  }, [rateConversion, toCurrency, handleTableInformation, formatNumber]);

  const handleAmountToChange = useCallback((value: string) => {
    let numericValue = value;
    numericValue = numericValue.replace(/,/g, "");
    let parseValue = parseFloat(numericValue);
    if (isNaN(parseValue)) {
      parseValue = 0;
    }
    setAmountTo(value);

    const rate = rateConversion[toCurrency];
    const conversion = parseValue / rate;
    setAmountFrom(formatNumber(conversion));
    handleTableInformation(numericValue, "to");
  }, [rateConversion, toCurrency, formatNumber, handleTableInformation]);

  const handleTimeChange = useCallback((value: string | null) => {
    if (value) {
      setTime(value);
      handleTableInformation(value, "time");
    }
  }, [handleTableInformation]);

  const handleFromCurrencyChange = useCallback((value: string) => {
    setFromCurrency(value);
  }, []);

  const fetchMasterCurrency = useCallback(async () => {
    try {
      const response = await axios.get("/api/master_currency");
      setCurrencies(response.data);
    } catch (err) {
      setError("Failed to fetch currency data master: " + err);
    }
  }, []);

  const fetchRateConversion = useCallback(async () => {
    try {
      const response = await axios.get(`/api/currency?base_code=${fromCurrency}`);
      const conversionData = response.data;
      if (conversionData.update_date) {
        conversionData.update_date = conversionData.update_date.split("T")[0];
      }
      let isUpToDate = true;
      let isInsert = true;
      if (!conversionData || !conversionData.conversion_rates) {
        isUpToDate = false;
      } else if (conversionData.update_date !== new Date().toISOString().split("T")[0]) {
        isUpToDate = false;
        isInsert = false;
      }

      if (!isUpToDate) {
        const externalResponse = await axios.get(`https://v6.exchangerate-api.com/v6/fe7dfda1cacbc547ab0385d6/latest/${fromCurrency}`);
        const externalData = externalResponse.data;

        if (isInsert) {
          await axios.post("/api/currency", {
            base_code: externalData.base_code,
            conversion_rates: externalData.conversion_rates,
            update_date: new Date().toISOString().split("T")[0],
          });
        } else {
          await axios.put("/api/currency", {
            base_code: externalData.base_code,
            conversion_rates: externalData.conversion_rates,
            update_date: new Date().toISOString().split("T")[0],
          });
        }

        setRateConversion(externalData.conversion_rates);
      } else {
        const rates = JSON.parse(conversionData.conversion_rates);
        setRateConversion(rates);
      }
    } catch (err) {
      console.error("err", err);
      // setError("Failed to fetch currency data rate");
    }
  }, [fromCurrency]);

  useEffect(() => {
    fetchMasterCurrency();
    fetchRateConversion();
  }, [fetchMasterCurrency, fetchRateConversion]);

  useEffect(() => {
    handleAmountFromChange(amountFrom);
  }, [fromCurrency, toCurrency, handleAmountFromChange, amountFrom]);

  useEffect(() => {
    fetchRateConversion();
  }, [fromCurrency, fetchRateConversion]);

  useEffect(() => {
    handleTableInformation(amountFrom, "from");
  }, [calcHours, calcDay, calcWeek, calcMonth, amountFrom, handleTableInformation]);

  return (
    <Layout
      title="Currency and Salary Converter | International Pay Calculator"
      description="Compare salaries and convert currencies across different countries with real-time exchange rates. Calculate hourly, monthly, and yearly pay with our free international salary converter tool."
      keywords="currency converter, salary calculator, international salary comparison, exchange rate calculator, hourly rate converter, global pay calculator, salary conversion tool, international wage comparison"
    >
      <Container>
        <Title order={2} mt="md" mb="md">
          <div style={{ textAlign: "center" }}>
            {" "}
            {/* Centering text using a div */}
            Currency & Salary
            <br />
            Converter
          </div>
        </Title>
        {error && (
          <Alert title="Error!" color="red">
            {error}
          </Alert>
        )}
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl" pt="xl">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 1 }}>
            <Select
              value={fromCurrency}
              searchValue={searchValueFrom}
              onSearchChange={setSearchValueFrom}
              onChange={(value) => {
                if (value) {
                  handleFromCurrencyChange(value); // Set currency only if value is not null
                }
              }}
              onFocus={() => setSearchValueFrom("")}
              data={currencies.map((currency) => ({
                value: currency.code,
                label: `${currency.code} - ${currency.name}`,
              }))}
              searchable
              allowDeselect={false}
            />
            <TextInput type="text" value={amountFrom} onChange={(e) => handleAmountFromChange(e.target.value)} placeholder="Amount From" onFocus={(e) => e.target.select()} />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 1, md: 1 }}>
            <Select
              value={toCurrency}
              searchValue={searchValueTo}
              onSearchChange={setSearchValueTo}
              onChange={(value) => {
                if (value) {
                  setToCurrency(value); // Set currency only if value is not null
                }
              }}
              onFocus={() => setSearchValueTo("")}
              data={currencies.map((currency) => ({
                value: currency.code,
                label: `${currency.code} - ${currency.name}`,
              }))}
              searchable
              allowDeselect={false}
            />
            <TextInput type="text" value={amountTo} onChange={(e) => handleAmountToChange(e.target.value)} placeholder="Amount To" onFocus={(e) => e.target.select()} />
          </SimpleGrid>
        </SimpleGrid>

        <Grid mt="md" justify="center" align="center">
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <Select value={time} onChange={handleTimeChange} data={["Per Hours", "Per Month", "Per Year"]} />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section>
                <Button fullWidth onClick={toggleCollapseFromOpen} rightSection={isCollapseFromOpen ? <IconSquareRoundedChevronUp /> : <IconSquareRoundedChevronDown />}>
                  {fromCurrency} {formatNumber(parseFloat(String(amountFrom).replace(/,/g, "")))} {time} mean ...
                </Button>
              </Card.Section>
              <Card.Section>
                <Collapse in={isCollapseFromOpen} transitionDuration={500} transitionTimingFunction="linear">
                  <Box p="md" style={{ overflow: "auto" }}>
                    <Table withRowBorders={false}>
                      <Table.Tbody>
                        <Table.Tr key={"Per Hours"}>
                          <Table.Td>{toCurrency}</Table.Td>
                          <Table.Td>{fromHoursTable}</Table.Td>
                          <Table.Td>{"Per Hours"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr key={"Per Month"}>
                          <Table.Td>{toCurrency}</Table.Td>
                          <Table.Td>{fromMonthTable}</Table.Td>
                          <Table.Td>{"Per Month"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr key={"Per Year"}>
                          <Table.Td>{toCurrency}</Table.Td>
                          <Table.Td>{fromYearTable}</Table.Td>
                          <Table.Td>{"Per Year"}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Box>
                </Collapse>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section>
                <Button fullWidth onClick={toggleCollapseToOpen} rightSection={isCollapseToOpen ? <IconSquareRoundedChevronUp /> : <IconSquareRoundedChevronDown />}>
                  {toCurrency} {formatNumber(parseFloat(String(amountTo).replace(/,/g, "")))} {time} mean ...
                </Button>
              </Card.Section>
              <Card.Section>
                <Collapse in={isCollapseToOpen} transitionDuration={500} transitionTimingFunction="linear">
                  <Box p="md" style={{ overflow: "auto" }}>
                    <Table withRowBorders={false}>
                      <Table.Tbody>
                        <Table.Tr key={"Per Hours"}>
                          <Table.Td>{fromCurrency}</Table.Td>
                          <Table.Td>{toHoursTable}</Table.Td>
                          <Table.Td>{"Per Hours"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr key={"Per Month"}>
                          <Table.Td>{fromCurrency}</Table.Td>
                          <Table.Td>{toMonthTable}</Table.Td>
                          <Table.Td>{"Per Month"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr key={"Per Year"}>
                          <Table.Td>{fromCurrency}</Table.Td>
                          <Table.Td>{toYearTable}</Table.Td>
                          <Table.Td>{"Per Year"}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Box>
                </Collapse>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12 }}>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section>
                <Button fullWidth onClick={toggleAdvanceSettingOpen} rightSection={isAdvanceSettingOpen ? <IconSquareRoundedChevronUp /> : <IconSquareRoundedChevronDown />}>
                  Advance Setting
                </Button>
              </Card.Section>
              <Card.Section>
                <Collapse in={isAdvanceSettingOpen} transitionDuration={500} transitionTimingFunction="linear">
                  <Box p="md" style={{ overflow: "auto" }}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                      <SimpleGrid cols={{ base: 1, sm: 1, md: 1 }}>
                        <TextInput type="number" value={calcHours} onChange={(e) => setCalcHours(Number(e.target.value))} placeholder="Hours" onFocus={(e) => e.target.select()} leftSection={"1 Day = "} leftSectionWidth={80} rightSection={"Hours"} rightSectionWidth={80} />
                        <TextInput type="number" value={calcDay} onChange={(e) => setCalcDay(Number(e.target.value))} placeholder="Days" onFocus={(e) => e.target.select()} leftSection={"1 Week = "} leftSectionWidth={80} rightSection={"Days"} rightSectionWidth={80} />
                      </SimpleGrid>
                      <SimpleGrid cols={{ base: 1, sm: 1, md: 1 }}>
                        <TextInput type="number" value={calcWeek} onChange={(e) => setCalcWeek(Number(e.target.value))} placeholder="Weeks" onFocus={(e) => e.target.select()} leftSection={"1 Month = "} leftSectionWidth={80} rightSection={"Weeks"} rightSectionWidth={80} />
                        <TextInput type="number" value={calcMonth} onChange={(e) => setCalcMonth(Number(e.target.value))} placeholder="Months" onFocus={(e) => e.target.select()} leftSection={"1 Year = "} leftSectionWidth={80} rightSection={"Months"} rightSectionWidth={80} />
                      </SimpleGrid>
                    </SimpleGrid>
                  </Box>
                </Collapse>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
        
        <Box mt="xl">
          <Title order={3}>Why Use a Currency Converter?</Title>
          <Text>
            Currency converters are essential tools for anyone dealing with international transactions, travel, or investments. They help you understand the value of your money in different currencies, ensuring you make informed financial decisions.
          </Text>
          <Text mt="md">
            Whether you&apos;re planning a trip abroad, purchasing goods from another country, or managing investments in foreign markets, knowing the current exchange rates can save you money and help you avoid unfavorable conversions.
          </Text>

          <Title order={3} mt="xl">Tips for Using the Currency Converter</Title>
          <Text>
            1. **Check for Real-Time Rates**: Always ensure that you are using a converter that provides real-time exchange rates to get the most accurate conversions.
          </Text>
          <Text>
            2. **Understand Fees**: Be aware that banks and currency exchange services may charge fees or offer different rates than those shown in online converters.
          </Text>
          <Text>
            3. **Stay Updated**: Currency values fluctuate frequently due to market conditions. Regularly check rates if you are planning a transaction.
          </Text>

          <Title order={3} mt="xl">Common Currency Pairs</Title>
          <Text>
            Some of the most commonly traded currency pairs include:
          </Text>
          <Text>
            - **EUR/USD**: Euro to US Dollar
          </Text>
          <Text>
            - **USD/JPY**: US Dollar to Japanese Yen
          </Text>
          <Text>
            - **GBP/USD**: British Pound to US Dollar
          </Text>
          <Text>
            - **AUD/USD**: Australian Dollar to US Dollar
          </Text>
          <Text>
            - **USD/CAD**: US Dollar to Canadian Dollar
          </Text>

          <Title order={3} mt="xl">The Impact of Exchange Rates</Title>
          <Text>
            Exchange rates can significantly impact international trade, investments, and travel. A strong currency can make imports cheaper, while a weak currency can boost exports. Understanding these dynamics can help you make better financial decisions.
          </Text>

          <Title order={3} mt="xl">Frequently Asked Questions (FAQ)</Title>
          <Text>
            <strong>1. How often do exchange rates change?</strong>
            <br />
            Exchange rates can change multiple times a day due to market fluctuations, economic indicators, and geopolitical events.
          </Text>
          <Text>
            <strong>2. What factors influence exchange rates?</strong>
            <br />
            Factors include interest rates, inflation, political stability, and economic performance of countries.
          </Text>
          <Text>
            <strong>3. Can I lock in an exchange rate?</strong>
            <br />
            Some financial institutions offer options to lock in exchange rates for future transactions, which can be beneficial in volatile markets.
          </Text>

          <Title order={3} mt="xl">Explore More Financial Tools</Title>
          <Text>
            In addition to currency conversion, consider exploring other financial tools such as budget calculators, investment trackers, and savings planners to enhance your financial literacy and planning.
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};

export default CurrencyConverter;
