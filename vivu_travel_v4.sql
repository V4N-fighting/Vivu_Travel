--
-- PostgreSQL database dump
--

\restrict ke7gFMWg4UEuAp0JFwRdoY0uJ7o5l3OhIuq8LHgVmD6fhP2TCbMo7b4y7XS1oSt

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-24 16:17:55

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16448)
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    icon text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16447)
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO postgres;

--
-- TOC entry 5283 (class 0 OID 0)
-- Dependencies: 227
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- TOC entry 256 (class 1259 OID 16727)
-- Name: banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    text_content text,
    first_image character varying(255) DEFAULT ''::character varying,
    second_image character varying(255),
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    page_location character varying(50) DEFAULT 'home'::character varying
);


ALTER TABLE public.banners OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 16726)
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.banners_id_seq OWNER TO postgres;

--
-- TOC entry 5284 (class 0 OID 0)
-- Dependencies: 255
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- TOC entry 254 (class 1259 OID 16709)
-- Name: blog_tag_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_tag_map (
    blog_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.blog_tag_map OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 16699)
-- Name: blog_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_tags (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.blog_tags OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 16698)
-- Name: blog_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_tags_id_seq OWNER TO postgres;

--
-- TOC entry 5285 (class 0 OID 0)
-- Dependencies: 252
-- Name: blog_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_tags_id_seq OWNED BY public.blog_tags.id;


--
-- TOC entry 251 (class 1259 OID 16676)
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    content text NOT NULL,
    thumbnail character varying(255),
    author_id integer,
    status character varying(50) DEFAULT 'draft'::character varying,
    published_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 16675)
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blogs_id_seq OWNER TO postgres;

--
-- TOC entry 5286 (class 0 OID 0)
-- Dependencies: 250
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- TOC entry 243 (class 1259 OID 16583)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    booking_code character varying(50) NOT NULL,
    user_id integer,
    tour_id integer,
    departure_date_id integer,
    adult_count integer NOT NULL,
    child_count integer NOT NULL,
    total_price numeric(12,2) NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    note text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16582)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 5287 (class 0 OID 0)
-- Dependencies: 242
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 260 (class 1259 OID 16757)
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    phone character varying(20),
    subject character varying(255),
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 16756)
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO postgres;

--
-- TOC entry 5288 (class 0 OID 0)
-- Dependencies: 259
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    image character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16409)
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_id_seq OWNER TO postgres;

--
-- TOC entry 5289 (class 0 OID 0)
-- Dependencies: 221
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- TOC entry 224 (class 1259 OID 16422)
-- Name: country_languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country_languages (
    id integer NOT NULL,
    country_id integer,
    language character varying(50) NOT NULL
);


ALTER TABLE public.country_languages OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16421)
-- Name: country_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_languages_id_seq OWNER TO postgres;

--
-- TOC entry 5290 (class 0 OID 0)
-- Dependencies: 223
-- Name: country_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_languages_id_seq OWNED BY public.country_languages.id;


--
-- TOC entry 258 (class 1259 OID 16741)
-- Name: coupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupons (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    discount_type character varying(20) NOT NULL,
    discount_value numeric(12,2) NOT NULL,
    valid_from date,
    valid_to date,
    usage_limit integer,
    used_count integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    min_order_value numeric(12,2) DEFAULT 0,
    max_discount_amount numeric(12,2)
);


ALTER TABLE public.coupons OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 16740)
-- Name: coupons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coupons_id_seq OWNER TO postgres;

--
-- TOC entry 5291 (class 0 OID 0)
-- Dependencies: 257
-- Name: coupons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;


--
-- TOC entry 239 (class 1259 OID 16550)
-- Name: itinerary_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itinerary_details (
    id integer NOT NULL,
    itinerary_id integer,
    activity_description text NOT NULL,
    sort_order integer DEFAULT 0
);


ALTER TABLE public.itinerary_details OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16549)
-- Name: itinerary_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.itinerary_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.itinerary_details_id_seq OWNER TO postgres;

--
-- TOC entry 5292 (class 0 OID 0)
-- Dependencies: 238
-- Name: itinerary_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.itinerary_details_id_seq OWNED BY public.itinerary_details.id;


--
-- TOC entry 247 (class 1259 OID 16633)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    booking_id integer,
    amount numeric(12,2) NOT NULL,
    method character varying(50),
    status character varying(50) DEFAULT 'pending'::character varying,
    transaction_id character varying(150),
    paid_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 16632)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 5293 (class 0 OID 0)
-- Dependencies: 246
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 249 (class 1259 OID 16649)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    tour_id integer,
    booking_id integer,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 16648)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5294 (class 0 OID 0)
-- Dependencies: 248
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 233 (class 1259 OID 16501)
-- Name: tour_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_activities (
    tour_id integer NOT NULL,
    activity_id integer NOT NULL
);


ALTER TABLE public.tour_activities OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16488)
-- Name: tour_departure_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_departure_dates (
    id integer NOT NULL,
    tour_id integer,
    departure_date date NOT NULL,
    available_slots integer
);


ALTER TABLE public.tour_departure_dates OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16487)
-- Name: tour_departure_dates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_departure_dates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_departure_dates_id_seq OWNER TO postgres;

--
-- TOC entry 5295 (class 0 OID 0)
-- Dependencies: 231
-- Name: tour_departure_dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_departure_dates_id_seq OWNED BY public.tour_departure_dates.id;


