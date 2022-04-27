// operaciones.js

function INI_LOAD(){
	$(".tooltip").remove();
	$("body").mask("Cargando...");
}

function FIN_LOAD(){
	$("body").unmask();

} 

/* abrir-dialog*/
function OpenFormBisiesto()
{
	$("#txtaniobi").val('');

    //$(document).ready(function() {
        $("#childModal1").modal({
          backdrop: 'static', keyboard: false
        });
    //});

}

function OpenFormFilas()
{
	$("#txtFilas").val('');
	$("#txtColumnas").val('');
	$(".eliminarF").remove();

   //$(document).ready(function() {
        $("#childModal2").modal({
          backdrop: 'static', keyboard: false
        });
    //});

}

function OpenFormArreglo()
{
	
    //$(document).ready(function() {
        $("#childModal3").modal({
          backdrop: 'static', keyboard: false
        });
    //});

}

function OpenFormAbc()
{
	
    //$(document).ready(function() {
        $("#childModal4").modal({
          backdrop: 'static', keyboard: false
        });
    //});

}

/*========================================================== 1 ======================================================================*/
/*Crear un input donde se ingrese un año y determina si es bisiesto en el calendario gregoriano.*/
function calcularBisiesto(){

	var anio = $("#txtaniobi").val();
	if (((anio % 4 == 0) && (anio % 100 != 0 )) || (anio % 400 == 0)){
    	bootbox.alert(anio + ' Es un año bisiesto!!');
  	}
  	else{
  		bootbox.alert(anio + ' NO Es bisiesto');
  	}
	
}

/*=========================================================== 2 =====================================================================*/
/*Crear dos input, filas y columnas donde se ingresan estos datos y se genere automáticamente 
una tabla con las dimensiones suministradas.*/
function calcularTabla(){

	var filas 		= $("#txtFilas").val();
	var columnas 	= $("#txtColumnas").val();
	var htmlF		= '';
	var htmlC		= '';
	
	$(".eliminarF").remove();

	for (var contC = 1; contC <= columnas; contC++){

		htmlC = htmlC + '<td style="border: 5px solid #83b7d5;">&nbsp;</td>';	
	}

	for (var contF = 1; contF <= filas; contF++){


		htmlF = htmlF + '<tr class="eliminarF">'+htmlC+'</tr>';

	}

	$('#tablaFilasColumnas').append(htmlF);

}

/*=========================================================== 3 =====================================================================*/
/*Generar un arreglo con 20 números aleatorios de 1 a 100 y luego organizarlo de menor a
mayor sin utilizar la sentencia .sort().*/
function calcularArray(){

	var array 		= [];
	var randomIndex	= 0;

	for (var cont = 1; cont <= 20; cont++){

		randomIndex = aleatorio(1, 100);
  		array.push(randomIndex);
	}

	$("#lblGenerado").html("Arreglo Generado: " + array);
	ordenarArray(array);
	
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function ordenarArray(arrayGenerado){
    var temporal = 0;
    /*Comparar cada elemento del arreglo con el valor siguiente para poder ordenarlo*/
    for (var i = 0; i < arrayGenerado.length; i++) {
        for (var j = 1; j < (arrayGenerado.length - i); j++) {
            if (arrayGenerado[j - 1] > arrayGenerado[j]) {
                temporal = arrayGenerado[j - 1];
                arrayGenerado[j - 1] = arrayGenerado[j];
                arrayGenerado[j] = temporal;
            }
        }
    }
     $("#lblOrdenado").html("Arreglo Ordenado: " + arrayGenerado);
}

/*========================================================== 4 ======================================================================*/
/*Generar dos arreglos A y B con 10 valores aleatorios de letras del abecedario*/

function calcularArrayABC(){

	var cadena 		= '';
	var inters 		= '';
	var diferA 		= '';
	var diferB 		= '';
	var arrayA 		= [];
	var arrayB 		= [];
	var arrayU 		= [];
		cadena 		= aleatorioABC(10);

	for (var cont = 0; cont < 10; cont++){
		arrayA.push(cadena[cont]) //convertir elemento en array A
	}

	cadena 		= aleatorioABC(10);

	for (var cont = 0; cont < 10; cont++){
		arrayB.push(cadena[cont]) //convertir elemento en array B
	}

	arrayU 	= arrayA.concat(arrayB); //union
	inters 	= interseccion(arrayA, arrayB); //interseccion
	diferA 	= diferencia(arrayA, arrayB); //diferencia
	diferB 	= diferencia(arrayB, arrayA); //diferencia

	$("#lblGeneradoA").html("Arreglo A: " + arrayA);
	$("#lblOrdenadoB").html("Arreglo B: " + arrayB);
	$("#lblUnion").html("Union: " + arrayU);
	$("#lblInterseccion").html("Interseccion: " + inters);
	$("#lblDiferencia").html("Diferencia A-B: " + diferA);
	$("#lblSimetrica").html("Diferencia Simetrica(A-B) U (B-A): " + diferA + "," + diferB);
}

function aleatorioABC() {
    var abecedario 			= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var abecedariotamanio 	= abecedario.length;
    var resultado 			= "";
    var caracter;
    while (resultado.length < 10){
        caracter = abecedario.charAt(Math.floor(Math.random() * abecedariotamanio));
        if (!resultado.includes(caracter)){ //evitamos que se dupliquen una letra del abecedario en la cadena a retornar
            resultado += caracter;
        }
    }
  return resultado;
}

function interseccion(arregloA, arregloB){
	return arregloA.filter(valores => arregloB.includes(valores));
}

function diferencia(arregloA, arregloB){
	return arregloA.filter(valores => arregloB.indexOf(valores) == -1);
}

/*========================================================== 5 ======================================================================*/
/*Consulta tipo Rest al API de banco de MX del tipo de cambio de los
últimos 5 días y mostrarlo en una tabla con fecha y tipo de cambio,*/

function OpenFormTipoCambio(){

	INI_LOAD();
	$(".eliminarF").remove();

	var fechafin 	= $.datepicker.formatDate('yy-mm-dd', new Date());
	var fecha 		= restarDias(new Date(), -5);
	var fechaini 	= $.datepicker.formatDate('yy-mm-dd', fecha);

    $.ajax({
	url : "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/"+fechaini+"/"+fechafin+"?token=a018ae1f34020797472914ffd06e89f0d078c62192e16a90241cfc5e719dc243",
	type: "GET",
	jsonp : "callback",
	dataType : "jsonp", 
	success : function(response) {
		
		var series 		= response.bmx.series;
		var serie 		= series[0];
		var titulo 		= serie.titulo;

		fechafin 		= $.datepicker.formatDate('dd/mm/yy', new Date());
		fechaini 		= $.datepicker.formatDate('dd/mm/yy', fecha);

		$("#titulo5").html("API Tipo Cambio desde " + fechaini + " hasta " + fechafin);
		$("#idTitulo").html(titulo);
		
		for (var cont = 0; cont < serie.datos.length; cont++){

			var reg='<tr class="eliminarF">'+'<td style="text-align:center;">'+serie.datos[cont].fecha+'</td><td style="text-align:right;">'+serie.datos[cont].dato+'</td></tr>';
			$('#tablaTipoCambio').append(reg);
		}
		FIN_LOAD();	  
	}
	});

    $("#childModal5").modal({
        backdrop: 'static', keyboard: false
    });

}

function restarDias(fecha, dias){
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}
