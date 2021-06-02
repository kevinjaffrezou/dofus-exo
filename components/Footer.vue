<template>
    <footer>
        <input type="file" name="db-file" id="db-file" accept="application/json">
        <button @click="importDB()">
            Importer la base de donnée
        </button>
        <button @click="download()">
            Télécharger les données
        </button>
        <button @click="downloadCSV()">
            Télécharger les données en format CSV
        </button>
    </footer>
</template>

<script>
export default {
    methods: {
        download: async function() {
            let db = await this.$nuxt.$ExportDB(this.$nuxt.$DB)
            $nuxt.$Download(db, "dexie-export.json", "application/json");
        },
        downloadCSV: async function() {
            let vm = this
            let items = await this.$nuxt.$DB.inventory.toArray();
            let options = {
                keys: ['name', 'typeExo', 'type', 'attempts', 'coutAcquisition', 'coutTenta', 'prixDeVente']
            };

            let json2csvCallback = function (err, csv) {
                if (err) throw err;
                vm.$nuxt.$Download(csv, "dexie-export.csv", "text/csv");
            };

            $nuxt.$json2csv(items, json2csvCallback, options)
        },
        importDB: async function() {
            try {
                let file = document.getElementById("db-file")
                await this.$nuxt.$ImportDB(file.files[0], {
                    clearTablesBeforeImport: true
                });

                let items = await this.$nuxt.$DB.inventory.toArray();
                items.reverse()
                this.$store.commit('items/ADD_ITEMS', items)

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            catch {
                console.log("err");

            }
            
        },

    }
}
</script>

<style lang="scss">
footer {
    height: 300px;
}
</style>