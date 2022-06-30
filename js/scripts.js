let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

let mostrarTodosLosPacientes = document.getElementById('mostrarTodosLosPacientes');
const divPacientes = document.getElementById('divPacientes');

const miLocalStorage = window.localStorage;

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

const guardarLocalStorage = () => {
    miLocalStorage.setItem('Pacientes',JSON.stringify(arrPacientes))
}

const cargarLocalStorage = () => {
    if(localStorage.getItem('Pacientes')){
        const lsPacientes = JSON.parse(localStorage.getItem('Pacientes'));
        for (const lsPaciente of lsPacientes) {
            let verify = arrPacientes.find((e) => e.pacienteID === lsPaciente.pacienteID)
            if(!verify){
                arrPacientes.push(lsPaciente)
            }
            
        }
    }
}

cargarLocalStorage();

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

    if(apellidoPacienteRegistro.value == '' || nombrePacienteRegistro.value == '' || diagnosticoPacienteRegistro.value == ''){
        alert('Por favor completar los datos del paciente');
    }else {
        arrPacientes.push(pacienteRegistro);
        guardarLocalStorage();
        formularioRegistro.reset();
        cargarLocalStorage();
        mostrarTarjetasPacientes();
    }
}

let registroPaciente = document.getElementById('registrarPaciente');

registroPaciente.onclick = (e) => {
    e.preventDefault();
    registrarPaciente();
}