--
-- TOC entry 241 (class 1259 OID 16567)
-- Name: tour_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_images (
    id integer NOT NULL,
    tour_id integer,
    image_url character varying(255) NOT NULL,
    is_primary boolean DEFAULT false,
    sort_order integer DEFAULT 0
);


ALTER TABLE public.tour_images OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16566)
-- Name: tour_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_images_id_seq OWNER TO postgres;

--
-- TOC entry 5296 (class 0 OID 0)
-- Dependencies: 240
-- Name: tour_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_images_id_seq OWNED BY public.tour_images.id;


--
-- TOC entry 237 (class 1259 OID 16533)
-- Name: tour_itineraries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_itineraries (
    id integer NOT NULL,
    tour_id integer,
    day_number integer NOT NULL,
    title character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.tour_itineraries OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16532)
-- Name: tour_itineraries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_itineraries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_itineraries_id_seq OWNER TO postgres;

--
-- TOC entry 5297 (class 0 OID 0)
-- Dependencies: 236
-- Name: tour_itineraries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_itineraries_id_seq OWNED BY public.tour_itineraries.id;


--
-- TOC entry 235 (class 1259 OID 16519)
-- Name: tour_transportations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_transportations (
    id integer NOT NULL,
    tour_id integer,
    transportation character varying(100) NOT NULL
);


ALTER TABLE public.tour_transportations OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16518)
-- Name: tour_transportations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_transportations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_transportations_id_seq OWNER TO postgres;

--
-- TOC entry 5298 (class 0 OID 0)
-- Dependencies: 234
-- Name: tour_transportations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_transportations_id_seq OWNED BY public.tour_transportations.id;


--
-- TOC entry 226 (class 1259 OID 16436)
-- Name: tour_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image character varying(255)
);


ALTER TABLE public.tour_types OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16435)
-- Name: tour_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_types_id_seq OWNER TO postgres;

--
-- TOC entry 5299 (class 0 OID 0)
-- Dependencies: 225
-- Name: tour_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_types_id_seq OWNED BY public.tour_types.id;


--
-- TOC entry 230 (class 1259 OID 16460)
-- Name: tours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tours (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    image character varying(255),
    country_id integer,
    tour_type_id integer,
    duration character varying(50) NOT NULL,
    max_people integer NOT NULL,
    price_adult numeric(12,2) NOT NULL,
    price_child numeric(12,2) NOT NULL,
    adventure_level character varying(50),
    altitude character varying(50),
    hotel_star integer,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    booking_deadline_days integer DEFAULT 0,
    meeting_point text
);


ALTER TABLE public.tours OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16459)
-- Name: tours_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tours_id_seq OWNER TO postgres;

--
-- TOC entry 5300 (class 0 OID 0)
-- Dependencies: 229
-- Name: tours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;


--
-- TOC entry 245 (class 1259 OID 16617)
-- Name: travelers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.travelers (
    id integer NOT NULL,
    booking_id integer,
    full_name character varying(150) NOT NULL,
    email character varying(150),
    phone character varying(20),
    country character varying(100),
    address text,
    type character varying(20)
);


ALTER TABLE public.travelers OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16616)
-- Name: travelers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.travelers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.travelers_id_seq OWNER TO postgres;

--
-- TOC entry 5301 (class 0 OID 0)
-- Dependencies: 244
-- Name: travelers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.travelers_id_seq OWNED BY public.travelers.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20),
    avatar character varying(255),
    address text,
    role character varying(20) DEFAULT 'customer'::character varying,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5302 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4969 (class 2604 OID 16451)
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- TOC entry 4999 (class 2604 OID 16730)
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- TOC entry 4998 (class 2604 OID 16702)
-- Name: blog_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tags ALTER COLUMN id SET DEFAULT nextval('public.blog_tags_id_seq'::regclass);


--
-- TOC entry 4994 (class 2604 OID 16679)
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- TOC entry 4984 (class 2604 OID 16586)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- TOC entry 5010 (class 2604 OID 16760)
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- TOC entry 4964 (class 2604 OID 16413)
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- TOC entry 4966 (class 2604 OID 16425)
-- Name: country_languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_languages ALTER COLUMN id SET DEFAULT nextval('public.country_languages_id_seq'::regclass);


--
-- TOC entry 5005 (class 2604 OID 16744)
-- Name: coupons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 16553)
-- Name: itinerary_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_details ALTER COLUMN id SET DEFAULT nextval('public.itinerary_details_id_seq'::regclass);


--
-- TOC entry 4989 (class 2604 OID 16636)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 16652)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4976 (class 2604 OID 16491)
-- Name: tour_departure_dates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_departure_dates ALTER COLUMN id SET DEFAULT nextval('public.tour_departure_dates_id_seq'::regclass);


--
-- TOC entry 4981 (class 2604 OID 16570)
-- Name: tour_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_images ALTER COLUMN id SET DEFAULT nextval('public.tour_images_id_seq'::regclass);


--
-- TOC entry 4978 (class 2604 OID 16536)
-- Name: tour_itineraries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_itineraries ALTER COLUMN id SET DEFAULT nextval('public.tour_itineraries_id_seq'::regclass);


