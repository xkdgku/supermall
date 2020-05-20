export default {
    addCart(context, payload) {
        //1  payload新添加的商品
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        //也可以用别的方法，比如find()，上面的代码都忽略
        let oldProduct = context.state.cartList.find(function(item) {
                return item.iid === payload.iid
            })
            //2  判断oldProduct
        if (oldProduct) {
            // oldProduct.count += 1
            context.commit('addCounter', oldProduct)
        } else {
            payload.count = 1;
            // state.cartList.push(payload)
            context.commit('addToCart', payload)
        }
    }
}