import {defineStore} from 'pinia'


export const useUserStore = defineStore ('user' ,{
    //存储数据
    state(){
        return {
            authorization : '0'
        }
    }
}
        
)