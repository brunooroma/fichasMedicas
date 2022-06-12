class Paciente {
    constructor (apellido, nombre, edad) {
        this.apellido = apellido
        this.nombre = nombre
        this.edad = edad
    }
    
    mostrarPaciente() {
        return `${this.apellido} ${this.nombre}`;
    }
}

const paciente1 = new Paciente('Rodriguez','Jose',42);
const paciente2 = new Paciente('Perez','Maria',58);
const paciente3 = new Paciente('Ramirez','Pablo',18);
const paciente4 = new Paciente('Lopez','Laura',33);
const paciente5 = new Paciente('Ruiz','Paola',39);

/* console.log(paciente1.mostrarPaciente()); */

class DetalleHistoria {
    constructor(paciente, diagnostico) {
        this.paciente = paciente
        this.diagnostico = diagnostico
    }

    mostrarHistoria() {
            return this.paciente.mostrarPaciente() + '\n' + ` Diagnostico: ${this.diagnostico}, Edad: ${this.paciente.edad}`
    }
}

const detalleHistoria1 = new DetalleHistoria(paciente1,'Diabetes');
const detalleHistoria2 = new DetalleHistoria(paciente2,'Neumonia');
const detalleHistoria3 = new DetalleHistoria(paciente3,'Hipertension');
const detalleHistoria4 = new DetalleHistoria(paciente4,'Vomitos');
const detalleHistoria5 = new DetalleHistoria(paciente5,'Lumbalgia');

/* console.log(detalleHistoria3.mostrarHistoria()); */

class Consulta {
    constructor(fecha, detalles) {
        this.fecha = fecha;
        this.detalles = detalles;
    }

    mostrarConsulta() {
        let texto = 'Fecha de la consulta ' + this.fecha + '\n';
        for (const dh of this.detalles) {
            texto = texto + dh.mostrarHistoria() + '\n'
        }
        return texto;
    }
}

const array = [];

array.push(detalleHistoria1);
array.push(detalleHistoria2);
array.push(detalleHistoria3);
array.push(detalleHistoria4);
array.push(detalleHistoria5);

const consulta1 = new Consulta(new Date().toDateString(), array);

console.log(consulta1.mostrarConsulta())