--
-- TOC entry 4977 (class 2604 OID 16522)
-- Name: tour_transportations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_transportations ALTER COLUMN id SET DEFAULT nextval('public.tour_transportations_id_seq'::regclass);


--
-- TOC entry 4967 (class 2604 OID 16439)
-- Name: tour_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_types ALTER COLUMN id SET DEFAULT nextval('public.tour_types_id_seq'::regclass);


--
-- TOC entry 4971 (class 2604 OID 16463)
-- Name: tours id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);


--
-- TOC entry 4988 (class 2604 OID 16620)
-- Name: travelers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers ALTER COLUMN id SET DEFAULT nextval('public.travelers_id_seq'::regclass);


--
-- TOC entry 4959 (class 2604 OID 16393)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5245 (class 0 OID 16448)
-- Dependencies: 228
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, name, description, icon, created_at) FROM stdin;
1	Kayaking	Chèo thuyền kayak	https://res.cloudinary.com/gofjords-com/images/w_2560,h_1707,c_scale/f_auto,q_auto:eco/v1683890721/Experiences/XXLofoten/Kayaking/Evening%20kayaking%202020/Evening-kayaking-Svolvaer-Lofoten-XXlofoten-1/Evening-kayaking-Svolvaer-Lofoten-XXlofoten-1.jpg?_i=AA	2026-04-10 20:31:44.995072
2	Cruising	Du thuyền ngắm cảnh	https://hips.hearstapps.com/hmg-prod/images/windstar-cruises-veranda-luxury-cruise-lines-65499aacdd690.jpg?crop=0.753xw:1.00xh;0.247xw,0&resize=640:*	2026-04-10 20:31:44.995072
10	Cave Exploration	Khám phá hang động	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ZVHLhpQsL6rHdbAmBRAlJlnHcsyiC67rmQ&s	2026-04-10 20:31:44.995072
9	Snorkeling	Lặn ngắm san hô	https://scubaverse.com/wp-content/uploads/2023/11/neom-4AADxUsnufQ-unsplash-scaled-1.jpg	2026-04-10 20:31:44.995072
8	Bike Tour	Đạp xe khám phá	https://image.kkday.com/v2/image/get/h_650%2Cc_fit/s1.kkday.com/product_145240/20230609070236_pb597/jpg	2026-04-10 20:31:44.995072
7	Boat Trip	Chuyến đi thuyền	https://joyridewatersports.com/wp-content/uploads/2025/08/joyride-direct-trip-002.jpg	2026-04-10 20:31:44.995072
3	Trekking	Đi bộ đường dài	https://vietchallenge.com/images/uploads/trekking2.jpg	2026-04-10 20:31:44.995072
6	Cultural Show	Biểu diễn văn hóa	https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/86/2020/02/19031427/H%E1%BB%93n-Vi%E1%BB%87t-Soul-of-Vietnam-at-Nguyen-Hien-Dinh-theatre-Danang-Da-Nang-festival-Pullman-Danang-Bi%E1%BB%83u-di%E1%BB%85n-ngh%E1%BB%87-thu%E1%BA%ADt-%E1%BB%9F-%C4%90%C3%A0-N%E1%BA%B5ng-Restaurant-near-me-Get-A-Chance-To-Discover-Cultural-shows-in-Danang-and-Hoian.jpg	2026-04-10 20:31:44.995072
5	Street Food Tour	Ẩm thực đường phố	https://vmcar.com.vn/wp-content/uploads/2024/03/hanoi-street-food-walking-tour-7.webp	2026-04-10 20:31:44.995072
4	Cooking Class	Học nấu ăn Việt Nam	https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/xho6vr7msewcbo9eb8rl.jpg	2026-04-10 20:31:44.995072
\.


--
-- TOC entry 5273 (class 0 OID 16727)
-- Dependencies: 256
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banners (id, text_content, first_image, second_image, is_active, sort_order, created_at, page_location) FROM stdin;
27	\N	\N	\N	t	0	2026-04-24 16:14:32.409074	home
28	\N	\N	\N	t	0	2026-04-24 16:14:45.949051	home
29	\N	\N	\N	t	0	2026-04-24 16:15:42.225341	home
30	\N	\N	\N	t	0	2026-04-24 16:16:56.091842	home
\.


--
-- TOC entry 5271 (class 0 OID 16709)
-- Dependencies: 254
-- Data for Name: blog_tag_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_tag_map (blog_id, tag_id) FROM stdin;
\.


--
-- TOC entry 5270 (class 0 OID 16699)
-- Dependencies: 253
-- Data for Name: blog_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_tags (id, name) FROM stdin;
\.


--
-- TOC entry 5268 (class 0 OID 16676)
-- Dependencies: 251
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (id, title, slug, content, thumbnail, author_id, status, published_at, created_at, updated_at) FROM stdin;
1	Test oais 	test-oais	<p><img src="data:image/jpeg;base64,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"></p>	Beach-&-Relaxation-5083.jpg	1	\N	2026-04-23 22:17:42.889	2026-04-23 22:17:42.896786	2026-04-24 11:52:24.309627
\.


