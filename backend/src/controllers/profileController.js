const connection = require('../database/connection');

module.exports = {

   async index(req, res){
      const {id} = req.params;
      const ong_id = req.headers.authorization;
      
      const profileIncidents = await connection('incidents')
         .where('ong_id',ong_id)
         .select('*')
      
      return res.json(profileIncidents);
   }
}