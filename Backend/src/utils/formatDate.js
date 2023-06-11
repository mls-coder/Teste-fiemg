function formatDate (date) {
    const convert = new Date(date)
    const ano = convert.getFullYear();
    const mes = convert.getMonth() + 1;
    const dia = convert.getDate();

    const formatedDate = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    return formatedDate
}

module.exports = { formatDate }