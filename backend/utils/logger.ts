const info = (...params: any[]) => console.log(...params)
const error = (...error: any[]) => console.log(...error)

module.exports = {
    info, error
}