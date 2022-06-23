let titulo = document.getElementById('title');
let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

const mostrarTarjetasMedicos = () => {
    arrMedicos.forEach((elemento) => {
        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjeta);
        let apellido = document.createElement('h4');
        apellido.innerText = `Profesional: 
        ${elemento.apellidoMedico} ${elemento.nombreMedico}`;
        let matricula = document.createElement('p');
        matricula.innerText = `M.N: ${elemento.matriculaMedico}`;
        let medicoId = document.createElement('p');
        medicoId.innerText = `Identificador: ${elemento.medicoID}`;

        tarjeta.append(apellido,matricula,medicoId)
    })
}

mostrarTarjetasMedicos();

let botonFiltrar = document.getElementById('btn_filtrar');
let inputFiltrar = document.getElementById('inputFiltrar');

const filtrarMedicos = () => {
    const medicosFiltrados = arrMedicos.filter((e) => e.apellidoMedico === inputFiltrar.value);

    if(inputFiltrar.value !== ''){
    medicosFiltrados.forEach((e) => {
        let tarjetaFiltrada = document.createElement('div');
        tarjetaFiltrada.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjetaFiltrada);
        let apellidoFiltrado = document.createElement('h4');
        apellidoFiltrado.innerText = `Profesional: 
        ${e.apellidoMedico} ${e.nombreMedico}`;
        let matriculaFiltrada = document.createElement('p');
        matriculaFiltrada.innerText = `M.N: ${e.matriculaMedico}`;
        let medicoIdFiltrado = document.createElement('p');
        medicoIdFiltrado.innerText = `Identificador: ${e.medicoID}`;

        tarjetaFiltrada.append(apellidoFiltrado,matriculaFiltrada,medicoIdFiltrado);
    })}else {
        mostrarTarjetasMedicos();
    }

}

botonFiltrar.onclick = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    filtrarMedicos()
}

inputFiltrar.onchange = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    filtrarMedicos()
}

const registrarPaciente = () => {

let nombrePacienteRegistro = document.getElementById('nombre');
let apellidoPacienteRegistro = document.getElementById('apellido');
let edadPacienteRegistro = document.getElementById('edad');
let diagnosticoPacienteRegistro = document.getElementById('diagnostico');
let medicoIDRegistro = document.getElementById('medicoID');
let formularioRegistro =  document.getElementById('formulario');

const pacienteRegistro = new Paciente((arrPacientes.length+1),apellidoPacienteRegistro.value,nombrePacienteRegistro.value,edadPacienteRegistro.value,diagnosticoPacienteRegistro.value,medicoIDRegistro.value);

arrPacientes.push(pacienteRegistro);
arrPacientes.sort();

console.log(arrPacientes);
formularioRegistro.reset();
}

let registroPaciente = document.getElementById('registrarPaciente');

registroPaciente.onclick = (e) => {
    e.preventDefault();
    registrarPaciente();
}

