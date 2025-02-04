--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22
-- Dumped by pg_dump version 17.0

-- Started on 2025-02-04 16:33:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 248445)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 248455)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 256633)
-- Name: Habit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Habit" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Habit" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 256645)
-- Name: HabitRecord; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HabitRecord" (
    id integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "habitId" integer NOT NULL
);


ALTER TABLE public."HabitRecord" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 256643)
-- Name: HabitRecord_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HabitRecord_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HabitRecord_id_seq" OWNER TO postgres;

--
-- TOC entry 2877 (class 0 OID 0)
-- Dependencies: 208
-- Name: HabitRecord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HabitRecord_id_seq" OWNED BY public."HabitRecord".id;


--
-- TOC entry 206 (class 1259 OID 256631)
-- Name: Habit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Habit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Habit_id_seq" OWNER TO postgres;

--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 206
-- Name: Habit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Habit_id_seq" OWNED BY public."Habit".id;


--
-- TOC entry 202 (class 1259 OID 248446)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 248463)
-- Name: currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currency (
    base_code character varying NOT NULL,
    conversion_rates text,
    update_date timestamp(6) without time zone
);


ALTER TABLE public.currency OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 248471)
-- Name: master_currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_currency (
    code character varying NOT NULL,
    name character varying
);


ALTER TABLE public.master_currency OWNER TO postgres;

--
-- TOC entry 2715 (class 2604 OID 256636)
-- Name: Habit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Habit" ALTER COLUMN id SET DEFAULT nextval('public."Habit_id_seq"'::regclass);


--
-- TOC entry 2717 (class 2604 OID 256648)
-- Name: HabitRecord id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HabitRecord" ALTER COLUMN id SET DEFAULT nextval('public."HabitRecord_id_seq"'::regclass);


--
-- TOC entry 2864 (class 0 OID 248455)
-- Dependencies: 203
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
cm6j2bqf80005irykv65ri3k1	cm6j2bqf60003iryk2pm2siqy	credentials	credentials	cm6j2bqf60003iryk2pm2siqy	\N	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 2868 (class 0 OID 256633)
-- Dependencies: 207
-- Data for Name: Habit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Habit" (id, name, description, "createdAt", "updatedAt", "userId") FROM stdin;
3	Work Out	\N	2025-02-04 13:31:10.79	2025-02-04 13:31:09.194	cm6j2bqf60003iryk2pm2siqy
4	Drink Water	Min 2ml	2025-02-04 13:31:10.793	2025-02-04 13:31:09.194	cm6j2bqf60003iryk2pm2siqy
18	Work Out	\N	2025-02-04 08:39:22.576	2025-02-04 08:39:22.576	cm6j2bqf60003iryk2pm2siqy
19	sdsds	dsds	2025-02-04 08:59:07.121	2025-02-04 08:59:07.121	cm6j2bqf60003iryk2pm2siqy
24	a	1%0A2%0A3'	2025-02-04 09:06:28.19	2025-02-04 09:06:28.19	cm6j2bqf60003iryk2pm2siqy
25	s	1%0A2%0A3'	2025-02-04 09:06:28.258	2025-02-04 09:06:28.258	cm6j2bqf60003iryk2pm2siqy
26	d	1%0A2%0A3'	2025-02-04 09:06:28.32	2025-02-04 09:06:28.32	cm6j2bqf60003iryk2pm2siqy
27	111	\N	2025-02-04 09:31:17.185	2025-02-04 09:31:17.185	cm6j2bqf60003iryk2pm2siqy
\.


--
-- TOC entry 2870 (class 0 OID 256645)
-- Dependencies: 209
-- Data for Name: HabitRecord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HabitRecord" (id, date, completed, "habitId") FROM stdin;
\.


--
-- TOC entry 2863 (class 0 OID 248446)
-- Dependencies: 202
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "emailVerified", image, "createdAt", "updatedAt") FROM stdin;
cm6j2bqf60003iryk2pm2siqy	Test	test@gmail.com	$2a$10$c1mUZS/yNgWOVHrlDuLCoeOkOXnSewOGuA1mlDh.Di9IHFGPA7jkK	\N	\N	2025-01-30 08:17:48.162	2025-01-30 08:17:48.162
\.


--
-- TOC entry 2865 (class 0 OID 248463)
-- Dependencies: 204
-- Data for Name: currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.currency (base_code, conversion_rates, update_date) FROM stdin;
\.


--
-- TOC entry 2866 (class 0 OID 248471)
-- Dependencies: 205
-- Data for Name: master_currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_currency (code, name) FROM stdin;
USD	United States Dollar
EUR	Euro
GBP	British Pound Sterling
JPY	Japanese Yen
AUD	Australian Dollar
CAD	Canadian Dollar
CHF	Swiss Franc
CNY	Chinese Yuan
HKD	Hong Kong Dollar
NZD	New Zealand Dollar
SEK	Swedish Krona
KRW	South Korean Won
SGD	Singapore Dollar
NOK	Norwegian Krone
MXN	Mexican Peso
INR	Indian Rupee
RUB	Russian Ruble
ZAR	South African Rand
TRY	Turkish Lira
BRL	Brazilian Real
TWD	New Taiwan Dollar
DKK	Danish Krone
PLN	Polish Złoty
THB	Thai Baht
IDR	Indonesian Rupiah
HUF	Hungarian Forint
CZK	Czech Koruna
ILS	Israeli New Shekel
CLP	Chilean Peso
PHP	Philippine Peso
AED	United Arab Emirates Dirham
COP	Colombian Peso
SAR	Saudi Riyal
MYR	Malaysian Ringgit
RON	Romanian Leu
\.


--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 208
-- Name: HabitRecord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HabitRecord_id_seq"', 1, false);


--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 206
-- Name: Habit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Habit_id_seq"', 27, true);


--
-- TOC entry 2723 (class 2606 OID 248462)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 2733 (class 2606 OID 256651)
-- Name: HabitRecord HabitRecord_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HabitRecord"
    ADD CONSTRAINT "HabitRecord_pkey" PRIMARY KEY (id);


--
-- TOC entry 2730 (class 2606 OID 256642)
-- Name: Habit Habit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Habit"
    ADD CONSTRAINT "Habit_pkey" PRIMARY KEY (id);


--
-- TOC entry 2721 (class 2606 OID 248454)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2726 (class 2606 OID 248470)
-- Name: currency currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (base_code);


--
-- TOC entry 2728 (class 2606 OID 248478)
-- Name: master_currency master_currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_currency
    ADD CONSTRAINT master_currency_pkey PRIMARY KEY (code);


--
-- TOC entry 2724 (class 1259 OID 248480)
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- TOC entry 2731 (class 1259 OID 256652)
-- Name: HabitRecord_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "HabitRecord_date_key" ON public."HabitRecord" USING btree (date);


--
-- TOC entry 2719 (class 1259 OID 248479)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 2734 (class 2606 OID 248481)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2736 (class 2606 OID 256658)
-- Name: HabitRecord HabitRecord_habitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HabitRecord"
    ADD CONSTRAINT "HabitRecord_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES public."Habit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2735 (class 2606 OID 256653)
-- Name: Habit Habit_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Habit"
    ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2876 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-02-04 16:33:52

--
-- PostgreSQL database dump complete
--

