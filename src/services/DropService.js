const { supabase } = require('../configs/supabaseClient');

async function getUriDrop(props) {
  return new Promise(async (resolve, reject) => {
    try {
      const { dropId } = props;
      const { data, error } = await supabase
        .from('drop')
        .select('name, symbol, description, image, attributes')
        .eq('id', dropId);

      if (!error) {
        resolve({
          ...data[0],
        });
      } else {
        resolve({
          status: 'ERR',
          massage: error,
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
