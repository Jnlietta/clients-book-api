import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, getRequests, loadSeats, loadSeatsRequest } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';


const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = io(process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8000', { transports: ['websocket'] });
    setSocket(socket);

    //load seats data
    dispatch(loadSeatsRequest());

    //listen event seatsUpdate for seats availability change
    socket.on('seatsUpdated', ( seats ) => dispatch(loadSeats(seats)));
    return () => { //przy usuwaniu komponentu
      socket.disconnect();
    };
  }, [dispatch])

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const countFreeSeats = () => {
    const filtredSeats = seats.filter(item => item.day === chosenDay);
    const takenSeatsAmount = filtredSeats.length; 
    const freeSeatsAmount = 50 - takenSeatsAmount;
    return freeSeatsAmount;
  };

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2"><Button outline color="primary" /> – it's empty</small>
      </div>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
      <p>Free seats: {countFreeSeats()}/50</p>
    </div>
  )
}

export default SeatChooser;