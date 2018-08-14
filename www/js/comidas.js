/* 
Hay que separar las funciones de:
	* generar información,
	 y 
	* mostrar la información;

Así pueden ejecutarse por separado, y asociarla a eventos (carga, pulsación de botones, etc.)

He comenzado por el final, qué lógico ;)


*/

/*
***************************************************************************
				ATENCIÓN							
Tengo que modificar la forma de almacenar la información.
lo que he generado: listas de valores, y arrays

lo que necesito: variables almacenadas en localStorage.
Porque casi siempre, la app se dedicará a leer y mostrar la info almacenada.
y sólo una vez pòr semaman la generará.

Problema: son valores únicos, clave-valor. No listas. No arrays.

Hay que modificar el código actual, para que los resultados (platos que se van seleccionando)
se almacenen en variables de localStorage.

Después, recorrer las variables en Storage, y mostrarlas, cambiarlas, o lo que sea.

Necesito definir la estructura de datos. 21 platos (3 platos por 7 días).

dia0plato1, dia2plato1, dia3plato1, .....
dia0plato2, dia2plato2, ...
dia0plato3, dia3plato3, ...

fácil de localizar, fácil de construir como texto:

	var ejem =dia+ i +plato + j
	localStorage.setItem (ejem, propuesta)




*/




