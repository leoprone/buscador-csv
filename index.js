
/* 



setTimeout(() => {
    document.getElementById("video1").play();
  }, 8000);

 */


const btnAbrirModal = document.getElementById("btn-abrir-modal"),
btnModal = document.getElementById("btn-modal"),
contenedorModal = document.getElementById("contenedor-modal");


btnAbrirModal.addEventListener("click", ()=> {
 
  contenedorModal.classList.remove("display-none");

  
});

btnModal.addEventListener("click", ()=> {
  contenedorModal.style.display = "none";
  
  btnAbrirModal.addEventListener("click", ()=> {
  
    contenedorModal.style.display = "block";

    
  });
  
});

const contenedorResultados = document.querySelector("#resultados");

      const toggleDarkMode = () => {
          document.body.classList.toggle('dark-mode');
          
          const isDarkMode = document.body.classList.contains('dark-mode');
        
          localStorage.setItem('dark-mode', isDarkMode);
        
        };
        
        // Aplicar el modo oscuro si estaba habilitado anteriormente
        if (localStorage.getItem('dark-mode') === 'true') {
          document.body.classList.add('dark-mode');
         
        }
        

        const darkModeToggle = document.getElementById('dark-mode-toggle');
        darkModeToggle.addEventListener('click', toggleDarkMode);
      
      
      
      
      
      
      
      
      const fileInput = document.getElementById("csvFile");
      const fileNameElement = document.getElementById("fileName");
      const mapSection = document.getElementById("map-section");
      
      
     /*  const contenedorTabla = document.getElementById("contenedor-tabla"); */
      const saveAsCsv = document.getElementById("guardar-como-csv"),
      saveAsJson = document.getElementById("guardar-como-json"),
   
      cargarCSVButton = document.getElementById("cargar-CSV-Button"),
      
     cargarXLSXButton = document.getElementById("cargar-XLSX-Button");
      
      
      function generarIds(json){
          return json.map((row, index)=>{
              if(!row.id){
                  row.id = `row-${index}`; // genera un id único si no existe
              }
              return row;
          });
      }
      
    




      function mostrarNombreArchivo(input, nameElement) {
        
          if (input.files.length > 0) { // si hay al menos 1 archivo CSV seleccionado
               // mostramos el nombre del archivo .csv
              nameElement.textContent = "archivo: " + input.files[0].name;
         
          } else {
              nameElement.textContent = "No se ha seleccionado ningún archivo"; // Texto predeterminado
          }
       }
      
      
      
      
      
      
      
       function cargarCSV(fileInput, fileNameElement) {
          
            saveAsCsv.classList.add("display-none");
            saveAsJson.classList.add("display-none");
            // csv es el archivo CSV cargado
            const archivo = fileInput.files[0];
            
            
            if (archivo) { 
              
                mostrarNombreArchivo(fileInput, fileNameElement);
                fileNameElement.classList.remove("display-none");
                
                saveAsCsv.classList.remove("display-none");
                saveAsJson.classList.remove("display-none");
                
                return archivo;
        
            } else {
                alert("Por favor, selecciona un archivo CSV.");
            } 
      
      }
      
      
      
    






    function convertirACsv(rows) {
                const csvContenido = rows.map(e => e.join(",")).join("\n");
           
               
                return csvContenido;
              }
  
      
  
 


