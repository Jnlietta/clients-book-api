const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const concert = await Concert.findById(req.params.id);
      if(!concert) res.status(404).json({ message: 'Not found' });
      else res.json(concert);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getByPerformer = async (req,res) => {
  const { performer } = req.params;
  try{
    const concerts = await Concert.find({ performer: performer });
    if(concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req,res) => {
  const { genre } = req.params;
  try{
    const concerts = await Concert.find({ genre: genre });
    if(concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req,res) => {
  const { price_min, price_max } = req.params;
  try{
    const concerts = await Concert.find({ price: { $gte: price_min, $lte: price_max }});
    if(concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req,res) => {
  const { day } = req.params;
  try{
    const concerts = await Concert.find({ day: day });
    if(concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
    try {
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ 
        performer: performer, 
        genre: genre, 
        price: price, 
        day: day, 
        image: image 
      });
      await newConcert.save();
      res.json({ message: 'OK' });
    } 
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
  
    try {    
      const ubdatedConcert = await Concert.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { 
            performer: performer, 
            genre: genre, 
            price: price, 
            day: day, 
            image: image 
         }},
        { new: true }
      );
      if(ubdatedConcert) {
        res.json(ubdatedConcert);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteById = async (req, res) => {
    try {
      const deletedConcert = await Concert.findByIdAndDelete({ _id: req.params.id });
      if(deletedConcert) {
        res.json(deletedConcert);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};