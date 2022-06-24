import 'dotenv/config';
import knexx from "knex";

const knex = knexx(process.env.stringSql);


knex.schema
    .hasTable(process.env.tablaProductos)
    .then((exists) => {
        if (exists) {
            console.log(`Tabla "${process.env.tablaProductos}" existente en la bdd`);
        } else {
            return knex.schema
                .createTable(process.env.tablaProductos, (table) => {
                    table.increments();
                    table.string('nombre');
                    table.float('precio');
                    table.string('foto');
                    table.string('descripcion');
                    table.string('codigo');
                    table.decimal('stock');
                    table.timestamp ('timestamp')
                })
                .then(() => {
                    console.log(`Tabla "${process.env.tablaProductos}" creada`);
                })
        }
    })
    .catch((err) => {
        console.log(`Error creando la tabla "${process.env.tablaProductos}"`, err);
    });

knex.schema
    .hasTable(process.env.tablaCarritos)
    .then((exists) => {
        if (exists) {
            console.log(`Tabla "${process.env.tablaCarritos}" existente en la bdd`);
        } else {
            return knex.schema
                .createTable(process.env.tablaCarritos, (table) => {
                    table.increments();
                    table.json('productos');
                })
                .then(() => {
                    console.log(`Tabla "${process.env.tablaCarritos}" creada`);
                })
        }
    })
    .catch((err) => {
        console.log(`Error creando la tabla "${process.env.tablaCarritos}"`, err);
    });    