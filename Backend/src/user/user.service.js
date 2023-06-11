const userModels = require('./user.models');

const createUser = async (email, password) => {
    const { id } = await userModels.verify(email);
    if(id) throw { message: 'Usuário já cadastrado.' };
    const newid = await userModels.createUser(email, password);
    return {id:newid,email};
};

const changePassword = async (email,new_password)=>{
    const { id } = await userModels.verify(email);
    if(!id) throw { message: 'Usuário não cadastrado.' };
    const updateId = await userModels.changePassword(email, new_password);
    return {updateId};
}



module.exports = { createUser ,changePassword };