<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
     <p>Le nom:    <input id="nom" v-model="nom"/> Le nom est : {{ nom }} </p>
     <p>Le nombre de places:    <input v-model="places_amph" /> le nombre de places est: {{ places_amph }}  </p>
     <p>Le nombre de rangs:    <input v-model="rangs" /> le nombre de rangs: {{ rangs }} </p>
     <button name="ajouter" v-on:click="Ajouter">Ajouter rang:</button>
     <span v-html="HTMLcontent">
         
     </span>
    </div>
   </div>
</template>
<script>
export class Rangee{}
/*import {Rangee} from 'Range.js';*/
export default {
  name: "Amphi", 
   props: {
    msg: String,
    places_amph: String,
    rangs: String,
    nom: String,
    HTMLcontent: null,
    lignes:String,
    ra: Rangee,

  },
  methods:{
      Ajouter()
      {
        let ra,i=1;
        let rangees=[];
        this.HTMLcontent='';
          this.HTMLcontent +='<p>Rang numero: '+i+' Le nombre de lignes:   <input v-model="lignes" />';
          this.HTMLcontent+='<button name="ajouter_l" v-on:click="Ajouter_l">Ajouter ligne:</button> </p>';
        ra = new Rangee(1,);
        rangees.push(ra);
        i++;
      }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>