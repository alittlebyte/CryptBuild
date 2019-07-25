<template id="cryptocurrency" >
    <v-card flat class="elevation-4">
        <v-card-title class="display-2 blue-grey darken-2" style="color: white; " primary-title>Рейтинг криптовалют</v-card-title>
        <v-card-text>
            Это приложение показывает топ-15 криптовалют мира по рыночной капитализации и дает возможность сравнить их цены и суточный объем.
        </v-card-text>
        <v-card-text>
<!--            <div>{{flood}}</div>     -->
            <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="items" scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ parseFloat(props.item.priceUsd).toFixed(2) }}</td>
                <td class="text-xs-left">{{ parseFloat(props.item.marketCapUsd).toFixed(2) }}</td>
                <td class="text-xs-left">{{ parseFloat(props.item.volumeUsd24Hr).toFixed(2) }}</td>
            </template>
        </v-data-table>
    </v-card-text>
</v-card>
</template>

<script>
const update_interval = 1000 * 6;
import axios from 'axios'
export default {
    data() {
        return {
            headers : [
                {text: "Название", value : "name", align: "left"},
                {text: "Цена, долл.", value : "priceUsd" , align: "left"},
                {text: "Капитализация", value : "marketCapUsd", align: "left"},
                {text: "Суточный объем", value : "volumeUsd24Hr", align: "left"}
            ],
            items : [],
            flood : []
        };
    },
    methods: {
        getCoins () {
            axios.get("https://api.coincap.io/v2/assets?limit=15")
            .then((resp) => 
                this.items = resp.data.data
            )
            .catch((err) => {
                console.log(err);
            });
        },

    },
    created () {
        this.getCoins();
        this.$options.sockets.onmessage = (data) => this.flood = data.data;
         setInterval(() => {
            console.log("UPDATED!");
            this.getCoins();
        }, update_interval);
    },
    mounted () {

    }
}
</script>

<style>
  tbody{
    display: block;
    max-height:50vh;
  }
  tbody:hover{
    overflow-y:scroll;
  }

  thead, tbody tr{
    display:table;
    width:100%;
    table-layout:fixed;
  }

  thead{
    width:calc(100%-0.9em);
  }

  @media only screen and (max-width: 900px) {
    th:nth-of-type(n+3), td:nth-of-type(n+3){
      display:none;
    }
  }
</style>