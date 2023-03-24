const field = require('../model/fieldmodel');

exports.createTrip = async (req, res) => {
    try {
        const newTrip = await field.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                newTrip
            }
        });
    } catch (error) {
        // console.log("Code@@@",error)
        res.status(404).json({
            status: "failed",
            data: error.message
        });
    };
};
exports.getTrip = async (req, res) => {
    try {
        const getTrip = await field.find();
        res.status(200).json({
            status: "success",
            data: {
                getTrip
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: error.message
        });
    };
};
exports.getOneTrip = async (req, res) => {
   try {
    const getoneTrip = await field.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            getoneTrip
        }
    });
   } catch (error) {
    res.status(404).json({
        status: "failed",
        data: error.message
    });
   };
};

exports.updateTrip = async (req, res) => {
   try {
    const updatetrip = await field.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        status: "success",
        data: {
            updatetrip
        }
    });
   } catch (error) {
    res.status(404).json({
        status: "failed",
        data: error.message
    });
   };
};

exports.deleteTrip = async (req, res) => {
    try {
        const deletetrip = await field.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        }) ;
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: error.message
        });
    };
};