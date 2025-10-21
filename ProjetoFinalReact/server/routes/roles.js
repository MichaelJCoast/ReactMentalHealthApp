const validateRole = (role) => {
    if (!['Admin', 'Psicologo', "User"].includes()) {
        throw new Error('Role inválida. Deve ser "Admin", "Psicologo" ou "User"');
    }
};

module.exports = { validateRole };