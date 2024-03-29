PGDMP                     	    y           ACME    13.4    13.4 .    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33002    ACME    DATABASE     e   CREATE DATABASE "ACME" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "ACME";
                postgres    false            �            1259    33104    conjuntoprediccion    TABLE        CREATE TABLE public.conjuntoprediccion (
    id integer NOT NULL,
    nombre text NOT NULL,
    gramatica_pertenece integer
);
 &   DROP TABLE public.conjuntoprediccion;
       public         heap    postgres    false            �            1259    33102    conjuntoprediccion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conjuntoprediccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.conjuntoprediccion_id_seq;
       public          postgres    false    201            �           0    0    conjuntoprediccion_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.conjuntoprediccion_id_seq OWNED BY public.conjuntoprediccion.id;
          public          postgres    false    200            �            1259    33126 	   gramatica    TABLE     V   CREATE TABLE public.gramatica (
    id integer NOT NULL,
    archivo text NOT NULL
);
    DROP TABLE public.gramatica;
       public         heap    postgres    false            �            1259    33124    gramatica_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gramatica_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.gramatica_id_seq;
       public          postgres    false    203            �           0    0    gramatica_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.gramatica_id_seq OWNED BY public.gramatica.id;
          public          postgres    false    202            �            1259    33148    primeros    TABLE     u   CREATE TABLE public.primeros (
    id integer NOT NULL,
    nombre text NOT NULL,
    gramatica_pertenece integer
);
    DROP TABLE public.primeros;
       public         heap    postgres    false            �            1259    33146    primeros_id_seq    SEQUENCE     �   CREATE SEQUENCE public.primeros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.primeros_id_seq;
       public          postgres    false    205            �           0    0    primeros_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.primeros_id_seq OWNED BY public.primeros.id;
          public          postgres    false    204            �            1259    33170 
   produccion    TABLE     x   CREATE TABLE public.produccion (
    id integer NOT NULL,
    produccion text NOT NULL,
    variable_produce integer
);
    DROP TABLE public.produccion;
       public         heap    postgres    false            �            1259    33168    produccion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.produccion_id_seq;
       public          postgres    false    207            �           0    0    produccion_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.produccion_id_seq OWNED BY public.produccion.id;
          public          postgres    false    206            �            1259    33192 
   siguientes    TABLE     w   CREATE TABLE public.siguientes (
    id integer NOT NULL,
    nombre text NOT NULL,
    gramatica_pertenece integer
);
    DROP TABLE public.siguientes;
       public         heap    postgres    false            �            1259    33190    siguientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.siguientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.siguientes_id_seq;
       public          postgres    false    209            �           0    0    siguientes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.siguientes_id_seq OWNED BY public.siguientes.id;
          public          postgres    false    208            �            1259    33214    variable    TABLE     u   CREATE TABLE public.variable (
    id integer NOT NULL,
    nombre text NOT NULL,
    gramatica_pertenece integer
);
    DROP TABLE public.variable;
       public         heap    postgres    false            �            1259    33212    variable_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.variable_id_seq;
       public          postgres    false    211            �           0    0    variable_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.variable_id_seq OWNED BY public.variable.id;
          public          postgres    false    210            F           2604    33107    conjuntoprediccion id    DEFAULT     ~   ALTER TABLE ONLY public.conjuntoprediccion ALTER COLUMN id SET DEFAULT nextval('public.conjuntoprediccion_id_seq'::regclass);
 D   ALTER TABLE public.conjuntoprediccion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            G           2604    33129    gramatica id    DEFAULT     l   ALTER TABLE ONLY public.gramatica ALTER COLUMN id SET DEFAULT nextval('public.gramatica_id_seq'::regclass);
 ;   ALTER TABLE public.gramatica ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            H           2604    33151    primeros id    DEFAULT     j   ALTER TABLE ONLY public.primeros ALTER COLUMN id SET DEFAULT nextval('public.primeros_id_seq'::regclass);
 :   ALTER TABLE public.primeros ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            I           2604    33173    produccion id    DEFAULT     n   ALTER TABLE ONLY public.produccion ALTER COLUMN id SET DEFAULT nextval('public.produccion_id_seq'::regclass);
 <   ALTER TABLE public.produccion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            J           2604    33195    siguientes id    DEFAULT     n   ALTER TABLE ONLY public.siguientes ALTER COLUMN id SET DEFAULT nextval('public.siguientes_id_seq'::regclass);
 <   ALTER TABLE public.siguientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            K           2604    33217    variable id    DEFAULT     j   ALTER TABLE ONLY public.variable ALTER COLUMN id SET DEFAULT nextval('public.variable_id_seq'::regclass);
 :   ALTER TABLE public.variable ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �          0    33104    conjuntoprediccion 
   TABLE DATA           M   COPY public.conjuntoprediccion (id, nombre, gramatica_pertenece) FROM stdin;
    public          postgres    false    201   �/       �          0    33126 	   gramatica 
   TABLE DATA           0   COPY public.gramatica (id, archivo) FROM stdin;
    public          postgres    false    203   �/       �          0    33148    primeros 
   TABLE DATA           C   COPY public.primeros (id, nombre, gramatica_pertenece) FROM stdin;
    public          postgres    false    205   0       �          0    33170 
   produccion 
   TABLE DATA           F   COPY public.produccion (id, produccion, variable_produce) FROM stdin;
    public          postgres    false    207   /0       �          0    33192 
   siguientes 
   TABLE DATA           E   COPY public.siguientes (id, nombre, gramatica_pertenece) FROM stdin;
    public          postgres    false    209   L0       �          0    33214    variable 
   TABLE DATA           C   COPY public.variable (id, nombre, gramatica_pertenece) FROM stdin;
    public          postgres    false    211   i0       �           0    0    conjuntoprediccion_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.conjuntoprediccion_id_seq', 1, false);
          public          postgres    false    200            �           0    0    gramatica_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.gramatica_id_seq', 1, false);
          public          postgres    false    202            �           0    0    primeros_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.primeros_id_seq', 1, false);
          public          postgres    false    204            �           0    0    produccion_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.produccion_id_seq', 1, false);
          public          postgres    false    206            �           0    0    siguientes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.siguientes_id_seq', 1, false);
          public          postgres    false    208            �           0    0    variable_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.variable_id_seq', 1, false);
          public          postgres    false    210            M           2606    33112 *   conjuntoprediccion conjuntoprediccion_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.conjuntoprediccion
    ADD CONSTRAINT conjuntoprediccion_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.conjuntoprediccion DROP CONSTRAINT conjuntoprediccion_pkey;
       public            postgres    false    201            O           2606    33134    gramatica gramatica_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.gramatica
    ADD CONSTRAINT gramatica_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.gramatica DROP CONSTRAINT gramatica_pkey;
       public            postgres    false    203            Q           2606    33156    primeros primeros_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.primeros
    ADD CONSTRAINT primeros_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.primeros DROP CONSTRAINT primeros_pkey;
       public            postgres    false    205            S           2606    33178    produccion produccion_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT produccion_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.produccion DROP CONSTRAINT produccion_pkey;
       public            postgres    false    207            U           2606    33200    siguientes siguientes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.siguientes
    ADD CONSTRAINT siguientes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.siguientes DROP CONSTRAINT siguientes_pkey;
       public            postgres    false    209            W           2606    33222    variable variable_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.variable
    ADD CONSTRAINT variable_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.variable DROP CONSTRAINT variable_pkey;
       public            postgres    false    211            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     