function guardarComoCSV(datos) {
 
  const modal = document.getElementById("modalNombreArchivo");
  const input = document.getElementById("nombreArchivo");
  const confirmarBtn = document.getElementById("confirmarNombreBtn");
  const cancelarBtn = document.getElementById("cancelarNombreBtn");
  const separadorSelect = document.getElementById("separadorCSV"); 

  document.getElementById("elegir-separador-csv").style.display="block";

  input.value = ""; // limpiar campo
  modal.classList.remove("display-none");

  confirmarBtn.onclick = () => {
    let nombreArchivo = input.value.trim();
    if (!nombreArchivo) {
      nombreArchivo = "filtrado";
    }
    if (!nombreArchivo.toLowerCase().endsWith(".csv")) {
      nombreArchivo += ".csv";
    }

    const separador = separadorSelect.value; 

    const csv = Papa.unparse(datos, {
      delimiter: separador
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    descargarCsv.style.display="none";
    claveOpciones.style.display="none";
    modal.classList.add("display-none");
    
  };

  cancelarBtn.onclick = () => {
    modal.classList.add("display-none");
    descargarCsv.style.display ="none";
    claveOpciones.style.display ="none";
    switchBtn.classList.add("display-none");
  };
}


    
      const descargarCsv = document.getElementById('descargar-csv');
    
      descargarCsv.addEventListener("click", ()=>{
                   
           descargarJSONFiltrado('csv');
      });


  
      
 
      function elegirClaves(resultadoFiltrado){
      
        const claves = obtenerClavesUnicas(resultadoFiltrado);
        claves.pop();
        
        generarCheckboxes(claves);
        claveOpciones.style.display ="block";
        switchBtn.classList.remove("display-none");
      }


  saveAsCsv.addEventListener("click", ()=> {
      
        descargarCsv.style.display ="block";
        saveAsXlsx.classList.add("display-none");
        saveAsJson.classList.add("display-none");
       // Distinción entre Datos SIN FILTRAR y DATOS FILTRADOS
        if(resultadoFiltrado.length === 0){
          elegirClaves(jsonGlobal);
        }else{
        elegirClaves(resultadoFiltrado);
        }


        saveAsCsv.classList.add("display-none");
        
        descargarCsv.classList.remove("display-none");
        descargarCsv.textContent="Guardar campos";
      });
      






 const saveAsXlsx = document.getElementById("guardar-como-xlsx");

  saveAsXlsx.addEventListener("click", ()=> {
      
        descargarXlsx.style.display ="block";
        saveAsCsv.classList.add("display-none");
        saveAsJson.classList.add("display-none");
       // Distinción entre Datos SIN FILTRAR y DATOS FILTRADOS
        if(resultadoFiltrado.length === 0){
          elegirClaves(jsonGlobal);
        }else{
        elegirClaves(resultadoFiltrado);
        }


        saveAsXlsx.classList.add("display-none");
        
        descargarXlsx.classList.remove("display-none");
        descargarXlsx.textContent="Guardar campos";
      });
      




      saveAsJson.addEventListener("click", ()=> {
          descargarJson.style.display ="block";
          saveAsCsv.classList.add("display-none");
          saveAsXlsx.classList.add("display-none");

          // Distinción entre Datos SIN FILTRAR y DATOS FILTRADOS
        if(resultadoFiltrado.length === 0){
          elegirClaves(jsonGlobal);
        }else{
        elegirClaves(resultadoFiltrado);
        }



      
        saveAsJson.classList.add("display-none");
        
        descargarJson.classList.remove("display-none");
        descargarJson.textContent="Guardar campos";
        
      });
       



      

      const descargarXlsx = document.getElementById("descargar-xlsx");
      
      descargarXlsx.addEventListener("click", ()=>{
                   
           descargarJSONFiltrado('xlsx');
      });




      const descargarJson = document.getElementById("descargar-json"),
      claveOpciones=document.getElementById("claveOpciones");
     

      descargarJson.addEventListener("click", ()=>{
                   
           descargarJSONFiltrado('json');
      });

      


    const switchBtn=document.getElementById("switch-btn");

    switchBtn.addEventListener("click", ()=>{
        claveOpciones.classList.add("display-none");
        switchBtn.classList.add("display-none");
        descargarCsv.classList.add("display-none");
        saveAsCsv.classList.remove("display-none");
        descargarXlsx.classList.add("display-none");
        saveAsXlsx.classList.remove("display-none");
        descargarJson.classList.add("display-none");
        saveAsJson.classList.remove("display-none");
        descargarCsv.style.display ="none";
        descargarXlsx.style.display ="none";
        descargarJson.style.display ="none";
        claveOpciones.style.display ="none";
    });


 // 🔍 Extrae todas las claves únicas del JSON
    function obtenerClavesUnicas(datos) {
      const conjunto = new Set();
      datos.forEach(obj => {
        Object.keys(obj).forEach(clave => conjunto.add(clave));
      });
       
      return Array.from(conjunto);
    }

    // 🎨 Genera dinámicamente los checkboxes
    function generarCheckboxes(claves) {
      const contenedor = document.getElementById("claveOpciones");
      contenedor.innerHTML = "";
     

      claves.forEach(clave => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.value = clave;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + clave));
        contenedor.appendChild(label);
      });
    }

    // 🧹 Filtra el objeto original por claves seleccionadas
    function filtrarClaves(objeto, clavesPermitidas) {
      if (Array.isArray(objeto)) {
        return objeto.map(item => filtrarClaves(item, clavesPermitidas));
      } else if (typeof objeto === 'object' && objeto !== null) {
        const nuevoObjeto = {};
        for (const clave of clavesPermitidas) {
          if (clave in objeto) {
            nuevoObjeto[clave] = objeto[clave];
          }
        }
        return nuevoObjeto;
      }
      return objeto;
    }


