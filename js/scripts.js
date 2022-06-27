/* let nav = document.getElementById('nav'); */

/* let inicioSesion = document.getElementById('navInicio');
inicioSesion.innerHTML += `<select id="selectUsuario" name="usuario">
                            <option>Medico</option>
                            <option>Paciente</option>
                            </select>
                            <input type="number" name="idUsuario" id="idUsuario" placeholder="Identificador">

                            <button id="botonInicio">Seleccionar</button>`;

nav.prepend(inicioSesion);

let selectUsuario = document.getElementById('selectUsuario');
let idUsuario = document.getElementById('idUsuario');
let botonInicio = document.getElementById('botonInicio');

const iniciarSesion = (e) => {
    e.preventDefault();
    let usuarioSesion = `${selectUsuario.value} ${idUsuario.value}`
    sessionStorage.setItem('sessionUsuario',usuarioSesion)
    idUsuario.value = "";
}

botonInicio.addEventListener('click', iniciarSesion)
 */

let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

let mostrarTodosLosPacientes = document.getElementById('mostrarTodosLosPacientes');
const divPacientes = document.getElementById('divPacientes');

const mostrarTarjetasMedicos = () => {
    for (const e of arrMedicos) {
        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjeta);
        tarjeta.innerHTML = `<h4>${e.apellidoMedico} ${e.nombreMedico}</h4>
                            <img src="./img/perfil.png">
                            <p>M.N: ${e.matriculaMedico}</p>`

        mostrarTodosLosMedicos.appendChild(tarjeta)
    }
}

mostrarTarjetasMedicos();

let inputFiltrar = document.getElementById('inputFiltrar');

const filtrarMedicos = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    const medicosFiltrados = arrMedicos.filter((e) => {
        return e.apellidoMedico.includes(inputFiltrar.value)});
    
    if(inputFiltrar.value !== ''){
    medicosFiltrados.forEach((e) => {
        let tarjetaFiltrada = document.createElement('div');
        tarjetaFiltrada.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjetaFiltrada);

        tarjetaFiltrada.innerHTML += `<h4>${e.apellidoMedico} ${e.nombreMedico}</h4>
        <img src="./img/perfil.png">
        <p>M.N: ${e.matriculaMedico}</p>`

        mostrarTodosLosMedicos.appendChild(tarjetaFiltrada)
    })}else {
        mostrarTarjetasMedicos();
    }

}

inputFiltrar.addEventListener('input',filtrarMedicos);

const mostrarTarjetasPacientes = () => {
    mostrarTodosLosPacientes.innerHTML = '';
    for (const e of arrPacientes) {
        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosPacientes.append(tarjeta);
        
        tarjeta.innerHTML = `<h4>${e.apellidoPaciente} ${e.nombrePaciente}</h4>
                            <img src="./img/perfil.png">
                            <p>Diagnostico: ${e.diagnosticoPaciente}</p>`

        mostrarTodosLosPacientes.appendChild(tarjeta)
    }
}

mostrarTarjetasPacientes();

const registrarPaciente = () => {

let nombrePacienteRegistro = document.getElementById('nombre');
let apellidoPacienteRegistro = document.getElementById('apellido');
let edadPacienteRegistro = document.getElementById('edad');
let diagnosticoPacienteRegistro = document.getElementById('diagnostico');
let medicoIDRegistro = document.getElementById('medicoID');
let formularioRegistro =  document.getElementById('formulario');

const pacienteRegistro = new Paciente((arrPacientes.length+1),apellidoPacienteRegistro.value,nombrePacienteRegistro.value,edadPacienteRegistro.value,diagnosticoPacienteRegistro.value,medicoIDRegistro.value);

arrPacientes.push(pacienteRegistro);
localStorage.setItem('Pacientes',JSON.stringify(arrPacientes));
formularioRegistro.reset();
mostrarTarjetasPacientes();
}

let registroPaciente = document.getElementById('registrarPaciente');

registroPaciente.onclick = (e) => {
    e.preventDefault();
    registrarPaciente();
}

