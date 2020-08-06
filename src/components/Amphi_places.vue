<template>
  <div>
<h1>{{ msg }}</h1>
<div>
  <fieldset>
  
<p><input id="file_json" accept="application/JSON" @change="onFileChange" type="file"  />
<button @click="valider" class="same">Afficher</button> </p>
  </fieldset>
</div>

<div id="amphi-car">
<p>
<label class="tab"> Distance entre étudiants:  </label>  <input v-model="dist" />   
<button @click="generer" class="same">Génerer:</button>
<button @click="enregistrer" class="same">Enregistrer:</button>
<button @click="reinistialiser" class="same">Réinistialiser:</button>
</p>
</div>
<div id="glob" v-for="(range,u) in this.amphi._ranges" v-bind:key="u" v-show="vrai">
<div class="div_rang"  v-show="vrai">
<tbody >
<tr v-for="(ligne,b) in range._lignes" v-bind:key="b">
  <td v-for="(n,x) in ligne._place" v-bind:key="x">
    <span v-if="n._vide === 'oui'"> 
    <button class="btn_place" @click="changer_plcs(ligne._lettre ,n._id)">{{ ligne._lettre }} {{ n._id }}</button>
    </span>
    <span v-else-if="n._vide === 'non'"> 
    <button class="btn_place_rempl" @click="changer_plcs(ligne._lettre ,n._id)">{{ ligne._lettre }} {{ n._id }}</button>
    </span>
  </td>
</tr>
</tbody>
</div>
</div>
</div>
</template>

<script>
import {Rangee} from './Range'
import {Amphi} from './Amphi'
import {Ligne} from './Ligne'
import {Place} from './Place'
export default {
  name: "Amphi_placements",
  props: {
    msg: String,
  },
  data: function() {
    return {
      vrai: false,
      rang_bool:false,
      donnees: Object,
      rangs: "",
      lignes: Array,
      ranges:Array,
      amphi: Amphi,
      range: Rangee,
      ligne: Ligne,
      place:Place,
      places: Array,
      dist: "",
    };
  },
  methods:
  {
    reinistialiser()
    {
      let plcs;
      for(let i=0; i<this.amphi._ranges.length;i++)
      {
        for(let j=0;j<this.amphi._ranges[i]._lignes.length;j++)
        {
          plcs = this.amphi._ranges[i]._lignes[j]._place.length;
          for(let k=0;k<plcs;k++)
          {
            this.amphi._ranges[i]._lignes[j]._place[k]._vide="oui";
          }
        }
      }
      //this.remplir();
    },
    changer_plcs(idlettre, idplc)
    {
      let plcs;
      for(let i=0; i<this.amphi._ranges.length;i++)
      {
        for(let j=0;j<this.amphi._ranges[i]._lignes.length;j++)
        {
          if(this.amphi._ranges[i]._lignes[j]._lettre === idlettre)
          {
            console.log(this.amphi._ranges[i]._lignes[j]._lettre )
            plcs = this.amphi._ranges[i]._lignes[j]._place.length;
            for(let k=0;k<plcs;k++)
            {
              if(this.amphi._ranges[i]._lignes[j]._place[k]._id === idplc)
              {
                 if(this.amphi._ranges[i]._lignes[j]._place[k]._vide==="oui")
                {
                  this.amphi._ranges[i]._lignes[j]._place[k]._vide="non";
                  break;
                }else
                {
                 this.amphi._ranges[i]._lignes[j]._place[k]._vide="oui";
                 break;
                }
              }
            }
          }
          
        }
      }
    },
    generer()
    {
      this.reinistialiser();
      this.nbr_et;
      let h=0;
      let plcs;
      let cpt=0;
      for(let i=0; i<this.amphi._ranges.length;i++)
      {
        for(let j=0;j<this.amphi._ranges[i]._lignes.length;j++)
        {
          if( j%2 === 0 || j===0)
        {
          plcs=0;
          plcs = this.amphi._ranges[i]._lignes[j]._place.length;
          h=0;
          cpt=0;
          for(let k=0;k<plcs;k++)
          {
            if(h<plcs)
          {
            this.amphi._ranges[i]._lignes[j]._place[h]._vide="non";
            cpt++;
            if(plcs>parseInt(this.dist)+cpt)
            {
              this.amphi._ranges[i]._lignes[j]._place[h]._vide="non";
              h+=parseInt(this.dist)+1;
              cpt++;
            }
          }
          }
        }
        }
      }
    },
    enregistrer()
    {
      const data = JSON.stringify(this.amphi)
      let blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
      if (navigator.msSaveBlob) { // IE 10+
         navigator.msSaveBlob(blob, "test.json")
      } else {
        let link = document.createElement('a')
        if (link.download !== undefined) 
        { // feature detection
      // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', "test.json")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        }
     }
    },
    valider() {
      this.vrai=true;
    },
    onFileChange(e) {
     let files = e.target.files || e.dataTransfer.files;
     if (!files.length) return;
     this.readFile(files[0]);
   },
   readFile(file) {
     let reader = new FileReader();
     reader.onload = e => {
       this.donnees = JSON.parse(e.target.result);
       this.remplir();
     };
     reader.readAsText(file);
   },
   remplir()
   {
     this.ranges = new Array();
     this.lignes = new Array();
     this.places= new Array();
       for(let i=0; i<this.donnees._ranges.length;i++)
      {
          for(let j=0; j<this.donnees._ranges[i]._lignes.length;j++)
          {
            for(let m=0;m<this.donnees._ranges[i]._lignes[j]._place.length;m++)
            {
              this.place= new Place(this.donnees._ranges[i]._lignes[j]._place[m]._id,this.donnees._ranges[i]._lignes[j]._place[m]._vide);
              this.places[m]= this.place;
            }
            this.ligne= new Ligne(this.donnees._ranges[i]._lignes[j]._lettre,this.places);
            this.lignes[j]=this.ligne;
            this.places=[];
          }
          this.range= new Rangee(this.donnees._ranges[i]._id,this.lignes);
          this.ranges[i]=this.range;
          this.lignes=[];
      }
      this.amphi= new Amphi(this.donnees._nom,this.donnees._nombre_places,this.ranges);
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:midnightblue;
  margin-top: 10px;
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
.tab{
  margin-left: 30px;
}
#amphi-car{
  text-align: center;
}
select
{
  height: 30px;
  width: 120px;
  border-radius: 4px;
  border: 1px solid #555555;
}
.same{
  height: 30px;
  width: 150px;
  border-radius: 4px;
  background-color:lightskyblue;
  border: 1px solid #555555;
  font-size: 15px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 20px;
}
div{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  margin-top: 10px;
}

#file_json{
    width: 200px;
    border:black;
}
fieldset{
  text-align: center;
  color: midnightblue;
}
#glob{
  
  //width:30%;
  text-align: center;
  display: inline-block;
  
}
.div_rang{
  margin: 10px;;
  border: 1px solid black;
  display: inline-block;
  padding: 5;
}
.btn_place{
  border: 0.5px solid black;
  width: 30px;
}
.btn_place_rempl
{
  border: 0.5px solid black;
  width: 30px;
  background-color: mediumvioletred;
}
#affich{
  text-align: center;
}
</style>