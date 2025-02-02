PGDMP      %                 }            freetool    17.2    17.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16386    freetool    DATABASE     �   CREATE DATABASE freetool WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE freetool;
                     Sky    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    5            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        pg_database_owner    false    5            �            1259    16390    currency    TABLE     |   CREATE TABLE public.currency (
    base_code character varying NOT NULL,
    conversion_rates text,
    update_date date
);
    DROP TABLE public.currency;
       public         heap r       postgres    false    5            �            1259    16395    master_currency    TABLE     i   CREATE TABLE public.master_currency (
    code character varying NOT NULL,
    name character varying
);
 #   DROP TABLE public.master_currency;
       public         heap r       postgres    false    5            �          0    16390    currency 
   TABLE DATA           L   COPY public.currency (base_code, conversion_rates, update_date) FROM stdin;
    public               postgres    false    217   =       �          0    16395    master_currency 
   TABLE DATA           5   COPY public.master_currency (code, name) FROM stdin;
    public               postgres    false    218   �       [           2606    16403    currency currency_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (base_code);
 @   ALTER TABLE ONLY public.currency DROP CONSTRAINT currency_pkey;
       public                 postgres    false    217            ]           2606    16405 $   master_currency master_currency_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.master_currency
    ADD CONSTRAINT master_currency_pkey PRIMARY KEY (code);
 N   ALTER TABLE ONLY public.master_currency DROP CONSTRAINT master_currency_pkey;
       public                 postgres    false    218            �   T  x�]��v[9D���к�̃w�H�G���ҧ��# I�7�)�Ȍ��j����������y��ݔ�h��~�8�ص�>�Lu�)U�vX�T�es����;��8<cdɓ-��y��~��'[5�­&��G��q�uφ�=/�;������	�����g�SM9����ql�1�L.g�{��vdo`��N��.�o~9�����~9�a
!�Η�q��$?�`Z_GL�>1p���>�т냥��j�d�X���l|F{������-��N%,���Q>�^����d��毧W��C3���m�m���%*8O���F}��]|`?��_�1r��pW�#��2vX��N�;�[��?.�e,�<��8S8���!������<f
�|��ٳ�Yo�#{b-���C����/��[:���j�0e���������x��Or�j��k�1��������E1L��)כ���Xﱵ-SV��O��{��>#B�|�S�/�ʉX�}�[g���x��<B����݃���S� ��/�8�
=�~:���:3o�����X>���[�&g�<(N��~��G�H�%̩q
�e�B+�)��f}�Q*L�	�l�G^����C�[g��h�Z/g���L!��V#Y��"9}�9�?m�y��E'؇]���b�Ԅ��Ͱ�ػ=ц�Rh�v��)E�֖���yE;�VF���v�6.׈w�g�Ћh�z���m�����`<�,G3�T�>]�)DZ�cx{���:�'�dPH�xN$2�q���4�����7gR��7E��`��^
1N���Y���������z���7Z�`�����%0��Mv�a�v�CW<,;>��e츔T��|8�6�ʘ��룜d��w���(���V�j����Ƞ������/���a�5�0�D-�'m>]`�������F�2W��*ˠA�GĤ[�W��[�Z`w�;��y)�X�6�rd�.wS.<���eS�T���Ȅ��=9sf�9\z`D�3�FW��~���<��}dJ!F����=�_��a��?fg-:�g=��{�YDN{f�A)/�|B;ȍ3�:K���<>$����9_����G���yM=�
���o�U~������6^����+�|R>P�lb�}�d�h*
+����C�\�k����~��Sv�߿_ez�(�^(<cb��>�9��&�b�U�����d5�2D��q���!��f�\�x8~�9��?�����x�3��
�w%�ɑ�:�Tew�x�YE��M�n*J�	�m�u�4��E��u���&�C����tי�:�(�|���C��3M�@������| �iғz'�����4�����t�x9�����^�,�q7�	^�"�)�)���$S�e*��fF�Pj�@�����e"�\b,�d�*��U�<<Cyn�t\@}�<� &� ��*,�@M��1��E��Jm� S#ˆ �a)�`�Q��a�N0��Lɵ����`"e?��w��s���0%�gہ0<.�P㐀�R΅0�+7���D���P1����YHC�� hd�,��X:�@�3�CL3U���w�Q�r�)&؊��m�(ƣ�&U���T���BȰ��yWb��¯b,$��zQ���l;�%��(���(&��j&e7�	��4���A��"b�D�yTaA�)��\Sj4f�K-��"����֧F0�K�Y�O&G��+���`
���N0!VG� C�RAo c�#*� 0��2�0�5�u���*b|�U��8�P"�(�z(�q��*�` ���#�A�T��0�a"0	��E�W)����7ƣ|2TgT�xc Z�c;�x�
��%L�3��/p�{�	3zH/hs��\�M��.����e(�D.�o@-]*t��aY肐��	I�"�ʹƕ.�e��J���	y�\�9U����w��&Gd�",R�nhLd�d��u��桚�2���/��AJ꣸� ���ˢ��c��d�g��247
_�2P��Z%�8k;����'��A���2$2^og���bO�d<�e\@)vb%� ���B0��|r&&���l_Y�/8RF�T�Q ��u�A�
!�T Gl0�:�����d��	�p�=_�^�^,?D�!|q���B����*���L�s�_�} �~I? ���&ѝ_�٭(��p�x�a�Y:Š�B�����D�e�PƐߨcB��P��3̾��&P#6}Ddn��s�(�?�H%��&��pS���a˷��&ˀ��
�Oܣvp�l.��>%�Q�yX��M�bR�z�5�ˈ=�Idԍ�W��6g���{cm�	���Y$�"$��t_xd�pz?�t۬^,Il&��(��֎Ih�I}Sl%����q$?�II�V�t�T1�L����:3�TCaSsn��ЉB����_�t���F�5rb&�V����U>�;Q=���+��J�HS5r�2�Z�ǝ�NU����DV�m$F����Q*��ńW�:��`�������
��1(�B��ML��0xJ)>:O�W�g��9ܙJ��0.�j�a��n�ޞ���%"+�qv�z��X�G�*Z\�OCk��?)@,QOtŰV��"�$P`��i�Ȋ���X�X?�U�K�mo{���[V�km�>!w����3ϸp�o*���^�:KH܍ā���,������J͢g�ϑ��+��E�%�Ĕ"�'�g�)KVU�?N�N���Y��$���.�j����i)p��w3rn��&���jtJ�W3�.t�j?��:��n��8n/k��6=��R f� ��!���Z���c���S����A@��������fw&� z���]�S`�X�|��5���=�y����5�e2��&@���zT�{�xg2�-e���+��&t0�_��L˘2^�-�5�D��ou��Ġ>�����H�ŏ�����b�h�1��#�A*�#�:�����H��8�ߞ�a%~����&�q򑕲=>MQ/����Gq[/�{�������S�N���t�����㏽f��u�c G?��w!�S338�qj&����L?~��?���w      �   3  x�uWK��:K��
z6Ɔ��m ��D�Qa[�l%��Q��ӓ�쭪�d��ߠE�B7�FD���;1�Sl��˦a���火X��[��s�N��n��g}b�3~��1q�
_!�����O\�r+�JC����Uúc�� ���8Ԣ9rܻr����NteݝQ7/�������^RwϺk��)�mE����Jt��#�;W������s��a9��Ypu��sf���jUá����|�188�]��%�]ݰ#�O�)ٙQ/L�������_�[ۓbW�p�e %�;�.P�;P0y\��߮H!�O��Cԍ�2Z�/�zyEv����z������JDw��xϝ��͠tK�m�C������A��D�֡�ۛq�3�'3��<� �<s����" �U���w���I؜�T�ҝذv�ut���ld[��N>������8���kh�t�Z�9B�pg������}�|�ٝNN$�(��G@�_��zxe��"�Fz�)�q�#_����q�ܦ�6�cB�aF���b=e���<%s%ebH��'���#��$��&O(�s2�J���'����ce$`��p�Y�#UF��*��HFC)�u&r�&�_��i8�Iȥ�mE�0i�pC�U����2\$��Q��#��P�50��B��l̉��C-��{b�? A�h���͇;�1��V��қ޸�|�@� '������j/�9t�#}J2�pd�(C�`�
B��l�Xd���|�!�@�~N��ɜJ��2.ȲW����'~�]&Ġ��i����ej]L����,�˃��<7�m���,"�<p�4qx��c���^� ��2[[��?V�Iu���?��.#t;��h^��w ��w�4G!d7U��ZM![-r��������O"�D(wF��l+ՋQ�%�a�br���v[}5�O�E;� n-%��/I���|�)yWs����(.4F�Ƽ_6�G9)�@�v�'�q�XT���"�m/��tb����*ݞ�%hO�T�`�GV�ǐ5G�e�K�$tI�J�YÔL�h��L؁�j��zK"��y:D7L�$-��t:�T~��V�G�Oob��$_C�A�1�+]kq����J6F����P��6�a^�8'�>S��ZS����6�:ʢ��/�w�[����M�N��P�a�b|�b�m)3�K�+�L�Z�����:�
r4�T�+�}e�i�c�_�m��kRtKC�=g��M����ZS�/��ݧ��XSIF�yJ2����P#�]4��}��ɦ�"#� .�炐��2vc��d1|"c��F7��B(����
���7'?�<5E��R�����h�c�X*^4���u�61�m@rL��W�C^op[`�(̜��ŠbU~;�x�H�O�~H
}|gL1�0]ѳ���h�+��. ��*���un&�hϡ˕bx����O���`U ftw��>Z���·�^��E�3d,"��ߤS����v���o�A\�1�-v����D-���ǉ��*(h��Hybsh�Q�����V(%%)�:�t<7��U�!{��wKP�\���'na��w���F�%��TqdGz	>����rc�~�F�xUnG�L\ߤ{/�[[TO,��va�x�n_�B��'Y�c-�Twk�Vz�][�k8]�+��`^lx��ڌ$�7~��� 6@`#���\n��a�v6�C�E��i��q�0�t1-��c3�֯�],p����d�����:U�_��� ..� 6��\?HP���~���0��2�dӯ�<';n9�ro�d�a�!�O�d?�)S��oc�mŪ�[L���_N]S�     