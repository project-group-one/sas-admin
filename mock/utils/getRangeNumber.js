export default (min, max) => {
    return Math.round((Math.random() * (max - min) + min).toString())
}