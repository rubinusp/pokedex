let app = new Vue ({
    el: "#app",
    data: {
        numPokemonGen1: 151,
        numPokemonGen2: 100,
        numPokemonGen3: 135,
        numPokemonGen4: 107,
        numPokemonGen5: 156,
        numPokemonGen6: 72,
        numPokemonGen7: 88,
        pokedex: {},
        addBoxes: [{
                num: 0,
                entry_number: 0,
            },{
                num: 1,
                entry_number: 0,
            },{
                num: 2,
                entry_number: 0,
            },{
                num: 3,
                entry_number: 0,
            },{
                num: 4,
                entry_number: 0,
            },{
                num: 5,
                entry_number: 0,
            }],
        currGen: 1,
        currentPokemonEntries: {},
        requesting: true,
        drag: 0,
    },
    created() {
        this.requestPokedex();
    },
    watch: {
        currGen(newValue, oldValue) {
            if (newValue === oldValue) return;
            else {
                this.getPokemonEntries();
            }
        }
    },
    methods: {
        requestPokedex() {
            this.requesting = true;
            axios.get("https://pokeapi.co/api/v2/pokedex/1")
                .then(response => {
                    this.pokedex = response.data;
                    this.requesting = false;

                    return true;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getSprite(pokemon_entry_number) {
            return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon_entry_number + ".png";
        },
        getPokemonEntries() {
            if (this.currGen === 1){
                return this.pokedex.pokemon_entries.slice(0, this.numPokemonGen1);    
            }
            else if (this.currGen === 2) {
                return this.pokedex.pokemon_entries.slice(this.numPokemonGen1, this.numPokemonGen1 + this.numPokemonGen2);
            }
            else if (this.currGen === 3) {
                startIndex = this.numPokemonGen1 + this.numPokemonGen2;
                return this.pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen3);
            }
            else if (this.currGen === 4) {
                startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                             this.numPokemonGen3;
                return this.pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen4);
            }
            else if (this.currGen === 5) {
                startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                             this.numPokemonGen3 + this.numPokemonGen4;
                return this.pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen5);
            }
            else if (this.currGen === 6) {
                startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                             this.numPokemonGen3 + this.numPokemonGen4 +
                             this.numPokemonGen5;
                return this.pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen6);
            }
            else if (this.currGen === 7) {
                startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                             this.numPokemonGen3 + this.numPokemonGen4 +
                             this.numPokemonGen5 + this.numPokemonGen6;
                return this.pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen7);
            }
        },
        setCurrGen(gen) {
            this.currGen = gen;
        },
        dragPokemon(pokemon) {
            this.drag = pokemon.entry_number;
        },
        dropPokemon(num) {
            this.addBoxes[num].entry_number = this.drag;
        },
    }
})