--
-- TOC entry 5260 (class 0 OID 16583)
-- Dependencies: 243
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, booking_code, user_id, tour_id, departure_date_id, adult_count, child_count, total_price, status, note, created_at, updated_at) FROM stdin;
6	VV-350938	2	1	1	2	1	12500000.00	confirmed	Cần phòng hướng biển và thực đơn chay	2026-04-21 21:10:01.783215	2026-04-23 21:58:16.0881
5	VV-430581	1	1	1	1	0	5200000.00	confirmed		2026-04-18 21:05:17.102018	2026-04-23 21:58:17.786529
3	VV-402830	1	1	1	1	0	0.00	confirmed		2026-04-18 13:47:15.650972	2026-04-23 21:58:19.634288
4	VV-154994	1	2	1	0	1	5200000.00	confirmed		2026-04-18 19:40:36.107186	2026-04-23 21:58:20.886874
2	VV-956248	1	1	1	2	1	5000000.00	confirmed	Tôi muốn phòng hướng biển và suất ăn chay	2026-04-11 20:29:33.589104	2026-04-23 21:58:22.36158
7	VV-857171	2	1	1	2	1	8000000.00	cancelled	\N	2026-04-22 16:27:41.992565	2026-04-23 22:43:16.000144
1	VV-880137	1	1	1	2	1	5000000.00	confirmed	Tôi muốn phòng hướng biển và suất ăn chay	2026-04-11 19:28:32.698333	2026-04-24 11:42:44.428918
9	VV-962870	3	2	4	1	0	7200000.00	confirmed		2026-04-24 15:23:33.935825	2026-04-24 15:28:03.836383
8	VV-992075	3	2	4	1	0	7200000.00	confirmed		2026-04-24 15:01:38.982874	2026-04-24 15:28:16.979067
10	VV-654375	3	2	4	1	0	18000.00	confirmed		2026-04-24 15:55:05.258154	2026-04-24 15:55:05.258154
\.


--
-- TOC entry 5277 (class 0 OID 16757)
-- Dependencies: 260
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, name, email, phone, subject, message, is_read, created_at) FROM stdin;
3	Thinh Vo	thinhverchai@gmail.com	0346176591	Liên hệ từ khách hàng	ádasdaf	t	2026-04-24 13:18:28.79774
\.


--
-- TOC entry 5239 (class 0 OID 16410)
-- Dependencies: 222
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name, description, image, created_at) FROM stdin;
1	Vietnam	Đất nước hình chữ S với bờ biển dài, di sản văn hóa phong phú và thiên nhiên đa dạng.	https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png	2026-04-10 20:31:44.995072
\.


--
-- TOC entry 5241 (class 0 OID 16422)
-- Dependencies: 224
-- Data for Name: country_languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country_languages (id, country_id, language) FROM stdin;
1	1	Vietnamese
2	1	English
3	1	French
\.


--
-- TOC entry 5275 (class 0 OID 16741)
-- Dependencies: 258
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupons (id, code, discount_type, discount_value, valid_from, valid_to, usage_limit, used_count, is_active, created_at, min_order_value, max_discount_amount) FROM stdin;
1	HE2024	percentage	10.00	2026-04-22	\N	100	0	t	2026-04-22 16:25:21.129365	0.00	\N
2	GIAM20	percentage	20.00	2026-04-01	2026-12-31	50	1	f	2026-04-22 16:26:18.947797	0.00	\N
3	TEST	percentage	95.00	2026-04-24	2026-04-30	100	1	t	2026-04-24 15:40:33.695654	0.00	\N
\.


--
-- TOC entry 5256 (class 0 OID 16550)
-- Dependencies: 239
-- Data for Name: itinerary_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itinerary_details (id, itinerary_id, activity_description, sort_order) FROM stdin;
\.


--
-- TOC entry 5264 (class 0 OID 16633)
-- Dependencies: 247
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, booking_id, amount, method, status, transaction_id, paid_at, created_at) FROM stdin;
\.


--
-- TOC entry 5266 (class 0 OID 16649)
-- Dependencies: 249
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, tour_id, booking_id, rating, comment, created_at) FROM stdin;
1	\N	2	\N	5	háhjdasd	2026-04-24 14:12:24.761029
2	\N	2	\N	5	good	2026-04-24 14:18:33.326243
\.


--
-- TOC entry 5250 (class 0 OID 16501)
-- Dependencies: 233
-- Data for Name: tour_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_activities (tour_id, activity_id) FROM stdin;
1	1
1	2
1	7
2	3
2	8
3	7
3	9
4	3
4	8
5	5
5	6
6	6
6	4
7	6
8	6
8	7
9	10
9	3
10	6
10	5
11	7
11	5
12	9
12	1
13	6
14	9
14	1
15	3
15	8
16	1
16	2
16	6
17	3
17	7
17	8
18	4
18	5
19	1
19	3
19	7
20	1
20	9
\.


