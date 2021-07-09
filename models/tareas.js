const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // OTRA FORMA
    // Object.keys(this._listado).forEach((key, i) => {
    //   console.log(
    //     `${`${i + 1}.`.green} ${this._listado[key].desc} | ${
    //       this._listado[key].completadoEn != null
    //         ? "COMPLETADO".green
    //         : "INCOMPLETO".red
    //     }`
    //   );
    // });

    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idTarea = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${idTarea} ${desc} :: ${estado}`);
    });
  }

  listarCompletadas(completadas = true) {
    // OTRA FORMA
    // const listadoCompletadas = this.listadoArr
    //   .filter(
    //     (completadas === true)
    //       ? (tarea) => tarea.completadoEn !== null
    //       : (tarea) => tarea.completadoEn === null
    //   ).forEach((tarea, i) => {
    //     const idTarea = `${i + 1}.`.green;
    //     const { desc, completadoEn } = tarea;
    //     const estado = completadoEn ? "Completado".green : "Pendiente".red;
    //     console.log(`${idTarea} ${desc} :: ${estado} - ${completadoEn}`);
    //   });

    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        // mostrar completadas
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        // mostrar pendientes
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