function guardarComoJSON(datosFiltrados) {
  const modal = document.getElementById("modalNombreArchivo");
  const input = document.getElementById("nombreArchivo");
  const confirmarBtn = document.getElementById("confirmarNombreBtn");
  const cancelarBtn = document.getElementById("cancelarNombreBtn");
  const tituloModal = modal.querySelector("h3");
  

  input.value = ""; // limpiar campo
  tituloModal.textContent = "Guardar como JSON";
  modal.classList.remove("display-none");
// ocultamos el selector de separador (debe estar solo para descargar CSV, no JSON)
  document.getElementById("elegir-separador-csv").style.display ="none";

  confirmarBtn.onclick = () => {
    let nombreArchivo = input.value.trim();
    if (!nombreArchivo) {
      nombreArchivo = "filtrado";
    }
    if (!nombreArchivo.toLowerCase().endsWith(".json")) {
      nombreArchivo += ".json";
    }

    const blob = new Blob([JSON.stringify(datosFiltrados, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    descargarJson.style.display="none";
    claveOpciones.style.display="none";
    modal.classList.add("display-none");

   /*  descargarJson.classList.add("display-none"); */
     descargarJson.style.display ="none";
    claveOpciones.classList.add("display-none");
    saveAsJson.classList.remove("display-none");
    switchBtn.classList.add("display-none");
  };

  cancelarBtn.onclick = () => {
    modal.classList.add("display-none");
    descargarJson.style.display ="none";
    claveOpciones.style.display ="none";
    switchBtn.classList.add("display-none");
  };
}







    function clavesJsonElegidas(){
       
         const checkboxes = document.querySelectorAll('#claveOpciones input[type="checkbox"]');
    
        
         const clavesSeleccionadas = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
        
        
        
         return clavesSeleccionadas;
    }


 let datosFiltrados = [];






 function guardarComoXLSX(datos) {
  const modal = document.getElementById("modalNombreArchivo");
  const input = document.getElementById("nombreArchivo");
  const confirmarBtn = document.getElementById("confirmarNombreBtn");
  const cancelarBtn = document.getElementById("cancelarNombreBtn");

  document.getElementById("elegir-separador-csv").style.display = "none"; // ocultar si no aplica

  input.value = "";
  modal.classList.remove("display-none");

  confirmarBtn.onclick = () => {
    let nombreArchivo = input.value.trim();
    if (!nombreArchivo) {
      nombreArchivo = "filtrado";
    }
    if (!nombreArchivo.toLowerCase().endsWith(".xlsx")) {
      nombreArchivo += ".xlsx";
    }

    // Crear hoja desde JSON
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Descargar archivo
    XLSX.writeFile(workbook, nombreArchivo);

    descargarXlsx.style.display = "none";
    claveOpciones.style.display = "none";
    modal.classList.add("display-none");
    switchBtn.classList.add("display-none");
  };

  cancelarBtn.onclick = () => {
    modal.classList.add("display-none");
    descargarXlsx.style.display = "none";
    claveOpciones.style.display = "none";
    switchBtn.classList.add("display-none");
  };
}







function descargarJSONFiltrado(formato) {
    const clavesSeleccionadas = clavesJsonElegidas();

    if (clavesSeleccionadas.length === 0) {
        if(formato==='csv'){
             descargarCsv.textContent = "Seleccionar Campos";
             
        }else if(formato==='json'){
             descargarJson.textContent = "Seleccionar Campos";
        }else if(formato === 'xlsx'){
             descargarXlsx.textContent = "Seleccionar Campos";
        }
        
        switchBtn.classList.remove("display-none");
        claveOpciones.classList.remove("display-none");
        return;
    }

   
    // Distinción entre Datos Sin Filtrar y Datos Filtrados

    if(resultadoFiltrado.length === 0){
      datosFiltrados = filtrarClaves(jsonGlobal, clavesSeleccionadas);
      
    }else{

    datosFiltrados = filtrarClaves(resultadoFiltrado, clavesSeleccionadas);
   
    }

    if(formato==='csv'){
        descargarCsv.textContent = "Descargar CSV";
        guardarComoCSV(datosFiltrados);
        
    }else if(formato==='json'){
        descargarJson.textContent = "Descargar JSON";
        guardarComoJSON(datosFiltrados); 
        
    }else if(formato==='xlsx'){
        descargarXlsx.textContent = "Descargar XLSX";
        guardarComoXLSX(datosFiltrados);
    }
    saveAsCsv.classList.remove("display-none");
    saveAsJson.classList.remove("display-none");
    saveAsXlsx.classList.remove("display-none");
    
}








const contenedorLupa = document.getElementById("contenedor-lupa");


// ANIMACIÓN TÍTULO ("BUSCADOR")
       
function animacionTitulo(){
 contenedorLupa.style.display = "block";
    

    const b = document.querySelector(".b"),
    u = document.querySelector(".u"),
    s = document.querySelector(".s"),
    c = document.querySelector(".c"),
    a = document.querySelector(".a"),
    d = document.querySelector(".d"),
    o = document.querySelector(".o"),
    r = document.querySelector(".r");

    setTimeout(()=>{
      contenedorLupa.style.display = "none";
        b.classList.remove("display-none");
       b.classList.add("aparicion");
    },5000);

     setTimeout(()=>{
       u.classList.remove("display-none");
       u.classList.add("aparicion");
       b.classList.remove("aparicion");
    },5500);

     setTimeout(()=>{
       s.classList.remove("display-none");
       s.classList.add("aparicion");
       u.classList.remove("aparicion");
    },5800);

     setTimeout(()=>{
       c.classList.remove("display-none");
       c.classList.add("aparicion");
       s.classList.remove("aparicion");
    },7000);

     setTimeout(()=>{
       a.classList.remove("display-none");
       a.classList.add("aparicion");
       c.classList.remove("aparicion");
    },7800);

     setTimeout(()=>{
       d.classList.remove("display-none");
       d.classList.add("aparicion");
       a.classList.remove("aparicion");
    },8500);

     setTimeout(()=>{
       o.classList.remove("display-none");
       o.classList.add("aparicion");
       d.classList.remove("aparicion");
    },9000);

     setTimeout(()=>{
       r.classList.remove("display-none");
       r.classList.add("aparicion");
       o.classList.remove("aparicion");
    },9200);

     setTimeout(()=>{
        b.classList.add("display-none");
        u.classList.add("display-none");
        s.classList.add("display-none");
        c.classList.add("display-none");
        a.classList.add("display-none");
        d.classList.add("display-none");
        o.classList.add("display-none");
        r.classList.add("display-none");
        
       animacionTitulo();
    },15000);
}
      
let jsonGlobal; // Variable global para almacenar el JSON

/* const fileId = '1mhLUAF-lti-SOKG9VPDgJM_ZgW0xRP-s'; 
 const fileId = '1CTgKQkU1aJdE5siJUAyIz6nxlswJbYWW';
const url = `https://corsproxy.io/?https://drive.google.com/uc?export=download&id=${fileId}`;*/
//  1z1JkR3N5oMUET-6X5HCUmj8txy3aavDAebrvpeQg5nk 
document.addEventListener("DOMContentLoaded", animacionTitulo);



 /*       
 function cargaDirectamenteCSV() {
  
          animacionTitulo();
            

           cargarCSVButton.style.display="none"; 
           mapSection.classList.remove("display-none");
          
          
           fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('No se pudo cargar el CSV');
                    return response.text();
                })
                .then(csv => inicio(csv))
                .catch(error => console.error(error));

            }
 
     */    


      
cargarCSVButton.addEventListener("click", function () {
           /* const fileInput = document.getElementById("csvFile"); */
          document.getElementById("csvFile").value = ""; 
          document.getElementById("csvFile").click();  // Abre el selector de archivos
           confirmarSeparadorBtn.style.display="inline-block";
           
          confirmarSeparadorBtn.classList.add("animacion-btn");
        
      });
      
     

       // Manejador para cuando se selecciona un archivo
document.getElementById("csvFile").addEventListener("change", function () {
   
    const archivo = fileInput.files[0];

    if (!archivo) {
      alert("Por favor, selecciona un archivo CSV.");
      return;
    }

     
    inicio(archivo); // Aquí inicias tu flujo completo

   /*  cargarCSVButton.textContent="Cambiar de archivo"; */
});
       
      

cargarXLSXButton.addEventListener("click", function () {
           /* const fileInput = document.getElementById("csvFile"); */
          document.getElementById("xlsxInput").value = ""; 
          document.getElementById("xlsxInput").click();  // Abre el selector de archivos
          confirmarSeparadorBtn.style.display="inline-block";
           
          confirmarSeparadorBtn.classList.add("animacion-btn"); 
        
      });
      
     






    document.getElementById("xlsxInput").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          const contenidoCSV = XLSX.utils.sheet_to_csv(worksheet);

          // Usás la nueva función que ya tiene el contenido CSV
          iniciarDesdeTextoCSV(contenidoCSV, file.name);
          
        };
        reader.readAsArrayBuffer(file);
      });





      
      function conectorEditorBuscador(csv) {
          convertidorCsvAJson(csv)
              .then(jsonData => {
                  jsonGlobal = generarIds(jsonData); // Guardar en jsonGlobal
                  inicioBuscador(jsonGlobal);
                  
              })
              .catch(err => {
                  console.error("Error al procesar el archivo:", err.message);
              });
      }
      
      


      

      
    
      function funcionesDelBuscador(){
        mapSection.classList.remove("display-none");
   
      }
      



    function iniciarDesdeTextoCSV(contenidoCSV, nombreArchivo = "archivo.xlsx convertido") {
        fileNameElement.textContent = nombreArchivo;
        fileNameElement.classList.remove("display-none");

        document.getElementById("selectorSeparadorContainer").classList.remove("display-none");
        document.getElementById("selectorSeparadorContainer").scrollIntoView({ behavior: 'smooth' }); 

        const separadorDetectado = detectarSeparador(contenidoCSV);
        mostrarSelectorSeparador(separadorDetectado, contenidoCSV);
      }


       