--
-- TOC entry 5249 (class 0 OID 16488)
-- Dependencies: 232
-- Data for Name: tour_departure_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_departure_dates (id, tour_id, departure_date, available_slots) FROM stdin;
2	1	2026-05-22	15
3	1	2026-06-01	20
5	2	2026-06-05	8
6	2	2026-06-12	12
7	3	2026-05-10	25
8	3	2026-05-18	28
9	3	2026-05-25	22
10	4	2026-05-25	9
11	4	2026-06-08	7
12	5	2026-05-12	20
13	5	2026-05-28	22
14	6	2026-05-08	12
15	6	2026-05-16	14
16	6	2026-05-24	11
17	7	2026-05-05	30
18	7	2026-05-12	32
19	7	2026-05-19	28
20	8	2026-05-14	18
21	8	2026-05-21	16
22	9	2026-05-18	10
23	9	2026-06-02	9
24	10	2026-05-09	25
25	10	2026-05-23	27
26	11	2026-05-11	22
27	11	2026-05-26	20
28	12	2026-06-10	15
29	12	2026-06-20	16
30	12	2026-07-01	14
31	13	2026-05-07	35
32	13	2026-05-15	38
33	14	2026-05-16	20
34	14	2026-05-30	18
35	15	2026-05-13	17
36	15	2026-05-27	19
37	16	2026-06-15	12
38	17	2026-06-01	20
39	18	2026-05-20	14
40	19	2026-05-28	11
41	20	2026-05-22	18
42	20	2026-06-05	16
1	1	2026-05-15	3
43	26	2026-04-25	10
44	26	2026-04-28	10
45	26	2026-04-25	10
46	19	2026-04-30	10
4	2	2026-05-20	7
\.


--
-- TOC entry 5258 (class 0 OID 16567)
-- Dependencies: 241
-- Data for Name: tour_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_images (id, tour_id, image_url, is_primary, sort_order) FROM stdin;
1	1	/uploads/tours/1099e21475d99ce10391080464ea3f127f.jpg	t	0
\.


--
-- TOC entry 5254 (class 0 OID 16533)
-- Dependencies: 237
-- Data for Name: tour_itineraries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_itineraries (id, tour_id, day_number, title, description) FROM stdin;
1	25	1	 video	video
\.


--
-- TOC entry 5252 (class 0 OID 16519)
-- Dependencies: 235
-- Data for Name: tour_transportations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_transportations (id, tour_id, transportation) FROM stdin;
1	1	Private Van
2	1	Cruise Ship
3	2	Private Van
4	2	Motorbike
5	3	Private Van
6	3	Boat
7	4	Private Van
8	4	Motorbike
9	5	Walking
10	6	Private Van
11	7	Private Van
12	7	Cable Car
13	8	Private Van
14	8	Boat
15	9	Private Van
16	10	Private Van
17	11	Private Van
18	11	Boat
19	12	Private Van
20	12	Speedboat
21	13	Private Van
22	14	Private Van
23	14	Boat
24	15	Private Van
25	16	Private Van
26	16	Cruise
27	17	Private Van
28	18	Private Van
29	19	Private Van
30	19	Cruise Ship
31	20	Private Van
\.


--
-- TOC entry 5243 (class 0 OID 16436)
-- Dependencies: 226
-- Data for Name: tour_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_types (id, name, description, created_at, image) FROM stdin;
1	Adventure	Tour mạo hiểm, trekking, khám phá thiên nhiên	2026-04-10 20:31:44.995072	Adventure-3075.jpg
3	Beach & Relaxation	Tour nghỉ dưỡng biển, resort cao cấp	2026-04-10 20:31:44.995072	Beach-&-Relaxation-4763.jpg
2	Cultural	Tour văn hóa, di sản, lịch sử	2026-04-10 20:31:44.995072	Cultural-7587.jpg
4	Family	Tour phù hợp cho gia đình	2026-04-10 20:31:44.995072	Family-5974.png
5	Food & Culinary	Tour ẩm thực và trải nghiệm nấu ăn	2026-04-10 20:31:44.995072	Food-&-Culinary-5552.jpg
\.


