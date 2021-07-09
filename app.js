require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  insquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await insquirerMenu();

    switch (opt) {
      case "1": //crear tarea
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2": //listar tareas
        tareas.listadoCompleto();
        break;
      case "3": //listar tareas completadas
        tareas.listarCompletadas(true);
        break;
      case "4": // listar tareas pendientes
        tareas.listarCompletadas(false);
        break;
      case "5": //completar tareas
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log("\nCambios realizados".green);
        break;
      case "6": //borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const confBorrar = await confirmar("¿Está seguro?");
          if (confBorrar) {
            tareas.borrarTarea(id);
            console.log("\nTarea borrada".green);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt != "0");
};

main();