function inicio(archivo) {


/* 
   // ✅ Resetear input para permitir recarga del mismo archivo


  const archivo = fileInput.files[0];

  if (!archivo) {
    alert("Por favor, selecciona un archivo CSV.");
    return;
  }
 */

  document.getElementById("selectorSeparadorContainer").classList.remove("display-none");
  document.getElementById("selectorSeparadorContainer").scrollIntoView({ behavior: 'smooth' });  

  fileNameElement.textContent = archivo.name;
  fileNameElement.classList.remove("display-none");

  

  const lector = new FileReader();
  lector.onload = function (e) {
   
    const contenido = e.target.result;
    
    const separadorDetectado = detectarSeparador(contenido);
   
    mostrarSelectorSeparador(separadorDetectado, contenido);
  };
  lector.readAsText(archivo);
}

function detectarSeparador(csvText) {
  const posiblesSeparadores = [',', ';', '\t', '|'];
  const lineas = csvText.split('\n').slice(0, 5);
  const puntuaciones = posiblesSeparadores.map(sep =>
    lineas.map(linea => linea.split(sep).length).reduce((a, b) => a + b, 0)
  );
  const mejorIndice = puntuaciones.indexOf(Math.max(...puntuaciones));
 
  return posiblesSeparadores[mejorIndice];
}