--
-- TOC entry 5247 (class 0 OID 16460)
-- Dependencies: 230
-- Data for Name: tours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tours (id, name, description, image, country_id, tour_type_id, duration, max_people, price_adult, price_child, adventure_level, altitude, hotel_star, is_active, created_at, updated_at, booking_deadline_days, meeting_point) FROM stdin;
2	Sapa Trekking & Rice Terraces 4 Days	Trekking ruộng bậc thang, thăm bản làng dân tộc H Mông, Dao và ngắm Fansipan.	sapa-trekking.jpg	1	1	4 days	12	7200000.00	5200000.00	High	High	3	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
3	Ninh Binh - Tam Coc & Trang An Boat Tour 1 Day	Hành trình thuyền qua sông ngòi, hang động và núi non karst - "Vịnh Hạ Long trên cạn".	ninh-binh.jpg	1	2	1 day	30	1800000.00	1200000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
4	Ha Giang Extreme Loop 3 Days	Đèo Mã Pí Lèng, cột cờ Lũng Cú, ruộng bậc thang và văn hóa dân tộc.	hagiang-loop.jpg	1	1	3 days	10	6500000.00	4500000.00	High	Very High	3	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
5	Hanoi Street Food & Old Quarter Walking Tour 1 Day	Khám phá ẩm thực đường phố Hà Nội và kiến trúc Pháp thuộc.	hanoi-food-tour.jpg	1	5	1 day	25	1200000.00	900000.00	Low	Low	0	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
6	Hoi An Ancient Town & My Son Sanctuary 3 Days	Thành phố đèn lồng Hội An và di sản thánh địa Mỹ Sơn của người Chăm.	hoi-an-myson.jpg	1	2	3 days	15	5500000.00	4000000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
7	Da Nang - Ba Na Hills & Golden Bridge 1 Day	Cầu Vàng, Fantasy Park, vườn thú và cáp treo dài nhất thế giới.	bana-hills.jpg	1	3	1 day	35	2800000.00	2000000.00	Low	Medium	5	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
8	Hue Imperial City & Perfume River Cruise 2 Days	Cố đô Huế với Đại Nội, lăng tẩm và sông Hương.	hue-imperial.jpg	1	2	2 days	20	4200000.00	3000000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
9	Phong Nha Cave Exploration 2 Days	Khám phá hang động lớn nhất thế giới - Sơn Đoòng (light version) và Paradise Cave.	phong-nha.jpg	1	1	2 days	12	5800000.00	4200000.00	Medium	Medium	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
10	Da Nang - Hoi An Lantern & Night Tour 1 Day	Thành phố hiện đại Đà Nẵng kết hợp Hội An về đêm.	danang-hoian.jpg	1	3	1 day	30	1500000.00	1100000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
11	Mekong Delta Floating Market & Homestay 2 Days	Chợ nổi Cái Răng, làng nghề và trải nghiệm cuộc sống sông nước.	mekong-delta.jpg	1	3	2 days	25	3900000.00	2800000.00	Low	Low	3	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
12	Phu Quoc Island Beach & Snorkeling 4 Days	Nghỉ dưỡng đảo ngọc Phú Quốc với bãi biển dài và lặn ngắm san hô.	phu-quoc-beach.jpg	1	3	4 days	18	9200000.00	6800000.00	Low	Sea level	5	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
13	Ho Chi Minh City & Cu Chi Tunnels 1 Day	Thành phố Sài Gòn sôi động và hệ thống địa đạo Củ Chi.	hcmc-cuchi.jpg	1	2	1 day	40	1600000.00	1100000.00	Low	Low	0	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
14	Nha Trang Beach & Island Hopping 3 Days	Biển Nha Trang, lặn biển và thăm các đảo Vinpearl.	nha-trang-island.jpg	1	3	3 days	22	6800000.00	4800000.00	Medium	Sea level	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
15	Dalat Highland & Waterfall Tour 2 Days	Thành phố sương mù Đà Lạt với thác nước, vườn hoa và trang trại dâu.	dalat-highland.jpg	1	3	2 days	20	4500000.00	3200000.00	Low	High	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
16	North to South Vietnam Highlights 10 Days	Hà Nội - Hạ Long - Huế - Hội An - Đà Nẵng - Sài Gòn - Mekong.	vietnam-highlights.jpg	1	2	10 days	15	18500000.00	13500000.00	Medium	Mixed	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
17	Vietnam Family Adventure 7 Days	Phù hợp gia đình: Hà Nội - Ninh Bình - Hạ Long - Hội An.	family-vietnam.jpg	1	4	7 days	25	12800000.00	9200000.00	Low	Mixed	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
18	Culinary Journey Vietnam 5 Days	Học nấu ăn tại Hà Nội, Hội An và Sài Gòn kết hợp ẩm thực đường phố.	culinary-vietnam.jpg	1	5	5 days	16	8500000.00	6200000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
19	Ha Long Bay - Lan Ha Bay Kayaking 3 Days	Khám phá vịnh Lan Hạ ít đông đúc hơn Hạ Long với kayak và trekking đảo.	lan-ha-bay.jpg	1	1	3 days	14	6800000.00	4900000.00	Medium	Sea level	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
20	Mui Ne Beach & Sand Dunes 2 Days	Đồi cát đỏ - trắng Mũi Né và các hoạt động thể thao biển.	mui-ne-dunes.jpg	1	3	2 days	20	3800000.00	2700000.00	Low	Low	4	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
1	Halong Bay Deluxe Cruise 2 Days 1 Night	Khám phá kỳ quan thế giới Vịnh Hạ Long bằng du thuyền 5 sao, kayak, hang động và bữa tối hải sản.	halong-cruise.jpg	1	1	2 days	20	3700000.00	3800000.00	Medium	Sea level	5	t	2026-04-10 20:33:10.631083	2026-04-10 20:33:10.631083	0	\N
26	Hành trình di sản Miền Trung	Khám phá Huế - Đà Nẵng - Hội An 4 ngày 3 đêm...	\N	1	1	4 days	25	4500000.00	2800000.00	Easy	\N	4	f	2026-04-22 14:52:52.156269	2026-04-22 14:52:52.156269	2	Văn Phòng Đà Nẵng
25	Hành trình di sản Miền Trung	Khám phá Huế - Đà Nẵng - Hội An 4 ngày 3 đêm...	\N	1	1	4 days	25	4500000.00	2800000.00	Easy	\N	4	f	2026-04-22 14:49:44.08177	2026-04-22 14:49:44.08177	0	Trường Đại Học Giao Thông Vận Tải TPHCM Cơ sở 3
24	Tour Đà Lạt 3 Ngày 2 Đêm - Săn Mây	Trải nghiệm không gian thơ mộng tại Đà Lạt với lịch trình hấp dẫn...	\N	1	1	3 days	15	3500000.00	2100000.00	Easy	\N	4	f	2026-04-21 21:14:46.959545	2026-04-21 21:14:46.959545	0	Thành Phố Hồ Chí Minh
\.


