--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: leaderboard; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.leaderboard (
    id integer NOT NULL,
    player_id integer,
    score integer NOT NULL,
    rank integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.leaderboard OWNER TO tpl522_13;

--
-- Name: leaderboard_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.leaderboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leaderboard_id_seq OWNER TO tpl522_13;

--
-- Name: leaderboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.leaderboard_id_seq OWNED BY public.leaderboard.id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.players (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    score integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.players OWNER TO tpl522_13;

--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.players_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.players_id_seq OWNER TO tpl522_13;

--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.players_id_seq OWNED BY public.players.id;


--
-- Name: leaderboard id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.leaderboard ALTER COLUMN id SET DEFAULT nextval('public.leaderboard_id_seq'::regclass);


--
-- Name: players id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.players ALTER COLUMN id SET DEFAULT nextval('public.players_id_seq'::regclass);


--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.leaderboard (id, player_id, score, rank, created_at) FROM stdin;
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.players (id, name, score, created_at) FROM stdin;
2	Alice	400	2025-03-28 13:41:55.331656
3	Brun Maria	500	2025-03-28 13:41:55.331656
4	Michael	400	2025-03-28 13:41:55.331656
6		2	2025-03-28 13:41:55.331656
7		2	2025-03-28 13:41:55.331656
8		1	2025-03-28 13:41:55.331656
9		1	2025-03-28 13:41:55.331656
10	Test Player	0	2025-03-28 13:41:55.331656
11	Brad Pitt	0	2025-03-28 13:45:45.340903
1	John	100	2025-03-28 13:41:55.331656
12	Aya	0	2025-03-30 22:38:35.262891
15		0	2025-03-30 22:44:20.881276
18	Sam 	0	2025-03-30 22:45:43.132889
21		0	2025-03-30 22:54:19.000878
24	Aya	0	2025-03-30 22:55:23.835709
\.


--
-- Name: leaderboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.leaderboard_id_seq', 1, false);


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.players_id_seq', 26, true);


--
-- Name: leaderboard leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_pkey PRIMARY KEY (id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: idx_score; Type: INDEX; Schema: public; Owner: tpl522_13
--

CREATE INDEX idx_score ON public.players USING btree (score DESC);


--
-- Name: leaderboard leaderboard_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.leaderboard
    ADD CONSTRAINT leaderboard_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

