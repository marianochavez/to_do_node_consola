require("colors");
// REEMPLAZADA POR INQUIRER
const mostrarMenu = async () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("==========================".green);
    console.log("  Selecciones una opcion".green);
    console.log("==========================".green);

    console.log(`${"1.".green.green} Crear tarea`);
    console.log(`${"2.".green.green} Listar tareas`);
    console.log(`${"3.".green.green} Listar tareas completadas`);
    console.log(`${"4.".green.green} Listar tareas pendientes`);
    console.log(`${"5.".green.green} Completar tarea(s)`);
    console.log(`${"6.".green.green} Borrar tarea`);
    console.log(`${"0.".green.green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Selecciones una opcion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresiones ${"ENTER".green} para continuar\n`,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
