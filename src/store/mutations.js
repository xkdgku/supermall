export default {
    //1  mutations唯一的目的是改变state状态
    //2  mutations一个方法里一般只建议改变一种状态,可以放在actions中
    addCounter(state, payload) {
        payload.count++;
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }

}