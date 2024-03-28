const Seat = require('../models/Seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postNew = async (req, res) => {
    try {
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ 
        day: day, 
        seat: seat, 
        client: client, 
        email: email 
      });
      console.log("new seat:",newSeat);
      
      const seatIsTaken = await Seat.find({ $and: [{ day: day }, { seat: seat }] });
      console.log("taken:",seatIsTaken);
      
      if(!seatIsTaken.length){
        await newSeat.save();
        res.json({ message: 'OK' });

        //emit to other users ubdate of available seats  
        req.io.emit('seatsUpdated', await Seat.find());
      } else {
        const failure = { message: 'The slot is already taken...' }
        res.status(400).json(failure);
      }
    } 
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { day, seat, client, email } = req.body;
  
    try {    
      const ubdatedSeat = await Seat.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { 
            day: day, 
            seat: seat, 
            client: client, 
            email: email  
         }},
        { new: true }
      );
      if(ubdatedSeat) {
        res.json(ubdatedSeat);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteById = async (req, res) => {
    try {
      const deletedSeat = await Seat.findByIdAndDelete({ _id: req.params.id });
      if(deletedSeat) {
        res.json(deletedSeat);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};