const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { jwtAuthMiddleware } = require('../jwtAuth');
const Seller = require('../models/Seller');

router.get('/', async (req,res) => {
    try{
        const data = await Property.find();
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({
            text: 'inertnal server error',
            message : err
        })
    }
})

router.post('/createProperty', jwtAuthMiddleware, async (req, res) => {
    try {

        const newProperty = new Property(req.body);
        newProperty.owner = req.user.id;
        const savedProperty = await newProperty.save();
        await Seller.findByIdAndUpdate(req.user.id, {$push : {porperties: savedProperty.id}});
        res.status(201).json({ property: savedProperty });
    } catch (err) {
        res.status(500).json({ message: 'Error creating property', error: err });
    }
});


router.put('/:property_id', jwtAuthMiddleware, async (req, res) => {
    try {
        const propertyId = req.params.property_id;
        const property = await Property.findById(propertyId);


        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this property' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });

        res.status(200).json({ property: updatedProperty });
    } catch (err) {
        res.status(500).json({ message: 'Error updating property', error: err });
    }
});


router.delete('/:property_id', jwtAuthMiddleware, async (req, res) => {
    try {
        const propertyId = req.params.property_id;
        const property = await Property.findById(propertyId);


        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this property' });
        }

        await Property.findByIdAndDelete(propertyId);

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting property', error: err });
    }
});

module.exports = router;
