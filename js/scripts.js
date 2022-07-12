let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

let mostrarTodosLosPacientes = document.getElementById('mostrarTodosLosPacientes');
const divPacientes = document.getElementById('divPacientes');

let divFechaActual = document.getElementById('fecha');

function mueveReloj(){
    let momentoActual = new Date();
    let hora = momentoActual.getHours();
    let minuto = momentoActual.getMinutes();
    let segundo = momentoActual.getSeconds();
    minuto < 10 ? minuto = '0' + minuto : minuto;
    segundo < 10 ? segundo = '0' + segundo : segundo;

    let fechaActual = moment().format('DD/MM/YYYY');
    let horaActual = `${hora}:${minuto}:${segundo}`;

    divFechaActual.innerText = `${fechaActual} ${horaActual}`;

    /* setTimeout("mueveReloj()",1000); */ //setTimeout dentro de la funcion cumple el mismo efecto que el setInterval afuera
}

setInterval('mueveReloj()',1000);

let plantelMedico = '';

const mostrarTarjetasMedicosFetch = async () => {
    let response = await fetch('../data.json')
    let data = await response.json()
    plantelMedico = data;

    data.forEach((medico) =>{
        let {apellidoMedico: apellido,
            nombreMedico: nombre,
            matriculaMedico: matricula} = medico;

        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjeta);
        tarjeta.innerHTML = `<h4>${apellido} ${nombre}</h4>
                            <img src="./img/perfil.png">
                            <p>M.N: ${matricula}</p>`
        mostrarTodosLosMedicos.appendChild(tarjeta)
    })
}

/* const mostrarTarjetasMedicos = () => {
    for (const e of arrMedicos) {
        let {apellidoMedico: apellido,
            nombreMedico: nombre,
            matriculaMedico: matricula} = e;

        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjeta);
        tarjeta.innerHTML = `<h4>${apellido} ${nombre}</h4>
                            <img src="./img/perfil.png">
                            <p>M.N: ${matricula}</p>`
        mostrarTodosLosMedicos.appendChild(tarjeta)
    }
} */

mostrarTarjetasMedicosFetch();

let inputFiltrar = document.getElementById('inputFiltrar');

const filtrarMedicos = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    const medicosFiltrados = plantelMedico.filter((e) => {
    return e.apellidoMedico.includes(inputFiltrar.value)});
    
    if(inputFiltrar.value !== ''){
        medicosFiltrados.forEach((e) => {
            let {apellidoMedico: apellido,
                nombreMedico: nombre,
                matriculaMedico: matricula} = e;
            
            let tarjetaFiltrada = document.createElement('div');
            tarjetaFiltrada.setAttribute('class','tarjeta');
            mostrarTodosLosMedicos.append(tarjetaFiltrada);
            tarjetaFiltrada.innerHTML += `<h4>${apellido} ${nombre}</h4>
                                            <img src="./img/perfil.png">
                                            <p>M.N: ${matricula}</p>`
            mostrarTodosLosMedicos.appendChild(tarjetaFiltrada)
    })}else {
        mostrarTarjetasMedicosFetch();
    }
}

inputFiltrar.addEventListener('input',filtrarMedicos);

const guardarLocalStorage = () => {
    localStorage.setItem('Pacientes',JSON.stringify(arrPacientes))
}

const cargarLocalStorage = () => {
    arrPacientes = JSON.parse(localStorage.getItem('Pacientes')) || arrPacientes
}

cargarLocalStorage();

const mostrarTarjetasPacientes = () => {
    mostrarTodosLosPacientes.innerHTML = '';
    for (const e of arrPacientes) {

        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosPacientes.append(tarjeta);
        tarjeta.innerHTML = `<h4>${e?.apellidoPaciente} ${e?.nombrePaciente}</h4>
                            <img src="./img/perfil.png">
                            <p>Diagnostico: ${e?.diagnosticoPaciente}</p>`
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
        swal.fire(
            'Datos Incompletos',
            'Por favor complete todos los datos del paciente',
            'warning');
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

let arrConsultorio = [...arrMedicos, ...arrPacientes];


