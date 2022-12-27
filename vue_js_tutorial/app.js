

const app = Vue.createApp(
    {

        data() {
            return {
                bitcoin_price: 0,
                plans: [],
                prices: [],
                button_name: 'hi',
                message: 'Hello, Ibra!',
                counter: 0,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@gmail.com',
                gender: 'male',
                picture: 'https://randomuser.me/api/portraits/men/10.jpg',
                prefix: '',
                start_time: '',
                timer: '',
                canvas_width: "400",
                canvas_height: "100",
                x: 10,
                y:10,
                current_x:0,
                current_y:0,
            }
        },
        mounted() {

            this.get_plans();
            this.get_prices();
            this.prefix = this.get_prefix();
            this.start_time = this.get_current_time_in_sec()
            const intervalId = setInterval(() => {
              this.update_timer();
            }, 1000);

            const updatePlotInterval = setInterval(() => {
              this.get_bitcoin_price();
            }, 200);


        },

        methods: {
            get_plans(){

                this.plans =['The single', 'The curios', 'The addict'];
            },

            get_prices(){
                var prices = {}
                for (var plan of this.plans) {
                    prices[plan] = 10
                }
                this.prices = prices
            },



            get_prefix(){

                if (this.gender == 'male'){
                    return '(he/him)'
                }
                else {
                    return "(she/her)"
                }
            },

            get_current_time_in_sec(){
                var currentDateTime = new Date();
                return currentDateTime.getTime() / 1000;
            },

            reset_timer(){
                this.start_time = this.get_current_time_in_sec()

                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
                ctx.stroke();
                this.current_x = 0;
                this.current_y = 0;
                this.x = 0;
                this.y = 0;

            },

            update_timer(){
                this.timer = this.get_current_time_in_sec() - this.start_time
                this.timer = parseFloat(this.timer).toFixed(0)
            },

            update_plot(){
                this.current_x = this.x;
                this.current_y = this.y;
                this.x += 1;
                this.y += 1;
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.moveTo(this.current_x,this.current_y);
                ctx.lineTo(this.x,this.y);
                ctx.strokeStyle = 'white';

                ctx.stroke();

            },

            update_message(){
                this.counter += 1
                this.message = this.message + this.counter;

            },

            async get_account_info(){
                const { Spot } = require('@binance/connector')
                const apiKey = '3AJaggUYYg6kp2vUKLWS1omkhWBhxG0HCLLNyFwMTrtK3Ks1VXLvYZ2pSlBdDdmP'
                const apiSecret = 'XHNJQzUUpPrBOLHDBQz7g6K6krtTQ4f7yzVXVcbRDGdjUOXknPUgb8IS04EsFVXS'
                const client = new Spot(apiKey, apiSecret)
                // Get account information
                client.account().then(response => this.bitcoin_price = response.data)
            },

            async get_bitcoin_price(){
                const url = "https://api.binance.com/api/v3/depth?symbol=BNBBUSD&limit=5";
                const response = await fetch(url);
                var data = await response.json();
                console.log(data);
                this.bitcoin_price = data;



            }
        }
    }
)

.component('my_button', {
    template: '<button class="wide-button" v-on:click="update_counter">{{name}}, only for {{ price }} $$</button>',
    data() {
            return {
                counter: 0,


            }
        },
    methods: {
        update_counter(){
                this.counter += 1

            }

    },
    props: ['name', 'price']


})


app.mount('#app')