const confirmarSeparadorBtn = document.getElementById("confirmarSeparadorBtn");


function mostrarSelectorSeparador(separadorDetectado, contenido) {
  const selector = document.getElementById("selectorSeparador");
  const contenedor = document.getElementById("selectorSeparadorContainer");
  contenedor.classList.remove("display-none");
  contenedor.classList.add("selectorSeparadorContainer");
  selector.value = separadorDetectado;
  



  confirmarSeparadorBtn.onclick = () => {
    const separadorElegido = selector.value;
    procesarCSV(contenido, separadorElegido);
    confirmarSeparadorBtn.style.display="none";
    
  };
}



function procesarCSV(csvText, separador) {
  convertidorCsvAJson(csvText, separador)
    .then(jsonData => {
      jsonGlobal = generarIds(jsonData); // tu lógica
      inicioBuscador(jsonGlobal);       // tu lógica
    })
    .catch(err => {
      console.error("Error al procesar el archivo:", err.message);
    });
}

function convertidorCsvAJson(csv, separador = ',') {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      delimiter: separador,
      complete: function (results) {
        resolve(results.data);
      },
      error: function (err) {
        reject(new Error("Error al cargar el archivo: " + err.message));
      },
    });
  });
}




      
      // -----------------------   BUSCADOR   --------------------------------
      
      
      
      
      const inputBuscador = document.getElementById("buscador");
    
      
      
      inputBuscador.addEventListener("pointerdown", function(event) {
          const input = event.target;
          if (input.disabled) {
              input.style.opacity="0.4";
              input.value = "";
              input.placeholder = "No hay Campos fijados";
            
              
            event.preventDefault(); // Previene el comportamiento predeterminado.
            event.stopPropagation(); // Evita que el evento se propague.
          }else{
              input.style.opacity="1";
              input.placeholder ="Buscar por términos clave...";
          }
        });
      
      
      
      

// Función para eliminar tildes (normalizar texto). Sirve para normalizar texto ingresado por inputs

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normaliza y elimina diacríticos
}


     

let textoAcumulado = ""; 
let gruposDePalabras = [];  // se usan para filtrar cada obj JSON por la coincidencia 
// con todos los terminos (o sus sinónimos) 

/* let arregloSinonimos = [["polimeros", "biopolimeros", "secuencia de aminoacidos"], ["materiales", "biomateriales", "biomat"], ["materiales", "mat"]]; */
let resultadoFiltrado = [];   

      