--
-- TOC entry 5262 (class 0 OID 16617)
-- Dependencies: 245
-- Data for Name: travelers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.travelers (id, booking_id, full_name, email, phone, country, address, type) FROM stdin;
1	1	Nguyen Van A	vana@gmail.com	0901234567	Vietnam	TP.HCM	adult
2	1	Nguyen Van C	\N	\N	\N	\N	child
3	2	Nguyen Van A	vana@gmail.com	0901234567	Vietnam	TP.HCM	adult
4	2	Nguyen Van C	\N	\N	\N	\N	child
5	3	ThinhVerChai	thinhverchai@gmail.com	0123123123	Việt Nam	sadqw	adult
6	4	Thinh			Viet Nam	HCM City	child
7	5	Võ Tấn THịnh	thinh522004@gmail.com	01231233123	VN	HCM City	adult
8	6	Nguyễn Văn A	vana@gmail.com	0912345678	Việt Nam	Hà Nội	adult
9	6	Trần Thị B	thib@gmail.com	0987654321	Việt Nam	Hà Nội	adult
10	6	Nguyễn Văn C			Việt Nam	Hà Nội	child
11	7	Nguyễn Văn A	\N	\N	\N	\N	adult
12	7	Nguyễn Văn B	\N	\N	\N	\N	child
13	8	12	thinh522004@gmail.com	0123123123	Viet Nam	VN	adult
14	9	ád	thinh522004@gmail.com	fdsasd	ầ	ádf	adult
15	10	ádasf	âf	à	à	ávf	adult
\.


--
-- TOC entry 5237 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, phone, avatar, address, role, is_active, created_at, updated_at) FROM stdin;
1	Admin	Vivu	admin@vivutravel.com	$2a$10$e665jotuosZ35UImzll49.tlfrUXVTnXmQI15.G79LD0INd48OnDe	\N	\N	\N	admin	t	2026-04-10 20:09:34.228272	2026-04-10 20:09:34.228272
2	Nguyễn	Văn A	test@gmail.com	$2a$10$d9Y21oul7vVP6pCi0Ay5tu4k0dLPj4dXF1ZIj8UPYHx0WGV5FYcUa	0912345678	\N	\N	customer	t	2026-04-21 21:08:43.312923	2026-04-24 11:40:53.072703
3	Thinh	Vo	thinh522004@gmail.com	$2a$10$ZJtGYuzZ88jpd3ULwO09QuJShrDnd2hCO/PX4TExdnN2n8iJilGjK	\N	\N	\N	customer	t	2026-04-24 12:10:59.12576	2026-04-24 12:10:59.12576
\.


--
-- TOC entry 5303 (class 0 OID 0)
-- Dependencies: 227
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 10, true);


--
-- TOC entry 5304 (class 0 OID 0)
-- Dependencies: 255
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banners_id_seq', 30, true);


--
-- TOC entry 5305 (class 0 OID 0)
-- Dependencies: 252
-- Name: blog_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_tags_id_seq', 1, false);


--
-- TOC entry 5306 (class 0 OID 0)
-- Dependencies: 250
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blogs_id_seq', 1, true);


--
-- TOC entry 5307 (class 0 OID 0)
-- Dependencies: 242
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 10, true);


--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 259
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 3, true);


--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 221
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, true);


--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 223
-- Name: country_languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_languages_id_seq', 3, true);


--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 257
-- Name: coupons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coupons_id_seq', 3, true);


--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 238
-- Name: itinerary_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.itinerary_details_id_seq', 1, false);


--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 246
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 248
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 2, true);


--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 231
-- Name: tour_departure_dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_departure_dates_id_seq', 46, true);


--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 240
-- Name: tour_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_images_id_seq', 1, true);


--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 236
-- Name: tour_itineraries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_itineraries_id_seq', 1, true);


--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 234
-- Name: tour_transportations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_transportations_id_seq', 31, true);


--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 225
-- Name: tour_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_types_id_seq', 5, true);


--
-- TOC entry 5320 (class 0 OID 0)
-- Dependencies: 229
-- Name: tours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tours_id_seq', 26, true);


--
-- TOC entry 5321 (class 0 OID 0)
-- Dependencies: 244
-- Name: travelers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.travelers_id_seq', 15, true);


--
-- TOC entry 5322 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 5025 (class 2606 OID 16458)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 5061 (class 2606 OID 16739)
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- TOC entry 5059 (class 2606 OID 16715)
-- Name: blog_tag_map blog_tag_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tag_map
    ADD CONSTRAINT blog_tag_map_pkey PRIMARY KEY (blog_id, tag_id);


--
-- TOC entry 5055 (class 2606 OID 16708)
-- Name: blog_tags blog_tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_name_key UNIQUE (name);


--
-- TOC entry 5057 (class 2606 OID 16706)
-- Name: blog_tags blog_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 5051 (class 2606 OID 16690)
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- TOC entry 5053 (class 2606 OID 16692)
-- Name: blogs blogs_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_slug_key UNIQUE (slug);


--
-- TOC entry 5041 (class 2606 OID 16600)
-- Name: bookings bookings_booking_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_booking_code_key UNIQUE (booking_code);


--
-- TOC entry 5043 (class 2606 OID 16598)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 5067 (class 2606 OID 16770)
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- TOC entry 5019 (class 2606 OID 16420)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 5021 (class 2606 OID 16429)
-- Name: country_languages country_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_languages
    ADD CONSTRAINT country_languages_pkey PRIMARY KEY (id);


--
-- TOC entry 5063 (class 2606 OID 16755)
-- Name: coupons coupons_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);


