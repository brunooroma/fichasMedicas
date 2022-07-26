class Medico {
    constructor(ID, apellido, nombre, especialidad){
        this.medicoID = parseInt(ID);
        this.apellidoMedico = apellido;
        this.nombreMedico = nombre;
        this.especialidadMedico = especialidad;
    }
}

class Paciente {
    constructor(ID, apellido, nombre, edad, email, medicoID) {
        this.pacienteID = parseInt(ID);
        this.apellidoPaciente = apellido;
        this.nombrePaciente = nombre;
        this.edadPaciente = parseInt(edad);
        this.emailPaciente = email;
        this.medicoID = parseInt(medicoID);
    }
}

const paciente1 = new Paciente(1,'Rodriguez','Juan',50,'jrodriguez@gmail.com',1);
const paciente2 = new Paciente(2,'Acosta','Rosa',50,'racosta@gmail.com',2);
const paciente3 = new Paciente(3,'Jimenez','Mabel',50,'mjimenez@hotmail.com',3);
const paciente4 = new Paciente(4,'Galimberti','Jose',50,'jgalimberti@outlook.com',5);

let arrPacientes = [];

arrPacientes.push(paciente1);
arrPacientes.push(paciente2);
arrPacientes.push(paciente3);
arrPacientes.push(paciente4);