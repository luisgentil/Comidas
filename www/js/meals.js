

window.onload = function() {
	PlanningSemanal(datos);

	platos = platosDeHoy();

	// cuadro cinco es pad activo
//	var myElement = document.getElementById('activo');  // ELIMINAR

	// create a simple instance, by default, it only adds horizontal recognizers
//	var mc 			= new Hammer(myElement);   			// ELIMINAR

	var controlBox1 	= new Hammer(Box1);
	var controlBox2 	= new Hammer(Box2);
	var controlBox3 	= new Hammer(Box3);
	var controlBoton1 	= new Hammer(boton1);
	var controlBoton2 	= new Hammer(boton2);
	var controlBox6 	= new Hammer(Box6);

	// listen to events...
	controlBox1.on(  "tap", function(ev) {muestraPlato(0);});
	controlBox2.on(  "tap", function(ev) {muestraPlato(1);});
	controlBox3.on(  "tap", function(ev) {muestraPlato(2);});
	controlBoton1.on("tap", function(ev) {mostrarPlanning();});
	controlBoton2.on("tap", function(ev) {generarPlanning();});
	controlBox6.on(  "tap", function(ev) {compartir();});
	controlBox1.on("press", function(ev) {cambiaPlato(0, 'primero');});
	controlBox2.on("press", function(ev) {cambiaPlato(1, 'segundo');});
	controlBox3.on("press", function(ev) {cambiaPlato(2), 'cena';});

//	mc.on("panleft panright tap press", function(ev) {otraFunction(ev);}); // ELIMINAR

//============================antiguo texto de comidas========================================================


function PlanningSemanal(datos) {
	/*
	si no existen datos en localStorage: --> generarPlanningSemanal()
	si existen datos: 					 --> comprobar	si ha llegado al próximo sábado  --> generarPlanningSemanal()
														si no ha llegado				 --> usar los datos de la última semana
	Función generarPlanningSemanal:
									variables
									contadores
									ciclo principal
										primero
										segundo
										cena
									almacenar datos en localStorage
	Usar datos: 
									pintar

	*/

		// variables necesarias			

	var limites = {"verdura": 5, "arroz": 3, "patata": 3, "pasta": 3, "legumbre": 3, "carne_roja": 2, "carne_blanca": 3, "pescado": 5, "huevo": 3, "pan": 2, "pescado_azul": 3, "pescado_blanco": 3, "fritura": 2, "precocinado": 3, "chacina": 2,'nombre':25, 'invierno': 25, 'primavera':25, 'verano': 25, 'otoño': 25,'primero': 25, 'segundo':25, 'cena':25};

	//- CICLO PRINCIPAL 										

	if (!localStorage.fecha_ultimo_plan) {
		localStorage.platos_sem_ant = ['esta es la primera vez que generas el planning :)']
		generarPlanningSemanal(datos);
		}
	else {
		var ahora = new Date();
		var siguienteSabado = new Date((localStorage.fecha_proximo_plan));
	//	var tiempo_desde_ultimo = ahora - anterior; // en milisegundos
	//	if (tiempo_desde_ultimo > 86400000) {
	//	console.log(ahora > siguienteSabado);
		if (ahora > siguienteSabado) {
		//	document.getElementById('textos').innerHTML = "nueva ejecución";
			generarPlanningSemanal(datos);}
		else {
			console.log( localStorage.fecha_proximo_plan);}
		}
	pintarPlanning();
	 // fin del ciclo PRINCIPAL - while											

	function generarPlanningSemanal(datos) {
	//	console.log(localStorage.platos_sem_ant);
		almacenarSemanaAnterior();
	// esta función genera el planning, Y LO ALMACENA EN LOCAL STORAGE ------		
		// contadores en memoria interna		
		for (i in limites){localStorage.setItem(i, 0);}
		var suerte;
		var limite_sup;
		var platos_seleccionados = []; // todos los platos de esta semana con este orden: 1º plato, 2º plato, cena; total, 21 platos
		var primeros 			 = [];
		var primeros_name 		 = [];
		var segundos 			 = [];
		var segundos_name 		 = [];
		var cenas 				 = [];
		var cenas_name 			 = [];
		var propuesta;
		var limite_sup 			 = datos.contenido.length;

		while (platos_seleccionados.length < 21) {
				// buscando primer plato
			while(primeros.length < 7) {
				propuesta = generarPropuesta('primero');
				// comprueba si la propuesta está incluida en la semana anterior, responde el nº orden, o bien -1 si no está incluida.
				if (test_include(propuesta.nombre, localStorage.platos_sem_ant) < 0) {
					// comprueba si la propuesta no está ya incluida en esta semana
					if (test_include(propuesta.nombre, primeros_name) < 0) {
						// comprueba si cumple los límites de contadores
						if(compruebaLimites(propuesta) <= 0){ // si no supera límites será =0, se añade.
							primeros.push(propuesta);
							primeros_name.push(propuesta.nombre);
							actualizaContadores(propuesta); } 
						}
					}
				}
				// buscando segundo plato
			while(segundos.length < 7) {
				propuesta = generarPropuesta('segundo');
				// comprueba si la propuesta está incluida en la semana anterior, responde el nº orden, o bien -1 si no está incluida.
				if (test_include(propuesta.nombre, localStorage.platos_sem_ant) < 0) {
				// comprueba si la propuesta no está ya incluida en esta semana,
					if (test_include(propuesta.nombre, segundos_name) < 0) {
						// comprueba si cumple los límites de contadores
						if(compruebaLimites(propuesta) <= 0){ // si no supera límites será =0, se añade.
							segundos.push(propuesta);
							segundos_name.push(propuesta.nombre);
							actualizaContadores(propuesta); 
						}
						}
					}
				}
				// buscando cena
			while(cenas.length < 7) {
				propuesta = generarPropuesta('cena');
				// comprueba si la propuesta está incluida en la semana anterior, responde el nº orden, o bien -1 si no está incluida.
				if (test_include(propuesta.nombre, localStorage.platos_sem_ant) < 0) {
					// comprueba si la propuesta no está ya incluida en esta semana,
					if (test_include(propuesta.nombre, cenas_name) < 0) {
						// comprueba si cumple los límites de contadores
						if(compruebaLimites(propuesta) <= 0){ // si no supera límites será =0, se añade.
							cenas.push(propuesta);
							cenas_name.push(propuesta.nombre);
							actualizaContadores(propuesta); 
						}
						}
					}
				}

			// componiendo la lista completa = platos_seleccionados
			for (i = 0; i<7; i++){
				platos_seleccionados.push(primeros[i]);
				platos_seleccionados.push(segundos[i]);
				platos_seleccionados.push(cenas[i]);
			}
		} // fin de while -- 
		almacenarEstaSemana(primeros, segundos, cenas);

	}	//fin de generarPlanningSemanal()											

	function generarPropuesta(tipo){
		var control = 0;
		var limite_sup = datos.contenido.length;
		var propuesta = [];
		while (control == 0) {
			var suerte = Math.floor(Math.random() * limite_sup);
			var propu = datos.contenido[suerte].c;
			if (propu[tipo] == true) { 
				propuesta = propu;
				control =1;}
		}
		return propuesta;
	}

	function almacenarEstaSemana(primeros, segundos, cenas) {
		var todos= [];
		for (i=0; i<7; i++){
			localStorage.setItem("dia" + i + "plato1", primeros[i].nombre);
			localStorage.setItem("dia" + i + "plato2", segundos[i].nombre);
			localStorage.setItem("dia" + i + "plato3", cenas[i].nombre);}
		localStorage.fecha_ultimo_plan = Date.now();
		localStorage.fecha_proximo_plan = calculaProximoSabado();
		console.log("cambio de hora");
		}

	function calculaProximoSabado() {
		var h = new Date(Number(localStorage.fecha_ultimo_plan));
		console.log(h.toDateString());
		var diaSemana = h.getDay();
		var fechaProxSabado = new Date(h.setDate(h.getDate() + (6-diaSemana)));
		fechaProxSabado.setHours(0);
		fechaProxSabado.setMinutes(0);
		console.log(new Date(Number(fechaProxSabado)));
		return fechaProxSabado;
	}

	// actualiza datos para la siguiente semana
	function almacenarSemanaAnterior() {
		var todos= [];
		for (i=0; i<7; i++){
			todos.push(localStorage.getItem("dia" + i + "plato1"));
			todos.push(localStorage.getItem("dia" + i + "plato2"));
			todos.push(localStorage.getItem("dia" + i + "plato3"));}
		localStorage.platos_sem_ant = todos;}

	// comprobar si un elemento está en la lista
	function test_include(element, array){
		var a = array.indexOf(element);
		return a;}

	// comprobar si una propuesta supera los límites, o no: comprueba que, al usar un plato propuesto, no se alcanzan los límites establecidos, comparando los contadores (de local Storage) con los límites
	function compruebaLimites(plato) {
		var resultado = 0;
		for (i in plato) {	//		console.log(i);
			if (plato[i] == true) {
				var caracteristica = Number(localStorage.getItem(i));	//			console.log ("i = " + i + ". caracteristica = " + caracteristica);
				if (caracteristica >= limites[i]) {
					resultado = +1;
					break;
				}
			}
		}
		return resultado;}

	function actualizaContadores(plato) {
		for (i in plato) {
			if (plato[i] == true) {
				var caracteristica = Number(localStorage.getItem(i));
				caracteristica = caracteristica + 1;
				localStorage.setItem(i, caracteristica);
		//		console.log(i, localStorage.getItem(i));
			}
		};
	}

//-----------------sólo válida para tests-----------------------------------------------
	function pintarSemanaAnterior() {
		document.getElementById("semana_ant").innerText += localStorage.platos_sem_ant;}

	function pintarTextosInicio() {
		// tests antiguos, eliminar con el tiempo
		if (document.getElementById('textos').innerHTML = datos.contenido[1]) {
	//		console.log(datos.contenido[3].c.patata);
			var ahora = new Date();
			var anterior2 = localStorage.fecha_ultimo_plan;
			var tiempo_desde_ultimo = (ahora - anterior2)/1000; // en segundos
			console.log(ahora, anterior2, localStorage.fecha_ultimo_plan, tiempo_desde_ultimo);
			document.getElementById('textos').innerHTML = tiempo_desde_ultimo.toFixed(0);
			var h = new Date(Number(anterior2));
			document.getElementById('texto2').innerHTML = h.toDateString() + '<br>';
			document.getElementById('texto2').innerHTML += calculaProximoSabado();
		}
		else {document.getElementById('textos').innerHTML ="NO existe";}
		// recorriendo toda la lista de platos
		document.getElementById('todo').innerHTML += datos.contenido.length;}

	function pintarLimites() {
		seleccion_limites = ["verdura", "arroz", "patata", "pasta", "legumbre", "carne_roja", "carne_blanca", "pescado", "huevo", "pan", "pescado_azul", "pescado_blanco", "fritura", "precocinado", "chacina"];
		for (i in limites){
			for (j in seleccion_limites) {
		//		console.log (i, j);
				if (i==seleccion_limites[j]) {
					document.getElementById("limits").innerHTML += '<li>' + i + ": " + limites[i] + '</li>';}
			}
		}}

/*	function pintarContadores() {
		for (i in limites){
			document.getElementById("L_primeros").innerHTML += '<li>' +i + ': ' + localStorage.getItem(i) +  '</li>';}
		}
*/

	function pintarTest(){
	//	document.getElementById('hoy').innerHTML = generarPropuesta('segundo').nombre;
		pintarPrimeros('plato1');
		pintarSegundos('plato2');
		pintarCenas('plato3');
		pintarTextosInicio();
		pintarSemanaAnterior();
		pintarLimites();
		pintarContadores();
	}


  //--------------FIN DE 'sólo válida para tests'-----------------------------------------

} //------------- fin de 'PlanningSemanal'----------------------------------------

	function pintarPrimeros(contenedor){
		for (i=0; i < 7; i++){
			document.getElementById(contenedor).innerHTML += '<td>'+ localStorage.getItem("dia" + i + "plato1") ;}
		}

	function pintarSegundos(contenedor){
		for (i=0; i < 7; i++){
			document.getElementById(contenedor).innerHTML += '<td>'+localStorage.getItem("dia" + i + "plato2");}
		}

	function pintarCenas(contenedor){
		for (i=0; i < 7; i++){
			document.getElementById(contenedor).innerHTML += '<td>'+localStorage.getItem("dia" + i + "plato3") ;}
		}




//====================================================================================

//	otraFunction = function(evento) {   									// ELIMINAR
//		document.getElementById('mensaje-evento').innerText = evento.type; // ELIMINAR
//	}

	function platosDeHoy(){
		var hoy = new Date();
		var diaSemana = hoy.getDay();
		var meal = "dia" + diaSemana + "plato";
		var platos = [];
		for (i=1; i<4; i++){
			var j = meal+i;
			var comida = localStorage.getItem(j);
			platos.push(comida);
		}
		console.log(platos);
		return platos;
	}

	function muestraPlato(plato) {
		var Boxy = "Box"+ (plato+1);
		document.getElementById(Boxy).innerText = platos[plato];
		if (plato +2 < 4){
			var Boxy2 = "Box"+ (plato+2);
			document.getElementById(Boxy2).classList.toggle('fuera');}
		else {
			document.getElementById('Box4').classList.toggle('fuera');
			document.getElementById('Box6').classList.toggle('fuera');
		}
	}

	function cambiaPlato(plato, orden) {  // PENDIENTE
		console.log("cambiaPlato");
	}

	function mostrarPlanning() {
		console.log("pintarPlanning");
		document.getElementById('Box5').classList.toggle('fuera');
	}

	function pintarPlanning() { // PENDIENTE: debe pintarlo al principio, con clase = oculta, y el botón alterne entre visible-oculto
		pintarPrimeros('plato1');
		pintarSegundos('plato2');
		pintarCenas('plato3');
		pintarContadores();
		console.log("falta pintar contadores");
	}

	function compartir(){		// PENDIENTE
		console.log("compartir");
	}

function generarPlanning() {
	 var txt;
	if (confirm("Esto borrará todos los datos. ¿Generar nuevo plan?")) {
		txt = "You pressed OK!";
		localStorage.setItem('fecha_proximo_plan', '01/01/1990');
		PlanningSemanal(datos);
		location.reload(); 
	}
	else {
		txt = "You pressed Cancel!";};
	}

function pintarContadores() {
	var limites = {"verdura": 5, "arroz": 3, "patata": 3, "pasta": 3, "legumbre": 3, "carne_roja": 2, "carne_blanca": 3, "pescado": 5, "huevo": 3, "pan": 2, "pescado_azul": 3, "pescado_blanco": 3, "fritura": 2, "precocinado": 3, "chacina": 2,'nombre':25, 'invierno': 25, 'primavera':25, 'verano': 25, 'otoño': 25,'primero': 25, 'segundo':25, 'cena':25};
	seleccion_limites = ["verdura", "arroz", "patata", "pasta", "legumbre", "carne_roja", "carne_blanca", "pescado", "huevo", "pan", "pescado_azul", "pescado_blanco", "fritura", "precocinado", "chacina"];

	for (i in limites){
		for (j in seleccion_limites) {
			if (i==seleccion_limites[j]) {
				console.log('<li>' + i + ": " + localStorage.getItem(i) + '</li>');
				document.getElementById("limites").innerHTML += '<td>' + i + '<br>' + localStorage.getItem(i);}
		}
	}
	}

}
// mejorar CSS

