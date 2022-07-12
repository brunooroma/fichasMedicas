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
let turnoMedico = '';
let turnoPaciente = '';
console.log(turnoMedico);
console.log(turnoPaciente);
let divTurno = document.getElementById('divTurno');

const mostrarTarjetasMedicosFetch = async () => {
    let response = await fetch('data.json')
    let data = await response.json()
    plantelMedico = data;

    data.forEach((medico) =>{
        let {apellidoMedico: apellido,
            nombreMedico: nombre,
            matriculaMedico: matricula} = medico;

        let tarjeta = document.createElement('div');
        let botonTurno = document.createElement('button');
        botonTurno.innerHTML = 'Seleccionar';
        tarjeta.setAttribute('class','tarjeta');
        
        mostrarTodosLosMedicos.append(tarjeta);
        tarjeta.innerHTML = `<h4>${apellido} ${nombre}</h4>
                            <img src="./img/perfil.png">
                            <p>M.N: ${matricula}</p>`
        mostrarTodosLosMedicos.appendChild(tarjeta)
        tarjeta.append(botonTurno)

        botonTurno.addEventListener('click', function () {
            turnoMedico = `${apellido} ${nombre}`;
            alert('Seleccione un paciente');
            divTurno.innerHTML = ``;
            if (turnoPaciente != ''){
                turnoPaciente = '';
            }
            visualizarTurno();
        })
    })
}

mostrarTarjetasMedicosFetch();

let mostrarTurno = document.createElement('h4');

if(turnoMedico == '' && turnoPaciente == '') {
    mostrarTurno.innerHTML = 'No selecciono un turno';
    divTurno.append(mostrarTurno);
}



let inputFiltrar = document.getElementById('inputFiltrar');

const filtrarMedicos = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    let medicosFiltrados = plantelMedico.filter((e) => {
    return e.apellidoMedico.includes(inputFiltrar.value)});
    
    if(inputFiltrar.value !== ''){
        medicosFiltrados.forEach((e) => {
            let {apellidoMedico: apellido,
                nombreMedico: nombre,
                matriculaMedico: matricula} = e;
            
            let tarjetaFiltrada = document.createElement('div');
            let botonTurno = document.createElement('button');
            botonTurno.innerHTML = 'Seleccionar';
            tarjetaFiltrada.setAttribute('class','tarjeta');
            mostrarTodosLosMedicos.append(tarjetaFiltrada);
            tarjetaFiltrada.innerHTML += `<h4>${apellido} ${nombre}</h4>
                                            <img src="./img/perfil.png">
                                            <p>M.N: ${matricula}</p>`
            mostrarTodosLosMedicos.appendChild(tarjetaFiltrada)
            tarjetaFiltrada.append(botonTurno)

            botonTurno.addEventListener('click', function () {
                turnoMedico = `${apellido} ${nombre}`;
                alert('Seleccione un paciente');
                divTurno.innerHTML = ``;
                visualizarTurno();
            })
    })
    }else {
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
        let botonTurno = document.createElement('button');
        botonTurno.innerHTML = 'Seleccionar';
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosPacientes.append(tarjeta);
        tarjeta.innerHTML = `<h4>${e?.apellidoPaciente} ${e?.nombrePaciente}</h4>
                            <img src="./img/perfil.png">
                            <p>Diagnostico: ${e?.diagnosticoPaciente}</p>`
        mostrarTodosLosPacientes.appendChild(tarjeta)
        tarjeta.append(botonTurno)

        botonTurno.addEventListener('click', function () {
            turnoPaciente = `${e.apellidoPaciente} ${e.nombrePaciente}`;
            alert('Por favor confirme el turno');
            divTurno.innerHTML = ``;
            visualizarTurno();
        })
    }
}

mostrarTarjetasPacientes();

const registrarPaciente = () => {
    let nombrePacienteRegistro = document.getElementById('nombre');
    let apellidoPacienteRegistro = document.getElementById('apellido');
    let edadPacienteRegistro = document.getElementById('edad');
    let diagnosticoPacienteRegistro = document.getElementById('diagnostico');
    let formularioRegistro =  document.getElementById('formulario');

    const pacienteRegistro = new Paciente((arrPacientes.length+1),apellidoPacienteRegistro.value,nombrePacienteRegistro.value,edadPacienteRegistro.value,diagnosticoPacienteRegistro.value);

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

const visualizarTurno = () => {
    mostrarTurno.remove();

    let verTurno = document.createElement('div')
    verTurno.innerHTML =    `<p>Profesional: ${turnoMedico}</p>
                            <p>Paciente: ${turnoPaciente}</p>
                            <p>Fecha: ${new Date().toString()}</p>
                            `
    divTurno.append(verTurno)
}