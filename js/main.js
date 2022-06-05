let nombre;
let apellido;
let especialidad;
let matricula;
let cantidadPacientes;
let tiempoTurno;
let horasTrabajadas = 0;

const solicitarNombre = () => {
    nombre = prompt('Ingrese su nombre');
    while (nombre === "" || !isNaN(nombre)) {
        nombre = prompt('Ingrese su nombre');
    }
}

const solicitarApellido = () => {
    apellido = prompt('Ingrese su apellido');
    while (apellido === "" || !isNaN(apellido)) {
        apellido = prompt('Ingrese su apellido');
    }
}

const solicitarEspecialidad = () => {
    especialidad = prompt('Ingrese su especialidad');
    while (especialidad === "" || !isNaN(especialidad)) { 
        especialidad = prompt('Ingrese su especialidad');
    }
}

const solicitarMatricula = () => {
    matricula = prompt('Ingrese su Matricula');
    while (isNaN(parseInt(matricula)) || matricula.length < 5 || matricula.length > 6)  {
        matricula = prompt('Ingrese su Matricula');
    }
}

const saludar = () => {
    alert(`Bienvenido/a Dr/a ${apellido}.`)
}

const pacientes = () => {
    cantidadPacientes = prompt('Ingrese la cantidad de pacientes que vera el dia de hoy:');
    while (isNaN(parseInt(cantidadPacientes)) || cantidadPacientes <= 0 || cantidadPacientes > 15) {
        cantidadPacientes = prompt('Ingrese la cantidad de pacientes que vera el dia de hoy:');
    }
    return cantidadPacientes;
}

const duracionTurnos = () => {
    tiempoTurno = parseInt(prompt('Indique la cantidad de tiempo de los turnos (en minutos):'));
    while (isNaN(tiempoTurno) || tiempoTurno < 10 || tiempoTurno > 60) {
        tiempoTurno = parseInt(prompt('Indique la cantidad de tiempo de los turnos (en minutos):'));
    }
    return tiempoTurno;
}

const tiempoTrabajo = () => {
    horasTrabajadas += (tiempoTurno * cantidadPacientes) / 60
}

solicitarNombre();
solicitarApellido();
solicitarEspecialidad();
solicitarMatricula();
saludar();
pacientes();
duracionTurnos();
tiempoTrabajo();

document.write(nombre + '<br>');
document.write(apellido + '<br>');
document.write(especialidad + '<br>');
document.write(matricula + '<br>');
document.write(`El dia de hoy atendera: ${cantidadPacientes}` + '<br>');
document.write(`Los turnos del dia duraran ${tiempoTurno}min` + '<br>');
document.write(`La cantidad de horas a trabajar hoy son: ${horasTrabajadas}hs` + '<br>');