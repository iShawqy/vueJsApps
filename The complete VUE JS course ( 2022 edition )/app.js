

const app = Vue.createApp(
    {

        data() {
            return {
                formData: {
                    firstname:'',
                    lastname:'',
                    age:0,
                    job:'',
                    height:0,

                },

                calibrateButton:{
                    isActive: false,

                },

                sweepButton:{
                    isActive: false,

                },
                src:'https://picsum.photos/200/300',
                alt:'Another image',
                link:'http://google.com',
                myText:'Hello guys !!',
                myHtml:'<strong>My html</strong>',
                username: "Ibra",
                userAge: 20,
                allowedAge:18,
                shiftKeyPressed: false,
                x:0,
                y:0,
                cars:[
                    {
                        brand:'Ferrari',
                        color:'Red'
                    },
                    {
                        brand:'Fiat',
                        color:'Blue'
                    },
                    {
                        brand:'Ford',
                        color:'Green'
                    }
               ]

            }
        },

        methods: {
            checkUser(){
                if (this.username == "Ibra") {
                    return true
                }
                else {
                    return false
                }
            },

            init_values(){
                setTimeout(() => {
                    this.name = 'Steve';
                    this.cars = [
                    {
                        brand:'Mercedes',
                        color:'black'
                    },
                    {
                        brand:'BMW',
                        color:'White'
                    },
                    {
                        brand:'Audi',
                        color:'Yellow'
                    }
               ];
                }, 3000);
            },
            update_values(name, event){
                    console.log(event);

                    this.shiftKeyPressed = event.shiftKey;

                    this.name = name;
                    this.cars = [
                    {
                        brand:'Mercedes',
                        color:'black'
                    },
                    {
                        brand:'BMW',
                        color:'White'
                    },
                    {
                        brand:'Audi',
                        color:'Yellow'
                    }
               ];

            },
            getCoordinates(event){
                this.x = event.clientX;
                this.y = event.clientY;

            },

            showEvent(event){
                console.log(event.target.value);
            },

            formHandler(event){
                console.log(this.formData)
            },
            toggleCalibrationButton(){
                if (this.calibrateButton.isActive){
                    this.calibrateButton.isActive = false
                }
                else {
                    this.calibrateButton.isActive = true
                }

            }


        }
    }
)


app.mount('#app')

