const { supabase } = require('../configs/supabaseClient');

async function getUriDrop(props) {
  return new Promise(async (resolve, reject) => {
    try {
      const { dropId } = props;
      const { data, error } = await supabase
        .from('drop')
        .select('name, description, image, attributes')
        .eq('id', dropId);

      if (!error) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: data,
        });
      } else {
        resolve({
          status: 'ERR',
          massage: 'Cannot get all mission',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getUriDrop,
};
