import Dexie from 'dexie'
import {
    importDB,
    exportDB
} from "dexie-export-import";

export default (context, inject) => {
    const db = new Dexie('Dofus-exo');
    db.version(1).stores({
        inventory: '++id'
    });
    // Inject $hello(msg) in Vue, context and store.
    inject('DB', db)
    inject('ExportDB', exportDB)
    inject('ImportDB', importDB)
}