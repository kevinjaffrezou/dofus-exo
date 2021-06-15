<template>
    <div>
        <section class="text-gray-600 body-font">
            <div class="container-1400 mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div class="text-center lg:w-2/3 w-full">
                    <h1 class="c-h1 sm:text-4xl u-fz-large mb-4">Dofus exo</h1>
                    <p class="leading-relaxed text-lg">Dofus exo est une application web qui vous permet d'<strong>historiser l'ensemble de vos exos</strong> en y sauvegardant leurs coût ainsi que leurs prix de vente afin de calculer le benefice total de vos items.</p>
                    <img src="/img/dofus-exo.jpg" alt="" class="c-img m-auto mb-4">
                    <div class="flex justify-center">
                        <NuxtLink to="/" class="c-link"><TheButton class="--primary">Voir votre dashboard</TheButton></NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h1 class="c-h2 u-fz-medium">Fonctionnement de la base de données</h1>
                </div>
                <div class="flex flex-wrap -m-4">
                    <div class="p-4 md:w-1/3">
                        <div class="flex rounded-lg h-full bg-gray-200 p-8 flex-col">
                        <div class="flex items-center mb-3">
                            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full u-bg-blue40 text-white flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                            </svg>
                            </div>
                            <h2 class="u-blue40 text-lg title-font font-medium">Pas besoin de s'inscrire</h2>
                        </div>
                        <div class="flex-grow">
                            <p class="leading-relaxed text-base">Aucune inscription n'est requise pour pouvoir utiliser l'application web.</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex rounded-lg h-full bg-gray-200 p-8 flex-col">
                    <div class="flex items-center mb-3">
                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full u-bg-blue40 text-white flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        </div>
                        <h2 class="u-blue40 text-lg title-font font-medium">Sauvegarde en local</h2>
                    </div>
                    <div class="flex-grow">
                        <p class="leading-relaxed text-base">L'ensemble de vos données sont sauvegardées dans une base de données géré par votre navigateur (IndexedDB). Ce qui veut dire qu'il n'y a aucun serveur pour faire fonctionner le site. <br>
                        <b class="u-red10">Attention !</b> Si vous vider votre cache l'ensemble des données seront remises à Zero !
                        </p>
                        <!-- <a class="mt-3 u-blue40 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        </a> -->
                    </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex rounded-lg h-full bg-gray-200 p-8 flex-col">
                    <div class="flex items-center mb-3">
                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full u-bg-blue40 text-white flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        </div>
                        <h2 class="u-blue40 text-lg title-font font-medium">Récupération des données</h2>
                    </div>
                    <div class="flex-grow">
                        <p class="leading-relaxed text-base">Vous pouvez télécharger les données de la base à tout moment en cliquant sur les liens en question dans le footer. <br>Sous format CSV si vous voulez les utiliser sur excel ou spreadsheet. <br>Ou sous format JSON afin des les sauvegarder si vous envisager de vider votre cache ou l'utiliser sur un autre appareil.</p>
                        <!-- <a class="mt-3 u-blue40 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        </a> -->
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>