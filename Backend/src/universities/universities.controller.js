const express = require('express');
const router = express.Router();
const universitiesService = require('./universities.service')

router.get("/",async function (req,res) {
    const query = req.query
    if(query.country){
        try {
            const universities = await universitiesService.queryUni(query.country);
            return res.status(200).send(universities);
          } catch (error) {
            return res.status(500).send(error);
          }
    }else{
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;
            const offset = (page - 1) * limit;
            const universities = await universitiesService.getAll(limit, offset);
            return res.status(200).send(universities);
          } catch (error) {
            return res.status(500).send(error);
          }
    }
})

router.get("/:id",async function(req,res){
    try {
        const { id } = req.params;
        const university = await universitiesService.getById(id);
        if (university.message) 
            return res.status(404).send(university);
        return res.status(200).send(university);
      } catch (error) {
        return res.status(500).send(error);
      }
})

router.post("/",async function(req,res){
    try {
        const { name, country, alpha_two_code, domains, web_pages } = req.body;
        const state_province = req.body['state-province'];
        const university = await universitiesService.createUni(name, country, alpha_two_code, state_province, domains, web_pages);
        if (university.message) 
            return res.status(409).send(university);
        return res.status(201).send({ message: 'Universidade cadastrada com sucesso.' });
      } catch (error) {
        return res.status(500).send(error);
      }
})

router.put("/:id",async function(req,res) {
    try {
        const { id } = req.params;
        const { name, web_pages, domains } = req.body;
        const university = await universitiesService.updateUni(id, name, web_pages, domains);
        if (university.message)
            return res.status(404).send(university);
        return res.status(200).send({ message: 'Universidade atualizada com sucesso.' });
      } catch (error) {
        return res.status(500).send(error);
      }
})
router.delete("/:id",async function(req,res){
    try {
        const { id } = req.params;
        const university = await universitiesService.deleteUni(id);
        if (university.message) 
            return res.status(404).send(university);
        return res.status(200).send({ message: 'Universidade deletada com sucesso.' });
      } catch (error) {
        return res.status(500).send(error);
      }
})

module.exports = router;