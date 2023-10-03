const DropService = require('../services/DropService');

const getUriDrop = async (req, res) => {
  try {
    const { dropId } = req.params;

    if (!dropId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }

    const respone = await DropService.getUriDrop(req.params);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getReadyToCollect = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }

    const respone = await DropService.getDropReadyToCollect(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getNearBy = async (req, res) => {
  try {
    console.log('Haha');
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required',
      });
    }

    const respone = await DropService.getDropNearBy(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getUriDrop,
  getReadyToCollect,
  getNearBy,
};
