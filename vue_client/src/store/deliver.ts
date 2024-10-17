import { defineStore } from 'pinia'


export const useDeliverStore = defineStore('deliver', {
    //存储数据
    state() {
        return {
            authorization: '0'
        }
    }
}

)