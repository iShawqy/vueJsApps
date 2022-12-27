const app = Vue.createApp({
    data(){
        return {
            state:true,
            inputName:'',
            names:['Ibra', 'Anna', 'John', 'Jon',
            'Jonathan', 'Jo', 'Ibrahim', 'Ibrahimovic', 'Ann',
            'Clare', 'Clear', 'Jonny', 'Johnny', 'Ma',
            'Mahmoud', 'Jack', 'Jacky', 'Lilly',
            'Miri', 'Marie', 'Meri', 'mom', 'dad',
            'ash', 'ashour', 'yousef', 'yannik',
            'yannis', 'jenny', 'daniel', 'dora', 'lily', 'Tobias',
            'Johannes', 'Johanna', 'Jackelson'],
            names_to_show: [],
            error: '',
            showError: false,
            showPlay: false,
            loser: '',

        }
    },

    mounted(){
        this.names_to_show = this.names
    },



    computed:{
        isReady(){
            return this.names.length > 1;
        },
    },

    methods:{
        addNameToList(){
            const userName = this.inputName;
            if(this.validate(userName)){
                this.names.push(userName);
                this.inputName = '';
                console.log(this.names)
                this.showError = false;

            } else {
                this.showError = true;
                this.hideError();
                console.log('error')
            }
        },
        validate(value){
            this.error = '';
            if(value == ''){
                this.error = 'Sorry, no empty name!';
                return false;
            }

            if(this.names.includes(value)){
                this.error = 'Sorry, names must be unique!';
                return false;
            }

            else {
                return true;
            }

        },
        hideError(){
            setTimeout(() => {
                    this.showError = false
                }, 3000);
        },
        removeName(index){
            // this.names.splice(index, 1);
            this.inputName = this.names_to_show[index] ;
        },
        showResults(){
            this.state = false;
            let idx = this.getRandomInt(this.names.length);

            while (this.names[idx] == this.loser){
                idx = this.getRandomInt(this.names.length);

            }
            this.loser = this.names[idx];


        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },

        startOver(){
            this.state = true;
            this.inputName = '';
            this.names = [];
            this.error = '';
            this.showError = false;
            this.showPlay = false;
            this.loser = '';
        },

        updateNamesToShow(evt){
            this.names_to_show = [];
            for (var i = 0; i < this.names.length; i++) {
                    if (this.names[i].toLowerCase().includes(this.inputName.toLowerCase())) {
                        this.names_to_show.push(this.names[i])
                    }
                    //Do something
                }
        },


    }


}).mount('#app');