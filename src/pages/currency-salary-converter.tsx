import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Container, Title, TextInput, Select, Table, Alert, SimpleGrid, Grid, Card, Button, Collapse, Box, Text, Flex } from "@mantine/core";
import axios from "axios";
import Layout from "@/components/layout/Layout";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [rateConversion, setRateConversion] = useState([]);
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [error, setError] = useState("");
  const [searchValueFrom, setSearchValueFrom] = useState("");
  const [searchValueTo, setSearchValueTo] = useState("");
  const [time, setTime] = useState("Per Hours");
  const [isCollapseFromOpen, { toggle: toggleCollapseFromOpen }] = useDisclosure(false);
  const [isCollapseToOpen, { toggle: toggleCollapseToOpen }] = useDisclosure(false);
  const [isAdvanceSettingOpen, { toggle: toggleAdvanceSettingOpen }] = useDisclosure(false);
  const [fromHoursTable, setFromHoursTable] = useState(0);
  const [fromMonthTable, setFromMonthTable] = useState(0);
  const [fromYearTable, setFromYearTable] = useState(0);
  const [toHoursTable, setToHoursTable] = useState(0);
  const [toMonthTable, setToMonthTable] = useState(0);
  const [toYearTable, setToYearTable] = useState(0);
  const [calcHours, setCalcHours] = useState(8);
  const [calcDay, setCalcDay] = useState(5);
  const [calcWeek, setCalcWeek] = useState(4);
  const [calcMonth, setCalcMonth] = useState(12);

  const fetchMasterCurrency = async () => {
    try {
      const response = await axios.get("/api/master_currency");
      setCurrencies(response.data);
    } catch (err) {
      setError("Failed to fetch currency data master");
    }
  };

  const fetchRateConversion = async () => {
    try {
      const response = await axios.get(`/api/currency?base_code=${fromCurrency}`);
      const conversionData = response.data;
      conversionData.update_date = conversionData.update_date.split("T")[0];

      let isUpToDate = true;
      let isInsert = true;
      if (!conversionData || !conversionData.conversion_rates) {
        isUpToDate = false;
      } else if (conversionData.update_date != new Date().toISOString().split("T")[0]) {
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
      console.log(err);
      setError("Failed to fetch currency data rate");
    }
  };

  useEffect(() => {
    fetchMasterCurrency();
    fetchRateConversion();
  }, []);

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
  };

  useEffect(() => {
    fetchRateConversion();
  }, [fromCurrency]);

  const handleAmountFromChange = (value: string) => {
    let numericValue = value;
    numericValue = numericValue.replace(/,/g, "");
    numericValue = parseFloat(numericValue);
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    setAmountFrom(value);

    const rate = rateConversion[toCurrency];
    const conversion = numericValue * rate;
    setAmountTo(formatNumber(parseFloat(conversion)));
    handleTableInformation(numericValue, "from");
  };

  const handleAmountToChange = (value: string) => {
    let numericValue = value;
    numericValue = numericValue.replace(/,/g, "");
    numericValue = parseFloat(numericValue);
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    setAmountTo(value);

    const rate = rateConversion[toCurrency];
    const conversion = numericValue / rate;
    setAmountFrom(formatNumber(parseFloat(conversion)));
    handleTableInformation(numericValue, "to");
  };

  const handleTimeChange = (value) => {
    console.log(value);
    setTime(value);
    handleTableInformation(value, "time");
  };

  const handleTableInformation = (value, category) => {
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
      sourceHours = sourceValue * rate;
      if (sourceCategory == "to") {
        sourceHours = sourceValue / rate;
      }
      sourceMonth = sourceHours * calcHours * calcDay * calcWeek;
      sourceYear = sourceMonth * calcMonth;
    } else if (sourceTime == "Per Month") {
      sourceMonth = sourceValue * rate;
      if (sourceCategory == "to") {
        sourceMonth = sourceValue / rate;
      }
      sourceHours = sourceMonth / calcHours / calcDay / calcWeek;
      sourceYear = sourceMonth * calcMonth;
    } else if (sourceTime == "Per Year") {
      sourceYear = sourceValue * rate;
      if (sourceCategory == "to") {
        sourceYear = sourceValue / rate;
      }
      sourceMonth = sourceYear / calcMonth;
      sourceHours = sourceMonth / calcHours / calcDay / calcWeek;
    }

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
  };

  const formatNumber = (num) => {
    const res = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    return res;
  };

  useEffect(() => {
    handleTableInformation(amountFrom, "from");
  }, [calcHours, calcDay, calcWeek, calcMonth]);

  return (
    <Layout 
      title="Currency & Salary Converter"
      description="Convert currencies and calculate salaries with real-time exchange rates. Free online currency converter tool."
      keywords="currency converter, salary calculator, exchange rates, money converter"
    >
      <Container>
        <Title order={2} align="center" mt="md" mb="md">
          Currency & Salary
          <br />
          Converter
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
              onChange={handleFromCurrencyChange}
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
              onChange={setToCurrency}
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
                <Button fullWidth onClick={toggleCollapseFromOpen}>
                  {fromCurrency} {formatNumber(String(amountFrom).replace(/,/g, ""))} {time} mean ...
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
                <Button fullWidth onClick={toggleCollapseToOpen}>
                  {toCurrency} {formatNumber(String(amountTo).replace(/,/g, ""))} {time} mean ...
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
                <Button fullWidth onClick={toggleAdvanceSettingOpen}>
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
      </Container>
    </Layout>
  );
};

export default CurrencyConverter;
