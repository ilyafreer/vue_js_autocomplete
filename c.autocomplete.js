Vue.component('autocomplete', {
    props: ['list','selected'],
    data: function () {
        return {
            listShow:false,
            inputText:this.getSelectedText(),
            dynList:this.listItems,
        }
    },
    mounted() {
            let body = document.querySelector('body');
            let autocompletePic = document.querySelector('.autocomplete-pic');
            let vue = this;
            body.addEventListener('click', function (e) {
                if(!autocompletePic.contains(e.target)){
                    vue.hideList();
                }
            });
        },
    computed:{
        listItems:function () {
            return this.$props.list;
        },
    },
    methods: {
        getSelectedText(){
            if(this.$props.selected){
                return this.$props.list[this.$props.selected].name;
            }else{
                return '';
            }
        },
        // поиск по списку при вводе
        fineItems() {
            this.listShow = true;
            let search = new RegExp(this.inputText, "gi");
            this.dynList = [];
            for(let item in this.$props.list){
                let name = String(this.$props.list[item].name);
                if(name.search(search) !== -1 ){
                    this.dynList.push(this.$props.list[item]);
                }
            }

            if(this.dynList.length === 1){
                this.setValue(this.dynList[0].id);
            }
        },
        // событие выборка из списка
        selectItem(item){
            this.inputText = item.name;
            this.listShow = false;
            this.setValue(item.id);
        },
        hideList(){
            this.listShow = false;
        },
        showList(){
            this.dynList = this.listItems;
            this.listShow = true;
        },
        // Передает выбранное значение родительскому компоненту
        setValue(value){
            this.$emit('update', {
                listId: value
            })
        }
    },
    template: `<div class="autocomplete-pic">
        <div class="input-group">
        <input type="text" class="form-control" @click="showList" @input="fineItems" v-model="inputText">
        <div class="input-group-append">
            <span @click="showList" class="input-group-text pass-show"><span class="oi oi-list"></span></span>
        </div>
        </div>
        <div v-if="listShow" class="autocomplete-list">
           <li v-for="item in dynList" @click="selectItem(item)">
           <img v-if="item.pic" :src="item.pic">
        <span>[[item.name]]</span></li>
        </div>
        </div>`
})
