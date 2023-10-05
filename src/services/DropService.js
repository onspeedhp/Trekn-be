const { supabase } = require('../configs/supabaseClient');
const { calculateDistance } = require('../functions/calculateDistance');

async function getAllDrops() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from('drop').select('*');

      if (!error) {
        resolve({
          data,
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

async function getDropReadyToCollect(props) {
  return new Promise(async (resolve, reject) => {
    try {
      const { lat, lng } = props;

      const { data, error } = await supabase.from('drop').select('*');

      let readyToCollect = [];
      data.map((drop) => {
        if (
          drop.radius === null ||
          calculateDistance(lat, lng, drop.lat, drop.lng) <= drop.radius
        ) {
          readyToCollect.push({
            ...drop,
            distance: calculateDistance(lat, lng, drop.lat, drop.lng),
          });
        }
      });
      readyToCollect.sort((a, b) => a.distance - b.distance);

      if (!error) {
        resolve({
          status: 'OK',
          message: '',
          data: readyToCollect,
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

async function getDropNearBy(props) {
  return new Promise(async (resolve, reject) => {
    try {
      const { lat, lng } = props;

      const { data, error } = await supabase.from('drop').select('*');

      let nearBy = [];
      data.map((drop) => {
        if (
          drop.radius !== null &&
          calculateDistance(lat, lng, drop.lat, drop.lng) >= drop.radius &&
          calculateDistance(lat, lng, drop.lat, drop.lng) <= 50000
        ) {
          nearBy.push({
            ...drop,
            distance: calculateDistance(lat, lng, drop.lat, drop.lng),
          });
        }
      });
      nearBy.sort((a, b) => a.distance - b.distance);
      console.log(nearBy);
      if (!error) {
        resolve({
          status: 'OK',
          message: '',
          data: nearBy,
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
  getAllDrops,
  getDropReadyToCollect,
  getDropNearBy,
};
