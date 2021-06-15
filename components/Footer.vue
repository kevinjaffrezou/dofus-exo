<template>
    <footer>
        <div class="container-fluid">
            <hr>
        </div>
        <div class="container-900 mt-12">
            <div class="grid grid-cols-3 gap-x-10">
                <div>
                    <h2 class="c-h2">Dofus exo</h2>
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
                    <p class="c-p mt-6">Importer une Base de donnée (json)</p>
                    <div class="flex link-upload">
                        <input @change="detectJson($event)" class="c-input-file" type="file" name="db-file" id="db-file" accept="application/json">
                        <label v-if="fileName === ''" for="db-file" class="flex-1">Choisir un fichier...</label>
                        <label v-else for="db-file" class="active flex-1 truncate" :title="fileName">{{fileName}}</label>

                        <button :disabled="fileName === ''" class="c-button-square ml-4" @click="importDB()" title="Importer la base de donnée">
                            <span class="c-icon icon-file_upload_black_24dp"></span>
                        </button>
                    </div>
                    

                </div>
            </div>
        </div>
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
            $nuxt.$Download(db, "dofus-exo-db.json", "application/json");
        },
        downloadCSV: async function() {
            let vm = this
            let items = await this.$nuxt.$DB.inventory.toArray();
            let options = {
                keys: ['name', 'typeExo', 'type', 'attempts', 'coutAcquisition', 'coutTenta', 'prixDeVente']
            };

            let json2csvCallback = function (err, csv) {
                if (err) throw err;
                vm.$nuxt.$Download(csv, "dofus-exo-db.csv", "text/csv");
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

                this.$toast.show({
                    type: 'success',
                    timeout: 7,
                    message: 'La base de données '+this.fileName+' a bien été importée !',
                })
            }
            catch {
                console.log("err");
                this.$toast.show({
                    type: 'danger',
                    title: 'Erreur',
                    timeout: 20,
                    message: "La base de données n'a pas pu être importé, assurez vous qu'elle a été exporté sur cette application. Puis rechargez la page et réessayez.",
                })

            }
            
        },

    }
}
</script>

<style lang="scss">
footer {
    margin: 0 auto;
    margin-top: 70px;
    padding-bottom: 60px;

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
        margin-top: 4px;
    }
}
</style>