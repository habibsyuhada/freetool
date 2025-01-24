--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22
-- Dumped by pg_dump version 15.3

-- Started on 2025-01-24 11:07:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: habib.syuhada
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO "habib.syuhada";

--
-- TOC entry 2828 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: habib.syuhada
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 207480)
-- Name: currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currency (
    base_code character varying NOT NULL,
    conversion_rates text,
    update_date timestamp without time zone
);


ALTER TABLE public.currency OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 207490)
-- Name: master_currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_currency (
    code character varying NOT NULL,
    name character varying
);


ALTER TABLE public.master_currency OWNER TO postgres;

--
-- TOC entry 2821 (class 0 OID 207480)
-- Dependencies: 202
-- Data for Name: currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.currency (base_code, conversion_rates, update_date) FROM stdin;
USD	{"USD":1,"AED":3.6725,"AFN":74.8495,"ALL":94.3381,"AMD":400.4585,"ANG":1.79,"AOA":920.4596,"ARS":1047.25,"AUD":1.5938,"AWG":1.79,"AZN":1.7003,"BAM":1.8776,"BBD":2,"BDT":121.9039,"BGN":1.877,"BHD":0.376,"BIF":2942.5849,"BMD":1,"BND":1.3544,"BOB":6.9214,"BRL":6.0148,"BSD":1,"BTN":86.5152,"BWP":13.8706,"BYN":3.3016,"BZD":2,"CAD":1.4374,"CDF":2844.6742,"CHF":0.9062,"CLP":1003.7929,"CNY":7.2763,"COP":4321.0967,"CRC":503.2931,"CUP":24,"CVE":105.8518,"CZK":24.126,"DJF":177.721,"DKK":7.1644,"DOP":61.3112,"DZD":135.1475,"EGP":50.3177,"ERN":15,"ETB":126.9046,"EUR":0.9601,"FJD":2.3138,"FKP":0.8113,"FOK":7.1603,"GBP":0.8114,"GEL":2.8573,"GGP":0.8113,"GHS":15.2268,"GIP":0.8113,"GMD":72.4936,"GNF":8626.1521,"GTQ":7.7291,"GYD":209.1084,"HKD":7.7879,"HNL":25.45,"HRK":7.2329,"HTG":130.564,"HUF":394.4953,"IDR":16257.6594,"ILS":3.5426,"IMP":0.8113,"INR":86.5113,"IQD":1310.4504,"IRR":41997.633,"ISK":140.2383,"JEP":0.8113,"JMD":156.9236,"JOD":0.709,"JPY":156.2337,"KES":129.3072,"KGS":87.4252,"KHR":4041.3542,"KID":1.5935,"KMF":472.2773,"KRW":1434.5826,"KWD":0.3084,"KYD":0.8333,"KZT":520.6376,"LAK":21843.3946,"LBP":89500,"LKR":298.2286,"LRD":196.4443,"LSL":18.4952,"LYD":4.9231,"MAD":9.9914,"MDL":18.6647,"MGA":4663.3085,"MKD":59.206,"MMK":2098.8516,"MNT":3420.3218,"MOP":8.0215,"MRU":39.801,"MUR":46.3869,"MVR":15.4563,"MWK":1738.9569,"MXN":20.5122,"MYR":4.4372,"MZN":63.9177,"NAD":18.4952,"NGN":1554.1937,"NIO":36.7861,"NOK":11.2752,"NPR":138.4243,"NZD":1.7655,"OMR":0.3845,"PAB":1,"PEN":3.7288,"PGK":4.071,"PHP":58.5207,"PKR":278.6626,"PLN":4.0588,"PYG":7898.9722,"QAR":3.64,"RON":4.7708,"RSD":112.356,"RUB":98.9403,"RWF":1396.5842,"SAR":3.75,"SBD":8.5166,"SCR":14.544,"SDG":544.0524,"SEK":11.0061,"SGD":1.3546,"SHP":0.8113,"SLE":22.7429,"SLL":22742.8571,"SOS":571.6078,"SRD":35.1473,"SSP":4058.4807,"STN":23.5194,"SYP":12965.2237,"SZL":18.4952,"THB":33.8679,"TJS":10.9207,"TMT":3.4985,"TND":3.1887,"TOP":2.4014,"TRY":35.6612,"TTD":6.7847,"TVD":1.5935,"TWD":32.7078,"TZS":2520.752,"UAH":42.0416,"UGX":3679.7812,"UYU":43.7539,"UZS":12982.0709,"VES":55.7611,"VND":25100.5422,"VUV":119.1704,"WST":2.8239,"XAF":629.7031,"XCD":2.7,"XDR":0.7645,"XOF":629.7031,"XPF":114.5559,"YER":248.8828,"ZAR":18.4977,"ZMW":27.9704,"ZWL":26.2716}	2025-01-23 12:00:23
IDR	{"IDR":1,"AED":0.0002259,"AFN":0.004599,"ALL":0.005824,"AMD":0.02474,"ANG":0.00011011,"AOA":0.05672,"ARS":0.06442,"AUD":0.00009803,"AWG":0.00011011,"AZN":0.00010484,"BAM":0.00011535,"BBD":0.00012302,"BDT":0.007494,"BGN":0.00011537,"BHD":0.00002313,"BIF":0.1827,"BMD":0.00006151,"BND":0.00008328,"BOB":0.0004266,"BRL":0.00036812,"BSD":0.00006151,"BTN":0.005324,"BWP":0.00085675,"BYN":0.0002018,"BZD":0.00012302,"CAD":0.00008828,"CDF":0.1759,"CHF":0.00005571,"CLP":0.06176,"CNY":0.00044747,"COP":0.2668,"CRC":0.03106,"CUP":0.001476,"CVE":0.006503,"CZK":0.001485,"DJF":0.01093,"DKK":0.00044011,"DOP":0.003779,"DZD":0.008334,"EGP":0.003094,"ERN":0.00092267,"ETB":0.007884,"EUR":0.00005901,"FJD":0.00014263,"FKP":0.0000498,"FOK":0.00043982,"GBP":0.00004982,"GEL":0.00017579,"GGP":0.0000498,"GHS":0.00092764,"GIP":0.0000498,"GMD":0.004468,"GNF":0.5278,"GTQ":0.0004766,"GYD":0.01289,"HKD":0.00047915,"HNL":0.001569,"HRK":0.00044435,"HTG":0.008047,"HUF":0.02427,"ILS":0.00021789,"IMP":0.0000498,"INR":0.005323,"IQD":0.08085,"IRR":2.7143,"ISK":0.008633,"JEP":0.0000498,"JMD":0.009701,"JOD":0.00004361,"JPY":0.009598,"KES":0.007975,"KGS":0.005392,"KHR":0.25,"KID":0.000098,"KMF":0.02901,"KRW":0.08817,"KWD":0.000019,"KYD":0.00005126,"KZT":0.03208,"LAK":1.3504,"LBP":5.5053,"LKR":0.01833,"LRD":0.01209,"LSL":0.001137,"LYD":0.00030348,"MAD":0.00061668,"MDL":0.001153,"MGA":0.2879,"MKD":0.003642,"MMK":0.1784,"MNT":0.21,"MOP":0.00049356,"MRU":0.00246,"MUR":0.002885,"MVR":0.00095297,"MWK":0.1067,"MXN":0.001264,"MYR":0.00027299,"MZN":0.003939,"NAD":0.001137,"NGN":0.09589,"NIO":0.002268,"NOK":0.00069349,"NPR":0.008518,"NZD":0.00010856,"OMR":0.00002365,"PAB":0.00006151,"PEN":0.00022847,"PGK":0.00025099,"PHP":0.003601,"PKR":0.01713,"PLN":0.0002497,"PYG":0.4865,"QAR":0.0002239,"RON":0.00029407,"RSD":0.006925,"RUB":0.006084,"RWF":0.0852,"SAR":0.00023067,"SBD":0.00052066,"SCR":0.00091766,"SDG":0.02754,"SEK":0.00067631,"SGD":0.00008331,"SHP":0.0000498,"SLE":0.001399,"SLL":1.3989,"SOS":0.03525,"SRD":0.002167,"SSP":0.2496,"STN":0.001445,"SYP":0.7968,"SZL":0.001137,"THB":0.002083,"TJS":0.00067173,"TMT":0.00021519,"TND":0.00019633,"TOP":0.0001501,"TRY":0.002193,"TTD":0.00041909,"TVD":0.000098,"TWD":0.002008,"TZS":0.1557,"UAH":0.002588,"UGX":0.2262,"USD":0.00006151,"UYU":0.002698,"UZS":0.7917,"VES":0.00343,"VND":1.5471,"VUV":0.00755,"WST":0.00017433,"XAF":0.03869,"XCD":0.00016608,"XDR":0.00004679,"XOF":0.03869,"XPF":0.007038,"YER":0.01535,"ZAR":0.001137,"ZMW":0.001729,"ZWL":0.001616}	2025-01-23 00:00:01
SGD	{"SGD":1,"AED":2.7114,"AFN":55.0941,"ALL":69.7669,"AMD":294.9019,"ANG":1.3216,"AOA":687.1858,"ARS":773.1969,"AUD":1.1763,"AWG":1.3216,"AZN":1.2553,"BAM":1.3856,"BBD":1.4766,"BDT":89.9675,"BGN":1.3855,"BHD":0.2776,"BIF":2187.7308,"BMD":0.7383,"BND":1,"BOB":5.1104,"BRL":4.4449,"BSD":0.7383,"BTN":63.8402,"BWP":10.2544,"BYN":2.4625,"BZD":1.4766,"CAD":1.0606,"CDF":2106.7037,"CHF":0.669,"CLP":741.8745,"CNY":5.3714,"COP":3196.0532,"CRC":372.0543,"CUP":17.7195,"CVE":78.1194,"CZK":17.816,"DJF":131.2135,"DKK":5.2865,"DOP":45.2672,"DZD":99.8326,"EGP":37.1274,"ERN":11.0747,"ETB":94.4083,"EUR":0.7085,"FJD":1.7095,"FKP":0.5988,"FOK":5.285,"GBP":0.5989,"GEL":2.1104,"GGP":0.5988,"GHS":11.3159,"GIP":0.5988,"GMD":53.543,"GNF":6358.0934,"GTQ":5.7093,"GYD":154.3582,"HKD":5.7485,"HNL":18.7941,"HRK":5.338,"HTG":96.3676,"HUF":291.2134,"IDR":12003.7543,"ILS":2.6149,"IMP":0.5988,"INR":63.8288,"IQD":968.1872,"IRR":31434.6353,"ISK":103.5708,"JEP":0.5988,"JMD":116.2088,"JOD":0.5235,"JPY":115.3345,"KES":95.4872,"KGS":64.5819,"KHR":2993.7368,"KID":1.1761,"KMF":348.5442,"KRW":1058.8204,"KWD":0.2274,"KYD":0.6153,"KZT":384.6462,"LAK":16176.2359,"LBP":66078.8964,"LKR":219.75,"LRD":144.8868,"LSL":13.6525,"LYD":3.6341,"MAD":7.3785,"MDL":13.7954,"MGA":3447.3333,"MKD":43.7072,"MMK":2105.6384,"MNT":2520.5613,"MOP":5.923,"MRU":29.4568,"MUR":34.3522,"MVR":11.4159,"MWK":1286.8776,"MXN":15.1596,"MYR":3.277,"MZN":47.2418,"NAD":13.6525,"NGN":1148.8082,"NIO":27.1668,"NOK":8.3224,"NPR":102.1443,"NZD":1.3026,"OMR":0.2839,"PAB":0.7383,"PEN":2.7493,"PGK":3.0067,"PHP":43.1921,"PKR":205.5418,"PLN":2.9958,"PYG":5827.9246,"QAR":2.6875,"RON":3.5232,"RSD":82.9855,"RUB":73.0778,"RWF":1045.4746,"SAR":2.7687,"SBD":6.2651,"SCR":10.8491,"SDG":329.7449,"SEK":8.12,"SHP":0.5988,"SLE":16.7893,"SLL":16791.3186,"SOS":422.1224,"SRD":25.9464,"SSP":3007.3799,"STN":17.3575,"SYP":9544.7893,"SZL":13.6525,"THB":25.004,"TJS":8.0688,"TMT":2.5819,"TND":2.3527,"TOP":1.7643,"TRY":26.3207,"TTD":5.0224,"TVD":1.1761,"TWD":24.1586,"TZS":1869.3567,"UAH":31.09,"UGX":2715.7112,"USD":0.7382,"UYU":32.3218,"UZS":9562.9846,"VES":41.1641,"VND":18509.2516,"VUV":87.7512,"WST":2.0641,"XAF":464.7256,"XCD":1.9934,"XDR":0.5654,"XOF":464.7256,"XPF":84.5431,"YER":183.894,"ZAR":13.6529,"ZMW":20.7051,"ZWL":19.3943}	2025-01-23 00:00:01
\.


