const { supabase } = require('../configs/supabaseClient');
const { calculateDistance } = require('../functions/calculateDistance');

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getUriDrop(props) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Running');
      const { dropId } = props;
      const { data, error } = await supabase
        .from('minted')
        .select('*, drop(*)')
        .eq('id', dropId);

      if (!error) {
        const uri = {
          name: data[0].drop.name,
          symbol: data[0].symbol,
          description: data[0].description,
          image: data[0].image,
          attributes: [
            {
              'Drop name': data[0].drop.name,
              'Drop location': data[0].drop.location,
              'Drop description': data[0].drop.description,
            },
          ],
        };

        resolve({ ...uri });
      } else {
        resolve({
          status: 'ERR',
          massage: error,
        });
      }
      // if (!error) {
      //   if (data[0].imageArray && data[0].imageArray > 1) {
      //     const index = between(0, data[0].imageArray.length);
      //     resolve({
      //       image: data[0].imageArray[index],
      //       ...data[0],
      //     });
      //   } else {
      //     resolve({
      //       ...data[0],
      //     });
      //   }
      // } else {
      //   resolve({
      //     status: 'ERR',
      //     massage: error,
      //   });
      // }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

async function getDropReadyToCollect(props) {
  return new Promise(async (resolve, reject) => {
    try {
      const { lat, lng } = props;

      const { data, error } = await supabase.from('drop').select('*, user(*)');

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

      const { data, error } = await supabase.from('drop').select('*, user(*)');

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
  getUriDrop,
  getDropReadyToCollect,
  getDropNearBy,
};
