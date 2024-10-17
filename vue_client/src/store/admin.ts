import {defineStore} from 'pinia'


export const useAdminStore = defineStore ('admin' ,{
    //存储数据
    state(){
        return {
            authorization: '0'
        }
    }
}
        
)