--
-- TOC entry 2822 (class 0 OID 207490)
-- Dependencies: 203
-- Data for Name: master_currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_currency (code, name) FROM stdin;
USD	United States Dollar
AED	United Arab Emirates Dirham
AFN	Afghan Afghani
ALL	Albanian Lek
AMD	Armenian Dram
ANG	Netherlands Antillean Guilder
AOA	Angolan Kwanza
ARS	Argentine Peso
AUD	Australian Dollar
AWG	Aruban Florin
AZN	Azerbaijani Manat
BAM	Bosnia and Herzegovina Convertible Mark
BBD	Barbadian Dollar
BDT	Bangladeshi Taka
BGN	Bulgarian Lev
BHD	Bahraini Dinar
BIF	Burundian Franc
BMD	Bermudian Dollar
BND	Brunei Dollar
BOB	Bolivian Boliviano
BRL	Brazilian Real
BSD	Bahamian Dollar
BTN	Bhutanese Ngultrum
BWP	Botswana Pula
BYN	Belarusian Ruble
BZD	Belize Dollar
CAD	Canadian Dollar
CDF	Congolese Franc
CHF	Swiss Franc
CLP	Chilean Peso
CNY	Chinese Yuan
COP	Colombian Peso
CRC	Costa Rican Colón
CUP	Cuban Peso
CVE	Cape Verdean Escudo
CZK	Czech Koruna
DJF	Djiboutian Franc
DKK	Danish Krone
DOP	Dominican Peso
DZD	Algerian Dinar
EGP	Egyptian Pound
ERN	Eritrean Nakfa
ETB	Ethiopian Birr
EUR	Euro
FJD	Fijian Dollar
FKP	Falkland Islands Pound
FOK	Faroese Króna
GBP	British Pound Sterling
GEL	Georgian Lari
GGP	Guernsey Pound
GHS	Ghanaian Cedi
GIP	Gibraltar Pound
GMD	Gambian Dalasi
GNF	Guinean Franc
GTQ	Guatemalan Quetzal
GYD	Guyanese Dollar
HKD	Hong Kong Dollar
HNL	Honduran Lempira
HRK	Croatian Kuna
HTG	Haitian Gourde
HUF	Hungarian Forint
IDR	Indonesian Rupiah
ILS	Israeli New Shekel
IMP	Isle of Man Pound
INR	Indian Rupee
IQD	Iraqi Dinar
IRR	Iranian Rial
ISK	Icelandic Króna
JEP	Jersey Pound
JMD	Jamaican Dollar
JOD	Jordanian Dinar
JPY	Japanese Yen
KES	Kenyan Shilling
KGS	Kyrgyzstani Som
KHR	Cambodian Riel
KID	Kiribati Dollar
KMF	Comorian Franc
KRW	South Korean Won
KWD	Kuwaiti Dinar
KYD	Cayman Islands Dollar
KZT	Kazakhstani Tenge
LAK	Laotian Kip
LBP	Lebanese Pound
LKR	Sri Lankan Rupee
LRD	Liberian Dollar
LSL	Lesotho Loti
LYD	Libyan Dinar
MAD	Moroccan Dirham
MDL	Moldovan Leu
MGA	Malagasy Ariary
MKD	Macedonian Denar
MMK	Myanmar Kyat
MNT	Mongolian Tögrög
MOP	Macanese Pataca
MRU	Mauritanian Ouguiya
MUR	Mauritian Rupee
MVR	Maldivian Rufiyaa
MWK	Malawian Kwacha
MXN	Mexican Peso
MYR	Malaysian Ringgit
MZN	Mozambican Metical
NAD	Namibian Dollar
NGN	Nigerian Naira
NIO	Nicaraguan Córdoba
NOK	Norwegian Krone
NPR	Nepalese Rupee
NZD	New Zealand Dollar
OMR	Omani Rial
PAB	Panamanian Balboa
PEN	Peruvian Sol
PGK	Papua New Guinean Kina
PHP	Philippine Peso
PKR	Pakistani Rupee
PLN	Polish Zloty
PYG	Paraguayan Guarani
QAR	Qatari Rial
RON	Romanian Leu
RSD	Serbian Dinar
RUB	Russian Ruble
RWF	Rwandan Franc
SAR	Saudi Riyal
SBD	Solomon Islands Dollar
SCR	Seychellois Rupee
SDG	Sudanese Pound
SEK	Swedish Krona
SGD	Singapore Dollar
SHP	Saint Helena Pound
SLE	Sierra Leonean Leone
SLL	Sierra Leonean Leone
SOS	Somali Shilling
SRD	Surinamese Dollar
SSP	South Sudanese Pound
STN	São Tomé and Príncipe Dobra
SYP	Syrian Pound
SZL	Swazi Lilangeni
THB	Thai Baht
TJS	Tajikistani Somoni
TMT	Turkmenistani Manat
TND	Tunisian Dinar
TOP	Tongan Paʻanga
TRY	Turkish Lira
TTD	Trinidad and Tobago Dollar
TVD	Tuvaluan Dollar
TWD	New Taiwan Dollar
TZS	Tanzanian Shilling
UAH	Ukrainian Hryvnia
UGX	Ugandan Shilling
UYU	Uruguayan Peso
UZS	Uzbekistani Som
VES	Venezuelan Bolívar
VND	Vietnamese Dong
VUV	Vanuatu Vatu
WST	Samoan Tala
XAF	Central African CFA Franc
XCD	East Caribbean Dollar
XDR	Special Drawing Rights
XOF	West African CFA Franc
XPF	CFP Franc
YER	Yemeni Rial
ZAR	South African Rand
ZMW	Zambian Kwacha
ZWL	Zimbabwean Dollar
\.


--
-- TOC entry 2692 (class 2606 OID 207487)
-- Name: currency currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (base_code);


--
-- TOC entry 2694 (class 2606 OID 207497)
-- Name: master_currency master_currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_currency
    ADD CONSTRAINT master_currency_pkey PRIMARY KEY (code);


--
-- TOC entry 2829 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: habib.syuhada
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2025-01-24 11:07:09

--
-- PostgreSQL database dump complete
--

