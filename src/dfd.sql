
DECLARE
@codigo varchar(11), 
@nombres varchar(20), 
@apellidos varchar(40), 
@mensaje varchar(80), 
@titulo varchar(80) 

DECLARE autores_peruanos CURSOR FOR 
SELECT codigoAutor, nombres, apellidos 
FROM autores 
WHERE origen = 'Peru'
ORDER BY codigoAutor 
OPEN autores_peruanos 
FETCH NEXT FROM autores_peruanos 
INTO @codigo, @nombres, @apellidos 
WHILE @@FETCH_STATUS = 0 
BEGIN 
PRINT ''
SELECT 
@mensaje = 'Autor: ' + 
@nombres  + @apellidos
PRINT @mensaje
DECLARE titles_cursor CURSOR FOR
SELECT  ti.Titulo
FROM autores  as au INNER JOIN
titulos_autores as ta ON au.codigoAutor = ta.codigoAutor INNER JOIN
titulos AS ti ON ta.codigoTitulo = ti.codigoTitulo
WHERE au.codigoAutor = @codigo
OPEN titles_cursor
FETCH NEXT FROM titles_cursor INTO @titulo
BEGIN
SELECT @mensaje = ' ' + @titulo
PRINT @mensaje
FETCH NEXT FROM titles_cursor INTO @titulo
END
CLOSE titles_cursor
DEALLOCATE titles_cursor
FETCH NEXT FROM autores_peruanos 
INTO @codigo, @nombres, @apellidos
END 
CLOSE autores_peruanos 
DEALLOCATE autores_peruanos