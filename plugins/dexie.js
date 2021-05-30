import Dexie from 'dexie'

export default (context, inject) => {
    const db = new Dexie('Dofus-exo');
    db.version(1).stores({
        inventory: 'id,dofusId,name,type,attempts,coutTenta,prixDeVente,coutAcquisition,active,typeExo,img,url,isSave'
    });
    // Inject $hello(msg) in Vue, context and store.
    inject('DB', db)
    // For Nuxt <= 2.12, also add 👇
    context.$DB = db
}