--
-- TOC entry 5065 (class 2606 OID 16753)
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);


--
-- TOC entry 5037 (class 2606 OID 16560)
-- Name: itinerary_details itinerary_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_details
    ADD CONSTRAINT itinerary_details_pkey PRIMARY KEY (id);


--
-- TOC entry 5047 (class 2606 OID 16642)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 5049 (class 2606 OID 16659)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 5031 (class 2606 OID 16507)
-- Name: tour_activities tour_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_activities
    ADD CONSTRAINT tour_activities_pkey PRIMARY KEY (tour_id, activity_id);


--
-- TOC entry 5029 (class 2606 OID 16495)
-- Name: tour_departure_dates tour_departure_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_departure_dates
    ADD CONSTRAINT tour_departure_dates_pkey PRIMARY KEY (id);


--
-- TOC entry 5039 (class 2606 OID 16576)
-- Name: tour_images tour_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_images
    ADD CONSTRAINT tour_images_pkey PRIMARY KEY (id);


--
-- TOC entry 5035 (class 2606 OID 16543)
-- Name: tour_itineraries tour_itineraries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_itineraries
    ADD CONSTRAINT tour_itineraries_pkey PRIMARY KEY (id);


--
-- TOC entry 5033 (class 2606 OID 16526)
-- Name: tour_transportations tour_transportations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_transportations
    ADD CONSTRAINT tour_transportations_pkey PRIMARY KEY (id);


--
-- TOC entry 5023 (class 2606 OID 16446)
-- Name: tour_types tour_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_types
    ADD CONSTRAINT tour_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5027 (class 2606 OID 16476)
-- Name: tours tours_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);


--
-- TOC entry 5045 (class 2606 OID 16626)
-- Name: travelers travelers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers
    ADD CONSTRAINT travelers_pkey PRIMARY KEY (id);


--
-- TOC entry 5015 (class 2606 OID 16408)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5017 (class 2606 OID 16406)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5087 (class 2606 OID 16716)
-- Name: blog_tag_map blog_tag_map_blog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tag_map
    ADD CONSTRAINT blog_tag_map_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(id) ON DELETE CASCADE;


--
-- TOC entry 5088 (class 2606 OID 16721)
-- Name: blog_tag_map blog_tag_map_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tag_map
    ADD CONSTRAINT blog_tag_map_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.blog_tags(id) ON DELETE CASCADE;


--
-- TOC entry 5086 (class 2606 OID 16693)
-- Name: blogs blogs_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 5078 (class 2606 OID 16611)
-- Name: bookings bookings_departure_date_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_departure_date_id_fkey FOREIGN KEY (departure_date_id) REFERENCES public.tour_departure_dates(id) ON DELETE SET NULL;


--
-- TOC entry 5079 (class 2606 OID 16606)
-- Name: bookings bookings_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE SET NULL;


--
-- TOC entry 5080 (class 2606 OID 16601)
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 5068 (class 2606 OID 16430)
-- Name: country_languages country_languages_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country_languages
    ADD CONSTRAINT country_languages_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- TOC entry 5076 (class 2606 OID 16561)
-- Name: itinerary_details itinerary_details_itinerary_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_details
    ADD CONSTRAINT itinerary_details_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.tour_itineraries(id) ON DELETE CASCADE;


--
-- TOC entry 5082 (class 2606 OID 16643)
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;


--
-- TOC entry 5083 (class 2606 OID 16670)
-- Name: reviews reviews_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE SET NULL;


--
-- TOC entry 5084 (class 2606 OID 16665)
-- Name: reviews reviews_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5085 (class 2606 OID 16660)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 5072 (class 2606 OID 16513)
-- Name: tour_activities tour_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_activities
    ADD CONSTRAINT tour_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE CASCADE;


--
-- TOC entry 5073 (class 2606 OID 16508)
-- Name: tour_activities tour_activities_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_activities
    ADD CONSTRAINT tour_activities_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5071 (class 2606 OID 16496)
-- Name: tour_departure_dates tour_departure_dates_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_departure_dates
    ADD CONSTRAINT tour_departure_dates_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5077 (class 2606 OID 16577)
-- Name: tour_images tour_images_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_images
    ADD CONSTRAINT tour_images_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5075 (class 2606 OID 16544)
-- Name: tour_itineraries tour_itineraries_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_itineraries
    ADD CONSTRAINT tour_itineraries_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5074 (class 2606 OID 16527)
-- Name: tour_transportations tour_transportations_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_transportations
    ADD CONSTRAINT tour_transportations_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 5069 (class 2606 OID 16477)
-- Name: tours tours_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE SET NULL;


--
-- TOC entry 5070 (class 2606 OID 16482)
-- Name: tours tours_tour_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_tour_type_id_fkey FOREIGN KEY (tour_type_id) REFERENCES public.tour_types(id) ON DELETE SET NULL;


--
-- TOC entry 5081 (class 2606 OID 16627)
-- Name: travelers travelers_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers
    ADD CONSTRAINT travelers_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;


-- Completed on 2026-04-24 16:17:56

--
-- PostgreSQL database dump complete
--

\unrestrict ke7gFMWg4UEuAp0JFwRdoY0uJ7o5l3OhIuq8LHgVmD6fhP2TCbMo7b4y7XS1oSt

