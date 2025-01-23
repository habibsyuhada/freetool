import { useState, useEffect } from 'react';  
import { Container, Title, TextInput, Select, Text, Alert } from '@mantine/core';  
import axios from 'axios';  

const CurrencyConverter = () => {  
  const [currencies, setCurrencies] = useState([]);  
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(0); 
  const [fromCurrency, setFromCurrency] = useState('USD');  
  const [toCurrency, setToCurrency] = useState('EUR');  
  const [error, setError] = useState('');  
  const [searchValueFrom, setSearchValueFrom] = useState('');
  const [searchValueTo, setSearchValueTo] = useState('');

  const fetchMasterCurrency = async () => {  
    try {  
      const response = await axios.get('/api/master_currency');  
      console.log(response.data);  
      setCurrencies(response.data);  
    } catch (err) {  
      setError('Failed to fetch currency data');  
    }  
  };  

  useEffect(() => {  
    fetchMasterCurrency();  
  }, []);  

  const handleConversion = async () => {  
    try {  
      const response = await axios.get(`/api/currency?base_code=${fromCurrency}`);  
      const conversionData = response.data;  
 
      if (!conversionData || !conversionData.conversion_rates) {  
        const externalResponse = await axios.get(`https://v6.exchangerate-api.com/v6/fe7dfda1cacbc547ab0385d6/latest/${fromCurrency}`);  
        const externalData = externalResponse.data;  

        await axios.post('/api/currency', {  
          base_code: externalData.base_code,  
          conversion_rates: JSON.stringify(externalData.conversion_rates),
          update_date: externalData.time_last_update_utc,
        });  

        const rate = externalData.conversion_rates[toCurrency];  

        if (rate) {  
          setAmountTo(amountFrom * rate);
        } else {  
          setError('Conversion rate not found');  
        }  
      } else {  
        const rates = JSON.parse(conversionData.conversion_rates);  
        const rate = rates[toCurrency];  

        if (rate) {  
          setAmountTo(amountFrom * rate);
        } else {  
          setError('Conversion rate not found');  
        }  
      }  
    } catch (err) {  
      setError('Conversion failed');  
    }  
  };  

  const handleAmountFromChange = (value) => {  
    const numericValue = parseFloat(value);
    setAmountFrom(numericValue || 0);
    handleConversion();
  };  

  const handleAmountToChange = (value) => {  
    const numericValue = parseFloat(value);
    setAmountTo(numericValue || 0);
    const rate = (amountFrom && amountTo) ? amountTo / amountFrom : 0;
    setAmountFrom(numericValue / rate);
  };  

  useEffect(() => {  
    if (fromCurrency && toCurrency) {  
      handleConversion();  
    }  
  }, [fromCurrency, toCurrency]);

  return (  
    <Container>  
      <Title order={2} align="center" mt="md">Currency Converter</Title>  
      {error && <Alert title="Error!" color="red">{error}</Alert>}  
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>  
        <TextInput  
          type="number"  
          value={amountFrom}  
          onChange={(e) => handleAmountFromChange(e.target.value)}  
          style={{ width: '100px', marginRight: '10px' }}  
          placeholder="Amount From"  
        />  
        <Select  
          value={fromCurrency}  
          searchValue={searchValueFrom}  
          onSearchChange={setSearchValueFrom}  
          onChange={setFromCurrency}  
          onFocus={() => setSearchValueFrom('')}  
          data={currencies.map(currency => ({ value: currency.code, label: `${currency.code} - ${currency.name}` }))}  
          style={{ width: '300px', marginRight: '10px' }}  
          searchable  
        />  
        <Text>to</Text>  
        <TextInput  
          type="number"  
          value={amountTo}  
          onChange={(e) => handleAmountToChange(e.target.value)}  
          style={{ width: '100px', marginLeft: '10px' }}  
          placeholder="Amount To"  
        />  
        <Select  
          value={toCurrency}  
          searchValue={searchValueTo}  
          onSearchChange={setSearchValueTo}  
          onChange={setToCurrency}  
          onFocus={() => setSearchValueTo('')}  
          data={currencies.map(currency => ({ value: currency.code, label: `${currency.code} - ${currency.name}` }))}  
          style={{ width: '300px', marginLeft: '10px' }}  
          searchable  
        />  
      </div>  
      <Text align="center" size="lg" mt="md">  
        {amountFrom.toFixed(2)} {fromCurrency} = {amountTo.toFixed(2)} {toCurrency}  
      </Text>  
    </Container>  
  );  
};  

export default CurrencyConverter;