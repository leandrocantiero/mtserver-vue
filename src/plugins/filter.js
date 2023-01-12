import Vue from 'vue'
import { formatToBRL, formatToNumber } from 'brazilian-values'
import moment from 'moment'

function formatDate(value) {
    if (!value) return null;

    const [year, month, day] = value.split("-");

    if (day)
        return `${day}/${month}/${year}`;
    else if (month)
        return `${month}/${year}`;
    else return year
}

Vue.filter('currency', value => {
    if (!value) return "R$ 0,00"

    return formatToBRL(value)
})

Vue.filter('decimal', value => {
    if (!value) return "0"

    return formatToNumber(value)
})

Vue.filter('percent', value => {
    if (!value) return "0,00 %"

    return `${value} %`
})

Vue.filter('date', value => {
    if (!value) return ""

    if (value.includes('/')) return value

    return formatDate(new Date(value).toISOString().substr(0, 10))
})

Vue.filter('month', value => {
    if (!value) return ""

    return moment(value).format('MM/YYYY')
})

Vue.filter('dateTime', value => {
    if (!value) return ""

    return moment(value).format('DD/MM/YYYY HH:mm')
})

Vue.filter('time', value => {
    if (!value) return ""

    return moment(value).format('HH:mm')
})