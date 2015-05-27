================== Script for creating the database structure ==================
DROP TABLE if EXIST lashuang;

CREATE TABLE lashuang (
  id SERIAL,
  word VARCHAR(255),
  pos VARCHAR(255),
  trans VARCHAR(255),
  commonUsage VARCHAR(255),
  eaxmples VARCHAR(255),
  origional VARCHAR(255),
  conjuMethod VARCHAR(255),
  conjuIntro VARCHAR(255),
  conjuTips VARCHAR(255)
);

INSERT INTO lashuang (
						word,
						pos, 
						trans, 
						commonUsage, 
						eaxmples, 
						origional, 
						conjuMethod, 
						conjuIntro, 
						conjuTips 
					) VALUES (
						aide,
						n.f,
						帮助\， 援助\； 支持\， 依靠,
						recevoir des aides de l'État 得到国家的救助,
						Il refuse fermement son aide. 他坚定地拒绝了他的帮助,
						aider,
						直陈式 现在时 (Indicatif Présent) j'aide Tu aides Il aide Nous aidons Vous aidez Ils aident,
						第1组动词 可用作：可作为及物动词(Verb Transitif) 可作为代动词(Verb Pronominal) 注意：当该动词作为代动词与se连用时\，需要使用être作为助动词，其变位方法会与上述有所不同\;,
						变位提示： 现在时 Indicatif Présent 变位方法： 第一组动词(通常为-er)：参见 aimer 注意一些第一组动词由于发音需要，在变位时会有所变化： 以-eler\, -eter结尾的第一组动词，如appeler\, jeter \,在单数所有人称\，以及复数第三人称的变位中\，词尾字母变为"ll"\,"tt"\。 以-cer\, -ger结尾的第一组动词\，如commencer\, manger\, 在复数第一人称时词尾应改为 -çons\, -geons\。
					);
SELECT * FROM lashuang;


-- 02 Numerics
-- database: scratch

DESCRIBE numerics;
SELECT * FROM numerics;
SELECT da + db, fa + fb FROM numerics;
SELECT da + db = .3 FROM numerics;
SELECT fa + fb = .3 FROM numerics;
SELECT fa + fb FROM numerics;

-- 04 Date and Time
-- database: scratch

DROP TABLE IF EXISTS test;
CREATE TABLE test (
  id SERIAL,
  stamp TIMESTAMP,
  note VARCHAR(255)
);
INSERT INTO test ( note ) VALUES ( 'Pablo Picasso' );
INSERT INTO test ( note ) VALUES ( 'Henri Matisse' );
INSERT INTO test ( note ) VALUES ( 'Vincent Van Gogh' );
DESCRIBE test;
SHOW CREATE TABLE test;
SELECT * FROM test;

UPDATE test SET note = 'Jackson Pollock' WHERE id = 2;
SELECT * FROM test;

DROP TABLE IF EXISTS test;

SHOW VARIABLES LIKE '%time_zone%';
SELECT NOW();

SET time_zone = 'US/Eastern';
SHOW VARIABLES LIKE '%time_zone%';
SELECT NOW();

-- 05 BIT
-- database: scratch

DROP TABLE IF EXISTS test;
CREATE TABLE test ( id SERIAL, a BIT(3), b BIT(5) );
INSERT INTO test ( a, b ) VALUES ( 5, 29 );
INSERT INTO test ( a, b ) VALUES ( 6, 30 );
INSERT INTO test ( a, b ) VALUES ( 7, 31 );
INSERT INTO test ( a, b ) VALUES ( 8, 32 );
INSERT INTO test ( a, b ) VALUES ( 9, 33 );
INSERT INTO test ( a, b ) VALUES ( 199, 199 );
SELECT * FROM test;

DROP TABLE IF EXISTS test;

-- 06 BOOLEAN
-- database: scratch

DROP TABLE IF EXISTS test;
CREATE TABLE test ( a BOOLEAN, b BOOLEAN );
INSERT INTO test VALUES ( TRUE, FALSE );
SELECT * FROM test;
DESCRIBE test;
SHOW CREATE TABLE test;

SELECT a AND b FROM test;
SELECT a OR b FROM test;

DROP TABLE IF EXISTS test;

-- 07 ENUM and SET
-- database: scratch

-- ENUM

DROP TABLE IF EXISTS test;
CREATE TABLE test (
  id SERIAL,
  a ENUM( 'Pablo', 'Henri', 'Jackson' )
);
INSERT INTO test ( a ) VALUES ( 'Pablo' );
INSERT INTO test ( a ) VALUES ( 'Henri' );
INSERT INTO test ( a ) VALUES ( 'Jackson' );
INSERT INTO test ( a ) VALUES ( 1 );
INSERT INTO test ( a ) VALUES ( 2 );
INSERT INTO test ( a ) VALUES ( 3 );

SELECT * FROM test;

-- SET

DROP TABLE IF EXISTS test;
CREATE TABLE test (
  id SERIAL,
  a SET( 'Pablo', 'Henri', 'Jackson' )
);
INSERT INTO test ( a ) VALUES ( 'Pablo' );
INSERT INTO test ( a ) VALUES ( 'Henri' );
INSERT INTO test ( a ) VALUES ( 'Jackson' );
INSERT INTO test ( a ) VALUES ( 'Pablo,Jackson,Henri,Henri,Henri' );
INSERT INTO test ( a ) VALUES ( 1 );
INSERT INTO test ( a ) VALUES ( 2 );
INSERT INTO test ( a ) VALUES ( 3 );
INSERT INTO test ( a ) VALUES ( 4 );
INSERT INTO test ( a ) VALUES ( 5 );
INSERT INTO test ( a ) VALUES ( 6 );
INSERT INTO test ( a ) VALUES ( 7 );
SELECT COUNT(*) FROM test;
SELECT * FROM test;
DESCRIBE test;
SHOW CREATE TABLE test;