function buscar(inputBuscador, dondeBuscar, opciones) {

 
        inputBuscador.addEventListener("input", ()=>{
            if(inputBuscador.value ===""){
                gruposDePalabras = [];
            }
        });




        let timeout;

            inputBuscador.addEventListener("input", function(){
                // Estilo del input según su contenido
                if (inputBuscador.value.trim() !== "") {
                    document.getElementById("contenedor-guardar-btns").classList.remove("display-none");
                    inputBuscador.classList.add("buscador-lleno");
                    inputBuscador.classList.remove("buscador-vacio");
                } else {
                    inputBuscador.classList.add("buscador-vacio");
                    inputBuscador.classList.remove("buscador-lleno");
                }
                 if (timeout) {
                    clearTimeout(timeout); // Limpiar el timeout anterior solo si existe
                }

                if(inputBuscador.value.trim().length >= 2){
                  
                    timeout = setTimeout(() => {
                        
                           
                    
                        // Limpiar y procesar texto ingresado
                        textoAcumulado = quitarTildes(inputBuscador.value.trim().toLowerCase());
                
                        // Reiniciar gruposDePalabras
                        gruposDePalabras = []; // Vaciar gruposDePalabras al actualizar el texto
                    
                        // Dividir texto en palabras y procesar cada una
                        const palabras = textoAcumulado.split(/\s+/).filter(palabra => palabra.length > 0); // Filtrar palabras vacías
                    
                        palabras.forEach(palabra => {
                            if (palabra) {
                                let grupoCoincide = false;
                    
                                // Buscar sinónimos en el arreglo de sinónimos
                            /* console.log("sinónimos desde funcion buscar: ", arregloTotal); */
                            let gruposFiltrados = arregloTotal.filter(grupo => {
                                if (grupo.includes(palabra)) {
                                    grupoCoincide = true;
                                    return true;
                                }
                            });
                
                            // Acumular grupos filtrados en gruposDePalabras
                            gruposFiltrados.forEach(grupo => gruposDePalabras.push(grupo));
                
                            // Si no se encontró coincidencia, agregar la palabra como un nuevo grupo
                            if (!grupoCoincide) {
                                gruposDePalabras.push([palabra]);
                            }
                        }
                    });
                
                
                
                        // Filtrar el JSON basándote en gruposDePalabras
                        resultadoFiltrado = dondeBuscar.filter(item => {
                            return gruposDePalabras.every(grupo => {
                                return opciones.some(opcion => {
                                    let propiedad = item[opcion];
                                    if (!propiedad) return false; // Validar que la propiedad exista
                    
                                    const opcionLower = quitarTildes(propiedad.toLowerCase());
                                    return grupo.some(palabra => opcionLower.includes(palabra));
                                });
                            });
                        });
                    
                        if(resultadoFiltrado.length == 1){
                            document.getElementById("cantidad-resultados").textContent= resultadoFiltrado.length + " resultado";
                        }else{
                            document.getElementById("cantidad-resultados").textContent= resultadoFiltrado.length + " resultados";
                        }
                        
                        // Mostrar resultados filtrados
                        imprimirResultados(resultadoFiltrado, opciones);
                    }, 800);
                }
            });
            

      }
     
      
      
  



    function imprimirTodo(){
       /*  saveAsCsv.classList.remove("display-none");
         saveAsJson.classList.remove("display-none"); 
 */
         document.getElementById("cantidad-resultados").textContent= jsonGlobal.length + " resultados";
        contenedorResultados.innerHTML = ""; // Limpiar el contenedor
    
        contenedorResultados.classList.add("bg-display");

        const camposTotales = extractFields(jsonGlobal);
        


        jsonGlobal.forEach(item => {
            const h3 = document.createElement("h3");
            //muestra nombre del ente
           /*  h3.textContent = item['Label']; */
            /* h3.textContent = item['Nombre']+' '+ item['Apellido']; */
            h3.textContent = item[fields[0]];
            h3.style.color = "#91ffef";
            h3.style.fontSize = "18px";
            h3.style.marginLeft = "10px";
            h3.style.padding ="4px";
            h3.style.display ="block";
            h3.style.textAlign ="center";
            
            
            contenedorResultados.appendChild(h3);


            camposTotales.forEach((opcion) => { 
              
                if(/* opcion === camposTotales[0] || */ opcion === camposTotales[camposTotales.length-1]){
                     return;
                }     

             
                // para cada CAMPO
                 const h3 = document.createElement("h3");
                

               if(opcion === 'Web' && item[opcion]){
                    const a = document.createElement("a");
                    a.textContent = "ver sitio";
                    a.href = item[opcion].startsWith("http") ? item[opcion] : "https://" + item[opcion];
                    a.target = "_blank";
                    a.classList.add("link");
                    
                    h3.textContent = opcion + ": ";
                    
                    h3.appendChild(a);   
                    
                   
                }else{
                    
                    const textoCampo = opcion + ": "+ item[opcion];
                    h3.textContent = textoCampo;
                }
                                             
                  h3.classList.add("vistaResultado");
                  contenedorResultados.appendChild(h3);
              
                   
                         
                });
            
               const hr = document.createElement("hr");
            hr.style.border = "15px solid gray";
            contenedorResultados.appendChild(hr);
                
            }); 
            
         
            const hr = document.createElement("hr");
        
            contenedorResultados.appendChild(hr);
           
  
    }


    const verTodoBtn= document.querySelector("#ver-todo");

    verTodoBtn.addEventListener('click', ()=>{
         
         imprimirTodo();
         document.getElementById("contenedor-guardar-btns").classList.remove("display-none");
        /*  saveAsCsv.classList.add("display-none");
         saveAsJson.classList.add("display-none"); */
    });




function resaltarTextoSeguro(texto, busqueda) {
    if (!busqueda || busqueda.trim().length === 0) return [document.createTextNode(texto)];

    const palabras = quitarTildes(busqueda.trim().toLowerCase()).split(/\s+/).filter(p => p.length > 0);
    const partes = [];
    let cursor = 0;

    const regex = new RegExp(`(${palabras.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

    texto.replace(regex, (match, _, index) => {
        if (cursor < index) {
            partes.push(document.createTextNode(texto.slice(cursor, index)));
        }
        const mark = document.createElement("mark");
        mark.textContent = texto.slice(index, index + match.length);
        partes.push(mark);
        cursor = index + match.length;
    });

    if (cursor < texto.length) {
        partes.push(document.createTextNode(texto.slice(cursor)));
    }

    return partes;
}


 
      
      const div = document.getElementById("contenido-completo");
    
      const volverBtn = document.getElementById("volver-btn");

 



function mostrarContenidoCompleto(objeto, contenedor) {
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar contenido

    for (const [clave, valor] of Object.entries(objeto)) {
        if (clave === 'id') continue;

        const p = document.createElement("p");
        p.classList.add("p-contenido-completo");
        p.textContent = `${clave}: ${JSON.stringify(valor, null, 2)}`;
        contenedor.appendChild(p);
    }

    claveOpciones.classList.add("display-none");
    switchBtn.classList.add("display-none");
    saveAsCsv.classList.remove("display-none");
    saveAsJson.classList.remove("display-none");
    descargarCsv.classList.add("display-none");
    descargarJson.classList.add("display-none");
    volverBtn.classList.remove("invisible");

    volverBtn.addEventListener("click", () => {
        contenedor.style.display = 'none';
        volverBtn.classList.add("invisible");
    });
}





function imprimirResultados(resultadoFiltrado, opciones) {
    contenedorResultados.replaceChildren(); // Limpieza segura y moderna
    contenedorResultados.classList.add("bg-display");

    resultadoFiltrado.forEach(item => {
       
   
        const h3 = document.createElement("h3");
        h3.textContent = item[fields[0]];
        h3.style.color = "#91ffef";
        h3.style.fontSize = "18px";
        h3.style.margin = "4px 0 8px 0"; 
        h3.style.textAlign = "center";
        contenedorResultados.appendChild(h3);

        const verMasBtn = document.createElement("button");
        verMasBtn.textContent = "Ver más"; 
        verMasBtn.classList.add("ver-mas"); 
        contenedorResultados.appendChild(verMasBtn); 

        verMasBtn.addEventListener("click", function () {
            div.style.display = "block";
            mostrarContenidoCompleto(item, div); 
        });

        opciones.forEach(opcion => {

                if(opcion.toLowerCase() === 'web' && item[opcion]){
                    const a = document.createElement("a");
                    a.textContent = "ver sitio";
                    a.href = item[opcion].startsWith("http") ? item[opcion] : "https://" + item[opcion];
                    a.target = "_blank";
                    a.classList.add("link");
                    const h3 = document.createElement("h3");
                    h3.textContent = opcion + ": ";
                    
                    h3.appendChild(a);   
                    
                    h3.classList.add("vistaResultado");
                    contenedorResultados.appendChild(h3);
                }

                 if(opcion.toLowerCase() === 'logo' && item[opcion]){
                      return;
                }
            const textoOriginal = item[opcion].Highlighted || item[opcion];
            const nodos = resaltarTextoSeguro(textoOriginal, inputBuscador.value);

            const h3 = document.createElement("h3");
            h3.classList.add("vistaResultado");

            nodos.forEach(nodo => h3.appendChild(nodo));
            contenedorResultados.appendChild(h3);
        });

        const hr = document.createElement("hr"); 
        hr.style.border = "15px solid gray";
        contenedorResultados.appendChild(hr);
    });
}




let fields = [];
      
      
      function extractFields(data) {
          /* let fields = []; */
          if (Array.isArray(data)) {
            // Si es un array, obtiene los campos del primer objeto
            fields = Object.keys(data[0] || {});
          } else if (typeof data === "object") {
            // Si es un objeto, obtiene las claves directamente
            fields = Object.keys(data);
          }
          return fields;
        }
      
        
        const fieldsContainer = document.getElementById("fieldsContainer");
        const button = document.getElementById("fijarCampos"); // Crear botón
      
        function displayFields(fields, userJSON) {
          
           fields.pop();
          
           fieldsContainer.innerHTML = ""; 
         
      
          fields.forEach(field => {
              const label = document.createElement("label");
              const checkbox = document.createElement("input");
              const span = document.createElement("span");

              checkbox.type = "checkbox";
              
              checkbox.value = field;
              span.textContent = field;
              label.appendChild(checkbox);
              label.appendChild(span);

             /*  label.appendChild(document.createTextNode(field)); */
              fieldsContainer.appendChild(label);
              fieldsContainer.appendChild(document.createElement("br"));
              label.classList.add("opciones-check");
      
         
              // Escuchar cambios en los checkboxes
              checkbox.addEventListener("change", () => {
                  
                  // Verificar si al menos un checkbox está marcado
                  const anyChecked = Array.from(fieldsContainer.querySelectorAll("input[type='checkbox']"))
                                          .some(input => input.checked);
                  button.style.animationPlayState = anyChecked ? "running" : "paused"; 
                  button.disabled = !anyChecked;
                  inputBuscador.disabled = anyChecked;
      
                      // Acción específica para cuando un checkbox se desmarca
                  if (!checkbox.checked) {
                     inputBuscador.disabled = true;
                     button.innerHTML=`Fijar Campos`;
                     button.classList.add("animationBtn"); 

                  }
              });
          });
      
          fieldsContainer.appendChild(button);
          button.style.visibility = "visible";
          button.style.animationPlayState = "paused";
          
      
          // Asociar el evento click al botón
          button.addEventListener("click", () => {
             button.classList.remove("animationBtn"); 
             fijarCampos(userJSON);
             document.getElementById("cantidad-resultados").textContent =" ";
             saveAsCsv.classList.remove("display-none");
             saveAsJson.classList.remove("display-none");
/* 
             seleccionarTodoBtn.addEventListener("click", seleccionarCampos); */
          });
      }
      
      
      
      
      
      
      function fijarCampos(userJSON){
      
        /*   inputBuscador.scrollIntoView({ behavior: 'smooth' }); */
      
          button.innerHTML =`Campos fijados`;
          let opciones = [];
          opciones= capturarSeleccionados();
          
          if(opciones.length > 0){
               inputBuscador.style.opacity="1";
              inputBuscador.disabled = false; 
              inputBuscador.placeholder ="Buscar por términos clave..."; 
      
              buscar(inputBuscador, userJSON, opciones);
          }/* else{
          alert("no se fijó ningún campo");
          }
           */
      
          fieldsContainer.addEventListener("change", (e)=>{
              if(e.target.checked){
                  button.classList.add("animationBtn");
                  button.innerHTML =`Fijar campos`;
          }else{
              inputBuscador.style.opacity="1";
              inputBuscador.disabled = true; 
              inputBuscador.placeholder ="Seleccionar Campos";
          }
      });

     /*  seleccionadoTodo = false;
      seleccionarTodoBtn.addEventListener("click", seleccionarCampos);

  */
      }
     
      
      
      
        function inicioBuscador(userJSON){
          
          mapSection.classList.remove("display-none");
          document.getElementById("map-section").scrollIntoView({ behavior: 'smooth' });
           //  EXTRAEMOS LOS CAMPOS DEL JSON
           const fields = extractFields(userJSON);
           //  MOSTRAMOS LA LISTA DE CAMPOS DISPONIBLES PARA BÚSQUEDAS FUTURAS
           displayFields(fields, userJSON);
      
          
        }
      
      
      
          
      
      /* let seleccionadoTodo = false;
      const seleccionarTodoBtn = document.getElementById("seleccionar-todo-btn"); 

      seleccionarTodoBtn.addEventListener("click", seleccionarCampos);*/



      function seleccionarCampos(){
             
        
        /*  seleccionadoTodo = true; */

        button.classList.add("animationBtn");
        button.style.animationPlayState = "running";
  

          // Asociar el evento click al botón
          button.addEventListener("click", () => {
             button.classList.remove("animationBtn"); 
             fijarCampos(jsonGlobal);
             document.getElementById("cantidad-resultados").textContent =" ";
             saveAsCsv.classList.remove("display-none");
             saveAsJson.classList.remove("display-none");
             
            
             /* seleccionarTodoBtn.addEventListener("click", seleccionarCampos); 
              */
          });
      }

      
      
      
      
      function capturarSeleccionados() {
/* 
        let seleccionados = [];

        if(seleccionadoTodo){
           seleccionados = document.querySelectorAll("#fieldsContainer input[type='checkbox']");
      
           
        }else{
           seleccionados = document.querySelectorAll("#fieldsContainer input[type='checkbox']:checked");
          
        } */
         
        const seleccionados = document.querySelectorAll("#fieldsContainer input[type='checkbox']:checked");
        const valoresSeleccionados = Array.from(seleccionados).map(checkbox => checkbox.value);
        
        
        

        

        return valoresSeleccionados;
        
      }
      
      
      
      // Añadir el manejador de eventos `wheel` con la opción pasiva para evitar el error de rendimiento
      document.addEventListener("wheel", function(e) {
      // Tu código aquí, si es necesario
      }, { passive: true });

      


let arregloTotal = [];

