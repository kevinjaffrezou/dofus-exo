<template>
    <footer>
        <div class="container-900">
            <div class="grid grid-cols-3 gap-x-14">
                <div>
                    <h2 class="c-h2">Titre du site</h2>
                </div>
                <div>
                    <h2 class="c-h2">Infos</h2>
                    <a href="#" class="c-link">Un problème ? Une question ?</a>
                    <a href="#" class="c-link">Code source de l’application</a>
                    <a href="#" class="c-link">Twitter</a>

                </div>
                <div>
                    <h2 class="c-h2">Base de données</h2>
                    <a @click="download()" href="javascript:void(0);" class="c-link c-link--icon">Télécharger les données en JSON <span class="c-icon icon-file_download_black_24dp"></span></a>
                    <a @click="downloadCSV()" href="javascript:void(0);" class="c-link c-link--icon">Télécharger les données en CSV <span class="c-icon icon-file_download_black_24dp"></span></a>
                    <div class="flex link-upload">
                        <input @change="detectJson($event)" class="c-input-file" type="file" name="db-file" id="db-file" accept="application/json">
                        <label for="db-file" class="flex-1" v-if="fileName === ''">Choisir un fichier...</label>
                        <label for="db-file" class="active flex-1" v-else>{{fileName}}</label>

                        <button :disabled="fileName === ''" class="c-button-square ml-4" @click="importDB()" title="Importer la base de donnée">
                            <span class="c-icon icon-file_upload_black_24dp"></span>
                        </button>
                    </div>
                    

                </div>
            </div>
        </div>
        <!-- <input type="file" name="db-file" id="db-file" accept="application/json">
        <button @click="importDB()">
            Importer la base de donnée
        </button> -->
    </footer>
</template>

<script>
export default {
    data: function() {
        return {
            fileName: ""
        }
    },
    methods: {
        detectJson: function(e) {
            this.fileName = e.target.value.replace(/C:\\fakepath\\/, '')
        },
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
    margin: 0 auto;
    margin-top: 70px;
    padding-top: 40px;
    padding-bottom: 60px;
    max-width: 1440px;
    border-top: 1px solid $grey10;

    .c-h2 {
        margin-bottom: 32px;
    }

    .c-link {
        display: block;
    }

    .c-link + .c-link {
        margin-top: 24px;
    }

    .link-upload {
        margin-top: 24px;
    }
}
</style>