const uniModels = require('./universities.models');

const getAll = async (limit, offset) => {
    const universities = await uniModels.getUniversities(limit, offset);
    return universities;
};
  
const getById = async (id) => {
    const university = await uniModels.getUniversityById(id);
    if(!university) return { message: 'Universidade não encontrada.' };
    return university;
};

const createUni = async (name, country, alpha_two_code, state_province, domains, web_pages) => {
    const verify = await uniModels.verifyUni(name, state_province, country);
    if(verify.length > 0) return { message: 'Universidade já cadastrada.' };
    await uniModels.createUniversity(name, country, alpha_two_code, state_province, domains, web_pages);
    return {};
};

const updateUni = async (id, name, web_pages, domains) => {
    const university = await uniModels.getUniversityById(id);
    if(!university) return { message: 'Universidade não encontrada.' };

    await uniModels.updateUniversity(id, name, web_pages, domains);
    return {};
};

const deleteUni = async (id) => {
    const university = await uniModels.getUniversityById(id);
    if(!university) return { message: 'Universidade não encontrada.' };

    await uniModels.deleteUniversity(id);
    return {};
};

const queryUni = async (q) => {
    await uniModels.queryUni(q);
    return {};
};

module.exports = { getAll, getById, createUni, updateUni, deleteUni, queryUni }