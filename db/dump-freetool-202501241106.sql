PGDMP                          }            freetool    12.22    15.3     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    207479    freetool    DATABASE        CREATE DATABASE freetool WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE freetool;
                habib.syuhada    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                habib.syuhada    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   habib.syuhada    false    6                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   habib.syuhada    false    6            �            1259    207480    currency    TABLE     �   CREATE TABLE public.currency (
    base_code character varying NOT NULL,
    conversion_rates text,
    update_date timestamp without time zone
);
    DROP TABLE public.currency;
       public         heap    postgres    false    6            �            1259    207490    master_currency    TABLE     i   CREATE TABLE public.master_currency (
    code character varying NOT NULL,
    name character varying
);
 #   DROP TABLE public.master_currency;
       public         heap    postgres    false    6                      0    207480    currency 
   TABLE DATA           L   COPY public.currency (base_code, conversion_rates, update_date) FROM stdin;
    public          postgres    false    202                    0    207490    master_currency 
   TABLE DATA           5   COPY public.master_currency (code, name) FROM stdin;
    public          postgres    false    203   �       �
           2606    207487    currency currency_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (base_code);
 @   ALTER TABLE ONLY public.currency DROP CONSTRAINT currency_pkey;
       public            postgres    false    202            �
           2606    207497 $   master_currency master_currency_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.master_currency
    ADD CONSTRAINT master_currency_pkey PRIMARY KEY (code);
 N   ALTER TABLE ONLY public.master_currency DROP CONSTRAINT master_currency_pkey;
       public            postgres    false    203               �  x�m��n#9E���b�����o�eK���Z�a�d0�>�^�iUc�JLnA�v��V���rZ���?���Rv����>�����nww_��}��=c�;�5�O�����9�Ԅ���%/�g��4>&]g�4��y���g���������ꌏ�N�xLx\�}~o0�L^�__0�7E�����q��>������}���lwl �c���3�/i�6r���z�f����;�Ʋqm�==h��3�|ZQ�.2�s�B�Il���;H�4�'������qLS��t|���몇XOt;����E�T���O�-�O�A��v�9O�a�j���6��+.�p�B�e�>N6d��y}�^��>y��|~���L��ϗ�Βy��1��|��S��A^���T��q�@���sJ��Y��Yoh*qr.a���m՘������ځLP�X���f�U6�)���5�m�+���f�����GI�<��9���b����u>6]��6���+�_w'Z@��������ۍZ�-}�p���֊�<�O�!
