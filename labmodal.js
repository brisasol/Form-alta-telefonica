// Modal div
var modal = document.getElementById("myModal");
var modalMensaje = document.getElementById("mensajeModal");
var modalContent = document.getElementById("contentModal");
            
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//CPostal based on the province
const CodPostalMap = {'alava': 01, 'albacete': 02, 'alicante': 03, 
                        'almeria': 04, 'avila': 05, 'badajoz': 06, 'islas baleares': 07, 
                        'barcelona': 08, 'burgos': 09, 'caceres': 10, 'cadiz': 11, 
                        'castellon': 12, 'ciudad real': 13, 'cordoba': 14, 'la coruna': 15, 
                        'cuenca': 16, 'gerona': 17, 'granada': 18, 'guadalajara': 19, 
                        'guipuzcoa': 20, 'huelva': 21, 'huesca': 22, 'jaen': 23, 
                        'leon': 24, 'lerida': 25, 'la rioja': 26, 'lugo': 27, 
                        'madrid': 28, 'malaga': 29, 'murcia': 30, 'navarra': 31, 
                        'orense': 32, 'asturias': 33, 'palencia': 34, 'las palmas': 35,
                        'pontevedra': 36, 'salamanca': 37, 'santa cruz de tenerife': 38, 
                        'cantabria': 39, 'segovia': 40, 'sevilla': 41, 'soria': 42, 
                        'tarragona': 43, 'teruel': 44, 'toledo': 45, 'valencia': 46, 
                        'valladolid': 47, 'vizcaya': 48, 'zamora': 49, 'zaragoza': 50,
                        'ceuta': 51, 'melilla': 52
                    }

const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

/**
 * When the user clicks on <span> (x), close the modal
 */
function closeModal() {
    modal.style.display = "none";
    modalContent.style.backgroundColor = 'white';
}

// Close modal when click outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**
 * Submit form data and validate
 */
function submitForm(e){
  e.preventDefault();
  var datos = getAllValues();
  ok = validateAllValues(data=datos);
  if (ok){
    modalInfo = validateCP(datos=datos);

    modalMensaje.innerText = modalInfo.mensage;
    modalContent.style.backgroundColor = modalInfo.color;
  } else {
    mensage = "No todos los campos han sido rellenados";
    modalMensaje.innerText = mensage;
    modalContent.style.backgroundColor = "red";
  }

  modal.style.display = "block";  
  
}

/**
 * Reset input values
 */ 
function resetForm(){
  document.getElementById('formTelefonia').reset();
}

/**
 * Show valoracion input value in modal
 */
function showValoracion(){
    var valoracion = $('#valoracion').val();
    var mensage = "Ha valorado con " + String(valoracion) + " puntos";
    modalMensaje.innerText = mensage;
    modal.style.display = "block";
}

/**
 * Show cuenta input value in modal
 */
function showCuenta(){
  var cuenta = $('#pais').val()+'-'+$('#ciban').val()+
                '-'+$('#enti').val()+'-'+$('#suc').val()+
                '-'+$('#dc').val()+'-'+$('#cuenta').val();
  var mensage = "Le informamos de que su cuenta bancaria es: " + cuenta;
  modalMensaje.innerText = mensage;
  modal.style.display = "block";
}

/**
 * Show dia (week day) input value in modal
 */
function showDia(){
    var fecha = new Date($('#fecha').val());
    var dia = diaSemana[fecha.getDay()];
    var mensage = "La fecha seleccionada en el elemento de fecha es un " + dia;
    modalMensaje.innerText = mensage;
    modal.style.display = "block";
}

/**
 * Get all input values of the forms
 * @returns data: a object containing the values
 */
function getAllValues() {
    // Get form input values
    var name = $('#nombre').val();
    var email = $('#apellidos').val();
    var direccion = $('#direccion').val();
    var cpostal = $('#cpostal').val();
    var localidad = $('#localidad').val();

    var nuevaCont = $('#nuevaCont')[0].checked;
    var portabilidad = $('#portabilidad')[0].checked;
    var cambioCont = $('#cambioCont')[0].checked;
    var compActual =$('#compActual').val();
    var compNueva = $('#compNueva').val();

    var pais = $('#pais').val();
    var ciban = $('#ciban').val();
    var entidad = $('#enti').val();
    var sucursal = $('#suc').val();
    var DC = $('#dc').val();
    var cuenta = $('#cuenta').val();

    var television = $('#television')[0].checked;
    var radio = $('#radio')[0].checked;
    var internet = $('#internet')[0].checked;
    var otros = $('#otros')[0].checked;
    var valoracion = $('#valoracion').val();
    var fecha = $('#fecha').val();
    

    var datos = {"name": name, "email": email, "direccion": direccion, "cpostal": cpostal, "localidad": localidad,
                "nuevaCont": nuevaCont, "portabilidad": portabilidad, "cambioCont": cambioCont, "compActual": compActual, 'compNueva': compNueva,
                "pais": pais, "ciban": ciban, "entidad": entidad, "sucursal": sucursal, "DC": DC, "cuenta": cuenta,
                "television": television, "radio": radio, "internet": internet, "otros": otros,
                "fecha": fecha, "valoracion": valoracion}
    return datos
}

/**
 * Validate that all the inputs has been filled
 * @param {*} data 
 */
function validateAllValues(data){
  return !Object.values(data).includes("")
}

/**
 * Valifate the Codigo Postal based on the locality 
 * @param datos: 
 */
function validateCP(datos) {

  let result = {mensage: "", color: ""}

  const localidad = datos.localidad.toLowerCase();

  // In case the user introduces the CP without the first 0 (Ex. as 2829 instead of 02829)
  if (datos.cpostal.length<5){
    result.mensage = "No se corresponde la localidad con el codigo postal";
    result.color ="red"
    return result
  
  } else {
    var cp = Number(datos.cpostal.substring(0,2));
  }
    

  if(!CodPostalMap.hasOwnProperty(localidad)){
    result.mensage = "No existe esta localidad";
    result.color = "red"
  } else if (CodPostalMap[localidad]==cp){
    result.mensage = "El código postal corresponde a " + localidad;
    result.color = "green"
  } else {
    result.mensage = "No se corresponde la localidad con el codigo postal";
    result.color ="red"
  }

  return result
}


//AUTOCOMPLETE
autocomplete(document.getElementById("localidad"), Object.keys(CodPostalMap))

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
        }
      }
    }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }