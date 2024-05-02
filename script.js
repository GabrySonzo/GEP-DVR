import { jsPDF } from "jspdf";

var costanti = [[30,20],[20,15]];
var altezze = [0.78, 0.85, 0.93, 1.00, 0.93, 0.85, 0.78, 0.00];
var dislocazioni = [1.00, 0.97, 0.93, 0.91, 0.88, 0.87, 0.85, 0.00];
var distanze = [1.00, 0.83, 0.63, 0.50, 0.45, 0.42, 0.00];
var angoli = [1.00, 0.90, 0.81, 0.71, 0.62, 0.57, 0.00];
var prese = [1.00, 0.90];
var frequenze = [[1.00, 0.94, 0.84, 0.75, 0.52, 0.37, 0.00],
                 [0.95, 0.88, 0.72, 0.50, 0.30, 0.21, 0.00],
                 [0.85, 0.75, 0.45, 0.27, 0.15, 0.00, 0.00]];

function calcola(){
    var eta = document.querySelector('input[name="eta"]:checked').value;
    var sesso = document.querySelector('input[name="sesso"]:checked').value;
    var costante = costanti[eta][sesso];
    var altezza = altezze[document.getElementById("altezza").value];
    var dislocazione = dislocazioni[document.getElementById("dislocazione").value];
    var distanza = distanze[document.getElementById("distanza").value];
    var angolo = angoli[document.getElementById("angolo").value];
    var presa = prese[document.querySelector('input[name="presa"]:checked').value];
    var frequenza = document.getElementById("frequenza").value;
    var durata = document.querySelector('input[name="durata"]:checked').value;
    var relazione = frequenze[durata][frequenza];
    var peso = document.getElementById("peso").value;

    var limite = costante * altezza * dislocazione * distanza * angolo * presa * relazione;
    var risultato = peso/limite;
    document.getElementById("risultato").innerHTML = risultato;
}

function createPdf() {
    
    var doc = new jsPDF();
    doc.text(20, 20, 'Dati del form:');
    
    // Recupera tutti i dati dal form
    var formData = new FormData(document.querySelector('form'));
    var data = {};
    for (var [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Aggiungi i dati al PDF
    var yPos = 30;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            doc.text(20, yPos, key + ': ' + data[key]);
            yPos += 10;
        }
    }
    
    // Salva il PDF
    doc.save('risultato.pdf');
}
