import Vue from 'vue'

export function scrollTo(selector) {
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" })
}

export function showSuccess(e) {
    if (!e) {
        Vue.toasted.global.defaultSuccess({})

    } else if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultSuccess({ msg: e.response.data })

    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultSuccess({ msg: e })

    } else if (e.message) {
        Vue.toasted.global.defaultSuccess({ msg: e.message })

    } else if (e.length > 0) {
        e.forEach((e) = this.Vue.toasted.global.defaultSuccess(e.message))

    }
}

export function showError(e) {
    console.log(e)
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })

    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })

    } else if (e.message) {
        Vue.toasted.global.defaultError({ msg: e.message })

    } else if (e.length > 0) {
        e.forEach((e) = this.Vue.toasted.global.defaultError(e.message))

    } else {
        Vue.toasted.global.defaultError({})

    }
}

export function parseNumber(number, decimalpoint = ",") {
    if (!number) return 0;

    var p = number.split(decimalpoint);
    for (var i = 0; i < p.length; i++) p[i] = p[i].replace(/\D/g, "");
    return parseFloat(p.join("."));
}