�o�7+��p#��G~{��ga�߭�yMm�ym��"3��]�Y�Mw��&���~�+��q΀ku���?)���l���J���V�x
���#|<��v4?[���HvTx�����j-�:R���Vڝ�[xӐn�M�E��Ru��V�_�q)y�F�	)�~�Tr�����[@�s�=CX -�
�����8Z��x���Bs�ӶC�|I����Q�"=s�I]e_���5sh�A��7g���`0�lU�4+2�Ί[1�W+�7��c��L`��X}h�`��xU��u�)B���������QQ��Ȕ]�1�-E2��v��2�y�F2/�j>�f���G��W3���Q	*8�k\��
�����8'�ݏ�@:F���c̉�r؄Y�'����tZac��p��v��^N��9ms�&��s�le����`|��w8~M�dH}��ǹ'[�{
��rb�w�kK'?}�V���:]oM����=rBb`9�)��r��yO��@��yVJ������0fh��㷤I���|^1�B?ܸ�~�qF��|=1���d$���&�8����9�u�����|��L��k��I>:b�MY\�%u����?.TBif��<����z���N6t֯'e����e�D��z�}ԁ�A�ǈ5��i��ZNv����7��'�vȽ���,B^��8��_�������7Z��(�i������縕X�mPI�0�&"]�4��L߂͵��b�4��[D�2��D���8�~Q�o����`C�����T��}p���h���e��pS�J߱���\���z��~ڇ�y� }@
K����Iv#�m�s!z^��H��;��6���#	��Ҷ 	"g��{�W��K�L0b�&/4�;'!o&�� 	�H��3���S'%6S�vDJ���)VBӚ�;+�m���{_�gz�j
Y0t`R���DL�]A0����X��NN:c]������ĎQM�]@�p��9R����%�T]��(ޱ�g�0�D]�.$:�qU�?�L֍��R;Y���\*���*C
��m�� K�g�CQ���F+�jd3��\�*��8�
�" Y!��0�J���:V-��#�؅���l�W�.��+]x�Ĩ����6B�	:\�xҵ؊����P[��e��W�h�\+�b�c Z�)��؊
)<��J�alYI�!c����Sg�8d�r#!V����X8��y?t�����K�_a��h�T^�+~p���� ����ft5w�²��#��8�v+�j�ί��$Re>��q�q�2k�-�������W�z�EZ�=�������V��i�m|z�|�.�j����͈z:��2����	a�������<�@��\�Øb\�!�����hzq�X��uͧ%� )*kZ��z�9�f���bl6��>l~�7!�4��`4Xs�b�g4�H�O݀$ک��:�i$ �3PF�>Ef?��i�g�جKl�}³j"���G<L�I�Ŏm��DjM0�	�Z3s[�kµ�?�v�b�Y#�u^S�x[�f��%��3�
�48q�K[�6wv�=1�}��FL��6�,>�m=G�N��K�3G�ֺS���?�� �g���j ]�G;�\�y5M�����sA�����?���k��)�a��,��"��Np	`�(� �0U�^��{/uzKx�K�7�w� ��V��*��T��jR.Ɵ��W8�٩%E�Z�;�qP�Ka\\0��ʔ���;�e=�[y���'֌�T�C�.Dև��������T�"�ቑ�Q��I{�
a!�B-�</��|���}M�'�����������h�E_g��
��дzQ���W�R��_K�zᥥ�'�
h��E]Ot��(��P�˃��L
�X���w�����s���,����M�P�tѹ�Mi�*��Ȯ��z�Y����x:OE
�;L���Ir�)�	KERx	e��@*���
��7^��.1�B�SmQ�ܔl��&�h��Z�`
�.�MyU� �R�²Q��NTm�V��x�5NEG��J���4$�T�HkK�*��$ڨLT!�gL�*���,ja���B��Q9��L��T��|�9l#)�)&�W;M%�R��Z�'/��ժB���"�Z������
F�*�E�5�6.W&Lq�ǻ���+��\պV�b%7������` ����u��[:D����|T�R�
�.�l�*8S/�������P�3,u�bq>|!�	[���}nh��(Ǣ�Q����V�2�pS�����\!�tpjaL����A��I-��R`�v���(JJ���j��`ʸ#2�`	&_�@���1�NI��I�&��JV1���1	��2	���[����"���g}CAZp/r5Yw�����((8ܞ.S��@�y�[X����Q��<8��n�׾�ڨH+z�8�(Q"1��'�a)ύˌT���!ܴ��Y1�H�^�j*�� "�#���*���y<��с�ec�!.K^�*�z�V�Sc�ʨ��MaT���ME�cF�0�F�ۋUFcE<��);�o!��1hv܉��*ԹH�)�Pl�:xj!T�Q��M�Q�b���tD|��sο�_�~��	�         3  x�uWK��:K��
z6Ɔ��m ��D�Qa[�l%��Q��ӓ�쭪�d��ߠE�B7�FD���;1�Sl��˦a���火X��[��s�N��n��g}b�3~��1q�
_!�����O\�r+�JC����Uúc�� ���8Ԣ9rܻr����NteݝQ7/�������^RwϺk��)�mE����Jt��#�;W������s��a9��Ypu��sf���jUá����|�188�]��%�]ݰ#�O�)ٙQ/L�������_�[ۓbW�p�e %�;�.P�;P0y\��߮H!�O��Cԍ�2Z�/�zyEv����z������JDw��xϝ��͠tK�m�C������A��D�֡�ۛq�3�'3��<� �<s����" �U���w���I؜�T�ҝذv�ut���ld[��N>������8���kh�t�Z�9B�pg������}�|�ٝNN$�(��G@�_��zxe��"�Fz�)�q�#_����q�ܦ�6�cB�aF���b=e���<%s%ebH��'���#��$��&O(�s2�J���'����ce$`��p�Y�#UF��*��HFC)�u&r�&�_��i8�Iȥ�mE�0i�pC�U����2\$��Q��#��P�50��B��l̉��C-��{b�? A�h���͇;�1��V��қ޸�|�@� '������j/�9t�#}J2�pd�(C�`�
B��l�Xd���|�!�@�~N��ɜJ��2.ȲW����'~�]&Ġ��i����ej]L����,�˃��<7�m���,"�<p�4qx��c���^� ��2[[��?V�Iu���?��.#t;��h^��w ��w�4G!d7U��ZM![-r��������O"�D(wF��l+ՋQ�%�a�br���v[}5�O�E;� n-%��/I���|�)yWs����(.4F�Ƽ_6�G9)�@�v�'�q�XT���"�m/��tb����*ݞ�%hO�T�`�GV�ǐ5G�e�K�$tI�J�YÔL�h��L؁�j��zK"��y:D7L�$-��t:�T~��V�G�Oob��$_C�A�1�+]kq����J6F����P��6�a^�8'�>S��ZS����6�:ʢ��/�w�[����M�N��P�a�b|�b�m)3�K�+�L�Z�����:�
r4�T�+�}e�i�c�_�m��kRtKC�=g��M����ZS�/��ݧ��XSIF�yJ2����P#�]4��}��ɦ�"#� .�炐��2vc��d1|"c��F7��B(����
���7'?�<5E��R�����h�c�X*^4���u�61�m@rL��W�C^op[`�(̜��ŠbU~;�x�H�O�~H
}|gL1�0]ѳ���h�+��. ��*���un&�hϡ˕bx����O���`U ftw��>Z���·�^��E�3d,"��ߤS����v���o�A\�1�-v����D-���ǉ��*(h��Hybsh�Q�����V(%%)�:�t<7��U�!{��wKP�\���'na��w���F�%��TqdGz	>����rc�~�F�xUnG�L\ߤ{/�[[TO,��va�x�n_�B��'Y�c-�Twk�Vz�][�k8]�+��`^lx��ڌ$�7~��� 6@`#���\n��a�v6�C�E��i��q�0�t1-��c3�֯�],p����d�����:U�_��� ..� 6��\?HP���~���0��2�dӯ�<';n9�ro�d�a�!�O�d?�)S��oc�mŪ�[L���_N]S�     