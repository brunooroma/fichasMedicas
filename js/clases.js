class Consultorio {
    constructor(medicos,pacientes){
        this.medicos = medicos;
        this.pacientes = pacientes;
    }
    mostrarMedicos() {
        this.medicos.forEach(e => console.log(`${e.apellidoMedico} ${e.nombreMedico}`));
    }
}

class Medico {
    constructor(ID, apellido, nombre, matricula){
        this.medicoID = parseInt(ID);
        this.apellidoMedico = apellido;
        this.nombreMedico = nombre;
        this.matriculaMedico = parseInt(matricula);
    }
    mostrarMedico() {
         return `El medico es: \n ${this.apellidoMedico} ${this.nombreMedico} \n`;
    }
}

class Paciente {
    constructor(ID, apellido, nombre, edad, diagnostico, medicoID) {
        this.pacienteID = parseInt(ID);
        this.apellidoPaciente = apellido;
        this.nombrePaciente = nombre;
        this.edadPaciente = parseInt(edad);
        this.diagnosticoPaciente = diagnostico;
        this.medicoID = parseInt(medicoID);
    }
    mostrarPaciente() {
        return `${this.apellidoPaciente} ${this.nombrePaciente} \n Diagnostico: ${this.diagnosticoPaciente}`;
    }

    mostrarMedicoTratante() {
        switch (this.medicoID) {
            case 1:
                return `${medico1.mostrarMedico()}`
                break;
            case 2:
                return `${medico2.mostrarMedico()}`
                break;
            case 3:
                return `${medico3.mostrarMedico()}`
                break;
            case 4:
                return `${medico4.mostrarMedico()}`
                break;      
            default:
                return `No tiene medico asignado`;
                break;
        }
    }
}

const medico1 = new Medico(1,'Suarez','Pablo',123456);
const medico2 = new Medico(2,'Marquez','Mariela',118321);
const medico3 = new Medico(3,'Zapata','Florencia',98456);
const medico4 = new Medico(4,'Fernandez','Esteban',102354);
const medico5 = new Medico(5,'Ramirez','Estela',121854);
const medico6 = new Medico(6,'Santos','Mauricio',54623);
const medico7 = new Medico(7,'Lopez','Hernan',130587);
const medico8 = new Medico(8,'Perez','Sofia',135497);
const medico9 = new Medico(9,'Suarez','Fabiana',104202);
const medico10 = new Medico(10,'Martinez','Gerardo',110290);
const medico11 = new Medico(11,'Hernandez','Soledad',87250);
const medico12 = new Medico(12,'Garcia','Fabian',65326);

console.log(medico1.mostrarMedico());
console.log(medico2.mostrarMedico());
console.log(medico3.mostrarMedico());
console.log(medico4.mostrarMedico());

const arrMedicos = [];

arrMedicos.push(medico1);
arrMedicos.push(medico2);
arrMedicos.push(medico3);
arrMedicos.push(medico4);
arrMedicos.push(medico5);
arrMedicos.push(medico6);
arrMedicos.push(medico7);
arrMedicos.push(medico8);
arrMedicos.push(medico9);
arrMedicos.push(medico10);
arrMedicos.push(medico11);
arrMedicos.push(medico12);


arrMedicos.forEach(medico => console.log(medico.apellidoMedico));

const arrMedicosApellido = arrMedicos.map(e => e.apellidoMedico);

arrMedicosApellido.sort();

const arrDiagnosticos = ['Dolor de Cabeza','Esguince de Tobillo','Asma','Fiebre'];

arrDiagnosticos.push('Vomitos');
arrDiagnosticos.push('Lumbalgia');
arrDiagnosticos.push('Hipertension');

arrDiagnosticos.sort();
arrDiagnosticos.forEach(e => console.log(e + '\n'));

const paciente1 = new Paciente(1,'Rodriguez','Juan',50,arrDiagnosticos[1],1);
const paciente2 = new Paciente(2,'Acosta','Rosa',50,arrDiagnosticos[0],2);
const paciente3 = new Paciente(3,'Jimenez','Mabel',50,arrDiagnosticos[4],3);
const paciente4 = new Paciente(4,'Galimberti','Jose',50,arrDiagnosticos[3],5);

console.log(paciente1.mostrarMedicoTratante());
console.log(paciente2.mostrarMedicoTratante());
console.log(paciente3.mostrarMedicoTratante());
console.log(paciente4.mostrarMedicoTratante());

const arrPacientes = [];

arrPacientes.push(paciente1);
arrPacientes.push(paciente2);
arrPacientes.push(paciente3);
arrPacientes.push(paciente4);

const consultorio = new Consultorio(arrMedicos,arrPacientes);

consultorio.mostrarMedicos();