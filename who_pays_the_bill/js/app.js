const app = Vue.createApp({
    data(){
        return {
            state:true,
            inputName:'',
            names:[],
            error: '',
            showError: false,
            showPlay: false,
            loser: '',

        }
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
            this.names.splice(index, 1);
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


    }


}).mount('#app');